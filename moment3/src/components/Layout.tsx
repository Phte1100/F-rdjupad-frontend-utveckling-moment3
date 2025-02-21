import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
      <>
      <Header />
      <main>
        <div className="container is-fluid">
        <Outlet />
        </div>
      </main>
      <footer className="footer">
        <div className="content has-text-centered">
        <p>&copy; 2025</p>
        </div>
        </footer>
      </>
    );
  }
  
  export default Layout;