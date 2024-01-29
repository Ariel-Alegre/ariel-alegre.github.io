const initialState = {
  token: localStorage.getItem("token"),
  role: null, 
  loginUser: {},
  loginError: null,
  allUser: [],
  allLead: [],
  dataPersonal: [],
  coins: [],
  payment: null
  
  }
  
  
  export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTER':
        return {
          ...state
        };
  
        case "LOGIN_SUCCESS":
          return {
            ...state,
            token: action.payload.token,
            role: action.payload.role, 
          };
        case "LOGOUT_USER":
          // Limpia el token en el estado
          return {
            ...state,
            token: null,
          };
    
        case "LOGIN_ERROR":
          return {
            ...state,
            loginError: true,
          };

    
  
    
        case 'ALL_USERS':
          return {
            ...state,
            allUser: action.payload
          };

          case 'DATA_PERSONAL':
            return {
              ...state,
              dataPersonal: action.payload

            };

            case 'ALL_COINS':
              return {
                ...state,
                coins: action.payload
  
              };

              case 'CHANGE_COINS': 
              return {
                ...state,
                coins: action.payload.success ? state.coins : state.coins, // Puedes actualizar esto según tus necesidades
              };

                case 'PAYMENT_DEPOSIT': 
                return {
                  ...state,
                  payment: action.payload
                }
  
      default: return { ...state }
    }
  }
  
  
  
  
  
  
  