import React from 'react'

const SongInfo = ({currentSong, data}) => {
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
            <div className='icon'>
                <i className="fa-solid fa-music"></i>
            </div>
            <div className='contents'>

                {/* Displaying audio name */}

                <h6>{currentSong?.name}</h6>

                {/* Displaying audio singer name */}

                <p>{currentSong?.singer}</p>

            </div>
        </div>
    </>
  )
}

export default SongInfo
