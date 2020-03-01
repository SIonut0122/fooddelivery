import React  from 'react';
import {Link} from 'react-router-dom'
import '../css/Footer.css';


class Footer extends React.Component {
  constructor() {
    super()

    this.state = {}
  }




  render() {
    return (
      <div>
        <div className='col s12 footer_container'>
          <span className='footer_bg'></span>
          <div className='row'>
            <div className='f_wrap_footer col s12'>
              <div className='row'>
                <div className='f_footer_sect col s12 l6 flexbox'>
                  <div className='row'>
                    <div className='f_footer_sect_one col s6 flexbox'>
                     <div className='row'>
                       <div className='footer_nav_logo col s12'>
                        <div className='row center'>
                          <span className='h_fo_l'>FO</span>
                          <span className='h_fo_l_img'></span>
                          <span className='h_fo_l'>D</span>
                        </div>
                        <div className='row center'>
                          <span className='h_fo_l_del'>Delivery</span>
                        </div>
                      </div>
                     </div>
                    </div>
                    <div className='f_footer_sect_one f_foot_secone_two col s6'>
                      <ul>
                        <li>Contact</li>
                        <li>265005 Street, 27B, UK</li>
                        <li>0765-006-565</li>
                        <li>order@hamdeliver.com</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='f_footer_sect col s12 l6'>
                  <div className='row'>
                    <div className='f_footer_sect_two f_foot_sectwo_one col s6 l6'>
                      <ul>
                        <li>Menu</li>
                        <li>
                          <Link to={process.env.PUBLIC_URL + '/'}>
                            <span>Home</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={process.env.PUBLIC_URL + '/about'}>
                            <span>About</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={process.env.PUBLIC_URL + '/contact'}>
                            <span>Contact</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className='f_footer_sect_two f_foot_sectwo_two col s6 l6 flexbox'>
                      <span>Follow us</span>
                      <div className='f_sec_two_social flexbox'>
                        <img src={require('../images/footer/social/fb.png')} alt=''></img>
                        <img src={require('../images/footer/social/youtube.png')} alt=''></img>
                        <img src={require('../images/footer/social/linkedin.png')} alt=''></img>
                        <img src={require('../images/footer/social/twitter.png')} alt=''></img>

                      </div>    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <span className='footer_credits_txt col s12'>@2020 - ionutdev.com</span>
          </div>
        </div>
      </div>
      )
  }
}

export default Footer;
