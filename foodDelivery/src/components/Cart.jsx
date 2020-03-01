import React                from 'react';
import Header               from './Header.jsx';
import Footer               from './Footer.jsx';
import hambSliders          from '../js/hamb_slider.js';
import { Link }             from 'react-router-dom';
import { connect }          from "react-redux";
import { addProductToCart } from '../actions/actions';
import { getCartTotalSum }  from '../actions/actions';
import '../css/Cart.css';


 const mapStateToProps = state => {
  return {  cart:         state.cart,
            cartTotalSum: state.cartTotalSum
         };
  }
   

function mapDispatchToProps(dispatch) {
  return {
          addProductToCart: prod  => dispatch(addProductToCart(prod)),
          getCartTotalSum:  total => dispatch(getCartTotalSum(total)),
        };
}


class ConnectedCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        cart: [],
    }
  }

 
componentDidMount() {
 let navB = document.querySelectorAll('.nav_sp_menu');
  // Remove all nav menu highlights
  for(let i=0; i<navB.length; i++) {
    navB[i].classList.remove('nav_active');
  }
    // Set document title
  document.title = 'Food Delivery - Cart';
    // Set page nav path name
  document.querySelector('.page_nav_path').innerHTML = 'Cart';
    // Call function to calculate cart total sum when page loads
  this.cartTotalSum();
}

removeCartProduct(prod) {
 let cart       = [...this.props.cart];
 let removeProd = cart.filter(x => x.id !== prod.id );

 this.props.addProductToCart({ cart: removeProd})
  // Call function to recalculate total cart sum
 this.cartTotalSum();
}

cartTotalSum() {
  let cart          = this.props.cart,
      cartSumValues = [];
      
    // If cart length > 0, calculate total sum
  if(cart.length > 0) {
    // Push every new price inside array to get the total sum
  cart.map((product) => cartSumValues.push(parseFloat(product.totalPrice)));
    // Set cartTotalSum props to be used on checkout comp
  let total = cartSumValues.reduce(function(a,b) { return a+b});
  this.props.getCartTotalSum({ cartTotalSum: total})
  return total;
  }

}

  render() {
    return (
      <div>
         <Header />
          <div className='row center'>
            <div className='hamb_container col s12'>
              <div className='row'>
                <div className='cart_wrap col s12'>
                  <span className='hamb_slide_up_bord'></span>
                  
                  <div className='row'>
                    <div className='page_nav_sec col s12'>
                      <Link to={process.env.PUBLIC_URL + '/'}>Home</Link>
                      /
                      <span className='page_nav_path'></span>
                    </div>
                  </div>

                 {/* Your food cart title */}
                 {this.props.cart.length > 0 ? (
                 <div>
                    <div className='row flexbox'>
                      <div className='cart_head_title col s10'>
                        <div className='row'>
                              <span></span>
                              <span>Your food cart</span>
                              <span>({this.props.cart.length})</span>
                        </div>
                      </div>
                    </div>

                    {/* Product box */}
                    <div className='row flexbox'>
                      <div className='cart_wrap_product col s12 l9'>
                        
                      {this.props.cart.map((prod,ind) =>
                        <div key={ind} className='row flexbox'>
                          <div className='cart_product_box col s10 m8 l7'>
                            <div className='row'>
                              <div className='cart_prod_box_img col s3'>
                                <img src={prod.image} className={prod.classNames} alt=''/>
                              </div>
                              <div className='cart_prod_box_info col s6'>
                                <span className='c_prodbox_name'>{prod.title}</span>
                                <span>x{prod.pieces}</span>
                              </div>
                              <div className='cart_prod_box_price col s3 lg2'>
                                <span className='c_prod_b_price_txt'>${prod.totalPrice}</span>
                              </div>
                            </div>
                                <span className='c_prod_box_remove_prod' onClick={(e) => this.removeCartProduct(prod)}>&times;</span>
                          </div>  
                        </div> 
                      )}
                      </div>
                    </div>

                    {/* Total cart */}
                    <div className='row flexbox'>
                      <div className='cart_wrap_del col s10 l9'>
                        <div className='row'>
                            <span className='left'>
                            Delivery
                            </span>
                            <span className='right'>
                            Free
                            </span>
                        </div>
                      </div>
                    </div>
                    <div className='row flexbox'>
                      <div className='cart_wrap_total col s10 l9'>
                        <div className='row'>
                            <span className='left'>
                            Total
                            </span>
                            <span className='right'>
                            ${this.cartTotalSum()}
                            </span>
                        </div>
                      </div>
                    </div>

                    <div className='row flexbox'>
                      <Link to={process.env.PUBLIC_URL + '/checkout'} className='cart_gotocheckout_button'>
                        Go to checkout
                      </Link>
                    </div>
                  </div>
                  ) : (
                  <div>
                    {/* Empty cart */}
                    <div className='row flexbox'>
                      <img className='cart_emptycart_img' src={require('../images/cart/empty_cart_icon.png')} alt=''/>
                    </div>
                    <div className='row flexbox'>
                        <span className='cart_empty_msg'>Your cart is empty. Please visit our products.</span>
                    </div>
                    <div className='row flexbox'>
                        <Link to={process.env.PUBLIC_URL + '/'} className='emptycart_gotohome_button'>Go to homepage</Link>
                    </div>
                  </div>
                  )}

                  <span className='h_slide_down_bord'></span>
                
                </div>
              </div>
            </div>
          </div>
        <Footer/>
      </div>
      )
  }
}

const Cart = connect(mapStateToProps,mapDispatchToProps)(ConnectedCart);
export default Cart;

