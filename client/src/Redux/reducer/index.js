
const initialState = {
    dogs : [],
    temperaments: [],
    allDogs: [],
    detail: [],
}

function rootReducer(state = initialState, action){
  switch(action.type){
    case 'GET_DOGS':
        return{
            ...state,
            dogs : action.payload,
            allDogs: action.payload
        }
    case "GET_ALL_TEMPERAMENTS":
        return {
            ...state,
            temperaments: action.payload,
          };    

    case 'FILTER_BY_TEMPERAMENTS':
      const allDogs = state.allDogs;
  
        const temperamentFiltered = action.payload === 'temp' ? allDogs : allDogs.filter(el => {
          if (typeof (el.temperaments) === 'string') return el.temperaments.includes(action.payload);
          if (Array.isArray(el.temperaments)) {
              let temps = el.temperaments.map(el => el.name);
              return temps.includes(action.payload);
          }
          return true;
      });

      console.log(allDogs);


      return {
        ...state,
        dogs: temperamentFiltered,
      };
     
      case 'FILTER_CREATED':
        const all = state.allDogs;
        const createdFilter = 
        action.payload === 'all' 
        ?  all  : action.payload === 'created'
        ? all.filter(el => el.createdInDb)
        : all.filter(el => !el.createdInDb);
        return{
          ...state,
          dogs: createdFilter
        }
      
      case 'SORT_BY_NAME':
        const sortedName = action.payload === 'asc' 
        ? state.dogs.sort((a,b) =>{
          if(a.name.toLowerCase() > b.name.toLowerCase()){
            return 1;
          }
          if(b.name.toLowerCase() > a.name.toLowerCase()){
            return -1;
          }
          return 0;
        }) :
        state.dogs.sort((a,b) =>{
          if(a.name.toLowerCase() > b.name.toLowerCase()){
            return -1;
          }
          if(b.name.toLowerCase() > a.name.toLowerCase()){
            return 1;
          }
          return 0;
        })
        
        return{
          ...state,
          dogs: sortedName
        }

      case 'SORT_BY_WEIGHT':
        const sortedWeight = action.payload === 'asc' ?
                state.dogs.sort(function (a, b) {
                    return parseInt(a.weightMin) - parseInt(b.weightMin);
                }) :
                state.dogs.sort(function (a, b) {
                    return parseInt(b.weightMax) - parseInt(a.weightMax);
                });
            return {
                ...state,
                dogs: sortedWeight,
            }
      case 'POST_DOG':
        return{
          ...state
        }
      
      case 'GET_DETAILS':
        return{
          ...state,
          detail: action.payload,
        }
    
    default: return state;
  }
}

export default rootReducer;