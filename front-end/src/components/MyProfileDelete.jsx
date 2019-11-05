import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Grid, List, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { deleteUser } from '../api/users';
import { deleteToken } from '../redux/actions';

const Div = styled.div`
  margin-top: 2rem;
`;

const MyProfileDeleteStructure = ({ className, history }) => {
  const token = useSelector(state => state.reducers.token);
  const user = useSelector(state => state.reducers.currentUser);

  // for redux
  const dispatch = useDispatch();

  if (!user.username) {
    return <Redirect to="/" />;
  }

  const deleteAccount = () => {
    dispatch(deleteUser(token, user.id, true)).then(result => {
      if (result.status === 'success') {
        console.log('success');
        history.push('/profile');
      } else {
        console.log('no can do');
        // setError('Failed to change user information.');
      }
    });
  };

  return (
    <Div className={className}>
      <Grid centered>
        <Grid.Column mobile={16} tablet={8} computer={5}>
          <Segment raised>
            <List>
              <h1>Delete user</h1>
              <List.Item>
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
                  onClick={() => history.goBack()}
                >
                  No
                </Button>
              </List.Item>
            </List>
          </Segment>
        </Grid.Column>
      </Grid>
    </Div>
  );
};

const MyProfileDelete = styled(MyProfileDeleteStructure)`
  width: 100%;
  height: 100vh;
`;

MyProfileDeleteStructure.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object,
};

export default MyProfileDelete;
