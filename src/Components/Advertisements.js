import React, {Component} from 'react'
import { Button, Card, NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Advertisements extends Component{

    constructor(props){
        super(props)
        this.state={
            advertisements:[{
                title: 'Egypt',
                heading: 'Book wiyh us now and rome the pyramids of Egypt!',
                imageUrl: 'images/pyramid.jpg',
                imageText: 'Visit the Great Pyramids of Giza, the Great Sphinx, the Egyptian Museum, Sakkara, and Dahshur',
                websiteLink: 'https://www.expedia.com/'
            },
            {
                title: 'Switzerland',
                heading: 'Experinece the heaven on Earth!',
                imageUrl: 'images/snow.jpg',
                imageText: 'Let\'s plan a perfect snowy get away with your loved ones! Visit us for more details.',
                websiteLink: 'https://www.myswitzerland.com/en-us/'
            },
            {
                title: 'Lufthansa',
                heading: 'Book more flexibly now and fly with no worries!',
                imageUrl: 'images/plane.jpg',
                imageText: 'Providing finest air travel for international and domestic travels!',
                websiteLink: 'https://www.lufthansa.com/us/en/homepage'
            },
            {
                title: 'Relaxation hub',
                heading: 'Join Relaxation and Meditation hub to feel better! ',
                imageUrl: 'images/relaxation.jpg',
                imageText: 'Find a card that is for you!',
                websiteLink: 'https://www.americanexpress.com/'
            },
            {
                title: 'Paris!',
                heading: 'Jaime Paris',
                imageUrl: 'images/paris.jpg',
                imageText: 'Experience the city of Love! Plan a trip now and get 50% off! Limited Time Offer',
                websiteLink: 'https://www.eiffeltowerrestaurant.com/'
            },
            {
                title: 'Puerto Rico',
                heading: 'Travel to the finest islands of States',
                imageUrl: 'images/puertorico.jpg',
                imageText: 'Visit the islands - A perfect weekend getaway!',
                websiteLink: 'https://www.discoverpuertorico.com/article/best-resorts-puerto-rico'
            },
            {
                title: 'Central Perk',
                heading: 'The One In The New York City',
                imageUrl: 'images/centralperk.jpg',
                imageText: 'Experience the FRIENDS cafe. We arent just clean, we are Monica Clean!',
                websiteLink: 'https://www.friendstheexperience.com/new-york/central-perk/'
            },
            {
                title: 'Boston Freedom Trail',
                heading: 'Every Stept unfolds a new story',
                imageUrl: 'images/boston.jpg',
                imageText: 'Take a tour of a city filled with rich heritage! Walk along Boston and discover the path that unfolds..!',
                websiteLink: 'https://www.thefreedomtrail.org/'
            },
        ],
            value: Math.floor(Math.random()*8),
        }
    }


    render(){
        return(
            <Card className='adv-main' >
              <Card.Body>
                <Card.Title className="adv-title">{this.state.advertisements[this.state.value].title}</Card.Title>
                <Card.Text className="adv-heading">
                  {this.state.advertisements[this.state.value].heading}
                </Card.Text>
                <Card.Img variant="top" src={this.state.advertisements[this.state.value].imageUrl} />
                <a className='adv-link' target='_blank' href={this.state.advertisements[this.state.value].websiteLink}>{this.state.advertisements[this.state.value].imageText}</a>
              </Card.Body>
            </Card>
        )
    }
}

export default Advertisements