import React from 'react';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import MyHeader from './MyHeader';
import MyMenu from './MyMenu';
import MyNews from './MyNews';

const MainStructure = ({ className }) => {
  const history = useHistory();

  return (
    <div className={className}>
      <Container>
        <MyHeader />
        <MyMenu history={history} />
        <MyNews />
      </Container>
    </div>
  );
};

const Home = styled(MainStructure)`
  width: 100%;
  background: url(images/active-adult-blur-374678.jpg);
  background-size: cover;
  background-repeat: repeat;
`;

MainStructure.propTypes = {
  className: PropTypes.string,
};

export default Home;

/* background-color: ${({ theme }) => theme.palette.primary.main}; */
/* import { Container, Header, Loader } from 'semantic-ui-react'; */
/* <Loader active inline className="slow red" />
   <Loader active inline className="fast green" /> */
