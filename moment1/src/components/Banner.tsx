// Den tar emot en prop "title" som är en sträng
function Banner({ title }: { title: string }) {
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url('/banner-image.jpg')`, // Använd bilden som bakgrund
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
      }}
    >
      <h1>{title}</h1>
    </div>
  );
}

export default Banner; // Exporterar komponenten så att den kan användas i andra komponenter
