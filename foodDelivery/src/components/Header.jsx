import React       from 'react';
import {Link}      from 'react-router-dom'
import { connect } from "react-redux";
import '../css/Header.css';


const mapStateToProps = state => {
  return {  cart: state.cart };    
}
   


class ConnectedHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

componentDidMount() {

    document.addEventListener('scroll',function() {
      if(window.pageYOffset > 80) {
        document.querySelector('.header_navmenu').classList.add('header_active');
        document.querySelector('.h_nav_logo').classList.add('h_nav_logo_active');
          // Change nav logo font size on scroll
        document.querySelector('.h_fo_l').setAttribute('style', 'font-size:24px');
        document.querySelector('.h_fo_l_two').setAttribute('style', 'font-size:24px');
        document.querySelector('.h_fo_l_del').setAttribute('style', 'font-size:25px');
      } else {
        document.querySelector('.header_navmenu').classList.remove('header_active');
        document.querySelector('.h_nav_logo').classList.remove('h_nav_logo_active');
          // Restore default style logo
        document.querySelector('.h_fo_l').removeAttribute('style');
        document.querySelector('.h_fo_l_two').removeAttribute('style');
        document.querySelector('.h_fo_l_del').removeAttribute('style');
      }
    })

    // Highlight navigation button according to the url path (home,about,contact)
    let navB     = document.querySelectorAll('.nav_sp_menu'),
        url      = window.location.pathname,
        str      = url.split('/'), // Split url pathname
        urlPath  = str.pop() || str.pop(); // Get last id pathname

    // Remove all nav menu highlights
    for(let i=0; i<navB.length; i++) {
      navB[i].classList.remove('nav_active');
    }
    // Highlight nav menu
     switch(urlPath) {
      case 'about':
      document.querySelector('.nav_sp_about').classList.add('nav_active');
      break;
      case 'contact':
      document.querySelector('.nav_sp_contact').classList.add('nav_active');
      break;
      default:
      document.querySelector('.nav_sp_home').classList.add('nav_active');
     }

    // Scroll when page loads
    window.scrollTo(0,0);
    // Add event click listener for hamburger menu
    document.getElementById('nav_hamb').addEventListener('click', this.handleOpenHamb);
    
    window.addEventListener('resize', this.handleResize);
}


handleOpenHamb() {
  let nav_hamb        = document.getElementById('nav_hamb'),
      nav_mobile_menu = document.querySelector('.mobile_slide_menu');
        // Open / close hamb menu on mobile size
      nav_hamb.classList.toggle('open');
      nav_mobile_menu.classList.toggle('mobile_slide_menu_active');
}

handleResize() {
  let navHambMenu   = document.getElementById('nav_hamb'),
      navMobileMenu = document.querySelector('.mobile_slide_menu');
        // Hide mobile menu when innerWidth > 601 on manual resize
  if(window.innerWidth > 601.5) {
      if(navHambMenu.classList.contains('open') && navMobileMenu.classList.contains('mobile_slide_menu_active')) {
        navHambMenu.classList.remove('open');
        navMobileMenu.classList.remove('mobile_slide_menu_active');
      }
  } 
}


  render() {
    return (
      <div>
        <div className='col s12 header_container'>
          <div className='row'>
            <div className='header_navmenu col s12'> 

              {/* Mobile menu */}
              <div className='row'>
                <div className='mobile_slide_menu'>                 
                  <div className='row flexbox'>
                    <ul>
                        <Link to={process.env.PUBLIC_URL + '/'}>
                          <li>Home</li>
                         </Link>
                        <Link to={process.env.PUBLIC_URL + '/about'}>
                          <li>About</li>
                        </Link>
                        <Link to={process.env.PUBLIC_URL + '/contact'}>
                          <li>Contact</li>
                        </Link>
                        <li className='mob_menu_social'>
                          <img src={require('../images/footer/social/fb.png')}       alt=''></img>
                          <img src={require('../images/footer/social/youtube.png')}  alt=''></img>
                          <img src={require('../images/footer/social/linkedin.png')} alt=''></img>
                          <img src={require('../images/footer/social/twitter.png')}  alt=''></img>
                        </li>
                      </ul>
                    </div>
                </div>
              </div>

              <div className='row'>
                <div className='head_nav_sect h_nav_link col s12 m4'>
          
                  <Link to={process.env.PUBLIC_URL + '/'}>
                    <span className='nav_sp_menu nav_sp_home'>Home</span>
                  </Link>
                  <Link to={process.env.PUBLIC_URL + '/about'}>
                    <span className='nav_sp_menu nav_sp_about'>About</span>
                  </Link>
                  <Link to={process.env.PUBLIC_URL + '/contact'}>
                    <span className='nav_sp_menu nav_sp_contact'>Contact</span>
                  </Link>
              
                </div>
                <div className='head_nav_sect h_nav_logo col s6 m4'>
                  <div className='row center'>
                   <Link to={process.env.PUBLIC_URL + '/'}>
                      <span className='h_fo_l'>FO</span>
                      <span className='h_fo_l_img'></span>
                      <span className='h_fo_l h_fo_l_two'>D</span>
                    </Link>
                  </div>
                  <div className='row center'>
                    <Link to={process.env.PUBLIC_URL + '/'}>
                      <span className='h_fo_l_del'>Delivery</span>
                    </Link>
                  </div>
                </div>
                <div className='head_nav_sect  head_sec_phone col s5 m4'>
                  <div className='row flexbox'>
                    <div className='h_nav_phone'>
                      <span></span>
                      <span>Order: 0765-006-565</span>
                    </div>
                  </div>
                  <div className='row flexbox'>
                    <div className='head_wrap_cart'>
                      <div className='row'>
                         <Link to={process.env.PUBLIC_URL + '/cart'}>
                          <span className='right head_cart_icon' alt='Your cart' title='Your cart'></span>
                          {this.props.cart.length > 0 && (
                            <span className='head_cart_no'>{this.props.cart.length}</span>
                          )}
                        </Link>
                        <div id='nav_hamb'>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div> 
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        
          <div className='row'>
            <span className='header_img col s12'>
              <span className='h_img_up col s12'></span>
              <span className='h_img_down col s12'></span>
            </span>
          </div>
          
          <div className='row flexbox'>
            <span className='h_leaf_f_row'>
              <span></span>
            </span>
            <span className='h_leaf_f_row_two'>
              <span></span>
            </span>
          </div>

          <div className='row flexbox'>
            <div className='head_img_wrap_txt col s12 l12 lg12'>
               <span>Delicious food delivered in time</span>
               <span>Food delivery to your door.</span>
               <span>Enjoy your meal in your home or office.</span>
            </div>
          </div>
          <div className='row flexbox'>
            <span className='h_leaf_single'></span>
          </div>
        </div>
      </div>
      )
  }
}

const Header = connect(mapStateToProps,null)(ConnectedHeader);
export default Header;
