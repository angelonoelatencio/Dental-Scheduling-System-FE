import { BrowserRouter, Route, Routes } from "react-router-dom";
import Copyright from "./layouts/Global/copyright";
import { routes } from "./routes/routes";
import Protected from "./layouts/Authentication/protected";
import PageLayout from "./layouts/PageLayout";

function App() {
  const userToken = localStorage.getItem("t");

  const renderRouteElement = (isRouteProtected: any, element: any) => {
    if (isRouteProtected) {
      return (
        <Protected isLoggedIn={userToken ? true : false}>{element}</Protected>
      );
    } else {
      return <PageLayout>{element}</PageLayout>;
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={renderRouteElement(route.isProtected, route.element)}
          />
        ))}
      </Routes>
      <Copyright />
    </BrowserRouter>
  );
}

export default App;
