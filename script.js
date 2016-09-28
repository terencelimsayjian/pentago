document.addEventListener('DOMContentLoaded', init)

function init () {
  var gameBoard = [[], [], [], []]
  var doubArr = [
    [0, 1, 1, 1, 2, 2],
    [1, 1, 2, 1, 1, 1],
    [2, 1, 1, 1, 1, 2],
    [1, 2, 1, 2, 1, 2],
    [1, 2, 1, 2, 1, 2],
    [1, 1, 2, 1, 1, 1]
  ]

  var matchingValues = []
  function horizontalWin (arr, arrIndex, index) {
    matchingValues = []
    for (var i = index; i >= 0; i--) {
      if (arr[arrIndex][i] === arr[arrIndex][index]) {
        matchingValues.push(arr[i])
      } else {
        break
      }
    }
    for (var j = index; j < arr.length; j++) {
      if (arr[arrIndex][j] === arr[arrIndex][index]) {
        matchingValues.push(arr[j])
      } else {
        break
      }
    }
    // REMEMBER: Double counts the index
    console.log(matchingValues.length - 1)
  }

  // horizontalWin(doubArr, 0, 2)
  // horizontalWin(doubArr, 1, 1)
  // horizontalWin(doubArr, 5, 5)
  // horizontalWin(doubArr, 2, 3)
  // horizontalWin(doubArr, 3, 3)

  function verticalWin (arrOfArr, arrIndex, index) {
    matchingValues = []
    for (var i = arrIndex; i >= 0; i--) {
      if (arrOfArr[i][index] === arrOfArr[arrIndex][index]) {
        matchingValues.push(arrOfArr[i][index])
      } else {
        break
      }
    }
    for (var j = arrIndex; j < arrOfArr.length; j++) {
      if (arrOfArr[j][index] === arrOfArr[arrIndex][index]) {
        matchingValues.push(arrOfArr[j][index])
      } else {
        break
      }
    }
    // REMEMBER: Double counts the index
    console.log(matchingValues.length - 1)
  }

  // verticalWin(doubArr, 2, 2)
  // verticalWin(doubArr, 3, 2)
  // verticalWin(doubArr, 3, 5)
  // verticalWin(doubArr, 4, 4)
  // verticalWin(doubArr, 4, 3)

  function upwardDiagonalWin (arrOfArr, arrIndex, index) {
    var firstIndex = arrIndex
    var secondIndex = index
    matchingValues = []
    // Upward diagonal, moving right
    for (var i = arrIndex; i >= 0; i--) {
      if (arrOfArr[firstIndex][secondIndex] === arrOfArr[arrIndex][index]) {
        matchingValues.push(arrOfArr[firstIndex][secondIndex])
        firstIndex -= 1
        secondIndex += 1
      } else {
        break
      }
    }
    firstIndex = arrIndex
    secondIndex = index
    // Upward diagonal, moving left
    for (var j = arrIndex; j < arrOfArr.length; j++) {
      if (arrOfArr[firstIndex][secondIndex] === arrOfArr[arrIndex][index]) {
        matchingValues.push(arrOfArr[firstIndex][secondIndex])
        firstIndex += 1
        secondIndex -= 1
      } else {
        break
      }
    }
    console.log(matchingValues.length - 1)
  }

  // upwardDiagonalWin(doubArr, 3, 2)
  // upwardDiagonalWin(doubArr, 3, 5)
  // upwardDiagonalWin(doubArr, 4, 4)
  // upwardDiagonalWin(doubArr, 4, 3)

  function downwardDiagonalWin (arrOfArr, arrIndex, index) {
    var firstIndex = arrIndex
    var secondIndex = index
    matchingValues = []
    // Downward diagonal, moving right
    for (var i = arrIndex; i < arrOfArr.length; i++) {
      if (arrOfArr[firstIndex][secondIndex] === arrOfArr[arrIndex][index]) {
        matchingValues.push(arrOfArr[firstIndex][secondIndex])
        firstIndex += 1
        secondIndex += 1
      } else {
        break
      }
    }
    firstIndex = arrIndex
    secondIndex = index
    // Downward diagonal, moving left
    for (var j = arrIndex; j >= 0; j--) {
      if (arrOfArr[firstIndex][secondIndex] === arrOfArr[arrIndex][index]) {
        matchingValues.push(arrOfArr[firstIndex][secondIndex])
        firstIndex -= 1
        secondIndex -= 1
      } else {
        break
      }
    }
    console.log(matchingValues.length - 1)
  }

  // downwardDiagonalWin(doubArr, 3, 2)
  // downwardDiagonalWin(doubArr, 3, 5)
  // downwardDiagonalWin(doubArr, 4, 4)
  // downwardDiagonalWin(doubArr, 4, 3)

  // function rowColAdder (arrCounter, idxCounter) {
  //   var arrayCounter = arrCounter
  //   var indexCounter = idxCounter
  //
  //   return {
  //     addArrCounter: function () {
  //       this.setAttribute('row', arrayCounter)
  //     }
  //   //   addIndexCounter: function () {
  //   //     this.setAttribute ('col,' indexCounter)
  //   //   }
  //   }
  // }
  //
  // var gameSquareArr = document.querySelectorAll('.game-square')
  //
  // var firstRow = rowColAdder(0, 0)
  //
  // gameSquareArr.forEach(function (gsq) {
  //   firstRow.addArrCounter()
  // })
  //
  // console.log(gameSquareArr)

  // for (var i = 0; i < gameBoard.length; i++) {
  //   for (var j = 0; j < gameBoard[i].length; j++) {
  //     gameSquareArr.setAttribute('row', i)
  //     gameSquareArr.setAttribute('col', j)
  //   }
  // }

  function addRowCol (row) {
    var currentRow = row
    function addCol (obj, col) {
      obj.setAttribute('row', currentRow)
      obj.setAttribute('col', col)
    }
    return addCol
  }

  var addRow0Col = addRowCol(0)
  var addRow1Col = addRowCol(1)
  var addRow2Col = addRowCol(2)
  var addRow3Col = addRowCol(3)

  var firstGameTile = document.querySelectorAll('#game-tile-1 .game-square')
  var secondGameTile = document.querySelectorAll('#game-tile-2 .game-square')
  var thirdGameTile = document.querySelectorAll('#game-tile-3 .game-square')
  var fourthGameTile = document.querySelectorAll('#game-tile-4 .game-square')
  var allGameTile = document.querySelectorAll('.game-square')

  for (var i = 0; i < firstGameTile.length; i++) {
    addRow0Col(firstGameTile[i], i)
  }

  for (var i = 0; i < secondGameTile.length; i++) {
    addRow1Col(secondGameTile[i], i)
  }

  for (var i = 0; i < thirdGameTile.length; i++) {
    addRow2Col(thirdGameTile[i], i)
  }

  for (var i = 0; i < fourthGameTile.length; i++) {
    addRow3Col(fourthGameTile[i], i)
  }

  function playerMove() {
    var thisRow = this.getAttribute('row')
    var thisCol = this.getAttribute('col')
    this.textContent = '[' + thisRow + ']' + '[' + thisCol + ']'
  }

  allGameTile.forEach (function (item) {
    item.addEventListener('click', playerMove)
  })
}
