const DEFAULT_STATE =  {providers:[]};

const ProvidersReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {

    case "SET_PROVIDERS":
      return {
        ...state,
        providers:action.payload
      }; 
    case "UPDATE_PROVIDER":
      return {
        ...state,
        providers:state.providers.map(provider=>provider.id==action.payload.id ? action.payload : provider)
      }; 
    case "ADD_PROVIDER":
      return {
        ...state,
        providers:[action.payload,...state.providers]
      }; 
    case "REMOVE_PROVIDER":
      return {
        ...state,
        providers:state.providers.filter(provider=>provider.id!=action.payload)
      }; 
                
  }
  return state;
};

export default ProvidersReducer;