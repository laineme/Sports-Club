import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function checkUser(Component) {
  const Check = () => {
    const user = useSelector(state => state.reducers.currentUser);

    if (!user) {
      return <Redirect to="/" />;
    }
    return (
      <React.Fragment>
        <Component />
      </React.Fragment>
    );
  };
  return Check;
}
