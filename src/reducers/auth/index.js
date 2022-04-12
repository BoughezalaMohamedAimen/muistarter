const DEFAULT_STATE =  {token:"",user:{}};

const AuthReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {

    case "SET_USER":
      return {
        ...state,
        user:action.payload
      }; 
    case "SET_TOKEN":
      return {
        ...state,
        token:action.payload
      }; 
                
  }
  return state;
};

export default AuthReducer;