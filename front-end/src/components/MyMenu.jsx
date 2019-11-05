import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const MainStructure = ({ className, activeItem }) => {
  const user = useSelector(state => state.reducers.currentUser);
  const history = useHistory();

  return (
    <div className={className}>
      <Menu stackable size="large" className="rdmenu">
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={() => history.push('/')}
        />
        {user ? (
          <Menu.Item
            name="courses"
            active={activeItem === 'courses'}
            onClick={() => history.push('/courses')}
          />
        ) : null}
        {user && user.role === 0 ? (
          <Menu.Item
            name="members"
            active={activeItem === 'members'}
            onClick={() => history.push('/members')}
          />
        ) : null}
        <Menu.Menu position="right">
          {user && user.username ? (
            <Menu.Item
              active={activeItem === 'profile'}
              onClick={() => history.push('/profile')}
            >
              <Icon name="user" />
            </Menu.Item>
          ) : null}
          {user ? (
            <Menu.Item
              name="logout"
              active={activeItem === 'logout'}
              onClick={() => history.push('/logout')}
            >
              <Icon name="sign out" />
            </Menu.Item>
          ) : (
            <Menu.Item
              active={activeItem === 'login'}
              onClick={() => history.push('/login')}
            >
              <Icon name="sign in" />
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </div>
  );
};

const RdNavBar = styled(MainStructure)`
  margin-top: 1rem;

  .rdmenu {
    background-color: #e7dee3;
  }

  .ui.menu .item {
    color: black;
  }
`;

MainStructure.propTypes = {
  activeItem: PropTypes.string,
  className: PropTypes.string,
};

export default RdNavBar;
