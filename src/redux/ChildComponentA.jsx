import React from 'react';

const ChildComponentA = ({ data }) => {
  return <div>Data in ComponentA: {JSON.stringify(data)}</div>;
};

export default ChildComponentA;