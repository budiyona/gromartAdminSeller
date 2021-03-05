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
      console.log('LOGIN REDUCER');
      console.log(action);
      return({
        ...state,
        isLogin: true,
        user: action.user
      })
    case 'LOGOUT':
      console.log('LOGOUT');
      return initState

    default:
      return state
  }
}

export default auth