$(document).ready(function () {
  var gameBoard = [
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', ''],
                    ['', '', '', '', '', '']
  ]


  var $allGameSquare = $('.game-square')
  var $headerTwo = $('h2')
  var player = 'X'
  var scoreBoard = {
    'X': 0,
    'O': 0,
    'ties': 0
  }

  // Have a game init function instead for clarity?
  $('.rotate-btn').hide()

  // checks win condition with tile coordinates and direction specified
  function checkWin (rowIndex, colIndex, direction) {
    var adjustFirstArr = 0
    var adjustSecondArr = 0

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
          // Maybe can add winning tile change here
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
      scoreBoard[player] += 1
      updateScoreBoard()
      // resetBoard()
    }
  }

  // Checks win condition for all directions for that particular tile
  function checkAllWin (thisRow, thisCol) {
    checkWin(thisRow, thisCol, 'vertical')
    checkWin(thisRow, thisCol, 'horizontal')
    checkWin(thisRow, thisCol, 'upDiagonal')
    checkWin(thisRow, thisCol, 'downDiagonal')
  }

  // function checkTie () {
  //   gameBoardFull = true
  //   for (var i = 0; i < $allGameSquare.length; i++) {
  //     if ($('.game-square').eq(i).hasClass('X') || $('.game-square').eq(i).hasClass('O')) {
  //       gameBoardFull = false
  //     }
  //   }
  //   if (!gameBoardFull) {
  //     $headerTwo.text('TIETIETIE')
  //   }
  // }


  // Specifies behaviour on player making a move
  function playerMove () {
    // If cell is populated
    if (!$(this).hasClass('X') && !$(this).hasClass('O')) {

      // Gets rows and col index from HTML divs
      var thisRow = Number($(this).data('row'))
      var thisCol = Number($(this).data('col'))

      // Assigns player value to gameBoard array
      gameBoard[thisRow][thisCol] = player

      // Adds class to clicked div
      $(this).addClass(player)

      // Checks win condition for clicked cell
      checkAllWin(thisRow, thisCol)

      $('.rotate-btn').show()

      // Change player
      if (player === 'X') {
        player = 'O'
      } else {
        player = 'X'
      }
    }
  }

  $allGameSquare.on('click', playerMove)

  $allGameSquare.hover(
    // $(this).toggleClass('hover' + player)
    function () {
      $(this).addClass('hover' + player)
    },
    function () {
      $(this).removeClass('hoverX hoverO')
    }
  )

  // Assigns rotate tile function to each button, calling the closure with the appropriate board
  for (var i = 0; i < 4; i++) {
    // Define closure for each board, and assign click event for rotate
    var rotateTileIndex = rotateBoard('board' + i, 'right')
    var $rotateRightBtn = $('#rotate-right' + i)
    $rotateRightBtn.on('click', rotateTileIndex)

    var rotateTileIndex = rotateBoard('board' + i, 'left')
    var $rotateLeftBtn = $('#rotate-left' + i)
    $rotateLeftBtn.on('click', rotateTileIndex)
  }

  // Rotates board, stores as closure with corresponding starting coordinates
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

    // Var declared here due to hoisting issues
    var $gameSquareTile = $('#' + gameTileID + ' .game-square')

    function updateTileValues () {
      // Storing values to rotate in variables
      $gameSquareTile.removeClass('X')
      $gameSquareTile.removeClass('O')

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
      // For each item on a game-tile, get new rotated value and assign new classes accordingly
      for (var i = x; i < x + 3; i++) {
        for (var j = y; j < y + 3; j++) {
          // Assigning the values to new positions on gameBoard
          if (rotateDirection === 'right') {
            gameBoard[i][j] = rightRotateTiles[counter]
          } else if (rotateDirection === 'left') {
            gameBoard[i][j] = leftRotateTiles[counter]
          }

          // Changing class to reflect gameBoard changes
          if (gameBoard[i][j] === 'X') {
            $gameSquareTile.eq(counter).addClass('X')
          } else if (gameBoard[i][j] === 'O') {
            $gameSquareTile.eq(counter).addClass('O')
          }

          // counter to loop through the gameSquareTile array
          counter += 1

          $('.rotate-btn').hide()

          checkAllWin(i, j)
        }
      }
    }
    return updateTileValues
  }

  function updateScoreBoard () {
    $('.player-x-score').text(scoreBoard.X)
    $('.player-o-score').text(scoreBoard.O)
    $('.tie-score').text(scoreBoard.ties)
  }

  function resetBoard () {
    $allGameSquare.removeClass('X')
    $allGameSquare.removeClass('O')
    gameBoard = [
                      ['', '', '', '', '', ''],
                      ['', '', '', '', '', ''],
                      ['', '', '', '', '', ''],
                      ['', '', '', '', '', ''],
                      ['', '', '', '', '', ''],
                      ['', '', '', '', '', '']
    ]
  }

  function fullReset () {
    resetBoard()
    for (var x in scoreBoard) {
      scoreBoard[x] = 0
    }
    updateScoreBoard()
  }

  $('.reset-btn').on('click', resetBoard)

  // Remaining things to do:
  // Tier 1:
  // 1) Disabling player input after each move, forcing them to rotate.
    // Create a variable that toggles, allow the function to go through depending on variable?
  // 2) Tie condition - scoreBoard
  // 3) Notification? Next game? Potentially so they can analyse the board
  // 4) Game init - Initiate game with no buttons visible
  //
  // Tier 2:
  // 1) Reorganise code and see where you forgot to define jquery variables
  //
  // Tier 3:
  // 1) Rotation animation
  // 2) Change picture of winning tiles
  // 3) Strategy tips

})
