import React                from 'react';
import M                    from 'materialize-css';
import WheelReact           from 'wheel-react';
import Header               from './Header.jsx';
import Footer               from './Footer.jsx';
import hambSliders          from '../js/hamb_slider.js';
import saladSlider          from '../js/salad_slider.js';
import beveragesSlider      from '../js/beverages_slider.js';
import dessertsSlider       from '../js/dessert_slider.js';
import { connect }          from "react-redux";
import { addProductToCart } from '../actions/actions';
import {Link}               from 'react-router-dom'
import '../css/Products.css';
 
 


const mapStateToProps = state => {
return {  cart: state.cart };
}
   

function mapDispatchToProps(dispatch) {
  return {
          addProductToCart: prod => dispatch(addProductToCart(prod))
         };
}



class ConnectedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
          sliderProducts: hambSliders,
          product:        [],
          seeProductInfo: false,
          ingredients:    [],
          pieces:         1,
          piecesValid:    true

    }
  }

 

componentDidMount() {

  let elems    = document.querySelectorAll('.carousel'),
      url      = window.location.pathname,
      str      = url.split('/'), // Split url pathname
      urlPath  = str.pop() || str.pop(); // Get last id pathname
      // Initiate carousel
      M.Carousel.init(elems, {shift: 150, duration: 200, onCycleTo: () => this.carSlide()});

        // Check last string pathname url and set the slider according to the string name
      if(urlPath === 'salads') {
        this.setState({ sliderProducts: saladSlider})
        document.querySelector('.page_nav_path').innerHTML = 'Salads';
      }
        if(urlPath === 'hamburgers') {
        this.setState({ sliderProducts: hambSliders})
        document.querySelector('.page_nav_path').innerHTML = 'Hamburgers';
      }
      if(urlPath === 'beverages') {
        this.setState({ sliderProducts: beveragesSlider })
        document.querySelector('.page_nav_path').innerHTML = 'Beverages';
      }
      if(urlPath === 'desserts') {
        this.setState({ sliderProducts: dessertsSlider })
        document.querySelector('.page_nav_path').innerHTML = 'Desserts';
      }
}

carSlide() {
    // If 'Info product slide' is displayed, hide it with transitions
  if(this.state.seeProductInfo) {
   document.querySelector('.wrap_hamb_info').setAttribute('style', 'margin:0;max-height:0;opacity:0;'); 
  }
  setTimeout(() => {  
    this.setState({ seeProductInfo: false })
   },400);
}

seeProductInfo(prod) {
  this.setState({ product: prod, seeProductInfo: true, ingredients: prod.ingredients })

  setTimeout(() => {
      // If document contains 'Info product slide' , display it with transitions
    if(document.contains(document.querySelector('.wrap_hamb_info'))) {
      document.querySelector('.wrap_hamb_info').setAttribute('style', 'max-height:800px;border:1px solid #CCCCCC;margin:20px;opacity:1;');
    }
   },400);
}

handleQuantityInput(e) {
  let pieces                = e.target.value,
        // Check pieces characters
      checkCvv              =  pieces.split('').every(x => x.match(/[0-9]+/g)),
      checkWhiteSpaces      = pieces.trim().length === pieces.length;
    
    // If pieces value match with requirements, set state
  if(checkCvv && checkWhiteSpaces && pieces !== '0') {
      this.setState({pieces: pieces, piecesValid: true})
    } else if(pieces.length === 0) {
    // If input is empty, reset value input / Set addressinfovalid to false to hide Payment section
      this.setState({pieces: 1, piecesValid: false})
    } else {
      this.setState({pieces: pieces, piecesValid: false})
  }
}
addToCart() {
  let cart              = [...this.props.cart],
      product           = this.state.product,
      inputProductBox   = document.querySelector('.w_hinfoinput_addcart'),
      addToCartButton   = document.querySelector('.w_hamb_addtocart_butt'),
      addedToCartButton = document.querySelector('.w_hamb_addedbutton');

    // If pieces input contains a valid value, proceed
  if(this.state.piecesValid) {
    // If product already exists inside cart, remove it and replace it
   let newCart = cart.filter(prod => prod.id !== product.id);
        // Set new pieces propriety
       product.pieces = this.state.pieces;
        // Multiply pieces with original price and set new totalprice propriety
       product.totalPrice = parseFloat(product.price) * parseFloat(this.state.pieces);
        // Push product with new prop added
       newCart.push(product);
        // Animate 'Add to cart' button after product was added to cart
       addedToCartButton.setAttribute('style','width:100%;opacity:1');
        // Disable pointer events from 'Add to cart' button
       addToCartButton.setAttribute('style', 'pointer-events: none');
       setTimeout(() => {
        addedToCartButton.removeAttribute('style');
        addToCartButton.removeAttribute('style');
       },2000);
       // If pieces input box contains 'Error style', reset to default
       inputProductBox.removeAttribute('style');

       this.props.addProductToCart({ cart: newCart })

  } else {
        // If pieces input does not contain a valid value, set 'Error style'
       inputProductBox.setAttribute('style', 'border: 1px solid red');
  }
}

closeHambInfo() {
  this.carSlide();
}
  render() {

    return (
      <div>
         <Header />
          <div className='row center'>
            <div className='hamb_container col s12'>
              <div className='row center'>
                <div className='hamb_wrap_slider col s12'>
                  <span className='hamb_slide_up_bord'></span>
                  
                  <div className='row'>
                    <div className='page_nav_sec col s12'>
                      <Link to={process.env.PUBLIC_URL + '/'}>Home</Link>
                      /
                      <span className='page_nav_path'></span>
                    </div>
                  </div>
                  <div className="carousel hamb_carousel">
                  {this.state.sliderProducts.length > 0 && (
                      <div>
                  {this.state.sliderProducts.map((prod,ind) => 
                    <div className='carousel-item hamb_c_item' key={ind}> 
                      <img className={prod.classNames} id={prod.idName} draggable='false' src={prod.image} onClick={(e) => this.seeProductInfo(prod)}/>  
                      <div className='row flexbox'>
                        <span className='s_prod_title'>{prod.title}</span> 
                      </div>               
                    </div>
                  )}
                    </div>
                    )}
                  </div>

                  <span className='h_slide_down_bord'></span>
                
                {this.state.seeProductInfo && (
                  
                  <div className='row flexbox'>
                    <div className='wrap_hamb_info'>
                       <span className='wrap_hamb_close' onClick={() => this.closeHambInfo()}>&times;</span>
                      <div className='row'>
                        <div className='s_prod_cal_price'>
                          <span className='s_prod_cal'>{this.state.product.cal}</span>
                          <span className='s_prod_price'>${this.state.product.price}</span>
                        </div>
                      </div>
                      <div className='row flexbox'>
                        <span className='s_prod_ingred'>Ingredients</span>
                      </div>
                      <div className='row'>
                      {this.state.ingredients.map((prod,ind) =>
                   
                          <span key={ind} className='w_hinfo_ingredients'>
                            <img src={prod.img} alt=''></img>
                            <span>{prod.name}</span>
                            <span className='w_hinfo_pieces'>{prod.pieces}</span>
                          </span>
                        )}
                      </div>
                      <div className='row flexbox'>
                        <div className='w_hinfo_addcart'>
                          <div className='row'>
                          <div className='w_hinfoinput_addcart'>
                              <input className='w_hinfoinput_txt' type='text' maxLength='2' placeholder='1' readOnly={false} onChange={(e) => this.handleQuantityInput(e)}></input>
                          </div> 
                          <div className='w_hamb_addtocart_butt' 
                               onClick={() => this.addToCart()}>
                               Add to cart
                               <span className='w_hamb_addedbutton'>Added to cart</span>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                
                  )}
             
              </div>
              </div>
            </div>
          </div>
        <Footer/>
      </div>
      )
  }
}

const Products = connect(mapStateToProps,mapDispatchToProps)(ConnectedProducts);
export default Products;
