// Action types
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';
export const ERROR_TOKEN = 'ERROR_TOKEN';
export const RECEIVE_ADD_USER = 'RECEIVE_ADD_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';

/** Actions */

export const receiveToken = data => {
  return {
    type: RECEIVE_TOKEN,
    token: data.token,
    user: data.user,
    receivedAt: Date.now(),
  };
};

export const deleteToken = () => {
  return {
    type: DELETE_TOKEN,
    receivedAt: Date.now(),
  };
};

export const errorToken = error => {
  return {
    type: ERROR_TOKEN,
    receivedAt: Date.now(),
    error,
  };
};

export const receiveAddUser = () => {
  return {
    type: RECEIVE_ADD_USER,
    receivedAt: Date.now(),
  };
};

export const receiveUser = user => {
  return {
    type: RECEIVE_USER,
    receivedAt: Date.now(),
    user,
  };
};

export const receiveUsers = json => {
  return {
    type: RECEIVE_USERS,
    receivedAt: Date.now(),
    users: Object.keys(json).reduce((object, key) => {
      object[json[key]._id] = {
        id: json[key].id,
        username: json[key].username,
        email: json[key].email,
        firstname: json[key].firstname,
        lastname: json[key].lastname,
        phone: json[key].phone,
        fee: json[key].fee,
        role: json[key].role,
      };
      return object;
    }, {}),
  };
};
