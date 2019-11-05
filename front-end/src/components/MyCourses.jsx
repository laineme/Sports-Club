import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Div = styled.div`
  margin-top: 2rem;
`;

const CoursesStructure = ({ className }) => {
  return (
    <Div className={className}>
      <h2>Courses</h2>
    </Div>
  );
};

const MyCourses = styled(CoursesStructure)`
  width: 100%;
  height: 100vh;
`;

CoursesStructure.propTypes = {
  className: PropTypes.string,
};

export default MyCourses;
