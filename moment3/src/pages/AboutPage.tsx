import { useAuth } from '../context/AuthContext';

const AboutPage = () => {

  const { user } = useAuth();

  return (
    <div>
      <h1>Hej, {user ? `${user.username}` : ""}</h1>
      <p>Welcome to the Aboutsida!</p>
    </div>
  );
}

export default AboutPage;
