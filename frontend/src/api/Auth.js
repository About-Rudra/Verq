export const verifyToken = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/verify', {
      credentials: 'include' // Sends cookies with the request
    });
    return response.ok; // Returns `true` if token is valid
  } catch (error) {
    return false; // Token is invalid/expired
  }
};