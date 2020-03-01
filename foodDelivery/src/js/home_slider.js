const home_sliders = [
					{	
						"id": 1,
						"image": require('../images/home/juice.png'),
						"idName": "hcitem_juice",
						"linkTo": process.env.PUBLIC_URL + '/beverages'
					},
										{	
						"id": 2,
						"image": require('../images/home/hamb.png'),
						"idName": "hcitem_hamb",
						"linkTo": process.env.PUBLIC_URL + '/hamburgers'
					},
										{	
						"id": 3,
						"image": require('../images/home/salad.png'),
						"idName": "hcitem_salad",
						"linkTo": process.env.PUBLIC_URL + '/salads'
					},
										{	
						"id": 4,
						"image": require('../images/home/cheesecake.png'),
						"idName": "hcitem_cake",
						"linkTo": process.env.PUBLIC_URL + '/desserts'
					},
				]

export default home_sliders;