import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext';

const Logout = () => {
  const {setIsLoggedIn} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/users/logout`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(false);
        alert(data);
        navigate('/login');
      })
      .catch(err => console.error(err));
  }, []);

  return <div>Logging out...</div>;
}

export default Logout;
