import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../services/userService";

export const UserDetails = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    getUserById(userId)
      .then((data) => setUserDetails(data))
      .catch((error) => {
        console.error("Error fetching user by ID:", error);
      });
  }, [userId]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="__users-container__ flex flex-col w-7/12">
      <h1 className="__users-header__ text-3xl bg-cyan-800 text-white py-2 px-12 self-center rounded-t-lg">
        {userDetails.rare_username}
      </h1>
      <div className="__users-list__ bg-cyan-500 border border-white/40 py-10 rounded-lg">
        <img src={userDetails.profile_image_url} />
        <p className="text-sm">
          <strong>Name:</strong> {userDetails.user.full_name}
        </p>
        <p className="text-sm">
          <strong>Email:</strong> {userDetails.user.email}
        </p>
        <p className="text-sm">
          <strong>Is Staff:</strong> {userDetails.user.is_staff}
        </p>
        <p className="text-sm">
          <strong>Creation Date:</strong> {userDetails.created_on}
        </p>
      </div>
    </div>
  );
};
