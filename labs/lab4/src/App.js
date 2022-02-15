import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes, NavLink } from "react-router-dom";
import ComposeSaladWrapper from './ComposeSaladWrapper';
import CartView from './CartView';
import ViewIngredient from './ViewIngredient';
import { Component } from 'react';
import Salad from './Salad';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {cart: this.getCartStorage(), inventory: {}};

    this.addToCart = this.addToCart.bind(this);
    this.clearCart = this.clearCart.bind(this);
  }

  componentDidMount(){
    this.fetchInventory()
  }

  addToCart(salad) {
    window.localStorage.setItem('cart', JSON.stringify(this.state.cart.concat(salad)));
    this.setState(prevState => (
      { ...prevState
      , cart: prevState.cart.concat(salad)
      }
    ));
  }
  clearCart() {
    window.localStorage.setItem('cart', JSON.stringify([]));
    this.setState(prevState => (
      { ...prevState
      , cart: []
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
        <Route path='/compose-salad' element={<ComposeSaladWrapper inventory={this.state.inventory} addToCart={this.addToCart} />}/>
        <Route path='/view-cart' element={<CartView cart={this.state.cart} clearCart={this.clearCart}/>}/>
        <Route path='/view-ingredient/:name' element={<ViewIngredient inventory={this.state.inventory}/>}/>
        <Route path='*' element=<h2>Page not found </h2>/>
      </Routes>
  )}

  fetchInventory() {
    const promises = ["foundations", "proteins", "extras", "dressings"]
      .map(type =>
        fetchIngredientList(type)
          .then(ingredients =>
            ingredients.map(name =>
              fetchIngredient(type, name)
          ))
          .then(promises => Promise.all(promises)
          )
      );
    Promise.all(promises)
      .then(ingredients =>
        this.updateInventory(Object.assign({}, ...ingredients.flat())));
  }

  updateInventory(inventory) {
    this.setState(prevState => {
      return {...prevState,
       inventory: inventory
      }
    });
  }

  getCartStorage() {
    const stored = window.localStorage.getItem('cart')
    if(!stored) return [];
    return JSON.parse(stored)
      .map(x => Object.assign(new Salad, x))
  }

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

function safeFetchJson(url) {
  return fetch(url)
    .then(response => {
      if(!response.ok) {
        throw new Error('${url} returned status ${response.status}');
      }
      return response.json();
    });
}
function fetchIngredient(type, name) {
  return safeFetchJson("http://localhost:8080/" + type + "/" + name)
    .then(info => {
      return  {[name]: info};
    });
}

function fetchIngredientList(type) {
  return safeFetchJson("http://localhost:8080/" + type);
}


export default App;
