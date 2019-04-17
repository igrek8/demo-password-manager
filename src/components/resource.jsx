import React from 'react';

const Resources = (props) => {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
};

export default Resources;
