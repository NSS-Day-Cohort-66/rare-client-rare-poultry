export const categoryService = () => {
    const variable = JSON.parse(localStorage.getItem("rare_token"));
    const token = variable.token;
    return fetch("http://localhost:8000/tags", {
      headers: {
        Authorization: `Token ${token}`,
        // Add other headers if needed
      },
    }).then((res) => res.json());
  };
  