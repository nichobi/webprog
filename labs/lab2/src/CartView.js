import { Component } from 'react';

class CartView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
      {this.props.cart.map(salad => <label key={salad.uuid}> {JSON.stringify(salad)} </label>)}
      </div>
    )
  }

}
export default CartView;

