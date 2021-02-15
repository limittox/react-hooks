// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import { useState, useEffect } from 'react'

function Board({ onClick, squares }) {
  
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      {/* <div className="status">{status}</div> */}
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {/* <button className="restart" onClick={restart}>
        restart
      </button> */}
    </div>
  )
}

function Game() {
  const [squares, setSquares] = useState(
    JSON.parse(window.localStorage.getItem("tic-tac-toe")) || [Array(9).fill(null)]
  )
  let currentSquares = squares[squares.length-1]
  console.log(squares)
  
  useEffect(() => {
    return (
      window.localStorage.setItem("tic-tac-toe", JSON.stringify(squares))
    )
  }, [squares])

  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)
  const moves = squares.length

  function selectSquare(square) {
    currentSquares = squares[squares.length-1]

    if (currentSquares[square] || winner) {
      return
    }

    let modifiedCurrentSquares = [...currentSquares]

    modifiedCurrentSquares[square] = nextValue

    let modifiedSquares = [...squares]
    modifiedSquares.push(modifiedCurrentSquares)

    setSquares(modifiedSquares)
    localStorage.setItem("localStorageSquares", JSON.stringify(modifiedSquares))
  }

  function restart() {
    setSquares([...Array(1)].map(x=>Array(9).fill(null)))
    localStorage.setItem("localStorageSquares", null)
  }

  function setCurrentGameState(i) {
    
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>
          {squares.map((history, i) => {
            let currentMoves = i+1
            return (
              <button onClick={}>Go to move #{currentMoves}</button>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
