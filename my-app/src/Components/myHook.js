import {useState, useEffect} from 'react';
import {getUsers} from './users'

export const useUsers = () => {
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setUsersData(getUsers);
        console.log(getUsers())
        setLoading(false);
      }, 3000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return { usersData, loading };
}