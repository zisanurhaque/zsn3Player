import React from 'react'

const SeekBar = ({currentSong, handleSeekBar, getCurrentTime, getDuration}) => {
  return (
    <div className='seek_bar'>
                
        <div className='range_slider'>

            {/* Audio song current track */}

            <div className='track' style={{width: `${currentSong.progress}%`}}></div>

            {/* Audio song seek bar */}

            <input type={"range"} max={100} min={0} step={0.01} value={!currentSong?.progress ? 0 : currentSong?.progress} className="range" onChange={(e) => handleSeekBar(e)} onClick={(e) => handleSeekBar(e)}/>

        </div>

        <div className='times'>

            {/* Get Current time of the audio */}

            <p>
                {getCurrentTime()} 
            </p>

            {/* Get audio duration */}

            <p>
                {getDuration()}
            </p>
            
        </div>

    </div>
  )
}

export default SeekBar
