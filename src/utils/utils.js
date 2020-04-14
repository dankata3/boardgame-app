class Utils {
  static mapObjectById(obj) {
    const objectMap = {};

    obj.forEach((prop) => (objectMap[prop.id] = prop));

    return objectMap;
  }

  static checkValidity(value, rules, players = []) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.min) {
      isValid = value.length > 2 && isValid;
    }

    if (rules.different) {
      players.sort((a, b) => (isValid = a.id.value !== b.id.value));
    }

    return isValid;
  }
}

export default Utils;
