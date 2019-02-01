const initialState = {
  messages: [],
  // username: '',
  rooms: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    // case 'SIGN_IN':
    //   return {...state, username: action.username}
    case 'ADD_MESSAGE':
      return {...state, messages:[action.message,...state.messages]}
    case 'CHANNEL_LIST':
      return {...state, rooms: [...state.rooms, action.rooms]}
    case 'LEFT_ROOM': 
    console.log('stateofrooms', state.rooms)
    let filter = state.rooms.filter(e => e !== action.leave)
      return {...state, rooms: filter}
    default:
      return state
  }
}

