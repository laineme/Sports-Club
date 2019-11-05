import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { authenticateUser } from '../api/users';

const Div = styled.div`
  margin-top: 2rem;
`;

const MessageDiv = styled.div`
  margin-bottom: 2rem;
  color: red;
`;

const P = styled.p`
  font-weight: bold;
`;

const LoginStructure = ({ className, history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(undefined);

  // for redux
  const dispatch = useDispatch();

  const login = () => {
    dispatch(authenticateUser(username, password)).then(result => {
      if (result.status === 'success') {
        history.push('/');
      } else {
        setMessage('Login failed. Please try again.');
      }
    });
  };

  return (
    <Div className={className}>
      <Grid centered>
        <Grid.Column mobile={16} tablet={8} computer={5}>
          <Segment raised>
            <h1>Login</h1>
            {message ? <MessageDiv>{message}</MessageDiv> : null}
            <Form onSubmit={login}>
              <Form.Input
                label="username"
                name="username"
                value={username}
                placeholder="username"
                onChange={(e, { name, value }) => setUsername(value)}
              />
              <Form.Input
                label="password"
                name="password"
                value={password}
                type="password"
                placeholder="password"
                onChange={(e, { name, value }) => setPassword(value)}
              />
              <Button
                type="submit"
                color="black"
                style={{ backgroundColor: '#182e4d' }}
              >
                Login
              </Button>
              <Divider />
            </Form>
            <P>or</P>
            <Form>
              <Button
                basic
                type="button"
                color="black"
                onClick={() => history.push('/register')}
              >
                Register
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </Div>
  );
};

const MyLogin = styled(LoginStructure)`
  width: 100%;
  height: 100vh;
`;

LoginStructure.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object,
};

export default MyLogin;
