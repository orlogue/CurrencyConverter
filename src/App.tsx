import Converter from "./views/Converter/Converter.tsx";
import Costs from "./views/Costs/Costs.tsx";
import History from "./views/History/History.tsx";
import './App.module.scss'

function App() {

  return (
    <main>
      <Converter/>
      <Costs/>
      <History/>
    </main>
  )
}

export default App
