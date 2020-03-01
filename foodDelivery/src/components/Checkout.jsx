import React                from 'react';
import Header               from './Header.jsx';
import Footer               from './Footer.jsx';
import { connect }          from "react-redux";
import { addProductToCart } from '../actions/actions';
import {Link, Redirect }    from 'react-router-dom'
import '../css/Checkout.css';

 
const mapStateToProps = state => {
return {  
          cartTotalSum: state.cartTotalSum,
          cart:         state.cart
       };
}
   
function mapDispatchToProps(dispatch) {
  return {
          addProductToCart: prod => dispatch(addProductToCart(prod))
        };
}


class ConnectedCheckout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
          addressDel:       '',
          addressDelValid:  false,
          cityDel:          '',
          cityDelValid:     false,
          cardHolder:       '',
          cardHolderValid:  false,
          cardNumber:       '',
          cardNumberValid:  false,
          expiryDate:       '',
          expiryDateValid:  false,
          cvvValid:         '',
          cvvValidValid:    false,
          processPayment:   false,
          paymentConfirmed: false,
       

    }
  }



handleAddressDel(e) {
    let addressVal       = e.target.value,
        // Check addressVal characters
      checkAddressVal    =  addressVal.split('').every(x => x.match(/[a-zA-Z0-9-. ]+/g)),
        // Check addressVal length to be at least 2
      checkAddressLength = addressVal.length >= 2,
       // Check for blank spaces
      checkWhiteSpaces   = addressVal.trim().length === addressVal.length;


    if(checkAddressVal && checkAddressLength && checkWhiteSpaces) {
        this.setState({addressDel: addressVal, addressDelValid: true})
    } else if(addressVal.length === 0) {
      // If input is empty, reset value input
        this.setState({addressDel: '', addressDelValid: false})
    } else {
        this.setState({checkoutName: addressVal, addressDelValid: false})
    }
}

handleCity(e) {
    let cityVal        = e.target.value,
        // Check city characters
      checkCityVal     =  cityVal.split('').every(x => x.match(/[a-zA-Z ]+/g)),
        // Check city length to be at least 2
      checkCityLength  = cityVal.length >= 2,
       // Check for blank spaces
      checkWhiteSpaces = cityVal.trim().length === cityVal.length;


    if(checkCityVal && checkCityLength && checkWhiteSpaces) {
        this.setState({cityDel: cityVal, cityDelValid: true})
    } else if(cityVal.length === 0) {
      // If input is empty, reset value input
        this.setState({cityDel: '', cityDelValid: false})
    } else {
        this.setState({checkoutName: cityVal, cityDelValid: false})
    }
}

handleCardHolder(e) {
    let cardHolder          = e.target.value,
        // Check cardHolder characters
      checkCardHolderVal    =  cardHolder.split('').every(x => x.match(/[a-zA-Z ]+/g)),
        // Check cardHolder length to be at least 5
      checkCardHolderLength = cardHolder.length >= 5,
       // Check for blank spaces
      checkWhiteSpaces      = cardHolder.trim().length === cardHolder.length;


    if(checkCardHolderVal && checkCardHolderLength && checkWhiteSpaces) {
        this.setState({cardHolder: cardHolder, cardHolderValid: true})
    } else if(cardHolder.length === 0) {
      // If input is empty, reset value input
        this.setState({cardHolder: '', cardHolderValid: false})
    } else {
        this.setState({checkoutName: cardHolder, cardHolderValid: false})
    }
}


handleCardNumber(e) {
  let cardNumber            = e.target.value,
        // Check card number characters
      checkCardNumber       =  cardNumber.split('').every(x => x.match(/[0-9]+/g)),
        // Check card number length to be equal with 16
      checkCardNumberLength = cardNumber.length === 16,
       // Check for blank spaces
      checkWhiteSpaces      = cardNumber.trim().length === cardNumber.length;


    if(checkCardNumber && checkCardNumberLength && checkWhiteSpaces) {
        this.setState({cardNumber: cardNumber, cardNumberValid: true})
      } else if(cardNumber.length === 0) {
      // If input is empty, reset value input / Set addressinfovalid to false to hide Payment section
        this.setState({cardNumber: '', cardNumberValid: false})
      } else {
        this.setState({cardNumber: cardNumber, cardNumberValid: false})
    }
}
handleExpiryDate(e) {
  let expiryDate            = e.target.value,
        // Check expiryDate characters
      checkExpiryDate       =  expiryDate.split('').every(x => x.match(/[0-9/]+/g)),
        // Check expiryDate length to be equal with 7
      checkExpiryDateLength = expiryDate.length === 7,
       // Check for blank spaces
      checkWhiteSpaces      = expiryDate.trim().length === expiryDate.length;


    if(checkExpiryDate && checkExpiryDateLength && checkWhiteSpaces) {
        this.setState({expiryDate: expiryDate, expiryDateValid: true})
      } else if(expiryDate.length === 0) {
      // If input is empty, reset value input / Set addressinfovalid to false to hide Payment section
        this.setState({expiryDate: '', expiryDateValid: false})
      } else {
        this.setState({expiryDate: expiryDate, expiryDateValid: false})
    }
}

handleCvv(e) {
  let cvv              = e.target.value,
        // Check cvv characters
      checkCvv         =  cvv.split('').every(x => x.match(/[0-9]+/g)),
        // Check cvv length to equal with 3 or 4
      checkCvvLength   = cvv.length === 3 || cvv.length === 4 ,
       // Check for blank spaces
      checkWhiteSpaces = cvv.trim().length === cvv.length;


    if(checkCvv && checkCvvLength && checkWhiteSpaces) {
        this.setState({cvv: cvv, cvvValid: true})
      } else if(cvv.length === 0) {
      // If input is empty, reset value input / Set addressinfovalid to false to hide Payment section
        this.setState({cvv: '', cvvValid: false})
      } else {
        this.setState({cvv: cvv, cvvValid: false})
    }
}



finishPayment() {
      // Define variables for all the span that are wrapping the inputs

  let invalidAddressTxt    = document.querySelector('.checkout_invalid_address'),
      inputWrapAddress     = document.querySelector('.in_checkout_txt_address'),

      invalidCityTxt       = document.querySelector('.checkout_invalid_city'),
      inputWrapCity        = document.querySelector('.in_checkout_txt_city'),

      invalidCardHolderTxt = document.querySelector('.checkout_invalid_cardholdername'),
      inputWrapCardHolder  = document.querySelector('.in_checkout_txt_cardholder'),

      invalidCardNumberTxt = document.querySelector('.checkout_invalid_cardnumber'),
      inputWrapCardNumber  = document.querySelector('.in_checkout_txt_cardnumber'),

      invalidExpiryDateTxt = document.querySelector('.checkout_invalid_expdate'),
      inputWrapExpiryDate  = document.querySelector('.in_checkout_txt_expdate'),

      invalidCvvTxt        = document.querySelector('.checkout_invalid_cvv'),
      inputWrapCvv         = document.querySelector('.in_checkout_txt_cvv');

  if(this.state.addressDelValid) {
    invalidAddressTxt.style.display = 'none';
    inputWrapAddress.removeAttribute('style');

    if(this.state.cityDelValid) {
        invalidCityTxt.style.display = 'none';
        inputWrapCity.removeAttribute('style');

        if(this.state.cardHolderValid) {
          invalidCardHolderTxt.style.display = 'none';
          inputWrapCardHolder.removeAttribute('style');

          if(this.state.cardNumberValid) {
             invalidCardNumberTxt.style.display = 'none';
             inputWrapCardNumber.removeAttribute('style');

             if(this.state.expiryDateValid) {
                invalidExpiryDateTxt.style.display = 'none';
                inputWrapExpiryDate.removeAttribute('style');

                if(this.state.cvvValid) {
                    invalidCvvTxt.style.display = 'none';
                    inputWrapCvv.removeAttribute('style');

                      this.finalizePayment();
                } else {
                    invalidCvvTxt.style.display = 'block';
                    inputWrapCvv.setAttribute('style', 'border-bottom:1px solid #EF3737');
                }
             } else {
                invalidExpiryDateTxt.style.display = 'block';
                inputWrapExpiryDate.setAttribute('style', 'border-bottom:1px solid #EF3737');
             }
          } else {
             invalidCardNumberTxt.style.display = 'block';
             inputWrapCardNumber.setAttribute('style', 'border-bottom:1px solid #EF3737');
          }
        } else {
          invalidCardHolderTxt.style.display = 'block';
          inputWrapCardHolder.setAttribute('style', 'border-bottom:1px solid #EF3737');
        }
    } else {
      invalidCityTxt.style.display = 'block';
      inputWrapCity.setAttribute('style', 'border-bottom:1px solid #EF3737');
    }
  } else {
    invalidAddressTxt.style.display = 'block';
    inputWrapAddress.setAttribute('style', 'border-bottom:1px solid #EF3737');
  }
}

finalizePayment() {
    // Display process payment loading
  this.setState({ processPayment: true })
    // Hide process payment loading / display payment confirmed modal
  setTimeout(() => {
    this.setState({ processPayment: false, paymentConfirmed: true })
  },2000);
}
 
clearCart() {
    // Clear cart props
  this.props.addProductToCart({ cart: [] })
}

  render() {
    // If there are no items inside the cart, redirect to the homepage
    if(!this.props.cart.length > 0) { 
      return <Redirect to='/'/>;
    } else {
    // Set document title
    document.title = 'Food Delivery - Checkout';
    }
    return (
      <div>
         <Header />
          <div className='row center'>
            <div className='hamb_container col s12'>
              <div className='row'>
                <div className='checkout_wrap col s12'>
                  <span className='hamb_slide_up_bord'></span>

                  <div className='row'>
                    <div className='page_nav_sec col s12'>
                      <Link to={process.env.PUBLIC_URL + '/checkout'}>Home</Link>
                      /
                      <span className='page_nav_path'>Checkout</span>
                    </div>
                  </div>

                  {/* Checkout cont img header button */}
                  <div className='row flexbox'>
                    <div className='checkout_wrap_cont_header'>
                      <div className='row flexbox'>
                          <span></span>
                          <span></span>
                          <span></span>
                      </div>
                    </div>
                  </div>
                  {/* Checkout inputs */} 
                  <div className='row flexbox'>
                    <div className='wrap_checkout_inputs'>
                    {this.state.processPayment && (
                      <div className='co_inputs_loading'>
                        <div className='row flexbox'>
                          <div className='co_in_loading'><div></div><div></div><div></div></div>
                        </div>
                      </div>
                    )}

                      <div className='row flexbox'>
                       <ul>
                        <li className='input_checkout_title'>Address to deliver</li>
                        <li className='in_checkout_txt_address input_checkout_txt_info'>
                          <input type='text' placeholder='Street address' onChange={(e) => this.handleAddressDel(e)}></input>
                        </li>
                        <li className='input_checkout_err_txt'>
                          <span className='checkout_invalid_address'>Invalid address</span>
                        </li>

                        <li className='input_checkout_title'>City</li>
                        <li className='in_checkout_txt_city input_checkout_txt_info'>
                          <input type='text' placeholder='City to deliver' onChange={(e) => this.handleCity(e)}></input>
                        </li>
                        <li className='input_checkout_err_txt'>
                          <span className='checkout_invalid_city'>Invalid city</span>
                        </li>

                        <li className='input_checkout_title'>Cardholder name</li>
                        <li className='in_checkout_txt_cardholder input_checkout_txt_info'>
                          <input type='text' placeholder='John Doe' onChange={(e) => this.handleCardHolder(e)}></input>
                        </li>
                        <li className='input_checkout_err_txt'>
                          <span className='checkout_invalid_cardholdername'>Invalid cardholder name</span>
                        </li>

                        <li className='input_checkout_title'>Card number</li>
                        <li className='in_checkout_txt_cardnumber input_checkout_txt_info'>
                          <input type='text' maxLength='16' placeholder='1234567890123456' onChange={(e) => this.handleCardNumber(e)}></input>
                        </li>
                        <li className='input_checkout_err_txt'>
                          <span className='checkout_invalid_cardnumber'>Invalid card number</span>
                        </li>
                        
                        <li className='co_wrap_exp_cvv'>
                          <span className='in_checkout_expdate_wrap left'>
                            <span className='input_checkout_title'>Expiry date</span>
                            <span className='in_checkout_txt_expdate inp_checkout_input_wrapp'>
                              <input type='text' placeholder='02/2020' maxLength='7' onChange={(e) => this.handleExpiryDate(e)}></input>
                            </span>
                            <span className='input_checkout_err_txt'>
                              <span className='checkout_invalid_expdate'>Invalid date</span>
                            </span>
                          </span>
                          <span className='in_checkout_cvv_wrap right'>
                            <span className='input_checkout_title'>CVV</span>
                            <span className='in_checkout_txt_cvv inp_checkout_input_wrapp'>
                              <input type='text' placeholder='1234' maxLength='4' onChange={(e) => this.handleCvv(e)}></input>
                            </span>
                            <span className='input_checkout_err_txt'>
                              <span className='checkout_invalid_cvv'>Invalid CVV</span>
                            </span>
                          </span>
                        </li>

                        <li className='co_pay_meth_title'>Payment methods</li>
                        <li><span className='co_paymethods_img'></span></li>
                       </ul>
                      </div>
                    </div>
                  </div>

                  {/* Pay button */}
                  <div className='row flexbox'>
                    <span className='checkout_pay_button' onClick={() => this.finishPayment()}>Pay ${this.props.cartTotalSum}</span>
                  </div>
                  <span className='h_slide_down_bord'></span>
                </div>
              </div>
              
              {this.state.paymentConfirmed && (
              <div className='row'>
                <div className='wrap_conf_cont'>
                  <div className='row flexbox'>
                    <div className='cont_payment_confirmed col s11 m8 l4'>
                      <div className='row flexbox'>
                        <ul>
                          <li>Thank you for your order!</li>
                          <li><img src={require('../images/checkout/order_conf_img.png')} alt=''/></li>
                          <li>We're on the way!</li>
                          <li>Estimated delivery time: <span>35-60 min</span></li>
                          <li>Order number: <span>456-2256f</span></li>
                          <li>
                            <Link to={process.env.PUBLIC_URL + '/'} onClick={() => this.clearCart()}>
                              Click here to go to the <span>homepage</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}

            </div>
          </div>
        <Footer/>
      </div>
      )
  }
}

const Checkout = connect(mapStateToProps,mapDispatchToProps)(ConnectedCheckout);
export default Checkout;
