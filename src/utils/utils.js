class Utils {
  static mapObjectById(obj) {
    const objectMap = {};

    obj.forEach((prop) => (objectMap[prop.id] = prop));

    return objectMap;
  }

  static checkValidity(value, rules, players) {
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

    if (rules.different) {
      players.sort(
        (a, b) => (isValid = a.playerId.value !== b.playerId.value && isValid)
      );

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
  }
}

export default Utils;
