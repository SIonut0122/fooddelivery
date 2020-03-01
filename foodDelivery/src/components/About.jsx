import React    from 'react';
import Header   from './Header.jsx';
import Footer   from './Footer.jsx';
import { BrowserRouter as 
         Router, 
         Link } from 'react-router-dom'
import '../css/About.css';



class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

 
componentDidMount() {
    // Set nav container path name
  document.querySelector('.page_nav_path').innerHTML = 'About us';
    // Set document title
  document.title = 'Food Delivery - About us';
    // Add eventlistener to handlescroll action to animate images
  window.addEventListener('scroll', this.handleScroll);
}

componentWillUnmount() {
  window.removeEventListener('scroll', this.handleScroll);
}

handleScroll() {
  let firstAboutImage  = document.querySelector('.ab_secone_img'),
      secondAboutImage = document.querySelector('.ab_sectwo_img');

      // Animate images on scroll
  if(window.pageYOffset > 80) {
      firstAboutImage.setAttribute('style','left:0;opacity:1');
  }
  if(window.pageYOffset > 500) {
      secondAboutImage.setAttribute('style','right:0;opacity:1');
  }

}

  render() {
    return (
      <div>
         <Header />
          <div className='row center'>
            <div className='about_container col s12'>
              <div className='row center'>
                <div className='about_wrap col s12'>
                  <span className='hamb_slide_up_bord'></span>
                  
                  {/* Container nav */}
                  <div className='row'>
                    <div className='page_nav_sec col s12'>
                      <Link to={process.env.PUBLIC_URL + '/'}>Home</Link>
                      /
                      <span className='page_nav_path'></span>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='about_wrap_sections col s12'>
                      <div className='row'>
                        <div className='about_sect_one about_secone_img col s12 l6'>
                          <div className='row flexbox'>
                            <span className='ab_secone_img'></span>
                          </div>
                        </div>

                        <div className='about_sect_one col s12 l6'>
                          <div className='row'>
                            <ul>
                              <li>About us</li>
                              <li>What began as a small hamburger restaurant in London, continues to soar to great heights. 
                              Today there are more than 1,250 restaurants open across the United States, Mexico, Colombia, Panama, Singapore, Indonesia, 
                              Malaysia, UK and the United Arab Emirates.</li>
                              <li>Food Delivery<span>&trade;</span> quickly became a fan favorite when we first opened our doors in 1994. Our proprietary recipes, outstanding food 
                              and superior customer service created a demand that could only be satisfied by more locations.
                              </li>
                            </ul>
                          </div>  
                        </div>
                      </div>
                      
                      {/* Second section */}
                      <div className='row flexbox sec_two'>
                        <div className='about_sect_two col s12 l6'>
                          <ul>
                            <li>Over 20 Years of Flavor</li>
                            <li>Since setting up shop in '94, we've been putting flavor first. And we're not about to stop. We're all about taking our food to 
                                another level, saucing and tossing the freshest flavors you crave along the way.
                            </li>
                          </ul> 
                        </div>
                        <div className='about_sect_two about_sectwo_img col s12 l6'>
                          <div className='row flexbox'>
                            <span className='ab_sectwo_img'></span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Third section */}
                      <div className='row flexbox'>
                        <div className='about_sect_three col s12 l10'>
                          <ul>
                            <li>Our Mission: To Serve the World Flavor</li>
                            <li>We're not only in the food business. We're also in the flavor business. It's been our mission to serve the world flavor since we first opened shop in '94, and we're just getting started.</li>
                            <br />
                            <li>1997 saw the opening of our first Food Delivery<span>&trade;</span> location, and by 2002 we had served the world one billion products. It's flavor that defines us and has made Food Delivery<span>&trade;</span> one of the fastest growing brands in the restaurant industry.</li>
                            <br />
                            <li>Food Delivery<span>&trade;</span> is the destination when you crave fresh never faked hamburgers, hand-cut seasoned fries and any of our famous sides. For people who demand flavor in everything they do, there's only FD<span>&trade;</span> - because it's more than a meal, it's a flavor experience.</li>
                          </ul> 
                        </div>
                      </div>
                    </div>
                  </div>

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

export default About;
