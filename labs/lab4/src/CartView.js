import { Component } from 'react';

class CartView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sendOrder = this.sendOrder.bind(this);
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.cart.map(salad =>
            <li key={salad.uuid}> {salad.toString()} </li>
          )}
        </ul>
        <button className='btn btn-primary' onClick={this.sendOrder}> Order </button>
      </div>
    )
  }

  sendOrder() {
    const order = this.props.cart.map(salad => Object.keys(salad.ingredients))
    fetch(
      'http://localhost:8080/orders/',
      { method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(order)
      }).then(res => res.json())
        .then(data => alert(JSON.stringify(data)))
        .then(this.props.clearCart());
  }

}
export default CartView;

