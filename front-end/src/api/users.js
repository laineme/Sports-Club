import axios from 'axios';
import {
  receiveToken,
  deleteToken,
  receiveAddUser,
  receiveUser,
  receiveUsers,
  errorToken,
} from '../redux/actions';

export function authenticateUser(username, password) {
  return dispatch =>
    new Promise((resolve, reject) => {
      axios
        .post('/api/login', {
          username,
          password,
        })
        .then(result => {
          if (result.status === 200) {
            dispatch(receiveToken(result.data));
            resolve({ status: 'success' });
          } else {
            dispatch(errorToken(result.error.toString()));
            resolve('failed');
          }
        })
        .catch(error => {
          dispatch(errorToken(error.toString()));
          resolve({ status: 'failed' });
        });
    });
}

export function addUser(username, email, password, firstname, lastname, phone) {
  return dispatch =>
    new Promise((resolve, reject) => {
      axios
        .post('/api/users', {
          username,
          email,
          password,
          firstname,
          lastname,
          phone,
        })
        .then(result => {
          if (result.status === 201) {
            dispatch(receiveAddUser(result.data));
            resolve({ status: 'success' });
          } else {
            resolve('failed');
          }
        })
        .catch(error => {
          resolve({ status: 'failed' });
        });
    });
}

export function getUsers(token) {
  const AuthStr = 'Bearer '.concat(token);
  return dispatch =>
    new Promise((resolve, reject) => {
      axios
        .get('/api/users', {
          headers: { Authorization: AuthStr },
        })
        .then(result => {
          if (result.status === 200) {
            dispatch(receiveUsers(result.data));
            resolve({ status: 'success' });
          } else {
            resolve('failed');
          }
        })
        .catch(error => {
          resolve({ status: 'failed' });
        });
    });
}

export function editUser(
  token,
  userurl,
  username,
  email,
  firstname,
  lastname,
  phone,
  role,
  isLoggedUser,
) {
  const AuthStr = 'Bearer '.concat(token);

  return dispatch =>
    new Promise((resolve, reject) => {
      axios
        .put(
          `/api/users/${userurl}`,
          {
            username,
            email,
            firstname,
            lastname,
            phone,
            role,
          },
          {
            headers: { Authorization: AuthStr },
          },
        )
        .then(result => {
          if (result.status === 200) {
            if (isLoggedUser) {
              dispatch(receiveUser(result.data));
            } else {
              dispatch(getUsers(token));
            }
            resolve({ status: 'success' });
          } else {
            resolve('failed');
          }
        })
        .catch(error => {
          resolve({ status: 'failed' });
        });
    });
}

export function deleteUser(token, userurl, isLoggedUser) {
  const AuthStr = 'Bearer '.concat(token);
  return dispatch =>
    new Promise((resolve, reject) => {
      axios
        .delete(
          `/api/users/${userurl}`,
          {
            headers: { Authorization: AuthStr },
          },
          {
            userurl,
          },
        )
        .then(result => {
          if (result.status === 200) {
            if (isLoggedUser) {
              dispatch(deleteToken());
            } else {
              dispatch(getUsers(token));
            }
            resolve({ status: 'success' });
          } else {
            resolve('failed');
          }
        })
        .catch(error => {
          resolve({ status: 'failed' });
        });
    });
}
