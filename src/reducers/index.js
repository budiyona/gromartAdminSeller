const initState = {
  isLogin: false,
  user: {
    userCode: "",
    fullName: "",
  },
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };
    case "LOGOUT":
      console.log("LOGOUT");
      return initState;

    default:
      return state;
  }
};

export default auth;
