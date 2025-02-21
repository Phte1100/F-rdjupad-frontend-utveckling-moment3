import { useAuth } from '../context/AuthContext';
import MenuListLoggedIn from "../components/MenuListLoggedIn";
import AddMenuItem from '../components/AddMenuItem';

const AboutPage = () => {

  const { user } = useAuth();


  return (
    <div>
      <h1>Hej, {user ? `${user.username}` : ""}</h1>
      <AddMenuItem />
      <MenuListLoggedIn />
    </div>
  );
}

export default AboutPage;
