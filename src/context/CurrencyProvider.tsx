import React from "react";
import {useCurrencySource, CurrencyContext} from "./CurrencyContext.tsx";

function CurrencyProvider({children}: { children: React.ReactNode }) {
  return (
    <CurrencyContext.Provider value={useCurrencySource()}>
      {children}
    </CurrencyContext.Provider>
  );
}

export default CurrencyProvider;
