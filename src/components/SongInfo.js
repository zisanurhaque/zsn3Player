import React from 'react'

const SongInfo = ({currentSong, data, play}) => {
  return (
    <>

        {/* Displaying audio thumbnail here */}

        <div className='image'>
            <img src={currentSong?.thumb} alt={currentSong?.name}/>
        </div>

        <div className='timeline'>
            {!parseInt(window.localStorage.getItem("zsnPlayerIndex")) ? 1 : parseInt(window.localStorage.getItem("zsnPlayerIndex"))+1} / {data.length}
        </div>

        <div className='info'>
            
            <div className='contents'>

                {/* Displaying audio name */}

                <h6>{currentSong?.name}</h6>

                {/* Displaying audio singer name */}

                <p>{currentSong?.singer}</p>

            </div>

            <div className='icon'>
                {
                    play ? <img src='/icon.gif' alt=""/> : <div className='ifNot'></div>
                }
            </div>

        </div>
    </>
  )
}

export default SongInfo
