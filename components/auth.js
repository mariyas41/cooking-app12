import React from 'react';
import Router from 'next/router';

const withAuth = (WrappedComponent) => {
  return class extends React.Component {
    componentDidMount() {
      const sessionId = localStorage.getItem('session_id');

      if (!sessionId) {
        Router.push('/login'); // redirect to login if no session
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withAuth;
