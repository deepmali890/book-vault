import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Layout from './layout/layout'
import AdddBook from "./pages/AdddBook";
import ViewBook from "./pages/ViewBook";
import AddpcCategory from "./pages/AddpcCategory";
import ViewPcCategory from "./pages/ViewPcCategory";
import AddBookCategory from "./pages/AddBookCategory";
import ViewBookCategory from "./pages/ViewBookCategory";
import AddAuthor from "./pages/AddAuthor";
import ViewAuthor from "./pages/ViewAuthor";
import AddSlider from "./pages/AddSlider";
import ViewSlider from "./pages/ViewSlider";
import AddStory from "./pages/AddStory";
import ViewStory from "./pages/ViewStory";
import Order from "./pages/Order";
import Member from "./pages/Member";
import Home from "./pages/Home";
import User from "./pages/User";
import UpdatePcCategory from "./pages/UpdatePcCategory";
import UpdateBookCategory from "./pages/UpdateBookCategory";
import UpdateAuthor from "./pages/UpdateAuthor";
import UpdateBook from "./pages/UpdateBook";
import UpdateSlider from "./pages/UpdateSlider";
import UpdateStory from "./pages/UpdateStory";
import Inquiries from "./pages/Inquiries";
import AddBlog from "./pages/AddBlog";
import ViewBlog from "./pages/ViewBlog";
import Addteam from "./pages/Addteam";
import ViewTeam from "./pages/ViewTeam";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {path:'/dashboard', element:<Home/>},
      {path:'/dashboard/user', element:<User/>},
      {path:'/dashboard/category/add-parent-category', element:<AddpcCategory/>},
      {path:'/dashboard/category/view-parent-category', element:<ViewPcCategory/>},
      {path:'/dashboard/category/add-book-category', element:<AddBookCategory/>},
      {path:'/dashboard/category/view-book-category', element:<ViewBookCategory/>},
      {path:'/dashboard/add-author', element:<AddAuthor/>},
      {path:'/dashboard/view-author', element:<ViewAuthor/>},
      {path:'/dashboard/book/add-book', element:<AdddBook/>},
      {path:'/dashboard/book/view-book', element:<ViewBook/>},
      {path:'/dashboard/slider/add-slider', element:<AddSlider/>},
      {path:'/dashboard/slider/view-slider', element:<ViewSlider/>},
      {path:'/dashboard/story/add-story', element:<AddStory/>},
      {path:'/dashboard/story/view-story', element:<ViewStory/>},
      {path:'/dashboard/blog/add-blog', element:<AddBlog/>},
      {path:'/dashboard/blog/view-blog', element:<ViewBlog/>},
      {path:'/dashboard/team/add-team', element:<Addteam/>},
      {path:'/dashboard/team/view-team', element:<ViewTeam/>},
      {path:'/dashboard/order', element:<Order/>},
      {path:'/dashboard/member', element:<Member/>},
      {path:'/dashboard/inquire', element:<Inquiries/>},
      {path:'/dashboard/category/update-parent-category/:_id', element:<UpdatePcCategory/>},
      {path:'/dashboard/category/update-book-category/:_id', element:<UpdateBookCategory/>},
      {path:'/dashboard/author/update-author/:_id', element:<UpdateAuthor/>},
      {path:'/dashboard/book/update-book/:_id', element:<UpdateBook/>},
      {path:'/dashboard/slider/update-slider/:_id', element:<UpdateSlider/>},
      {path:'/dashboard/story/update-story/:_id', element:<UpdateStory/>},
      

    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
