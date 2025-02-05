function List() {

    const intressen = [ // En array med intressen där varje objekt har ett namn, en rating och en säsong
      { name: "Fiske", rating: 10, season: true }, 
      { name: "Discgolf", rating: 7, season: true }, 
      { name: "Slalom", rating: 8, season: false }, 
      { name: "Fotboll", rating: 5, season: true },
    ];

  return (
    <div className="container" 
    style={{ 
      maxWidth: "1280px", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      margin: "auto", 
      flexWrap: "wrap" 
      }}>
      { // Loopar igenom arrayen "intressen" och skapar en box för varje intresse
        intressen.map((intresse, index) => ( // Använder index som unik nyckel
          <div key={index} className="intressebox" 
          style={{ 
            maxWidth: "50%", 
            border: "1px solid black", 
            padding: "10px", 
            margin: "10px", 
            }}>
            <h3>{intresse.name}</h3>
            <p>Rating: {intresse.rating}</p>
            <p>Säsong: {intresse.season ? "Sommar" : "Vinter"}</p> 
          </div> // Om "season" är true skrivs "Sommar" ut, annars skrivs "Vinter" ut
        ))
      }
    </div>
  );
}

export default List;