import Converter from "./views/Converter/Converter.tsx";
import Costs from "./views/Costs/Costs.tsx";
import History from "./views/History/History.tsx";
import styles from './App.module.scss'
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner.tsx";
import { useCurrency } from "./context/CurrencyContext.tsx";

function App() {
  const { isLoading } = useCurrency();

  return (
    <main className={styles.wrapper}>
      {isLoading ?
        <LoadingSpinner></LoadingSpinner> :
        <>
          <div className={styles['flex-column']}>
            <Converter/>
            <Costs/>
          </div>
          <History/>
        </>
      }
    </main>
  );
}

export default App
