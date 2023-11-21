export const getAllUsers = () => {
  const variable = JSON.parse(localStorage.getItem("rare_token"));
  const token = variable.token;
  return fetch("http://localhost:8000/users", {
    headers: {
      Authorization: `Token ${token}`,
      // Add other headers if needed
    },
  }).then((res) => res.json());
};

export const getUserById = ({ userId }) => {
  const variable = JSON.parse(localStorage.getItem("rare_token"));
  const token = variable.token;
  return fetch(`http://localhost:8000/users/${userId}`, {
    headers: {
      Authorization: `Token ${token}`,
      // Add other headers if needed
    },
  }).then((res) => res.json());
};
