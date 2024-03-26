import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./images/logo-teal.svg";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [panier, setPanier] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--jedeliver-backend--t5cc8d9btyyw.code.run/"
    );
    console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  const categorieVide =
    data.categories && Array.isArray(data.categories)
      ? data.categories.filter((elem) => elem.meals.length > 0)
      : [];

  useEffect(() => {
    console.log("useEffect executed");
    fetchData();
  }, []);
  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <div>
      <div className="header">
        <div className="bar">
          <div className="barlogo">
            <img className="logo" src={logo} alt="logo" />
          </div>
        </div>
        <div className="restaurant">
          <div className="restaurant-title">
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <img
            className="restaurant-photo"
            src={data.restaurant.picture}
            alt="meal"
          />
        </div>
      </div>

      <main>
        <div className="menu">
          {categorieVide.map((category, index) => {
            return (
              <div className="left" key={index}>
                <h2>{category.name}</h2>
                <div className="dishes">
                  {category.meals.map((meal, index) => {
                    return (
                      <div
                        key={index}
                        className="dish"
                        onClick={(e) => {
                          console.log(meal);
                          setPanier(panier.push(meal));
                          console.log(panier);
                        }}
                      >
                        <div className="textdish">
                          <div className="name-desc">
                            <h3>{meal.title}</h3>
                            <p>{meal.description}</p>
                          </div>
                          <div className="price-popular">
                            <span className="price">{meal.price} €</span>
                            {meal.popular && (
                              <span className="popular">Populaire</span>
                            )}
                          </div>
                        </div>
                        {meal.picture && (
                          <div className="meal-img">
                            <img src={meal.picture} alt="meal" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="panier">
          {panier.map((prod) => {
            return (
              <div className="items">
                <p>{prod.title}</p>
                <p>{prod.price}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
