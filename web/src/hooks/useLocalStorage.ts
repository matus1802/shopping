const LS_PREFIX = 'shopping';

const keyWithPrefix = (key: string) => `${LS_PREFIX}_${key}`;

function useLocalStorage() {
  const getValue = (key: string) => {
    try {
      const item = window.localStorage.getItem(keyWithPrefix(key));
      return item ? item : null;
    } catch (error) {
      return null;
    }
  };

  const setValue = (key: string, value: string | null) => {
    if (value) {
      window.localStorage.setItem(keyWithPrefix(key), value);
    } else {
      window.localStorage.removeItem(keyWithPrefix(key));
    }
  };

  return { getValue, setValue };
}

export default useLocalStorage;
