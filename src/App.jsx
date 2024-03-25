import { useState, useEffect } from "react";
import "./App.css";
// import Header from "./components/Header";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3200");
    console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

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
            <img className="logo" src="/logo-teal.svg" alt="logo" />
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
          {data.categories.map((elem, index) => {
            return (
              <div key={index}>
                <h2>{elem.name}</h2>
                <div className="dishes">
                  {elem.meals.map((meal) => {
                    return (
                      <div className="dish">
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
      </main>
    </div>
  );
}

export default App;
