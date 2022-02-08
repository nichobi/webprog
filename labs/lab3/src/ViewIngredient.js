import { Component } from 'react';
import { useParams } from "react-router-dom";

function ViewIngredient(props){
  const name = useParams().name
  return (
    <div>
      <h2> Ingredient: {name} </h2>
      <ul className="list-group">
      {Object.keys(props.inventory[name]).filter(k => k != "price").map(k =>
        <li key={k} className="list-group-item">{k}</li>
      )}
      </ul>
    </div>
  );
}
export default ViewIngredient;

