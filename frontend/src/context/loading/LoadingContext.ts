import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

interface ILoadingContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const LoadingContext = createContext<ILoadingContext>({
  isLoading: false,
  setIsLoading: () => {},
});
export const useLoading = () => useContext(LoadingContext);
