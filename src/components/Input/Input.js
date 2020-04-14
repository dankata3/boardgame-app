import React from 'react';

const input = (props) => {
  const {
    label,
    inputtype,
    items,
    name,
    type,
    value,
    errorMessage,
    changed,
    invalid,
    touched,
  } = props;
  let inputElement;
  const inputClasses = ['form-control'];
  // let errorMessage;

  if (invalid && touched) {
    inputClasses.push('input-error');
    // errorMessage = 'Select another player';
  }

  switch (inputtype) {
    case 'input':
      inputElement = (
        <input
          // className={`form-control ${touched && !valid ? 'input-error' : null}`}
          className={inputClasses.join(' ')}
          value={value}
          onChange={changed}
          type={type}
          name={name}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          value={value}
          onChange={changed}
          name={name}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={value}
          onChange={changed}
          name={name}
        >
          <option value="">{invalid ? errorMessage : '-'}</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          value={value}
          name={name}
          onChange={changed}
          type={type}
        />
      );
  }

  return (
    <div>
      <label htmlFor="">{label}</label>
      {inputElement}
    </div>
  );
};

export default input;
