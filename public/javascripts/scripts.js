/*
 *  Copyright 2023 Patrick L. Branson
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

const gameBoard = document.querySelector('#game-board')
const information = document.querySelector('#information')

const startCells = new Array(9).fill('')
information.textContent = ''

let startItem = 'circle'
information.textContent = 'Circle Goes First'

function initializeGameBoard() {
  // The underscore in the "forEach" function means that parameter
  // is not being used. I did not know that until today (March 9, 2023 21:44 EST)
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement('div')
    cellElement.classList.add('square')
    cellElement.id = index
    cellElement.addEventListener('click', addItem)
    gameBoard.append(cellElement)
  })
}

function addItem(event) {
  const display = document.createElement('div')
  display.classList.add(startItem)
  event.target.append(display)

  // Changes the starting item for each game cycle
  startItem = startItem === 'circle' ? 'cross' : 'circle'
  information.textContent = 'It is now ' + startItem + "'s turn"

  event.target.removeEventListener('click', addItem)
  checkScore()
}

function checkScore() {
  const allSquares = document.querySelectorAll('.square')

  // An Array of the all possible winning combination
  const winningCombination = [
    /* Horizontal Winning Combinations */
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    /* Vertical Winning Combinations */
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    /* Diagonal Winning Combinations */
    [0, 4, 8],
    [2, 4, 6],
  ]

  winningCombination.forEach((array) => {
    const circleWins = array.every((cell) => allSquares[cell].firstChild?.classList.contains('circle'))

    if (circleWins) {
      information.textContent = 'Circle Wins!'
      allSquares.forEach((square) => square.replaceWith(square.cloneNode(true)))
      return
    }
  })

  winningCombination.forEach((array) => {
    const crossWins = array.every((cell) => allSquares[cell].firstChild?.classList.contains('cross'))

    if (crossWins) {
      information.textContent = 'Cross Wins!'
      allSquares.forEach((square) => square.replaceWith(square.cloneNode(true)))
      return
    }
  })
}

// Initializes and runs the game
initializeGameBoard()
