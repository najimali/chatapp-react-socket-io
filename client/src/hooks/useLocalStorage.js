import { useState, useEffect } from "react";

// We are creating a local storage so that our Id persistate
//@params:
// key- It is going to what we stire inside a local storage
// initialValue - It is what we are passing to useState it is string for id & array for contacts & conversations.

const PREFIX = "chatapp-react-";
function useLocalStorage(key, initialValue) {
  // PREFIX is add to avoid conflict from different Projects.
  const prefixedKey = PREFIX + key;
  // Code to get value from local storage & put into our state
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) {
      if (jsonValue === "undefined") {
        return null;
      } else {
        return JSON.parse(jsonValue);
      }
    }
    if (typeof initialValue === "function") return initialValue();
    else return initialValue;
  });

  // Anytime our value changed or prefixedKey changed then we reput our value into localStorage
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}

export default useLocalStorage;
