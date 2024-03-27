import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./images/logo-teal.svg";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [cart, setCart] = useState([]);

  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const meal = cart[i];
    total = total + meal.price * meal.quantity;
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://site--jedeliver-backend--t5cc8d9btyyw.code.run/"
      );
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleAddToCart = (meal) => {
    const newCart = [...cart];
    const found = newCart.find((elem) => elem.id === meal.id);
    if (found) {
      found.quantity++;
    } else {
      newCart.push({ ...meal, quantity: 1 });
    }
    setCart(newCart);
  };

  const handleRemoveFromCart = (meal) => {
    const newCart = [...cart];
    const found = newCart.find((elem) => elem.id === meal.id);
    if (found.quantity === 1) {
      const index = newCart.indexOf(found);
      newCart.splice(index, 1);
    } else {
      found.quantity--;
    }
    setCart(newCart);
  };

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
        <div className="center">
          <div className="menu">
            {data.categories.map((category, index) => {
              if (category.meals.length !== 0) {
                return (
                  <section key={index} className="left">
                    <h2>{category.name}</h2>
                    <div className="dishes">
                      {category.meals.map((meal, index) => {
                        return (
                          <article
                            key={index}
                            className="dish"
                            onClick={() => {
                              handleAddToCart(meal);
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
                          </article>
                        );
                      })}
                    </div>
                  </section>
                );
              } else {
                return null;
              }
            })}
          </div>
          <section className="right">
            <p>Valider votre panier</p>
            <aside className="cart">
              {cart.length === 0 ? (
                <span>Panier Vide</span>
              ) : (
                <div className="choice">
                  {cart.map((meal) => {
                    return (
                      <div key={meal.id} className="items">
                        <button
                          onClick={() => {
                            handleRemoveFromCart(meal);
                          }}
                        >
                          -
                        </button>
                        <span>{meal.quantity}</span>
                        <button
                          onClick={() => {
                            handleAddToCart(meal);
                          }}
                        >
                          +
                        </button>

                        <span>{meal.title}</span>
                        <span>{(meal.price * meal.quantity).toFixed(2)}€</span>
                      </div>
                    );
                  })}
                  <div className="bottom">
                    <span>Total : {total.toFixed(2)}€</span>
                    <button
                      onClick={() => {
                        setCart([]);
                      }}
                    >
                      Empty cart
                    </button>
                  </div>
                </div>
              )}
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
