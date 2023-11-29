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
import { UserPosts } from "./UserPosts";
import { CreatePost } from "./CreatePost";
import { AddComments } from "./AddComments";

export const ApplicationViews = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Authorized />}>
          <Route path="/" element={<App />} />
          <Route path="myposts" element={<UserPosts />} />
          <Route path="createpost" element={<CreatePost />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:postId" element={<PostDetails />} />
          <Route path="categorymanager" element={<Categories />} />
          <Route path="tagmanager" element={<Tags />} />
          <Route path="posts/:postId/comments" element={<Comments />} />
          <Route path="posts/:postId/addcomments" element={<AddComments />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<UserDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
