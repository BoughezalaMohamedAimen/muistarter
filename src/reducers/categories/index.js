const DEFAULT_STATE =  {categories:[]};

const CategoriesReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {

    case "SET_CATEGORIES":
      return {
        ...state,
        categories:action.payload
      }; 
                
  }
  return state;
};

export default CategoriesReducer;