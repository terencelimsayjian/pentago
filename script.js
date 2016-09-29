$(document).ready(function () {
  var gameBoard = [
                    ['a1', 'a2', 'a3', 'a4', 'a5', 'a6'],
                    ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
                    ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'],
                    ['d1', 'd2', 'd3', 'd4', 'd5', 'd6'],
                    ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'],
                    ['f1', 'f2', 'f3', 'f4', 'f5', 'f6']
  ]

  var adjustFirstArr = 0
  var adjustSecondArr = 0

  function getDirectionIndex (direction) {
    switch (direction) {
      case 'vertical':
        adjustFirstArr = -1
        adjustSecondArr = 0
        break
      case 'horizontal':
        adjustFirstArr = 0
        adjustSecondArr = 1
        break
      case 'upDiagonal':
        adjustFirstArr = -1
        adjustSecondArr = 1
        break
      case 'downDiagonal':
        adjustFirstArr = -1
        adjustSecondArr = -1
        break
      default:
        adjustFirstArr = 0
        adjustSecondArr = 0
    }
  }

  var doubArr = [
  [0, 1, 1, 1, 2, 2],
  [1, 1, 2, 1, 1, 1],
  [2, 1, 1, 1, 1, 2],
  [1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2],
  [1, 1, 2, 1, 1, 1]
  ]

  checkWin (gameBoard, 1, 0, 'vertical')

  var matchingValues = []

  function checkWin (arr, rowIndex, colIndex, direction) {
    getDirectionIndex(direction)
    var playerMove = arr[rowIndex][colIndex]

    var checkRowFront = rowIndex + adjustFirstArr
    var checkColFront = colIndex + adjustSecondArr

    var checkRowBack = rowIndex - adjustFirstArr
    var checkColBack = colIndex - adjustSecondArr

    var totalMatches = 0
    matchingValues = []

    while (arr[checkRowFront][checkColFront] === playerMove) {
      // console.log('[' + checkRowFront + '][' + checkColFront + ']')
      checkRowFront += adjustFirstArr
      checkColFront += adjustSecondArr
      totalMatches += 1
    }

    while (arr[checkRowBack][checkColBack] === playerMove) {
      // console.log('[' + checkRowBack + '][' + checkColBack + ']')
      checkRowBack -= adjustFirstArr
      checkColBack -= adjustSecondArr
      totalMatches += 1
    }
    if (totalMatches === 4) {
      console.log('u r a ' + direction + ' winna')
    }
  }

// HAMANAHAMANAHAMANA

  var $allGameSquare = $('.game-square')
  var $headerTwo = $('h2')
  var player = 'X'

  function playerMove () {
    var thisRow = this.getAttribute('row')
    var thisCol = this.getAttribute('col')
    gameBoard[thisRow][thisCol] = player
    this.textContent = player + '[' + thisRow + ']' + '[' + thisCol + ']'
    // console.log('[' + thisRow + ']' + '[' + thisCol + ']')
    checkWin(gameBoard, thisRow, thisCol, 'vertical')
    // checkWin(gameBoard, thisRow, thisCol, 'horizontal')
    // checkWin(gameBoard, thisRow, thisCol, 'upDiagonal')
    // checkWin(gameBoard, thisRow, thisCol, 'downDiagonal')

    if (player === 'X') {
      player = 'O'
    } else {
      player = 'X'
    }
    // console.log(gameBoard)
  }

  $allGameSquare.on('click', playerMove)

})
