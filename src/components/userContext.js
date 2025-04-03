import { createContext, useContext, useState, useEffect } from "react";

// Création du contexte
const UserContext = createContext();

// Provider qui englobe toute l'app
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Stocke l'utilisateur connecté

  useEffect(() => {
    // Si l'utilisateur est stocké dans le localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []); // Ce useEffect s'exécute une seule fois au démarrage

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook personnalisé pour accéder au user
export function useUser() {
  return useContext(UserContext);
}
