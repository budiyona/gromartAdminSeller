const initState = {
  isLogin: false,
  user: {
    userCode: "",
    fullName: ""
  }
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return({
        ...state,
        isLogin: true,
        user: action.user
      })
    case 'LOGOUT':
      return initState

    default:
      return state
  }
}

export default auth