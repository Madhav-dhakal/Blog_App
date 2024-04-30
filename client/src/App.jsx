import Header from "./components/header";
import {Routes,Route} from "react-router-dom";
import Blog from "./pages/blog";
import Login from "./pages/login";
import Register from "./pages/register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserBlogs from "./pages/user.blogs";
import CreateBlog from "./pages/create.blog";
import BlogDetails from "./pages/blog.details";
import Contact from "./contact/contact";
const App=()=>{
  return(
    <>
     <ToastContainer/>
      <Header/>
    <Routes>
  <Route path="/" element={<Blog/>}></Route>
  <Route path="/blogs" element={<Blog/>}></Route>
  <Route path="/my-blogs" element={<UserBlogs/>}></Route>
  <Route path="/blog-details/:id" element={<BlogDetails/>}></Route>
  <Route path="/create-blog" element={<CreateBlog/>}></Route>
  <Route path="/login" element={<Login/>}></Route>
  <Route path="/contact" element={<Contact/>}></Route>
  <Route path="/register" element={<Register/>}></Route>
  </Routes>
    </>
  )
}
export default App;