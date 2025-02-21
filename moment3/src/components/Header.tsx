import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {

    const { user, logout } = useAuth();

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation"  style={{marginRight: "5%", marginLeft: "5%"}}>
      <div className="navbar-brand">
      <NavLink to="/"><h1 className="title is-2">Moment 4</h1></NavLink>

      <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
    </div>

    <div className="navbar-menu">
      <div className="navbar-start">
        <NavLink to="/" className="navbar-item">
          Start
        </NavLink>
        <NavLink to="/about" className="navbar-item">
          About
        </NavLink>
      </div>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          {
          !user ? <NavLink to="/login">Logga in</NavLink> : <button onClick={logout}>Logga ut</button>
          }
        </div>
      </div>
    </div>



      </nav>
    );
  }
  
  export default Header;

  /*
  <header className="header">
  <ul>
      <li><NavLink to="/">Startsida</NavLink></li>
      <li><NavLink to="/about">Om oss</NavLink></li>
      <li>
        {
          !user ? <NavLink to="/login">Logga in</NavLink> : <button onClick={logout}>Logga ut</button>
        }
      </li>
  </ul>
</header>
*/