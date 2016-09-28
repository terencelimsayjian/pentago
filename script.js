$('document').ready(function () {
  var gameBoard = [[], [], [], []]
  var arr = [0, 1, 1, 1, 2, 2]
  var arr1 = [1, 1, 2, 1, 1, 1]
  var arr2 = [2, 1, 1, 1, 1, 2]
  var arr3 = [1, 2, 1, 2, 1, 2]

// Get the element at index, and return all neighbouring elements that have the same value

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

  horizontalWin(arr, 2)
  horizontalWin(arr1, 1)
  horizontalWin(arr1, 5)
  horizontalWin(arr2, 3)
  horizontalWin(arr3, 3)

})
