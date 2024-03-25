import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3200/");
    console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("useEffect executed");
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <span>En cours de chargement... </span>
      ) : (
        <div>
          <Header data={data} />
          <main>
            <div className="menu">
              <h2>Brunchs</h2>
              <div className="plat"></div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
