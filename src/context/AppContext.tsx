

import React, { createContext, useReducer, useContext, ReactNode } from "react";
 
// Search and Filters here !!!!!!!!!!!!!!!!!!!!!

interface AppState {
  searchQuery: string;
  filter: string; // type: tariff / event
  isSearchOpen: boolean;
  availability: string; // all / active / inactive
  sortOrder: string; // "" | "asc" | "desc"
}

type Action =
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_FILTER"; payload: string }
  | { type: "SET_SORT_ORDER"; payload: string }
  | { type: "SET_AVAILABILITY"; payload: string }
  | { type: "TOGGLE_SEARCH" }
  | { type: "CLOSE_SEARCH" };

// 🔹 Начальное состояние
const initialState: AppState = {
  searchQuery: "",
  filter: "",
  isSearchOpen: false,
  availability: "all", 
  sortOrder: "", 
};

// 🔹 Reducer-функция
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload };
    case "SET_AVAILABILITY":
      return { ...state, availability: action.payload };
    case "TOGGLE_SEARCH":
      return { ...state, isSearchOpen: !state.isSearchOpen };
    case "CLOSE_SEARCH":
      return { ...state, isSearchOpen: false, searchQuery: "" };
    default:
      return state;
  }
};


// 
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

// 🔹 Создаём Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// 🔹 Провайдер
const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// 🔹 Кастомный хук для удобного использования контекста
const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, useAppContext };
