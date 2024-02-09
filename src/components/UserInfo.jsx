import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userinfo.css';


const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pastSearchTerms, setPastSearchTerms] = useState([]);

  useEffect(() => {
    fetchUsers();
    const savedSearches = localStorage.getItem('pastSearches');
    if (savedSearches) {
      setPastSearchTerms(JSON.parse(savedSearches));
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== '' && !pastSearchTerms.includes(e.target.value)) {
      const updatedSearchTerms = [...pastSearchTerms, e.target.value];
      setPastSearchTerms(updatedSearchTerms);
      localStorage.setItem('pastSearches', JSON.stringify(updatedSearchTerms));
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortUsersByName = () => {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sortedUsers);
  };

  return (
    <div className="users-list-container">
    <input
      className="search-input"
      type="text"
      placeholder="Search by name"
      value={searchTerm}
      onChange={handleSearch}
    />
    <button className="sort-button" onClick={sortUsersByName}>Sort by Name</button>
    <ul className="users-list">
      {filteredUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
    <div className="past-searches">
      <h3>Past Searches</h3>
      {pastSearchTerms.map((term, index) => (
        <div key={index} className="past-search-term">{term}</div>
      ))}
    </div>
  </div>  
  );
};

export default UsersList;
