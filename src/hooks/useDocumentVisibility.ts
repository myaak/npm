import { useCallback, useEffect, useState } from "react";

export const useDocumentVisibility = () => {
  const isDocumentVisible = (): boolean => {
    return typeof document === "object" ? !document.hidden : false;
  };

  const [count, setCount] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(isDocumentVisible());

  const onVisibilityChange = useCallback((callback: (visible: boolean) => void) => {
    const wrapperCallback = () => callback(!document.hidden);
    document.addEventListener("visibilitychange", wrapperCallback);

    return () => {
      document.removeEventListener("visibilitychange", wrapperCallback);
    };
  }, []);

  const visibilityChangeHandler = useCallback(() => {
    if (document.hidden) setCount((prev: number) => prev + 1);
    setVisible(!document.hidden);
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", visibilityChangeHandler);

    return () => {
      document.removeEventListener("visibilitychange", visibilityChangeHandler);
    };
  }, [visibilityChangeHandler]);

  return { count, visible, onVisibilityChange };
};
