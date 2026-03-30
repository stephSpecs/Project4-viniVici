import { useState } from 'react';
import './App.css';
import logo from './assets/food-dinner-icon.svg';

function App() {
  const [meal, setMeal] = useState(null);
  const [banList, setBanList] = useState([]);

  const fetchMeal = async () => {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await response.json();
      if (banList.includes(data.meals[0].strArea) || banList.includes(data.meals[0].strCategory)) {
        fetchMeal();
        return;
      }
    setMeal(data.meals[0]);
  };
  
  return  (
    <div>
      <img src={logo} alt="Flavor Roulette Logo" style={{position: "absolute", top: "20px", left: "20px", width: "50px"}}/>
      <h1>Flavor Roulette</h1>

      <button onClick={fetchMeal} style={{cursor: "pointer"}}>Discover</button>

      {meal && (
        <div>
          <img src={meal.strMealThumb} alt={meal.strMeal}/>
          <h2>{meal.strMeal}</h2>

          <button onClick={() => {
            if (!banList.includes(meal.strArea)) { 
              setBanList([...banList, meal.strArea])}}} style={{cursor: "pointer"}}>
                {meal.strArea}
          </button>

          <button onClick={() => {
            if (!banList.includes(meal.strCategory)) { 
              setBanList([...banList, meal.strCategory])}}} style={{cursor: "pointer"}}>
                {meal.strCategory}
          </button>

        </div>
      )}

      <div className="ban-list">
        <h3>Ban List</h3>

          {banList.map((item, index) => (
            <button onClick={() => 
              setBanList(banList.filter(banned => banned !== item))} key={index} style={{cursor: "pointer"}}>
                {item}
            </button>
          ))}
      </div>
      <footer>Made by stephSpecs</footer>

    </div>
  );

}

export default App;