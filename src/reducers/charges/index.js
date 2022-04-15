const DEFAULT_STATE =  {charges:[]};

const ChargesReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {

    case "SET_CHARGES":
      return {
        ...state,
        charges:action.payload
      }; 
    case "UPDATE_CHARGE":
      return {
        ...state,
        charges:state.charges.map(charge=>charge.id==action.payload.id ? action.payload : charge)
      }; 
    case "ADD_CHARGE":
      return {
        ...state,
        charges:[action.payload,...state.charges]
      }; 
    case "REMOVE_CHARGE":
      return {
        ...state,
        charges:state.charges.filter(charge=>!action.payload.includes(charge.id))
      }; 
                
  }
  return state;
};

export default ChargesReducer;