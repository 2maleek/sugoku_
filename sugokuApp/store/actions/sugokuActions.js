export function getBoard(level) {
  return (dispatch, getState) => {
    fetch('https://sugoku.herokuapp.com/board?difficulty='.concat(level))
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: 'GET_BOARD',
        payload: { board: data.board, answer: data.board}
      })
    })
  }
}

export function setAnswer(data){
  return dispatch({
    type: 'SET_ANSWER',
    payload: { answer: data }
  })
}