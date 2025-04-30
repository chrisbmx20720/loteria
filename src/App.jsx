import { BrowserRouter } from "react-router-dom"
import AppRouting from './routes/AppRouting'
import './App.css'


function App() {
  return (
  
      <>
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        
        <div className="flex-grow-1">
          <AppRouting />
        </div>
      
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
