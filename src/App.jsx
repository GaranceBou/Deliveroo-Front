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
            <img className="logo" src="src/images/logo-teal.svg" alt="logo" />
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
          <h2>{data.categories.name}</h2>
          <div className="plat"></div>
        </div>
      </main>
    </div>
  );
}

export default App;
