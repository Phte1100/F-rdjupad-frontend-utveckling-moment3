import React from 'react';

// Tar emot en prop "titel" som är en sträng
function Titel(props: { titel: string }) {
  return <h1>{props.titel}!</h1>;
}

export default Titel;
