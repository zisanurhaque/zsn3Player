import React from 'react'

const Controls = ({handlePrev, handlePlay, handleNext, play}) => {
  return (
    <div className='controls'>

        {/* Audio handle previous button */}

        <button className='buttons' onClick={(e) => handlePrev(e)}>
            <i className="fa-solid fa-backward-step"></i>
        </button>

        {/* Audio handle play button */}

        <button className='buttons play' onClick={(e) => handlePlay(e)}>
            {
                !play ?
                <i className="fa-solid fa-play tri"></i>:
                <i className="fa-solid fa-pause"></i>
            }
        </button>

        {/* Audio handle next button */}

        <button className='buttons' onClick={(e) => handleNext(e)}>
            <i className="fa-solid fa-forward-step"></i>
        </button>

    </div>
  )
}

export default Controls
