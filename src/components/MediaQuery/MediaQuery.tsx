import { FC, ReactNode } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

type ResolutionString = `${number}dppx`;
interface MediaQueryOptions {
  orientation?: "portrait" | "landscape";
  minResolution?: number | ResolutionString;
  maxResolution?: number | ResolutionString;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

type MediaQueryProps = {
  children: ReactNode | ((media: boolean) => ReactNode);
} & AtLeastOne<MediaQueryOptions>;

const transformCamelCase = (key: string) => {
  return key.replace(/([A-Z])/g, "-$1").toLowerCase();
};

const mediaOptionsToQuery = (props: MediaQueryOptions) => {
  const optionMappings: { [key in keyof MediaQueryOptions]: (value: MediaQueryOptions[key]) => string } = {
    orientation: (value) => `(orientation: ${value})`,
    minWidth: (value) => `(${transformCamelCase("minWidth")}: ${value}px)`,
    maxWidth: (value) => `(${transformCamelCase("maxWidth")}: ${value}px)`,
    minHeight: (value) => `(${transformCamelCase("minHeight")}: ${value}px)`,
    maxHeight: (value) => `(${transformCamelCase("maxHeight")}: ${value}px)`,
    minResolution: (value) =>
      `(${transformCamelCase("minResolution")}: ${typeof value === "number" ? value + "dppx" : value})`,
    maxResolution: (value) =>
      `(${transformCamelCase("maxResolution")}: ${typeof value === "number" ? value + "dppx" : value})`
  };

  return Object.entries(props)
    .filter(([key, value]) => value !== undefined && optionMappings[key as keyof MediaQueryOptions])
    .map(([key, value]) => optionMappings[key as keyof MediaQueryOptions]?.(value!))
    .join(" and ");
};

const MediaQuery: FC<MediaQueryProps> = ({ children, ...query }) => {
  const media = useMediaQuery({ query: mediaOptionsToQuery(query) });
  return typeof children === "function" ? <>{children(media)}</> : media ? <>{children}</> : null;
};

export default MediaQuery;
