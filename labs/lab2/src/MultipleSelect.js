import { Component } from 'react';

class MultipleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.name, event.target.checked);
  }

  render() {
    let ingredients = Object.keys(this.props.inventory)
      .filter(name => this.props.inventory[name][this.props.name]);
    return (
      <div>
      <label> Pick your {this.props.name}s: </label>
        {ingredients.map(name =>
          <div key={name}>
            <input type="checkbox" value={name} name={name} onChange={this.handleChange} checked = {this.props.selected.includes(name)}/>
            <label> {name} </label>
          </div>
        )}
      </div>
    )
  }
}

export default MultipleSelect;

