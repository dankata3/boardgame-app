import { useState, useEffect } from 'react';

const useToggleForm = (isOpened) => {
  const [isFormOpened, setIsFormOpened] = useState(isOpened);

  const toggleForm = () => {
    setIsFormOpened(!isFormOpened);
  };

  return [isFormOpened, toggleForm];
};

export default useToggleForm;
