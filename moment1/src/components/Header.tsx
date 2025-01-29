import React from 'react';
import Banner from './Banner';

function Header() {
  const title = "Mina intressen"; // Titel som används i Banner

  return (
    <header>
      <Banner title={title} />
    </header>
  );
}

export default Header;
