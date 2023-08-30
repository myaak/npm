import { useCallback, useEffect, useState } from "react";

type DocumentVisibilityHook = {
  count: number;
  visible: boolean;
  onVisibilityChange: (callback: (visible: boolean) => void) => () => void;
};

export type CallbackFunction = (visible: boolean) => void;

export const useDocumentVisibility: () => DocumentVisibilityHook = () => {
  const isDocumentHidden = typeof document === "object" ? document.hidden : true;

  const [count, setCount] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(!isDocumentHidden);

  const onVisibilityChange = useCallback(
    (callback: CallbackFunction) => {
      const wrapperCallback = () => callback(!isDocumentHidden);
      document.addEventListener("visibilitychange", wrapperCallback);

      return () => {
        document.removeEventListener("visibilitychange", wrapperCallback);
      };
    },
    [isDocumentHidden]
  );

  const visibilityChangeHandler = useCallback(() => {
    if (isDocumentHidden) setCount((prev) => prev + 1);
    setVisible(!isDocumentHidden);
  }, [isDocumentHidden]);

  useEffect(() => {
    document.addEventListener("visibilitychange", visibilityChangeHandler);

    return () => {
      document.removeEventListener("visibilitychange", visibilityChangeHandler);
    };
  }, [visibilityChangeHandler]);

  return { count, visible, onVisibilityChange };
};
