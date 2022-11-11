import React from 'react'

const Volume = ({soundIcon, handleVolume, volume}) => {
  return (
    <div className='seek_bar alt'>

        {/* Display Audio icon */}

        <div className='icon'>
            {soundIcon()}
        </div>
        
        <div className='range_slider'>

            {/* Audio volume current track */}

            <div className='track' style={{width: `${(volume*1)*100}%`}}></div>

            {/* Audio volume range bar */}

            <input type={"range"} max={1} min={0} step={0.01} value={volume} className="range" onChange={(e) => handleVolume(e)} onClick={(e) => handleVolume(e)}/>
            
        </div>

    </div>
  )
}

export default Volume
