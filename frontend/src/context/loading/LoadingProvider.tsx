import { useState, type PropsWithChildren } from "react";
import { LoadingContext } from "./LoadingContext";

const LoadingProvider = (props: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {props.children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
