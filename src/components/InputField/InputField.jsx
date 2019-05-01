import React from 'react';

const InputField = props => {
  const { id, type, value, handleChange } = props;
 
  return(
    <div className='container'>
      <input 
        id={id}
        type={type} 
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputField;
