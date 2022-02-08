import { Component } from 'react';
import SingleSelect from './SingleSelect';
import MultipleSelect from './MultipleSelect';
import Salad from './Salad';

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = { foundation: ''
                 , protein:    ''
                 , dressing:   ''
                 , extra: {}
                 };
    this.handleSingleChange = this.handleSingleChange.bind(this);
    this.handleMultipleChange = this.handleMultipleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getExtras = this.getExtras.bind(this);
  }


  handleSingleChange(name, value) {
    console.log('previous state:' + JSON.stringify(this.state));
    this.setState({[name]: value});
  }

  handleMultipleChange(name, checked) {
    console.log('previous state:' + JSON.stringify(this.state));
    this.setState(prevState => (
      { ...prevState
      , extra: {...prevState.extra, [name]: checked}
      }
    ));
  }

  handleSubmit(event) {
    event.preventDefault();
    let inventory = this.props.inventory;
    let salad = new Salad()
      .add(this.state.foundation, inventory[this.state.foundation])
      .add(this.state.protein,    inventory[this.state.protein])
      .add(this.state.dressing,   inventory[this.state.dressing])
    Object.entries(this.state.extra)
      .filter(([_, v]) => v)
      .map(([k,_]) => k)
      .forEach(e => salad.add(e, inventory[e]))
    this.props.addToCart(salad);

    this.setState({ foundation: ''
                  , protein:    ''
                  , dressing:   ''
                  , extra: {}
                  });
  }

  getExtras() {
    return Object.entries(this.state.extra).filter(([_, v]) => v).map(([k, _]) => k)
  }

  render() {
    return (
      <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>

          <SingleSelect inventory={this.props.inventory} name='foundation' onChange={this.handleSingleChange} selected={this.state.foundation} />
          <SingleSelect inventory={this.props.inventory} name='protein' onChange={this.handleSingleChange} selected={this.state.protein} />
          <SingleSelect inventory={this.props.inventory} name='dressing' onChange={this.handleSingleChange} selected={this.state.dressing} />
          <MultipleSelect inventory={this.props.inventory} name='extra' onChange={this.handleMultipleChange} selected={this.getExtras()} />

          <form onSubmit={this.handleSubmit}>
            <input type="submit" value="Submit Salad" class="btn btn-primary mt-3 "/>
          </form>

      </div>
    </div>
    );
  }

}
export default ComposeSalad;
