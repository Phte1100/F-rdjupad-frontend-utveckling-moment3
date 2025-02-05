import Banner from './Banner';

function Header() {
  const title = "Mina intressen"; // Titel som används i Banner

  return ( // Skickar med titel som prop till Banner
    <header> 
      <Banner title={title} /> 
    </header>
  );
}

export default Header;
