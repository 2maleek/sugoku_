const initialState = {
  board: [[]],
  answer: [[]],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_BOARD': 
      return  { ...state, board: action.payload.board, answer: action.payload.answer }
    case 'SET_ANSWER': 
      return { ...state, answer: action.payload.answer }
    case 'POST_SOLVE':
      return { ...state, answer: action.payload.answer }
    default:
      return state
  }
}