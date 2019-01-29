const initialState = {
  messages: [],
  username: '',
  rooms: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    case 'SIGN_IN':
      return {...state, username: action.username}
    case 'ADD_MESSAGE':
      return {...state, messages:[action.message,...state.messages]}
    case 'CHANNEL_LIST':
      return {...state, rooms: action.rooms}
    default:
      return state
  }
}

