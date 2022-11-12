import React, { useEffect, useRef, useState } from 'react'
import Controls from './Controls'
import {data} from './data'
import SeekBar from './SeekBar'
import SongInfo from './SongInfo'
import Volume from './Volume'

const Player = () => {

    const [isLoading, setIsLoading] = useState(false)

    const [play, setPlay] = useState(false)

    let sound = isNaN(parseFloat(window.localStorage.getItem("zsnPlayerVolume"))) ? .5 : parseFloat(window.localStorage.getItem("zsnPlayerVolume"))
    const [volume, setVolume] = useState(sound)

    // this is song index number

    let count = !window.localStorage.getItem("zsnPlayerIndex") ? 0 : parseInt(window.localStorage.getItem("zsnPlayerIndex"))

    const [currentSong, setCurrentSong] = useState(data[count])

    const refAudio = useRef() // create reference

    // Play and pause button

    const handlePlay = (e) => {
        e.preventDefault()
        if(!play){
            setPlay(true)
        }else{
            setPlay(false)
        }
    }

    // Go to the next song

    const handleNext = (e) => {
        e.preventDefault()
        if(count === data.length - 1){
            window.localStorage.setItem("zsnPlayerIndex", 0)
            setCurrentSong({...data[0], progress: 0})
            refAudio.current.currentTime = (5 / 100) * refAudio.current.duration
            setPlay(false)
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
            }, 1200)
        }else{
            window.localStorage.setItem("zsnPlayerIndex", count+1)
            setCurrentSong({...data[count + 1], progress: 0})
            refAudio.current.currentTime = (5 / 100) * refAudio.current.duration
            setPlay(false)
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
            }, 1200)
        }
    }

    // Go to the previous song

    const handlePrev = (e) => {
        e.preventDefault()
        if(count === 0){
            window.localStorage.setItem("zsnPlayerIndex", data.length - 1)
            setCurrentSong({...data[data.length - 1], progress: 0})
            setPlay(false)
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
            }, 1200)
        }else{
            window.localStorage.setItem("zsnPlayerIndex", count-1)
            setCurrentSong({...data[count - 1], progress: 0})
            setPlay(false)
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
            }, 1200)
        }
    }

    // Everything will work if this functions executes

    const onPlaying = () => {
        let duration = refAudio.current.duration.toFixed(2)
        let currentTime = refAudio.current.currentTime.toFixed(2)
        setCurrentSong({...currentSong, "progress": currentTime / duration * 100, "length": duration})
        if(duration === currentTime){
            setPlay(false)
        }
    }

    // audio player seekbar handler

    const handleSeekBar = (e) => {
        refAudio.current.currentTime = (e.target.value / 100) * refAudio.current.duration
    }

    // get current time of audio player

    const getCurrentTime = () => {
        const min = Math.floor(refAudio?.current?.currentTime / 60)
        const sec = Math.floor(refAudio?.current?.currentTime % 60)
        return `${!min ? 0 : min}:${!sec ? "00" : sec < 10 ? `0${sec}` : sec}`
    }

    // Get total duration of the audio

    const getDuration = () => {
        const min = Math.floor(currentSong?.length / 60)
        const sec = Math.floor(currentSong?.length % 60)
        return `${!min ? 0 : min}:${!sec ? "00": sec < 10 ? `0${sec}` : sec}`
    }

    // Play and puse button will dynamically change base on this

    useEffect(() => {
        if(play){
            refAudio?.current.play()
            refAudio.current.volume = volume
        }else{
            refAudio?.current.pause()
        }
    }, [play, volume])

    // handle volume of the audio

    const handleVolume = (e) => {
        setVolume(e.target.value)
        window.localStorage.setItem("zsnPlayerVolume", e.target.value)
    }

    // Soung icon will change dynamically base on sound volume

    const soundIcon = () => {
        if((sound)*100 < 0.1){
            return <i className="fa-solid fa-volume-xmark"></i>
        }else if((sound)*100 < 30){
            return <i className="fa-solid fa-volume-low"></i>
        }else{
            return <i className="fa-solid fa-volume-high"></i>
        }
    }

  return (
    <div className='container'>

        {/* Audio source and reference */}

        <audio ref={refAudio} src={currentSong?.source} onTimeUpdate={(e) => onPlaying(e)}/>

        <div className='audio_player'>

            {
                !isLoading ? "":
                <div className='loading'>
                    <div className='loader'>
                        <p></p>
                        <div>
                            <span>Z</span>
                            <span>I</span>
                            <span>S</span>
                            <span>A</span>
                            <span>N</span>
                        </div>
                    </div>
                    <div className='transparent'></div>
                </div>
            }

            {/* Audio volume range bar */}

            <Volume handleVolume={handleVolume} soundIcon={soundIcon} volume={volume}/>

            <SongInfo currentSong={currentSong} data={data}/>

            {/* Audio seek bar */}

            <SeekBar currentSong={currentSong} handleSeekBar={handleSeekBar} getCurrentTime={getCurrentTime} getDuration={getDuration}/>

            {/* Audio control buttons */}
            
            <Controls handlePrev={handlePrev} handlePlay={handlePlay} handleNext={handleNext} play={play}/>

        </div>

    </div>
  )
}

export default Player
