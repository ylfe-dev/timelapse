import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { EnvironmentProvider } from './EnvironmentProvider';

import Start from './Start';
import App from './App';
import ErrorPage from "./ErrorPage";
import Home from './containers/Home';
import Tutorial from './containers/Tutorial';
import Offer from './containers/Offer';



const root = ReactDOM.createRoot(document.getElementById('root'));

/*
const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/",         element: <Home />     },
      { path: "tutorial/", element: <Tutorial /> },
      { path: "offer/",    element: <Offer />    },
    ],
  },
  {
    path: "/app/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);
*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { 
        path: "/app",
        element: <App />
      }
    ]
  }
]);


root.render(
  <StrictMode>
    <EnvironmentProvider>
      <RouterProvider router={router} />
    </EnvironmentProvider>
  </StrictMode>
);


