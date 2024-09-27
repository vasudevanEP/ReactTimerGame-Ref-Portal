import React, { useState, useRef } from 'react'
import ResultModal from './ResultModal';

export default function TimerChallenge({title, targetTime}) {

  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRmaining] = useState(targetTime * 1000);
  
  const timeIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000; 

  if(timeRemaining <= 0){
    dialog.current.openModal();
    clearInterval(timer.current);
    
  }

  function handleReset()
  {
    setTimeRmaining(targetTime * 1000);
  }

  function handleStart(){
    timer.current = setInterval(() => {
      setTimeRmaining(prevTime => prevTime - 10)
    } , 10)

  }

  function handleStop(){
    clearInterval(timer.current)
    dialog.current.openModal();
  }

  return (
    <>
     <ResultModal ref={dialog} targetTime={targetTime} timeRemaining={timeRemaining} onReset={handleReset} />
    <section className='challenge'>
        <h2>{title}</h2>
        <p className='challenge-time'>{targetTime} second{targetTime > 1 ? 's' : ''}</p>
        <p>
            <button onClick={timeIsActive ? handleStop : handleStart}>
                {timeIsActive ? 'Stop' : 'Start'} Challenge
            </button>
        </p>
        <p className={timeIsActive ? 'active' : undefined}>
           {timeIsActive ? 'Timer is Running...' : 'Timer Inactive' } 
        </p>
    </section>
    </>
  )
}
