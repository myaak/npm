import { useCallback, useEffect, useState } from "react";

interface useMediaQueryProps {
  query: string;
}

export const useMediaQuery = ({ query }: useMediaQueryProps) => {
  const isMatch = () => {
    return typeof window === "object" ? window.matchMedia(query).matches : false;
  };

  const [matchWindowSize, setMatchWindowSize] = useState<boolean>(isMatch());

  const changeEventHandler = useCallback(() => {
    const mediaQuery = window.matchMedia(query);
    setMatchWindowSize(mediaQuery.matches);
  }, [query]);

  useEffect(() => {
    const mediaWindow = window.matchMedia(query);
    mediaWindow.addEventListener("change", changeEventHandler);

    return () => {
      mediaWindow.removeEventListener("change", changeEventHandler);
    };
  }, [query, changeEventHandler]);

  return matchWindowSize;
};
