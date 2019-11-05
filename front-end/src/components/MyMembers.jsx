import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dimmer, Grid, List, Loader, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { deleteUser, getUsers } from '../api/users';
import MyProfileEdit from './MyProfileEdit';

const Div = styled.div`
  margin-top: 2rem;
`;

const MyMembersStructure = ({ className, history }) => {
  const token = useSelector(state => state.reducers.token);
  const user = useSelector(state => state.reducers.currentUser);
  const users = useSelector(state => state.reducers.users);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [showUser, setShowUser] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch(); // for redux
  const [error, setError] = useState(undefined);

  useEffect(() => {
    dispatch(getUsers(token)).then(result => {
      if (result.status === 'success') {
        // console.log('success');
      } else {
        setError('Failed to get members information.');
      }
    });
  }, []);

  if (!users) {
    return (
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>
    );
  }

  const selectAndEdit = userid => {
    const editedUser = {
      id: userid,
      username: users[userid].username,
      email: users[userid].email,
      firstname: users[userid].firstname,
      lastname: users[userid].lastname,
      phone: users[userid].phone,
      role: users[userid].role,
    };
    setSelectedUser(editedUser);
    setShowEdit(true);
  };

  const selectAndDelete = userid => {
    const deletedUser = {
      id: userid,
      username: users[userid].username,
      email: users[userid].email,
      firstname: users[userid].firstname,
      lastname: users[userid].lastname,
      phone: users[userid].phone,
      role: users[userid].role,
    };
    setSelectedUser(deletedUser);
    setShowConfirm(true);
  };

  const deleteAccount = userid => {
    const loggedUser = user.id === userid;
    dispatch(deleteUser(token, userid, loggedUser)).then(result => {
      if (result.status === 'success') {
        // console.log('success');
        setSelectedUser(undefined);
        setShowConfirm(false);
        setShowUser(false);
      } else {
        // console.log('failure');
        // setError('Failed to change user information.');
      }
    });
  };

  const setShowEditFunc = doShow => {
    setShowEdit(doShow);
  };

  const usersList = [];

  const doUsersList = () => {
    for (const u in users) {
      usersList.push(
        <List.Item key={u}>
          <List.Content floated="right">
            <Button
              color="black"
              style={{ backgroundColor: '#182e4d' }}
              onClick={() => selectAndEdit(users[u].id)}
            >
              Edit
            </Button>
            <Button
              basic
              type="button"
              color="black"
              onClick={() => selectAndDelete(users[u].id)}
            >
              Delete
            </Button>
          </List.Content>
          <List.Content>
            <List.Header>{users[u].username}</List.Header>
          </List.Content>
        </List.Item>,
      );
    }
    return usersList;
  };

  doUsersList(usersList);

  return (
    <Div className={className}>
      <Button
        style={{ backgroundColor: '#e7dee3', marginBottom: '1rem' }}
        onClick={() => history.push('/addmember')}
      >
        Add a new member
      </Button>
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          {showEdit ? (
            <MyProfileEdit
              history={history}
              editedUser={selectedUser}
              setShowEdit={setShowEditFunc}
              isLoggedUser={false}
              loggedUserRole={user.role}
            />
          ) : null}
          {showConfirm ? (
            <Segment raised style={{ marginBottom: '1rem' }}>
              <List>
                <List.Item>
                  <List.Content>
                    <List.Header>Delete user?</List.Header>
                  </List.Content>
                  <Button
                    floated="right"
                    color="black"
                    style={{ backgroundColor: '#182e4d' }}
                    onClick={() => deleteAccount(selectedUser.id)}
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
          <Segment raised>
            <List divided verticalAlign="middle">
              {usersList}
            </List>
          </Segment>
        </Grid.Column>
      </Grid>
    </Div>
  );
};

const MyMembers = styled(MyMembersStructure)`
  width: 100%;
  height: 100vh;
`;

MyMembersStructure.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object,
};

export default MyMembers;
