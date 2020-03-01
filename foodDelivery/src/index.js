import React 				from 'react';
import ReactDOM 			from 'react-dom';
import Home 				from './components/Home';
import Products 			from './components/Products';
import Cart 				from './components/Cart';
import Checkout 			from './components/Checkout';
import About    			from './components/About';
import Contact  			from './components/Contact';
import store  				from './store';
import { Provider } 		from 'react-redux';
import { BrowserRouter as 
		 Router, 
		 Route, 
		 Switch } 			from 'react-router-dom'; 


const routing = (
		
	<Provider store={store}>
		<Router>
			<Switch>
				 <Route exact path  = {process.env.PUBLIC_URL+'/'} 			 component = {Home}/>
				 <Route path 		= {process.env.PUBLIC_URL+'/hamburgers'} component = {Products}/>
				 <Route path 		= {process.env.PUBLIC_URL+'/salads'} 	 component = {Products}/>
				 <Route path 		= {process.env.PUBLIC_URL+'/beverages'}  component = {Products}/>
				 <Route path 		= {process.env.PUBLIC_URL+'/desserts'} 	 component = {Products}/>
				 <Route path 		= {process.env.PUBLIC_URL+'/cart'} 	     component = {Cart}/>
				 <Route path 		= {process.env.PUBLIC_URL+'/checkout'} 	 component = {Checkout}/>
				 <Route path 		= {process.env.PUBLIC_URL+'/about'} 	 component = {About}/>
				 <Route path 		= {process.env.PUBLIC_URL+'/contact'} 	 component = {Contact}/>
				 <Route path        = ""									 component = {Home}/>
			</Switch>
		</Router>
	</Provider>
	
 )

ReactDOM.render(<Router basename={process.env.PUBLIC_URL}>{routing}</Router>, document.getElementById('root'));
 
