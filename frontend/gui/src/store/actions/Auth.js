import * as ActionsTypes from "./ActionTypes";
import axios from "axios";

export const authStart = () => {
    return {
        type: ActionsTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type: ActionsTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFailed = (error) => {
    return {
        type: ActionsTypes.AUTH_FAILED,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("expirationdate");
    return {
        type: ActionsTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeOut = (expirationtime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationtime*1000);
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post("http://127.0.0.1:8000/rest-auth/login/", {
            username: username,
            password: password
        })
        .then((res) => {
            const token = res.data.key;
            const expirationdate = new Date(new Date().getTime() + 3600*1000);
            localStorage.setItem("token", token);
            localStorage.setItem("expirationdate", expirationdate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeOut(3600));
        })
        .catch(err => {
            dispatch(authFailed(err));
        })
    }
}

export const authSignUp = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post("http://localhost:8000/rest-auth/registration/", {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then((res) => {
            const token = res.data.key;
            const expirationdate = new Date(new Date().getTime() + 3600*1000);
            localStorage.setItem("token", token);
            localStorage.setItem("expirationdate", expirationdate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeOut(3600));
        })
        .catch(err => {
            dispatch(authFailed(err));
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (token === undefined){
            dispatch(logout());
        } else {
            const expirationdate = new Date(localStorage.getItem("expirationdate"));
            if (expirationdate <= new Date()) {
                dispatch(logout());
            }
            else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeOut((expirationdate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}