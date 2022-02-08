import { Component } from 'react';

class CartView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ul>
        {this.props.cart.map(salad =>
          <li key={salad.uuid}> {salad.toString()} </li>
        )}
      </ul>
    )
  }

}
export default CartView;

