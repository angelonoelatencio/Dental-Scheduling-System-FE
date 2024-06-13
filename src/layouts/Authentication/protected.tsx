import { FC, ReactNode } from "react";
import PageLayout from "../PageLayout";
import { Navigate } from "react-router-dom";

/**
 * Interface defining the props for the Protected component.
 * @interface
 * @property {boolean} isLoggedIn - Indicates whether the user is logged in.
 * @property {ReactNode} children - The child components to be rendered within the Protected component.
 * @property {boolean} isAdmin - Indicates whether the user has admin privileges.
 */
interface ProtectedProps {
  isLoggedIn: boolean;
  children: ReactNode;
}

/**
 * `Protected` is a React functional component that wraps child components to ensure they are only accessible to authenticated users.
 * It also conditionally renders children within a `PageLayout` based on the user's admin status.
 *
 * @param {ProtectedProps} props - The props passed to the Protected component.
 * @param {boolean} props.isLoggedIn - Determines if the user is authenticated.
 * @param {ReactNode} props.children - The child components to be rendered if access conditions are met.
 * @param {boolean} props.isAdmin - Determines if the authenticated user has admin privileges.
 * @returns {JSX.Element} - A JSX element that is either a redirection to the login page, the child components as is,
 * or the child components wrapped in a `PageLayout`, depending on the authentication and admin status.
 */
const Protected: FC<ProtectedProps> = ({
  isLoggedIn,
  children,
}): JSX.Element => {
  // Redirects to the login page if the user is not logged in.
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  // Wraps the child components in a PageLayout if the user is logged in but does not have admin privileges.
  return <PageLayout>{children}</PageLayout>;
};

export default Protected;
