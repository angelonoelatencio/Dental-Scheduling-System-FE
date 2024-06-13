import { PATH } from "../config/path";
import {
  AppointmentPage,
  LandingPage,
  LoginPage,
  RegistrationPage,
} from "../pages";

type routesDetails = {
  path: string;
  element: React.ReactNode;
  isProtected: boolean;
  isAdmin: boolean;
};
export const routes: routesDetails[] = [
  {
    path: PATH.LOGIN,
    element: <LoginPage />,
    isProtected: false,
    isAdmin: false,
  },
  {
    path: PATH.HOME,
    element: <LandingPage />,
    isProtected: false,
    isAdmin: false,
  },
  {
    path: PATH.REGISTRATION,
    element: <RegistrationPage />,
    isProtected: false,
    isAdmin: false,
  },
  {
    path: PATH.APPOINTMENTS,
    element: <AppointmentPage />,
    isProtected: true,
    isAdmin: false,
  },
  //   {
  //     path: "*",
  //     element: <NotFoundPage />,
  //     isProtected: true,
  //     isAdmin: false,
  //   },
];
