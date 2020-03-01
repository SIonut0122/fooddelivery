import { ADD_TO_CART }           from "./constants/action-types";
import { CART_TOTAL_SUM }      from "./constants/action-types";


 
  const initialState = {
      cart: [],
      cartTotalSum: 0
    }



  function rootReducer(state = initialState, action) {
    if (action.type === ADD_TO_CART) {
      return Object.assign({}, state, {
        cart: action.payload.cart
      });
    }
    if (action.type === CART_TOTAL_SUM) {
      return Object.assign({}, state, {
        cartTotalSum: action.payload.cartTotalSum
      });
    }


    return state;
  }



  export default rootReducer;