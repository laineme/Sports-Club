import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';

const MyLoginModal = () => {
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [modal, setModal] = useState(true);

  const error = useSelector(state => state.reducers.error);
  const user = useSelector(state => state.reducers.currentUser);

  if (user.username) {
    return <Redirect to="/" />;
  }

  let header = '';
  let content = '';

  if (error) {
    header = 'Error';
    content = 'Login failed. Please try again.';

    return (
      <div>
        <Modal size="mini" open={modal} onClose={() => history.push('/')}>
          <Modal.Header>{header}</Modal.Header>
          <Modal.Content>
            <p>{content}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => history.push('/')}>
              No
            </Button>
            <Button
              positive
              content="Yes"
              onClick={() => history.push('/login')}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
  return null;
};

export default MyLoginModal;
