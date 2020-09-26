import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const user = useSelector((state) => state.user);

  let signedUser = false;

  if (user) {
    signedUser = true;
  }

  if (!signedUser && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (signedUser && !isPrivate) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  isPrivate: propTypes.bool,
  component: propTypes.oneOfType([propTypes.elementType, propTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
