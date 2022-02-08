import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import inventory from './inventory.ES6';
import ComposeSalad from './ComposeSalad';
import CartView from './CartView';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {cart: []};

    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(salad) {
    console.log('previous app state:' + JSON.stringify(this.state))
    this.setState(prevState => (
      { ...prevState
      , cart: prevState.cart.concat(salad)
      }
    ));
  }

  render() {
    return (
      <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>

      <ComposeSalad inventory={inventory} addToCart={this.addToCart}/>

      <CartView cart={this.state.cart}/>

      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
    );
  }
}

export default App;
