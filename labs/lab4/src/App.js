import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes, NavLink } from "react-router-dom";
import inventory from './inventory.ES6';
import ComposeSaladWrapper from './ComposeSaladWrapper';
import CartView from './CartView';
import ViewIngredient from './ViewIngredient';
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
      <Header/>
      <Navbar/>
      {this.renderPageContent()}
      <Footer/>
      </div>
    );
  }

  renderPageContent(){ return(
      <Routes>
        <Route index element=<h2>Welcome</h2>/>
        <Route path='/compose-salad' element={<ComposeSaladWrapper inventory={inventory} addToCart={this.addToCart}/>}/>
        <Route path='/view-cart' element={<CartView cart={this.state.cart}/>}/>
        <Route path='/view-ingredient/:name' element={<ViewIngredient inventory={inventory}/>}/>
        <Route path='*' element=<h2>Page not found </h2>/>
      </Routes>
  )}
}


function Footer() { return (
  <footer className="pt-3 mt-4 text-muted border-top">
    EDAF90 - webprogrammering
  </footer>
)}

function Header() { return (
  <header className="pb-3 mb-4 border-bottom">
    <span className="fs-4">Min egen salladsbar</span>
  </header>
)}

function Navbar() { return (
  <ul className="nav nav-tabs">
    <NavLink className='nav-link' to="/">
      Homepage
    </NavLink>
    <li className="nav-item">
    <NavLink className="nav-link" to="/compose-salad">
        Komponera en sallad
    </NavLink>
    </li>
    <NavLink className='nav-link' to="/view-cart">
      Kolla din beställning
    </NavLink>
  </ul>
)}

export default App;
