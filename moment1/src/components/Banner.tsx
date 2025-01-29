import React from 'react';

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

export default Banner;
