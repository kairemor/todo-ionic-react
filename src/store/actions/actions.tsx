import axios from "axios";
import * as actionType from "./actions_types";
import {
  baseSite
} from '../../config'



export const authStart = () => {
  return {
    type: actionType.AUTH_START
  };
};
export const authSuccess = (user: any) => {
  return {
    type: actionType.AUTH_SUCCESS,
    user
  };
};

export const authFail = (error: any) => {
  return {
    type: actionType.AUTH_FAIL,
    error: error
  };
};

export const authLogout = () => {
  localStorage.removeItem("user");
  return {
    type: actionType.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime: any) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};


export const authRegister = (username: any, email: any, password: any) => {
  return (dispatch: any) => {
    dispatch(authStart());
    axios
      .post(`${baseSite}/users/signup`, {
        username: username,
        email: email,
        password: password
      })
      .then(res => {
        if (res.data.error) {
          dispatch(authFail(res.data.error))
        } else {
          const user = {
            // username: res.data.user.username,
            token: res.data.token,
            expirationDate: new Date(new Date().getTime() + 3600 * 1000),
          }
          localStorage.setItem("user", JSON.stringify(user));
          dispatch(authSuccess(user));
          dispatch(checkAuthTimeout(3600));
        }
      })
      .catch(err => {
        dispatch(authFail("Nom utilisateur ou email deja pris"));
        console.log(err)
      });
  };
};

export const authCheckState = (dispatch: any) => {
  const storage: any = localStorage.getItem("user");
  const user = JSON.parse(storage);
  if (user) {
    if (user.token === undefined) {
      dispatch(authLogout());
    } else {
      const expirationDate = user.expirationDate;
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        dispatch(authSuccess(user));
        // dispatch(
        //   checkAuthTimeout(
        //     (new Date(expirationDate).getTime() - new Date().getTime()) / 1000
        //   )
        // );
      }
    }

  };
};