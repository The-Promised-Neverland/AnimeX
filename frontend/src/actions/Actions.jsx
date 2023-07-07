import axios from "axios";

export const login = ({ email, password }) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "USER_LOGIN_REQUEST" });

      const config = {
        headers: {
          "Content-Type": "application/json",
          // This means when you're sending JSON to the server or receiving JSON from the server, you should always declare the Content-Type of the header as application/json as this is the standard that the client and server understand.
        },
      };

      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      ); // userControllerAuth expects email and password
      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: data,
      });
      localStorage.setItem(
        "userInfo",
        JSON.stringify(getState().userLogin.userInfo)
      ); // storing the userInfo in localStorage as JSON string
    } catch (error) {
      dispatch({
        type: "USER_LOGIN_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    await axios.get("api/users/logout");
    localStorage.removeItem("userInfo"); // removes the item from localstorage
    dispatch({
      type: "USER_LOGOUT",
    });
  };
};

export const register = ({
  email,
  password,
  displayName,
  photoURL,
  phoneNumber,
}) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "USER_REGISTER_REQUEST" });

      const config = {
        headers: {
          "Content-Type": "application/json",
          // This means when you're sending JSON to the server or receiving JSON from the server, you should always declare the Content-Type of the header as application/json as this is the standard that the client and server understand.
        },
      };

      await axios.put(
        "/api/users/register",
        { email, password, displayName, photoURL, phoneNumber },
        config
      ); // userControllerAuth expects email and password
      dispatch({
        type: "USER_REGISTER_SUCCESS",
      });

      dispatch({
        // logging the user right away
        type: "USER_LOGIN_SUCCESS",
        payload: { email, displayName, photoURL, phoneNumber },
      });

      localStorage.setItem(
        "userInfo",
        JSON.stringify(getState().userLogin.userInfo)
      ); // storing the userInfo in localStorage as JSON string
    } catch (error) {
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getAnimeList = ({ keyword }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ANIME_LIST_REQUEST" });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/getAllAnimes", 
        { keyword },
        config
      );
      dispatch({
        type: "ANIME_LIST_SUCCESS",
        payload: data ,
      });
    } catch (error) {
      dispatch({
        type: "ANIME_LIST_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
