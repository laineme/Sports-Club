import React from 'react';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import MyHeader from './MyHeader';
import MyMenu from './MyMenu';
import MyNews from './MyNews';
import MyLogin from './MyLogin';
import MyCourses from './MyCourses';
import MyRegister from './MyRegister';
import MyMembersAdd from './MyMembersAdd';
import MyProfile from './MyProfile';
import MyMembers from './MyMembers';
import MyLogout from './MyLogout';

const MainStructure = ({ className }) => {
  const history = useHistory();
  const path = history.location.pathname;

  return (
    <div className={className}>
      <Container>
        <MyHeader />
        <MyMenu history={history} />
        {path === '/login' ? <MyLogin history={history} /> : null}
        {path === '/courses' ? <MyCourses history={history} /> : null}
        {path === '/profile' ? <MyProfile history={history} /> : null}
        {path === '/register' ? <MyRegister history={history} /> : null}
        {path === '/members' ? <MyMembers history={history} /> : null}
        {path === '/addmember' ? <MyMembersAdd history={history} /> : null}
        {path === '/logout' ? <MyLogout history={history} /> : null}
        {path === '/' ? <MyNews /> : null}
      </Container>
    </div>
  );
};

const Main = styled(MainStructure)`
  width: 100%;
  background: url(images/active-adult-blur-374678.jpg);
  background-size: cover;
  background-repeat: repeat;
`;

MainStructure.propTypes = {
  className: PropTypes.string,
};

export default connect(
  null,
  null,
)(Main);

/* background-color: ${({ theme }) => theme.palette.primary.main}; */
/* import { Container, Header, Loader } from 'semantic-ui-react'; */
/* <Loader active inline className="slow red" />
   <Loader active inline className="fast green" /> */
