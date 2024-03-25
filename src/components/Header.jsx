const Header = (data) => {
  return (
    <div className="header">
      <div className="bar">
        <div className="barlogo">
          <img className="logo" src="images/logo-teal.svg" alt="logo" />
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
  );
};

export default Header;
