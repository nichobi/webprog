class Salad {
  static instanceCounter = 0;
  constructor() {
    this.ingredients = {};
    //this.uuid = 'salad_' + Salad.instanceCounter++;
    Object.defineProperty(this, "uuid", {
      value: 'salad_' + Salad.instanceCounter++,
      writable: false
    });
  }

  add(name, properties) { // return this object to make it chainable
    this.ingredients[name] = properties;
    return this;
  }

  remove(name){ // return this object to make it chainable
    delete this.ingredients[name];
    return this;
  }

  getPrice() {
    return Object.values(this.ingredients)
      .map(v => v.price)
      .reduce((acc, cur) => acc + cur)
  }

  count(field) {
    return Object.values(this.ingredients)
      .filter(name => name[field])
      .length
  }

  toString() {
    return Object.keys(this.ingredients).join(", ") + ", " + this.getPrice() + " kr"
  }

}

export default Salad;
