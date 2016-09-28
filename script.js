$('document').ready(function () {
  var gameBoard = [[], [], [], []]
  // var arr = [0, 1, 1, 1, 2, 2]
  // var arr1 = [1, 1, 2, 1, 1, 1]
  // var arr2 = [2, 1, 1, 1, 1, 2]
  // var arr3 = [1, 2, 1, 2, 1, 2]

  var matchingValues = []
  function horizontalWin (arr, index) {
    matchingValues = []
    for (var i = index; i >= 0; i--) {
      if (arr[i] === arr[index]) {
        matchingValues.push(arr[i])
      } else {
        break
      }
    }
    for (var j = index; j < arr.length; j++) {
      if (arr[j] === arr[index]) {
        matchingValues.push(arr[j])
      } else {
        break
      }
    }
    // REMEMBER: Double counts the index
    console.log(matchingValues.length - 1)
  }

  // horizontalWin(arr, 2)
  // horizontalWin(arr1, 1)
  // horizontalWin(arr1, 5)
  // horizontalWin(arr2, 3)
  // horizontalWin(arr3, 3)
  var doubArr = [
          [0, 1, 1, 1, 2, 2],
          [1, 1, 2, 1, 1, 1],
          [2, 1, 1, 1, 1, 2],
          [1, 2, 1, 2, 1, 2],
          [1, 2, 1, 2, 1, 2],
          [1, 1, 2, 1, 1, 1]
  ]

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

  upwardDiagonalWin(doubArr, 3, 2)
  upwardDiagonalWin(doubArr, 3, 5)
  upwardDiagonalWin(doubArr, 4, 4)
  upwardDiagonalWin(doubArr, 4, 3)

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

  downwardDiagonalWin(doubArr, 3, 2)
  downwardDiagonalWin(doubArr, 3, 5)
  downwardDiagonalWin(doubArr, 4, 4)
  downwardDiagonalWin(doubArr, 4, 3)
})
