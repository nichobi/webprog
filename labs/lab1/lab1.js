'use strict';
/**
 * Reflection question 1
 * undefined evaluates to false
 */

const imported = require("./inventory.js");
console.log(imported.inventory['Sallad']);

/*
console.log('Object.keys():')
let names = Object.keys(imported.inventory);
names
.sort((a, b) => a.localeCompare(b, "sv", {sensitivity: 'case'}))
.forEach(name => console.log(name));
*/

/**
 * Reflection question 2
 *
 */

console.log('\n--- Assignment 1 ---------------------------------------')


function makeOptions(inventory, field) {
  return Object.keys(imported.inventory)
  .filter(name => inventory[name][field])
  .map(name => '<option value="' + name + '"> ' + name + ", "
               + inventory[name].price + ' kr </option>\n')
  .reduce((prev, curr) => prev + curr)
}

console.log(makeOptions(imported.inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')

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
}
let myCaesarSalad = new Salad()
  .add('Sallad', imported.inventory['Sallad'])
  .add('Kycklingfilé', imported.inventory['Kycklingfilé'])
  .add('Bacon', imported.inventory['Bacon'])
  .add('Krutonger', imported.inventory['Krutonger'])
  .add('Parmesan', imported.inventory['Parmesan'])
  .add('Ceasardressing', imported.inventory['Ceasardressing'])
  .add('Gurka', imported.inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')

Salad.prototype.getPrice = function () {
  return Object.values(this.ingredients)
    .map(v => v.price)
    .reduce((acc, cur) => acc + cur)
}

console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr

Salad.prototype.count = function (field) {
  return Object.values(this.ingredients)
    .filter(name => name[field])
    .length
}

console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör

console.log('\n--- Reflection 3 ---------------------------------------')
// reflection question 3
console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 2: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));
console.log('Salad: ' + Salad);
console.log('Salad.prototype: ' + Salad.prototype);
console.log('Salad.prototype.prototype: ' + Salad.prototype.prototype);
console.log('myCaesarSalad: ' + myCaesarSalad);
console.log('myCaesarSalad.prototype: ' + myCaesarSalad.prototype);

console.log('\n--- Assignment 4 ---------------------------------------')

class GourmetSalad extends Salad {
  add(name, properties, size = 1) { // return this object to make it chainable
    let propertiesWithSize = {...properties};
    let previousSize = this.ingredients[name]?.size || 0;
    propertiesWithSize.size = size + previousSize;
    return super.add(name, propertiesWithSize);
  }

  getPrice() {
    return Object.values(this.ingredients)
      .filter(v => v.price)
      .map(v => v.price * v.size)
      .reduce((acc, cur) => acc + cur)
  }

}

let myGourmetSalad = new GourmetSalad()
  .add('Sallad', imported.inventory['Sallad'], 0.5)
  .add('Kycklingfilé', imported.inventory['Kycklingfilé'], 2)
  .add('Bacon', imported.inventory['Bacon'], 0.5)
  .add('Krutonger', imported.inventory['Krutonger'])
  .add('Parmesan', imported.inventory['Parmesan'], 2)
  .add('Ceasardressing', imported.inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');

myGourmetSalad.add('Bacon', imported.inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')

console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);

console.log(myGourmetSalad)
console.log(new GourmetSalad)

/**
 * Reflection question 4
 * The function object
 */
/**
 * Reflection question 5
 *  Object.defineProperty(this, "uuid", {
 *    value: 'salad_' + Salad.instanceCounter++,
 *    writable: false
 */
/**
 * Reflection question 6
 * Start property name with #
 */
