import { createContext, useState, useContext, ReactNode } from "react";
import { User, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types";

// Skapa context
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // Login-funktion
    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await fetch("https://projekt-webbtjanst-api-phte1100.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                throw new Error("Inloggningen misslyckades");
            }

            const data: AuthResponse = await response.json();

            localStorage.setItem("token", data.token);
            setUser(data.user);
            setToken(data.token);
        } catch (error) {
            throw error;
        }
    };

    // Logout-funktion
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook för att använda auth-context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
};
