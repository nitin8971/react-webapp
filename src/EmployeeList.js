import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://reqres.in/api/users?page=2')
      .then(response => {
        setEmployees(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employee-list-container">
      <h1 className="app-title">Employee List</h1>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="employee-list">
        {filteredEmployees.map(employee => (
          <div className="employee-item" key={employee.id}>
            <div className="id-circle">{employee.id}</div>
            <div className="avatar">
              <img src={employee.avatar} alt="Avatar" />
            </div>
            <div className="first-name">{employee.first_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
