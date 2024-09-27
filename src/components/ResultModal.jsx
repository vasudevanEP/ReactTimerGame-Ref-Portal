import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({targetTime, timeRemaining, onReset}, ref) {

    const dialogRef = useRef();

    const formattingRemaingTime = (timeRemaining / 1000).toFixed(2); 

    const userLost = timeRemaining <= 0;

    const score = Math.round((1 - timeRemaining / (targetTime*1000)) * 100)
    
    /* useImperativeHandle works along with forwardRef. We will pass the ref
    value as input to the function. This will return custom funciton that can 
    be used in parent ref. */
    useImperativeHandle(ref, () => {
        return {
            /* Custom Function name openModal, we can call any */
            openModal(){
                dialogRef.current.showModal();
            }
        }
    })

  return createPortal(
    <dialog ref={dialogRef} className="result-modal" onClose={onReset}>
        {userLost && <h2>You Lost</h2> }
        {!userLost && <h2>Your Score : {score} </h2>}
        <p>The target time was <strong>{targetTime} seconds</strong></p>
        <p>You stopped the time with <strong>{formattingRemaingTime} seconds</strong></p>
        <form method='dialog' onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>,
    document.getElementById('modal')
  )
})

export default ResultModal;