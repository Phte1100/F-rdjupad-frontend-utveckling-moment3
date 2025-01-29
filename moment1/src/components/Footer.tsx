function FooterText(props: { name: string }) {
    return <p 
    style={{
        textAlign: "center"
    }}>Skapad av <strong>{props.name}</strong></p>;
}

function Footer() {

// Skickar namn som props till FooterText
  return (
    <footer>
      <FooterText name="Philip Telberg, phte1100" />
    </footer>
  );
}

export default Footer;



