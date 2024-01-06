import { useState } from 'react';
import './App.css'
import confetti from 'canvas-confetti';
import { winningCombinations, TURNS } from './constants';
import Square from './components/Square.jsx';
import { Component } from './components/Component.jsx';
export default function App() {

  //States
  const [turn, setTurn] = useState(TURNS.X);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null) //null -> no winner, false -> tie

  //Funciones app
  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn;
    setBoard(newBoard);


    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner)

    } else if (checkTie(newBoard)) {
      setWinner(false);
    }


  }
  const checkWinner = (boardToCheck) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a];
      }
    }
    return null
  }
  const checkTie = board => {
    return board.every(cuadraos => cuadraos !== null);
  }
  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(winner ? winner : TURNS.X);
    setWinner(null);
  }
  //return APP
  return (
    <><main className='board'>
      <h1>Tic tac toe</h1>
      <section className='game'>
        {board.map((element, index) => {
          return (<Square index={index} updateBoard={updateBoard} key={index}>{board[index]}</Square>);
        })}
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      {winner !== null && (<section className='winner'>
        <div>
          <h2>
            {winner === false ? 'Empate' : `Ganó: `}
          </h2>
          <header className="win">{winner && (<Square>{winner}</Square>)}</header>
          <footer><button onClick={restartGame}>empezar de nuevo</button></footer>
        </div>
      </section>)}
    </main><Component></Component></>
  )
}

