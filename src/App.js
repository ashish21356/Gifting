//const heading = React.createElement("h1", {id: "heading", xyz: "Hey"}, "This is React COde.");
import ReactDOM from "react-dom/client";
import { lazy, Suspense } from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Body from "./component/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import AboutUs from "./component/AboutUs";
import Error from "./component/Error";
import Contact from "./component/Contact";
import RestaurantsMenu from "./component/RestaurantsMenu";
//import Grocery from "./component/Grocery"



const Grocery = lazy(()=> import('./component/Grocery'));
const AppLayout = () => {
  return (
    <div className="App">
      
        <Header />
        <Outlet />
      <Footer/>
    </div>
  );
};

const Routeconfig = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/restaurantsMenu/:resID",
        element: <RestaurantsMenu />,
      },
      {
        path: "/Grocery",
        element: (
          <Suspense fallback={<h1  className="childrenPages">Loading.......</h1>}>
            <Grocery />
          </Suspense>
        ),
      }
    ],
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={Routeconfig} />);
