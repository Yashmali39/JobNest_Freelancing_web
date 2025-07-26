import { createContext, useState, useContext, useEffect } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
      // Fetch user on app load
      const checkAuth = async () => {
        try {
          const res = await fetch('http://localhost:3000/users/api/me', {
            credentials: 'include' 
          });
          if (res.ok) {
            const data = await res.json();
            setUser(data);
            setIsLoggedIn(true);
          } else {
            setUser(null);
            setIsLoggedIn(false);
          }
        } catch (err) {
          console.log(err);
          setUser(null);
        }
      }
  
      checkAuth();
    }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);