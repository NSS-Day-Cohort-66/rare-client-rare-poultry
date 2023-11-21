import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorized } from "./Authorized";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import App from "../App";
import { Categories } from "./Categories";
import { Tags } from "./Tags";
import { Posts } from "./Posts";
import { PostDetails } from "./PostDetails";
import { Comments } from "./Comments";
import { Users } from "./Users";
import { UserDetails } from "./UserDetails";

export const ApplicationViews = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<App />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:postId" element={<PostDetails />} />
          <Route path="categorymanager" element={<Categories />} />
          <Route path="tagmanager" element={<Tags />} />
          <Route path="comments" element={<Comments />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<UserDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
