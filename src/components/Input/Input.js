import React from 'react';

const input = (props) => {
  const {
    label,
    inputtype,
    items,
    name,
    type,
    value,
    changed,
    validation,
    touched,
  } = props;
  let inputElement;
  let errorMessage;
  const inputClasses = ['form-control'];

  if (validation && !validation.value && touched) {
    inputClasses.push('input-error');

    errorMessage = <p className="input-error-message">{validation.error}</p>;
  }

  switch (inputtype) {
    case 'input':
      inputElement = (
        <input
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
          <option value="">-</option>
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
    <div className="position-relative ">
      <label htmlFor="">{label}</label>
      {inputElement}
      {errorMessage}
    </div>
  );
};

export default input;
