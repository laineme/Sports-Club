import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Grid, List, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { deleteUser } from '../api/users';
import MyProfileEdit from './MyProfileEdit';

const Div = styled.div`
  margin-top: 2rem;
`;

const ProfileStructure = ({ className, history }) => {
  const token = useSelector(state => state.reducers.token);
  const user = useSelector(state => state.reducers.currentUser);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch(); // for redux

  const deleteAccount = () => {
    dispatch(deleteUser(token, user.id, true)).then(result => {
      if (result.status === 'success') {
        // console.log('success');
        history.push('/profile');
      } else {
        // console.log('no can do');
        // setError('Failed to change user information.');
      }
    });
  };

  const setShowEditFunc = doShow => {
    setShowEdit(doShow);
  };

  return (
    <Div className={className}>
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={5}>
          {showConfirm ? (
            <Segment raised style={{ marginBottom: '1rem' }}>
              <List>
                <List.Item>
                  <List.Content>
                    <List.Header>Delete user account?</List.Header>
                  </List.Content>
                  <Button
                    floated="right"
                    color="black"
                    style={{ backgroundColor: '#182e4d' }}
                    onClick={() => deleteAccount()}
                  >
                    Yes
                  </Button>
                  <Button
                    basic
                    type="button"
                    color="black"
                    floated="right"
                    onClick={() => setShowConfirm(false)}
                  >
                    No
                  </Button>
                </List.Item>
              </List>
            </Segment>
          ) : null}
          {showEdit ? (
            <MyProfileEdit
              history={history}
              editedUser={user}
              setShowEdit={setShowEditFunc}
              isLoggedUser
              loggedUserRole={user.role}
            />
          ) : null}
          <Segment raised>
            <h1>Profile</h1>
            <List>
              <List.Item>
                <List.Header>username</List.Header>
                {user.username}
              </List.Item>
              <List.Item>
                <List.Header>email</List.Header>
                {user.email}
              </List.Item>
              <List.Item>
                <List.Header>name</List.Header>
                {user.firstname ? `${user.firstname} ${user.lastname}` : '-'}
              </List.Item>
              <List.Item>
                <List.Header>phone</List.Header>
                {user.phone ? user.phone : '-'}
              </List.Item>
              <List.Item>
                <Button
                  basic
                  type="button"
                  color="black"
                  floated="right"
                  onClick={() => setShowConfirm(true)}
                >
                  Delete
                </Button>
                <Button
                  color="black"
                  style={{ backgroundColor: '#182e4d' }}
                  floated="right"
                  onClick={() => setShowEditFunc(true)}
                >
                  Edit
                </Button>
              </List.Item>
            </List>
          </Segment>
        </Grid.Column>
      </Grid>
    </Div>
  );
};

const MyProfile = styled(ProfileStructure)`
  width: 100%;
  height: 100vh;
`;

ProfileStructure.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object,
};

export default MyProfile;
