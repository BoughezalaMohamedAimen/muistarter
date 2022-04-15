const DEFAULT_STATE =  {clients:[]};

const ClientsReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {

    case "SET_CLIENTS":
      return {
        ...state,
        clients:action.payload
      }; 
    case "UPDATE_CLIENT":
      return {
        ...state,
        clients:state.clients.map(client=>client.id==action.payload.id ? action.payload : client)
      }; 
    case "ADD_CLIENT":
      return {
        ...state,
        clients:[action.payload,...state.clients]
      }; 
    case "REMOVE_CLIENT":
      return {
        ...state,
        clients:state.clients.filter(client=>!action.payload.includes(client.id))
      }; 
                
  }
  return state;
};

export default ClientsReducer;