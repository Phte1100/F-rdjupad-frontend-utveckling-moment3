import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // kontrollera om användare
  useEffect(() => {
    if (user) {
      navigate("/about");
    }
  }, [user, navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Login attempt:", formData);

    try {
        await login({ username: formData.username, password: formData.password });

        navigate("/about");

    } catch (error) {
        setError("Inloggningen misslyckades");
    }
};


  return (
    <form onSubmit={handleSubmit} className="box">
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input
            name="username"
            className="input"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            name="password"
            className="input"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-primary" type="submit">
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
