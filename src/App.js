import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// import Pages Files By Lazy Loading

const Home = lazy(() => import("./Pages/Home/index"));
const PageNotFound = lazy(() => import("./Pages/404/index"));
const AddNewBlog = lazy(() => import("./Pages/AddNewBlog/index"));
const Login = lazy(() => import("./Pages/Authentication/Login/index"));
const Signup = lazy(() => import("./Pages/Authentication/Signup/index"));
const BlogInfo = lazy(() => import("./Pages/BlogInfo/index"));
const DeleteBlog = lazy(() => import("./Pages/DeleteBlog/index"));
const DeleteComment = lazy(() => import("./Pages/DeleteComment/index"));
const EditBlog = lazy(() => import("./Pages/EditBlog/index"));
const EditComment = lazy(() => import("./Pages/EditComment/index"));
const DeleteProfile = lazy(() => import("./Pages/User/DeleteProfile/index"));
const EditProfile = lazy(() => import("./Pages/User/EditProfile/index"));
const Profile = lazy(() => import("./Pages/User/Profile/index"));

// import Components

import Footer from "./Components/Footer/index";
import LastBlogs from "./Components/LastBlogs/index";
import LastComments from "./Components/LastComments/index";

function App() {
  return (
    <div className="App">
      <div className="page-content">
        {/* Start Container */}
        <div className="container pt-4 pb-4">
          {/* Start Grid System */}
          <div className="row">
            {/* Start Column */}
            <div className="col-lg-8">
              <Suspense>
                <Routes>
                  <Route path="/" element={<Home pageTitle="Home Page" />}></Route>
                  <Route path="/sign-up" element={<Signup pageTitle="Signup Page" />}></Route>
                  <Route path="/login" element={<Login pageTitle="Login Page" />}></Route>
                  <Route path="/user/:userId/blog/:id" element={<BlogInfo pageTitle="Blog Info Page" />}></Route>
                  <Route path="/user/:userId/blog/add-new-blog" element={<AddNewBlog pageTitle="Add New Blog Page" />}></Route>
                  <Route path="/user/:userId/blog/:id/edit" element={<EditBlog pageTitle="Edit Blog Page" />}></Route>
                  <Route path="/user/:userId/blog/:id/delete" element={<DeleteBlog pageTitle="Delete Blog Page" />}></Route>
                  <Route path="/users/profile/:userId" element={<Profile pageTitle="Profile Page" />}></Route>
                  <Route path="/users/profile/edit-profile/:userId" element={<EditProfile pageTitle="Edit Profile Page" />}></Route>
                  <Route path="/users/profile/delete-profile/:userId" element={<DeleteProfile pageTitle="Delete Profile Page" />}></Route>
                  <Route path="/users/:userId/blog/:blogId/comments/edit-comment/:commentId" element={<EditComment pageTitle="Edit Comment Page" />}></Route>
                  <Route path="/users/:userId/blog/:blogId/comments/delete-comment/:commentId" element={<DeleteComment pageTitle="Delete Comment Page" />}></Route>
                  <Route path="*" element={<PageNotFound pageTitle="Page Not Found" />}></Route>
                </Routes>
              </Suspense>
            </div>
            {/* End Column */}
            {/* Start Column */}
            <div className="col-lg">
              {/* Start Last Blogs And Last Comments Box */}
              <div className="last-blogs-comments-box">
                <LastBlogs />
                <LastComments />
              </div>
              {/* End Last Blogs And Last Comments Box */}
            </div>
            {/* End Column */}
          </div>
          {/* End Grid System */}
        </div>
        {/* End Container */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
