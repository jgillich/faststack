
export default function errorReducer(state = [], action) {

  switch (action.type) {
    case 'REMOVE_ERROR':
      return state.filter(e => e !== action.error)
    case "ADD_ERROR":
      return state.concat([action.error])
  }

  return state
}