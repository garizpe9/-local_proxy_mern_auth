import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API from "../utils/API";

class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  };
  state={
    quoteOfDay:""
  };

  getQuote = query =>{
    API.getQOD(query)
    fetch(`http://quotes.rest/qod.json?category=inspire`)
    .then(res=>console.log("quote",res))
    .then(res => {
      this.setState({ quoteOfDay: res})
    })
  }
  componentDidMount() {
    this.getQuote();
  }




  logout(event) {
    event.preventDefault();
    console.log('logging out');
    axios
      .post('/api/user/logout')
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null,
          });
        }
      })
      .catch((error) => {
        console.log('Logout error');
      });
  }

 


  render() {
    const loggedIn = this.props.loggedIn;
    console.log('navbar render, props: ');
    console.log(this.props);

    return (
      <div>
        <header className='navbar App-header' id='nav-container'>
          <div className='col-4'>
            {loggedIn ? (
              <section className='navbar-section'>
                <Link
                  to='#'
                  className='btn btn-link text-secondary'
                  onClick={this.logout}
                >
                  <span className='text-secondary'>logout</span>
                </Link>
              </section>
            ) : (
              <section className='navbar-section'>
                <Link to='/home' className='btn btn-link text-secondary'>
                  <span className='text-secondary'>home</span>
                </Link>
                <Link to='/login' className='btn btn-link text-secondary'>
                  <span className='text-secondary'>login</span>
                </Link>
                <Link to='/signup' className='btn btn-link'>
                  <span className='text-secondary'>sign up</span>
                </Link>
              </section>
            )}
            
          </div>
          <div className='col-4 col-mr-auto'>
            <div id='top-filler'></div>
           
          </div>
        </header>
      </div>
    );
  }
}

export default Navbar;
