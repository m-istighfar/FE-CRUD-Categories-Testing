import { useEffect, useState } from "react";

export function useLocalStorage(key: string) {
  const [data, setData] = useState<string | null>(null);

  const setLocalStorage = (data: string) => {
    window.localStorage.setItem(key, data);
    setData(data);
  };

  useEffect(() => {
    const localData = window.localStorage.getItem(key);
    if (localData) {
      setData(localData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, setLocalStorage];
}
