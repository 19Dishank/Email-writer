import { useState } from 'react'
import Form from './Components/Form'
import ManualWriting from './Components/ManualWriting'
import { NavLink, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Form />} />
        <Route path='/manual' element={<ManualWriting />} />
      </Routes>

    </>
  )
}

export default App
