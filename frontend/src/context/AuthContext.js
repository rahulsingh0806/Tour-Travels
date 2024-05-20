import { createContext, useEffect, useReducer } from "react";

const getInitialState = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      return {
        user: JSON.parse(storedUser),
        loading: false,
        error: null,
      };
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return {
        user: null,
        loading: false,
        error: null,
      };
    }
  } else {
    return {
      user: null,
      loading: false,
      error: null,
    };
  }
};

const initialState = getInitialState();

export const AuthContext = createContext(initialState);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        user: null,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    if (state.user) {
      window.localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      window.localStorage.removeItem("user");
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
