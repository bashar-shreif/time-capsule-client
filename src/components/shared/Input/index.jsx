import React, { useState } from 'react';


const Input = ({ name, hint, required, onChangeListener }) => {
  return (
    <input
      type="text"
      name={name}
      placeholder={hint}
      className="auth-custom-input"
      required={required}
      onChange={onChangeListener}
    />
  );
};


export default Input