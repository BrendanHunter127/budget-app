import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUsers, selectUsers } from '../features/userSlice';

// Define the User interface (if not already defined in the slice)
interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const users: User[] = useSelector(selectUsers);

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
        {users.map((user: User) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
