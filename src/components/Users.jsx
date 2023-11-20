import { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";

export const Users = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((data) => setAllUsers(data));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {allUsers.map((user) => (
          <li key={user.user.email}>
            <h3>{user.user.full_name}</h3>
            <p>Email: {user.user.email}</p>
            <p>Is Staff: {user.user.is_staff}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
