import React from "react";
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

//Page
import Home from './page/home';

//Action
import AddStudent from "./action/AddStudent";
import Edit from "./action/Edit";





let router = createBrowserRouter([
{
  path:'/',
  element: <Home />,
  
},
{
  path: '/add-student',
  element: <AddStudent />
 },

 {
  path: '/edit/:id',
  element: <Edit />
 },

 
]);


let App = () =>{
  return(
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App;

