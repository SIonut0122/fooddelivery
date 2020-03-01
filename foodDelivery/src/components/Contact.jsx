import React          from 'react';
import Header         from './Header.jsx';
import Footer         from './Footer.jsx';
import GoogleMapReact from 'google-map-react';
import {Link}         from 'react-router-dom'
import '../css/Contact.css';

 
class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
                    center:                   {lat: 51.50, lng: -0.11},
                    zoom:                     9,
                    contactName:              '',
                    contactNameValid:         false,
                    contactLastName:          '',
                    contactLastNameValid:     false,
                    contactEmailAddress:      '',
                    contactEmailAddressValid: false,
                    contactPhoneNumber:       '',
                    contactPhoneNumberValid:  false,
                    contactMessage:           '',
                    contactMessageValid:      false,
                    messageSent:              false

    }
  }

 
componentDidMount() {
    // Set nav container path name
  document.querySelector('.page_nav_path').innerHTML = 'Contact';
    // Set document title
  document.title = 'Food Delivery - Contact';
}

handleName(e) {
  let contactName      = e.target.value,
        // Check contactName characters
      checkContactName =  contactName.split('').every(x => x.match(/[a-zA-Z]+/g)),
        // Check contactName length to be at least 2
      checkNameLength  = contactName.length >= 2,
       // Check for blank spaces
      checkWhiteSpaces = contactName.trim().length === contactName.length;

    if(checkContactName && checkNameLength && checkWhiteSpaces) {
        this.setState({contactName: contactName, contactNameValid: true})
    } else if(contactName.length === 0) {
      // If input is empty, reset value input
        this.setState({contactName: '', contactNameValid: false})
    } else {
        this.setState({checkoutName: contactName, contactNameValid: false})
    }
}

handleLastName(e) {
  let contactLastName      = e.target.value,
        // Check lastName characters
      checkContactLastName =  contactLastName.split('').every(x => x.match(/[a-zA-Z]+/g)),
        // Check lastName length to be at least 2
      checkLastNameLength  = contactLastName.length >= 2,
       // Check for blank spaces
      checkWhiteSpaces     = contactLastName.trim().length === contactLastName.length;

    if(checkContactLastName && checkLastNameLength && checkWhiteSpaces) {
        this.setState({contactLastName: contactLastName, contactLastNameValid: true})
    } else if(contactLastName.length === 0) {
      // If input is empty, reset value input
        this.setState({contactLastName: '', contactLastNameValid: false})
    } else {
        this.setState({contactLastName: contactLastName, contactLastNameValid: false})
    }
}

handleEmailAddress(e) {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      emailValue = e.target.value;

      // If input mail match, setstate value
    if(emailValue.match(mailformat)) {
        this.setState({contactEmailAddress: emailValue, contactEmailAddressValid: true})
    } else if(emailValue.length === 0) {
      // If input is empty, reset value input
        this.setState({contactEmailAddress: '', contactEmailAddressValid: false})
    } else {
        this.setState({contactEmailAddress: '', contactEmailAddressValid: false})
    }
}

handlePhoneNumber(e) {
  let contactPhoneNumber     = e.target.value,
        // Check phone number characters
      checkPhoneNumber       =  contactPhoneNumber.split('').every(x => x.match(/[0-9+]+/g)),
        // Check phone number length to be at least 12
      checkPhoneNumberLength = contactPhoneNumber.length >= 12,
       // Check for blank spaces
      checkWhiteSpaces       = contactPhoneNumber.trim().length === contactPhoneNumber.length;

    if(checkPhoneNumber && checkPhoneNumberLength && checkWhiteSpaces) {
        this.setState({contactPhoneNumber: contactPhoneNumber, contactPhoneNumberValid: true})
      } else if(contactPhoneNumber.length === 0) {
        this.setState({contactPhoneNumber: '', contactPhoneNumberValid: false})
      } else {
        this.setState({contactPhoneNumber: contactPhoneNumber, contactPhoneNumberValid: false})
    }
}

handleMessage(e) {
  let message            = e.target.value,
        // Check message length to be at least 1
      checkMessageLength = message.length > 1,
       // Check for blank spaces
      checkWhiteSpaces   = message.trim().length === message.length;

    if(checkMessageLength && checkWhiteSpaces) {
        this.setState({contactMessage: message, contactMessageValid: true})
    } else if(message.length === 0) {
      // If input is empty, reset value input
        this.setState({contactMessage: '', contactMessageValid: false})
    } else {
        this.setState({contactMessage: message, contactMessageValid: false})
    }
}

submitMessage() {
  let nameWrap     = document.querySelector('.sp_name_wrap'),
      lastNameWrap = document.querySelector('.sp_lastname_wrap'),
      emailWrap    = document.querySelector('.sp_email_wrap'),
      phoneWrap    = document.querySelector('.sp_phone_wrap'),
      messageWrap  = document.querySelector('.sp_message_wrap');

      if(this.state.contactNameValid) {
        nameWrap.classList.remove('invalid_input');
        if(this.state.contactLastNameValid) {
          lastNameWrap.classList.remove('invalid_input');
          if(this.state.contactEmailAddressValid) {
             emailWrap.classList.remove('invalid_input');
             if(this.state.contactPhoneNumberValid) {
                phoneWrap.classList.remove('invalid_input');
                if(this.state.contactMessageValid) {
                  messageWrap.classList.remove('invalid_input');

                  setTimeout(() => {
                    this.sendMessage();
                  },1000);

                } else {
                  messageWrap.classList.add('invalid_input');
                }
             } else {
                phoneWrap.classList.add('invalid_input');
             }
          } else {
             emailWrap.classList.add('invalid_input');
          }
        } else {
          lastNameWrap.classList.add('invalid_input');
        }
      } else {
        nameWrap.classList.add('invalid_input');
      }
}

sendMessage() {
  let ctInputTxt   = document.querySelectorAll('.ct_input_txt'),
      submitButton = document.querySelector('.contact_submit_button');

      // Set attribute for all the input to disabled
    for(let i=0;i<ctInputTxt.length;i++) {
      ctInputTxt[i].setAttribute('disabled', 'true');
    }
      // Disable submit button
    submitButton.setAttribute('style', 'opacity:0.8;pointer-events:none');
    this.setState({ messageSent: true })
}

  render() {

    return (
      <div>
         <Header />
          <div className='row center'>
            <div className='contact_container col s12'>
              <div className='row center'>
                <div className='contact_wrap col s12'>
                  <span className='hamb_slide_up_bord'></span>
                  
                  {/* Container nav */}
                  <div className='row'>
                    <div className='page_nav_sec col s12'>
                      <Link to={process.env.PUBLIC_URL + '/'}>Home</Link>
                      /
                      <span className='page_nav_path'></span>
                    </div>
                  </div>

                  <div className='row flexbox'>
                    <div className='contact_wrap_sections col s12 l12'>
                      <div className='row'>
                        <div className='contact_sec_cont col s12 m12 l6'>
                          <div className='row flexbox'>
                            <div tabIndex='0' id='map' className='col l10'>
                              <GoogleMapReact
                                bootstrapURLKeys={{ key: 'AIzaSyAyThGTUr4MaS1l1Dk0aFOjzgUlb2nIoZw' }}
                                defaultCenter={this.state.center}
                                defaultZoom={this.state.zoom}>
                              </GoogleMapReact>
                            </div>
                          </div>
                        </div>
                        <div className='contact_sec_cont col s12 m12 l6'>
                          
                          <ul>
                            <li className='contact_food_del_title'>Contact food delivery</li>
                            <li className='contact_subtitle'>Call Food Delivery</li>
                            <li className='contact_subtitle_txt'>+62-567456-1222</li>
                            <li className='contact_subtitle'>Address</li>
                            <li className='contact_subtitle_txt'>265005 Street, 27B, UK</li>
                            <li className='contact_getintouch'>Get in touch</li>
                           
                            <li className='li_ctinpt_wrap col s12'>
                              <span className='col s12 m6 l6 ct_wrap_inp'>
                                <span className='ct_inp_title'>Name *</span>
                                <span className='ct_sp_input sp_name_wrap'>
                                  <input type='text' placeholder='Name' className='ct_input_txt' onChange={(e) => this.handleName(e)}></input>
                                </span>
                              </span>
                               
                               <span className='col s12 m6 l6 ct_wrap_inp'>
                                <span className='ct_inp_title'>Last Name *</span>
                                <span className='ct_sp_input sp_lastname_wrap'>
                                  <input type='text' placeholder='Last Name' className='ct_input_txt' onChange={(e) => this.handleLastName(e)}></input>
                                </span>
                              </span>
                            </li>

                            <li className='li_ctinpt_wrap col s12'>
                              <span className='col s12 m6 l6 ct_wrap_inp'>
                                <span className='ct_inp_title'>Email address *</span>
                                <span className='ct_sp_input sp_email_wrap'>
                                  <input type='text' placeholder='Email address' className='ct_input_txt' onChange={(e) => this.handleEmailAddress(e)}></input>
                                </span>
                              </span>
                               
                               <span className='col s12 m6 l6 ct_wrap_inp'>
                                <span className='ct_inp_title'>Phone number</span>
                                <span className='ct_sp_input sp_phone_wrap'>
                                  <input type='text' placeholder='Phone number' className='ct_input_txt' onChange={(e) => this.handlePhoneNumber(e)}></input>
                                </span>
                              </span>
                            </li>
                             
                            <li>
                              <span className='contact_input_title'>Message</span>
                            </li>
                            <li>
                              <span className='contact_input_msg col s12 m6 l6 sp_message_wrap'>
                                <textarea placeholder='Your text here...' className='ct_input_txt' onChange={(e) => this.handleMessage(e)}></textarea>
                              </span>
                            </li>
                          </ul>
                          
                          <span className='contact_submit_button' onClick={() => this.submitMessage()}>Submit message</span>
                          {this.state.messageSent && (
                          <span className='msg_sent_conf'>Your message has been sent. Thank you!</span>
                          )}
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

export default Contact;
