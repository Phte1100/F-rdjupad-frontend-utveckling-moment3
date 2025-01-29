function List() {

    const intressen = [{ name: "Fiske", rating: 10, season: true }, { name: "Discgolf", rating: 7, season: true }, { name: "Slalom", rating: 8, season: false }, { name: "Fotboll", rating: 5, season: false },];

  return (
    <div className="container" style={{ maxWidth: "1280px", display: "flex", justifyContent: "center", alignItems: "center", }}>
      {
        intressen.map((intresse, index) => (
          <div key={index} className="intressebox" style={{ maxWidth: "50%", border: "1px solid black", padding: "10px", margin: "10px", }}>
            <h3>{intresse.name}</h3>
            <p>Rating: {intresse.rating}</p>
            <p>Säsong: {intresse.season ? "Sommar" : "Vinter"}</p>
          </div>
        ))
      }
    </div>
  );
}

export default List;