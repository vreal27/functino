const initialState = {
  messages: [],
  username: 'eddie'
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    case 'ADD_MESSAGE':
      // console.log('reducer', action.message)
      return {...state, messages:[action.message,...state.messages]}
    default:
      return state
  }
}