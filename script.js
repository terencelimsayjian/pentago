$(document).ready(function () {
  var gameBoard = [
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', '']
  ]

  var adjustFirstArr = 0
  var adjustSecondArr = 0
  var $allGameSquare = $('.game-square')
  var $headerTwo = $('h2')
  var player = 'X'

  function getDirectionIndex (direction) {
    switch (direction) {
      case 'vertical':
        adjustFirstArr = 1
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

  // checks win condition with tile coordinates and direction specified
  function checkWin (rowIndex, colIndex, direction) {
    getDirectionIndex(direction)
    var playerMove = gameBoard[rowIndex][colIndex]

    var checkRowFront = rowIndex + adjustFirstArr
    var checkColFront = colIndex + adjustSecondArr

    var checkRowBack = rowIndex - adjustFirstArr
    var checkColBack = colIndex - adjustSecondArr

    var totalMatches = 0

    for (var i = 0; i < 6; i++) {
      if (checkRowFront >= 0 && checkRowFront <= 5 && checkColFront >= 0 && checkColFront <= 5) {
        if (gameBoard[checkRowFront][checkColFront] === playerMove && playerMove) {
          checkRowFront += adjustFirstArr
          checkColFront += adjustSecondArr
          totalMatches += 1
        } else {
          break
        }
      } else {
        break
      }
    }

    for (var i = 0; i < 6; i++) {
      if (checkRowBack >= 0 && checkRowBack <= 5 && checkColBack >= 0 && checkColBack <= 5) {
        if (gameBoard[checkRowBack][checkColBack] === playerMove && playerMove) {
          checkRowBack -= adjustFirstArr
          checkColBack -= adjustSecondArr
          totalMatches += 1
        } else {
          break
        }
      } else {
        break
      }
    }

    if (totalMatches === 4) {
      $headerTwo.text(player + ', u r ' + direction + ' winna')
    }
  }

  // Checks win condition for all directions for that particular tile
  function checkAllWin (thisRow, thisCol) {
    checkWin(thisRow, thisCol, 'vertical')
    checkWin(thisRow, thisCol, 'horizontal')
    checkWin(thisRow, thisCol, 'upDiagonal')
    checkWin(thisRow, thisCol, 'downDiagonal')
  }


  // Specifies behaviour on player making a move
  function playerMove () {
    // Gets rows and col index from HTML divs
    var thisRow = Number(this.getAttribute('data-row'))
    var thisCol = Number(this.getAttribute('data-col'))

    // Assigns player value to gameBoard array
    gameBoard[thisRow][thisCol] = player

    // Changes text content of clicked div to player
    this.textContent = player

    // Checks win condition for clicked cell
    checkAllWin(thisRow, thisCol)

    if (player === 'X') {
      player = 'O'
      // this.classList.add('red')
    } else {
      player = 'X'
      // this.addClass('blue')
    }
  }

  $allGameSquare.on('click', playerMove)

  // Assigns rotate tile function to each tile
  for (var i = 0; i < 4; i++) {
    // Define closure for each board, and assign click event for rotate
    var rotateTileIndex = rotateBoard('board' + i, 'right')
    var $rotateRightBtn = $('.rotate-right:eq(' + i + ')')
    $rotateRightBtn.on('click', rotateTileIndex)

    var rotateTileIndex = rotateBoard('board' + i, 'left')
    var $rotateLeftBtn = $('.rotate-left:eq(' + i + ')')
    $rotateLeftBtn.on('click', rotateTileIndex)
  }

  // Specifies
  function rotateBoard (boardIndex, rotateDirection) {
    var x = 0
    var y = 0
    var gameTileID

    switch (boardIndex) {
      case 'board0':
        x = 0
        y = 0
        gameTileID = 'game-tile-0'
        break
      case 'board1':
        x = 0
        y = 3
        gameTileID = 'game-tile-1'
        break
      case 'board2':
        x = 3
        y = 0
        gameTileID = 'game-tile-2'
        break
      case 'board3':
        x = 3
        y = 3
        gameTileID = 'game-tile-3'
        break
      default:
    }

    var $gameSquareTile = $('#' + gameTileID + ' .game-square')

    function updateTileValues () {
      // Storing values to rotate in variables
      var rightRotateTiles = {
        '0': gameBoard[x + 2][y],
        '1': gameBoard[x + 1][y],
        '2': gameBoard[x][y],
        '3': gameBoard[x + 2][y + 1],
        '4': gameBoard[x + 1][y + 1],
        '5': gameBoard[x][y + 1],
        '6': gameBoard[x + 2][y + 2],
        '7': gameBoard[x + 1][y + 2],
        '8': gameBoard[x][y + 2]
      }

      var leftRotateTiles = {
        '0': gameBoard[x][y + 2],
        '1': gameBoard[x + 1][y + 2],
        '2': gameBoard[x + 2][y + 2],
        '3': gameBoard[x][y + 1],
        '4': gameBoard[x + 1][y + 1],
        '5': gameBoard[x + 2][y + 1],
        '6': gameBoard[x][y],
        '7': gameBoard[x + 1][y],
        '8': gameBoard[x + 2][y]
      }

      var counter = 0
      // For each item on a game-tile
      for (var i = x; i < x + 3; i++) {
        for (var j = y; j < y + 3; j++) {
          // Assigning the values to new positions on gameBoard
          if (rotateDirection === 'right') {
            gameBoard[i][j] = rightRotateTiles[counter]
          } else if (rotateDirection === 'left') {
            gameBoard[i][j] = leftRotateTiles[counter]
          }

          // Changing text in HTML elements to reflect gameBoard changes
          $gameSquareTile.eq(counter).text(gameBoard[i][j])
          counter += 1

          checkAllWin(i, j)
        }
      }
    }
    return updateTileValues
  }
  //     <strong id="the_id" data-original-title="I NEED THIS">
  //
  // $('#the_id').data('original-title');

})
