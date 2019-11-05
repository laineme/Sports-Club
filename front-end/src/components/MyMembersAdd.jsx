import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container, Button, Form, Grid, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { addUser } from '../api/users';

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

const MyMembersAddStructure = ({ className, history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(undefined);
  const [error, setError] = useState(undefined);

  // for redux
  const dispatch = useDispatch();

  const user = useSelector(state => state.reducers.currentUser);

  if (user.role !== 0) {
    return <Redirect to="/" />;
  }

  const clearForm = () => {
    setUsername('');
    setPassword('');
    setEmail('');
    setFirstname('');
    setLastname('');
    setPhone('');
  };

  const register = () => {
    dispatch(
      addUser(username, email, password, firstname, lastname, phone),
    ).then(result => {
      if (result.status === 'success') {
        setUsername('');
        setPassword('');
        setEmail('');
        setFirstname('');
        setLastname('');
        setPhone('');
        setMessage('Successfully created new user information.');
      } else {
        setError('Failed to add new user information. Please try again.');
      }
    });
  };

  return (
    <div className={className}>
      <Container>
        <Div>
          <Grid>
            <Grid.Column mobile={16} tablet={8} computer={5}>
              <Segment raised>
                {message ? <MessageDiv>{message}</MessageDiv> : null}
                {error ? <ErrorDiv>{error}</ErrorDiv> : null}
                <Form onSubmit={register}>
                  <h1>Add a new member</h1>
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
                  <Button
                    basic
                    type="button"
                    color="black"
                    onClick={() => clearForm()}
                  >
                    Clear
                  </Button>
                  <Button
                    type="submit"
                    floated="right"
                    color="black"
                    style={{ backgroundColor: '#182e4d' }}
                  >
                    Send
                  </Button>
                  <Button
                    basic
                    type="button"
                    color="black"
                    floated="right"
                    onClick={() => history.push('/members')}
                  >
                    Back
                  </Button>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid>
        </Div>
      </Container>
    </div>
  );
};

const MyMembersAdd = styled(MyMembersAddStructure)`
  width: 100%;
  height: 100vh;
`;

MyMembersAddStructure.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object,
};

export default MyMembersAdd;
