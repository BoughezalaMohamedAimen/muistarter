const DEFAULT_STATE =  {regions:[]};

const RegionsReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {

    case "SET_REGIONS":
      return {
        ...state,
        regions:action.payload
      }; 
                
  }
  return state;
};

export default RegionsReducer;