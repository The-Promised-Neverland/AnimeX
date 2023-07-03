export const userLoginReducer = (state = {}, action) => {
  // empty object
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true, userInfo: null };

    case "USER_LOGIN_SUCCESS":
      return { loading: false, userInfo: action.payload }; // no more loading and action.payload is data passed from action to reducer

    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload }; // no more loading and returning error to reducer

    case "USER_LOGOUT":
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  // empty object
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true, userInfo: null };

    case "USER_REGISTER_SUCCESS":
      return { loading: false }; // no more loading and action.payload is data passed from action to reducer

    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload }; // no more loading and returning error to reducer

    default:
      return state;
  }
};

export const animeReducer = (state = { animeList: {}, loading: true }, action) => {
  switch (action.type) {
    case "ANIME_LIST_REQUEST":
      return { loading: true, animeList: {} };

    case "ANIME_LIST_SUCCESS":
      return { loading: false, animeList: action.payload };

    case "ANIME_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
