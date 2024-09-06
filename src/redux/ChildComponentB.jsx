import React from 'react';

const ChildComponentB = ({ data }) => {
  return <div>Data in ComponentB: {JSON.stringify(data)}</div>;
};

export default ChildComponentB;