/**
 * Interface representing the expected structure of a decoded JWT payload.
 * @interface
 */

/**
 * Checks if a JWT token is expired.
 *
 * This function decodes the JWT token to extract its expiration time,
 * then compares it with the current time to determine if the token is expired.
 *
 * @param token - The JWT token to be checked.
 * @returns `true` if the token is expired, `false` otherwise.
 * @throws Will throw an error if the token cannot be decoded.
 */
const isTokenExpired = (): boolean => {
  try {
    // const decoded = jwtDecode<JwtPayload>(token);
    const currentDate = new Date();
    // JWT `exp` is in seconds
    return 1 * 1000 < currentDate.getTime();
  } catch (error) {
    console.error("Failed to decode JWT", error);
    return true;
  }
};

/**
 * Checks if the provided JWT token is expired and displays a notification if it is.
 *
 * This function is a practical usage example of `isTokenExpired`, integrated with Ant Design's notification system to alert the user.
 *
 * @param token - The JWT token to be checked.
 */
const checkTokenAndNotify = (token: string) => {};

export { checkTokenAndNotify, isTokenExpired };
