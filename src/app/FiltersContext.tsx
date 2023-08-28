import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Department } from "../__generated__/generatedTypes";

export interface IFiltersContext {
  filter: Department | null;
  selectFilter: (filter: Department) => void;
  resetFilter: () => void;
}
const emptyFunction = () => ({});

export const defaultFiltersContext = {
  filter: null,
  selectFilter: emptyFunction,
  resetFilter: emptyFunction,
};

export const FiltersContext = createContext<IFiltersContext>(
  defaultFiltersContext
);

export const useFilters = (): IFiltersContext => useContext(FiltersContext);

export const FiltersContextProvider: FunctionComponent = ({ children }) => {
  const [filter, setFilter] = useState<Department | null>(
    defaultFiltersContext.filter
  );

  const resetFilter = useCallback(() => setFilter(null), []);
  const contextValue = useMemo(
    () => ({
      filter,
      selectFilter: setFilter,
      resetFilter,
    }),
    [filter, setFilter, resetFilter]
  );
  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};
