import { ADD_TO_CART }      from "../constants/action-types";
import { CART_TOTAL_SUM }      from "../constants/action-types";



export function addProductToCart(payload) {
  return { type: ADD_TO_CART, payload };
}
export function getCartTotalSum(payload) {
  return { type: CART_TOTAL_SUM, payload };
}