import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../services/userService";

export const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers().then((data) => setAllUsers(data));
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  return (
    <div className="__users-container__ flex flex-col w-7/12">
      <h1 className="__users-header__ text-3xl bg-cyan-800 text-white py-2 px-12 self-center rounded-t-lg">
        Users
      </h1>
      <div className="__users-list__ bg-cyan-950/60 border border-white/40 py-20 rounded-lg">
        {allUsers.map((user) => (
          <div
            key={user.rare_username}
            className="__users-item__ bg-cyan-500 py-4 px-6 text-cyan-950 mb-4 rounded-md flex flex-col"
            onClick={() => handleUserClick(user.id)} // Pass user id when clicked
            style={{ cursor: "pointer" }} // Add pointer cursor for better UX
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">
                User: {user.rare_username}
              </h3>
              <span className="text-sm">Staff: {user.user.is_staff}</span>
            </div>
            <p className="text-sm">
              <strong>Name:</strong> {user.user.full_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
