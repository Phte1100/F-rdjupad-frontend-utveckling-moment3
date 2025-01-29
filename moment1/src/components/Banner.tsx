import React from 'react'; // Importerar React, vilket krävs för att använda JSX

// Den tar emot en prop "title" som är en sträng
function Banner({ title }: { title: string }) {
  return (
    <div
      className="banner"
      style={{
        backgroundColor: 'lightblue',
        width: '100%',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>{title}</h1>
    </div>
  );
}

export default Banner; // Exporterar komponenten så att den kan användas i andra komponenter
