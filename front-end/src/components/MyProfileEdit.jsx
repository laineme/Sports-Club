import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Form, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { editUser } from '../api/users';

const Div = styled.div`
  margin-top: 2rem;
`;

const MessageDiv = styled.div`
  margin-bottom: 2rem;
  color: green;
`;

const ErrorDiv = styled.div`
  margin-bottom: 2rem;
  color: red;
`;

const ProfileStructure = ({
  className,
  history,
  editedUser,
  isLoggedUser,
  loggedUserRole,
  setShowEdit,
}) => {
  const token = useSelector(state => state.reducers.token);
  // const user = useSelector(state => state.reducers.currentUser);
  const path = history.location.pathname;
  const [userid, setUserid] = useState(editedUser.id);
  const [username, setUsername] = useState(editedUser.username);
  const [email, setEmail] = useState(editedUser.email);
  const [firstname, setFirstname] = useState(editedUser.firstname);
  const [lastname, setLastname] = useState(editedUser.lastname);
  const [role, setRole] = useState(editedUser.role);
  const [phone, setPhone] = useState(editedUser.phone);
  const [message, setMessage] = useState(undefined);
  const [error, setError] = useState(undefined);

  // for redux
  const dispatch = useDispatch();

  const edit = () => {
    dispatch(
      editUser(
        token,
        editedUser.id,
        username,
        email,
        firstname,
        lastname,
        phone,
        role,
        isLoggedUser,
      ),
    ).then(result => {
      if (result.status === 'success') {
        setShowEdit(false);
      } else {
        setError('Failed to change user information.');
      }
    });
  };

  return (
    <Div className={className}>
      <Segment raised>
        {message ? <MessageDiv>{message}</MessageDiv> : null}
        {error ? <ErrorDiv>{error}</ErrorDiv> : null}
        <Form onSubmit={edit}>
          <Form.Input
            label="username"
            name="username"
            value={username}
            placeholder="username"
            onChange={(e, { name, value }) => setUsername(value)}
          />
          <Form.Input
            label="email"
            name="email"
            value={email}
            placeholder="email"
            onChange={(e, { name, value }) => setEmail(value)}
          />
          <Form.Input
            label="first name"
            name="first name"
            value={firstname}
            placeholder="first name"
            onChange={(e, { name, value }) => setFirstname(value)}
          />
          <Form.Input
            label="last name"
            name="last name"
            value={lastname}
            placeholder="last name"
            onChange={(e, { name, value }) => setLastname(value)}
          />
          <Form.Input
            label="phone"
            name="phone"
            value={phone}
            placeholder="phone"
            onChange={(e, { name, value }) => setPhone(value)}
          />
          {path === '/members' ? (
            <React.Fragment>
              <Form.Radio
                label="admin"
                name="radioGroup"
                value="0"
                checked={role === 0}
                onChange={() => setRole(0)}
              />
              <Form.Radio
                label="member"
                name="radioGroup"
                value="1"
                checked={role === 1}
                onChange={() => setRole(1)}
              />
            </React.Fragment>
          ) : null}
          <Button
            basic
            type="button"
            color="black"
            onClick={() => setShowEdit(false)}
          >
            Back
          </Button>
          <Button
            type="submit"
            floated="right"
            color="black"
            style={{ backgroundColor: '#182e4d' }}
          >
            Send
          </Button>
        </Form>
      </Segment>
    </Div>
  );
};

const MyProfileEdit = styled(ProfileStructure)`
`;

ProfileStructure.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object,
  setShowEdit: PropTypes.func,
  editedUser: PropTypes.object,
  isLoggedUser: PropTypes.bool,
  loggedUserRole: PropTypes.number,
};

export default MyProfileEdit;
