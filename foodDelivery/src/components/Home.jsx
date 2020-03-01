import React       from 'react';
import M           from 'materialize-css';
import WheelReact  from 'wheel-react';
import Header      from './Header.jsx';
import Footer      from './Footer.jsx';
import homeSliders from '../js/home_slider.js';
import {Link}      from 'react-router-dom';
import '../css/Home.css';

class Home extends React.Component {
  constructor() {
    super()

    this.state = {}
  }


componentDidMount() {
    let elems       = document.querySelectorAll('.carousel');
    M.Carousel.init(elems, {shift: 100, duration: 100, onCycleTo: (e) => this.carSlide(e)});

    // Set document title
    document.title = 'Food Delivery - Home';
}
carSlide(e) {
 let slideTitle,
     productTitle = document.querySelector('.h_slider_title');
     // Check product id name and set the product title
 switch(e.id) {
  case 'hcitem_juice':
  slideTitle = 'Beverages';
  break;
  case 'hcitem_hamb':
  slideTitle = 'Hamburgers';
  break;
  case 'hcitem_salad':
  slideTitle = 'Healthy Salads';
  break;
  case 'hcitem_cake':
  slideTitle = 'Desserts';
  break;
  default:
  return false;
 }
  // Set product innerHTML title
  productTitle.innerHTML = slideTitle;
  // Animate product title
  productTitle.style.left = '-25px';
    setTimeout(() => {
  productTitle.style.left = '45px';
    },200);
    setTimeout(() => {
  productTitle.style.left = '0px';
    },400); 
}


handleWheel(e) {
  e.preventDefault();
  let elems    = document.querySelector('.carousel'),
      instance = M.Carousel.getInstance(elems);
      
    // Slide right / left carousel
  WheelReact.config({
    up: () => {
      instance.next();
    },
    down: () => {
      instance.prev();
    }
  });
}


  render() {
    return (
      <div>
       <Header />

       <div className='row center'>
        <div className='wrap_home_container col s12'>
          <div className='row'>
            <span className='h_explore_title col s12'>Explore our products</span>
          </div>  
          <div className='row flexbox'>
            <span className='h_mouse_wheel'>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div className='row center'>
            <div className='h_wrap_slider col s12' {...WheelReact.events}>
              <span className='h_slide_up_bord'></span>
              <img className='img_bg_mini_hmb' src={require('../images/home/hamb_mini_bg_icon.png')} alt=''/>
              
              <div className="carousel" onWheel={(e) => this.handleWheel(e)}>
              {homeSliders.map((prod,ind) => 
                <Link to={prod.linkTo} key={ind} className='carousel-item h_c_item' id={prod.idName} draggable='false'>
                  <img src={prod.image} alt=''/>   
                </Link>
              )}
              </div>
              
              <div className='row center'>
                <span className='h_slider_title'></span>
              </div>

              <span className='h_slide_down_bord'></span>
            </div>
          </div>  
        </div>
        
        <div className='row'>
          <div className='h_wrap_descr col s12'>
            <div className='row'>
              <span className='h_descr_box col s12 m4 l4 flexbox'>
                <span className='h_descr_f_box flexbox'>
                  <span className='h_descr_title'>Wide Range Of Meals</span>
                  <img src={require('../images/home/descr_meal.png')}/>
                  <span className='hdescr_boxtxt'>
                    We have created over 300 delicious meals and desserts, 
                    including gluten free and vegetarian options.
                  </span>
                </span>
              </span>
              <span className='h_descr_box col s12 m4 l4 flexbox'>
                <span className='h_descr_f_box flexbox'>
                  <span className='h_descr_title'>Free Home Delivery</span>
                  <img src={require('../images/home/descr_deliver.png')}/>
                  <span className='hdescr_boxtxt'>
                    We deliver free of charge throughout entire country. 
                    Our meals are delivered direct to your door by drivers local to you.
                  </span>
                </span>
              </span>
              <span className='h_descr_box col s12 m4 l4 flexbox'>
                <span className='h_descr_f_box flexbox'>
                  <span className='h_descr_title'>Quality Ingredients</span>
                  <img src={require('../images/home/descr_quality.png')}/>
                  <span className='hdescr_boxtxt'>
                    We use fresh, quality ingredients in all our meals and cook them 
                    just like you do at home - they are nutritionally balanced too.
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>

       </div>
        <Footer/>
      </div>
      )
  }
}

export default Home;
