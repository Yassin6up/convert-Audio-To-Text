import { useState } from 'react'
import Upload from './components/Upload'
import Recourd from './components/Recourd'
import { useDispatch , useSelector } from 'react-redux'
import Loader from './components/subComponents/Loader'

function App() {   
  const recordingState = useSelector((state)=> state.recourd)


  return (
    <div className='app'>
      <div className="container parent">
        <div className='record'>
        <Recourd />
        </div>
        <div className='upload'> 
        {recordingState.isRecording ?  <Loader /> :  <Upload />}
        
        </div>
      </div>
      
    </div>
  )
}

export default App
