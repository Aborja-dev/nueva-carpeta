import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreatePage = () => {
    const navigate = useNavigate()
  return (
    <div>
        <button onClick={() => navigate(-1)}>Regresar</button>
    </div>
  )
}

export default CreatePage
