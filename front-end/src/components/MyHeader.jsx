import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import respondTo from '../functions/respondTo';

const H1 = styled.h1`
  font-size: 20px;

  ${respondTo.xs`
  font-size: 30px;
  `}

  ${respondTo.s`
  font-size: 40px;
  `}
  
  ${respondTo.m`
  font-size: 60px;
  `}

  font-weight: 300px,
`;

const H4 = styled.h1`
  font-size: 10px;
  
  ${respondTo.xs`
  font-size: 15px;
  `}

  ${respondTo.s`
  font-size: 20px;
  `}
  
  ${respondTo.m`
  font-size: 30px;
  `}

  font-weight: 300px,
`;

const Div1 = styled.div`
  display: flex;
`;

const HeaderStructure = ({ className }) => {
  return (
    <Div1 className={className}>
      <div>
        <H1>Sports Club</H1>
      </div>
      <div>
        <H4>running is fun</H4>
      </div>
    </Div1>
  );
};

const MyHeader = styled(HeaderStructure)``;

HeaderStructure.propTypes = {
  className: PropTypes.string,
};

export default MyHeader;
