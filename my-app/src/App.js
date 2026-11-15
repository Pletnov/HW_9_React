import {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import { useUsers } from './Components/myHook';
import './App.css';

function SearchApp() {
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');
  const {usersData, loading} = useUsers();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setSearch(inputValue.length >= 3 ? inputValue : '');
  };

  const filterUsers = useCallback(() => {
    return usersData.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, usersData]);

  const usersSearch = useMemo(() => {
    return filterUsers();
  }, [filterUsers]);

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <input type="text" ref={inputRef} value={value} onChange={handleChange} className="form-control form-control-lg mb-4 shadow-sm"/>
        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
            <p className="text-muted mt-2">Loading users...</p>
          </div>
        ) : (
          usersSearch.map((user) => (
            <div key={user.id} className="card mb-3 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary fw-bold">{user.name}</h5>
                <p className="card-text mb-1"><strong>Age:</strong> {user.age}</p>
                <p className="card-text text-muted mb-0"><strong>Email:</strong> {user.email}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


export default SearchApp;
