import Converter from "./views/Converter/Converter.tsx";
import Costs from "./views/Costs/Costs.tsx";
import History from "./views/History/History.tsx";
import styles from './App.module.scss'
import CurrencyProvider from "./context/CurrencyProvider.tsx";

// import { useState } from "react";

function App() {
  // const [costsHidden, setCostsHidden] = useState(false)
  // const [historyHidden, setHistoryHidden] = useState(false)

  return (
    <CurrencyProvider>
      <main className={styles.wrapper}>
        <div className={styles['flex-column']}>
          <Converter/>
          <Costs/>
        </div>
        <History/>
      </main>
    </CurrencyProvider>
  );
}

export default App
