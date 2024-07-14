import apiService from "./apiService";

//this function is used to check if the user is authorized
export const authenticateUser = async (username: string, password: string) => {
  try {
    const response = await apiService.post("/api/auth/authenticate", {
      userName: username,
      password: password,
    });
    //response status = 200 'OK'
    return response.data;
  } catch (error) {
    //response status = 401 'Unauthorized'
    throw new Error("Unauthorized: Incorrect username or password.");
  }
};
