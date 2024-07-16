import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUsers, selectUsers } from '../features/userSlice';

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    axios.post('/api/graphql', {
      query: `
        query {
          users {
            id
            name
            email
          }
        }
      `
    }).then(response => {
      dispatch(setUsers(response.data.data.users));
    });
  }, [dispatch]);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
