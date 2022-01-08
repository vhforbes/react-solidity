// Reducers are functions that take the current state and an action as arguments, and return a
// new state result. In other words, (state, action) => newState.

const initialState = {
    haveMetamask: false,
    metamaskAuthenticated: false,
    accounts: [],
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "haveMetamask":
        return {
          ...state,
          haveMetamask: true
        }
    case "metamaskAuthenticated":
      return {
        ...state,
        metamaskAuthenticated: true
      }
    case "saveAccounts":
      console.log(action.payload)

      return {
        ...state,
        accounts: action.payload
      }

    default:
      break;
  }

  return state
}