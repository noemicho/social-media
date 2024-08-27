import { useState } from 'react'
import { NavBar } from './components/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <h1>testando</h1>
      </div>
      <NavBar/>
    </>
  )
}

export default App
