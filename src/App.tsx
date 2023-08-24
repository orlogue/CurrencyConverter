import Converter from "./views/Converter/Converter.tsx";
import Costs from "./views/Costs/Costs.tsx";
import History from "./views/History/History.tsx";
import './App.module.scss'
import CurrencyProvider from "./context/CurrencyProvider.tsx";

function App() {
  return (
    <CurrencyProvider>
      <main>
        <Converter/>
        <Costs/>
        <History/>
      </main>
    </CurrencyProvider>
  );
}

export default App
