export const mapObject = (obj) => {
  const objectMap = {};

  obj.forEach((prop) => (objectMap[prop.id] = prop));

  return objectMap;
};

export const checkValidity = (value, rules, isPlayerSelectedTwice = false) => {
  let isValid = true;
  let error = null;

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;

    if (!isValid) {
      error = 'Please enter a value!';

      return {
        value: isValid,
        error,
      };
    }
  }

  if (rules.min) {
    isValid = value.length > 2 && isValid;

    if (!isValid) {
      error = 'Input value must be longer than 2 letters!';

      return {
        value: isValid,
        error,
      };
    }
  }

  if (rules.numeric) {
    const numericValue = +value;
    isValid = Number.isInteger(numericValue) && numericValue >= 0 && isValid;

    if (!isValid) {
      error = 'Input value must be a number!';

      return {
        value: isValid,
        error,
      };
    }
  }

  if (rules.different) {
    if (isPlayerSelectedTwice) {
      isValid = !isPlayerSelectedTwice && isValid;
    }

    if (!isValid) {
      error = 'Please select unselected player!';

      return {
        value: isValid,
        error,
      };
    }
  }
  return {
    value: isValid,
    error,
  };
};

export const validateForm = (formObject) => {
  let isFormValid = true;
  debugger;
  for (let inputIdentifier in formObject) {
    const inputField = formObject[inputIdentifier];
    if (!inputField.validation && !Array.isArray(inputField)) {
      continue;
    }

    if (!Array.isArray(inputField)) {
      isFormValid = inputField.valid.value && isFormValid;
      if (!isFormValid) {
        break;
      }
    } else {
      inputField.map((input) => {
        for (let nestedInput in input) {
          isFormValid = input[nestedInput].valid.value && isFormValid;
        }
      });
      if (!isFormValid) {
        break;
      }
    }
  }
  return isFormValid;
};

export const createItemObject = (value, validationRules) => {
  let rules = {};
  let itemObject = {};

  if (validationRules.length) {
    for (let rule of validationRules) {
      rules[rule] = true;
    }

    itemObject = {
      value,
      validation: rules,
      valid: {
        value: false,
        error: null,
      },
      touched: false,
    };
  } else {
    itemObject = {
      value,
    };
  }

  return itemObject;
};

export const inputChangeHandler = (
  value,
  inputIdentifierState,
  setInputIdentifierState
) => {
  const newObjectItem = { ...inputIdentifierState };
  debugger;
  newObjectItem.touched = true;
  newObjectItem.value = value;

  if (newObjectItem.validation) {
    newObjectItem.valid = checkValidity(value, newObjectItem.validation);
  }

  setInputIdentifierState(newObjectItem);
};

export const openConfirmDeleteDialog = (item, id, func) => {
  window.confirm(`Do you like to remove this ${item}?`) ? func(id) : null;
};
