const DEFAULT_STATE =  {providers:[]};

const ProvidersReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {

    case "SET_PROVIDERS":
      return {
        ...state,
        providers:action.payload
      }; 
                
  }
  return state;
};

export default ProvidersReducer;