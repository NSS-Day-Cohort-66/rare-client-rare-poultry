import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/userService";

export const UserDetails = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    getUserById(userId).then((data) => setUserDetails(data));
  }, [userId]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="__user-details-container__">
      <h1>{userDetails.user.full_name}</h1>
      <p>Email: {userDetails.user.email}</p>
      <p>Is Staff: {userDetails.user.is_staff}</p>
      {/* Add more details as needed */}
    </div>
  );
};
