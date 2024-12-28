import React, { useState, useRef, useEffect } from "react";
import { Slider, IconButton, Typography } from "@mui/material";
import { PlayArrow, Pause, SkipNext, SkipPrevious } from "@mui/icons-material";
import SongList from "../SongList";
import { useDispatch, useSelector } from "react-redux";
import { getMusicSelector, getThemeSelector } from "../../redux/selector";
import musicSlice from "../music/musicSlice";

function MusicPlayer() {
    const music = useSelector(getMusicSelector)
    const theme = useSelector(getThemeSelector)

    const dispatch = useDispatch()

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [tracks, setTracks] = useState(music.list)


    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
            audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
        }
        return () => {
            if (audio) {
                audio.removeEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
                audio.removeEventListener("loadedmetadata", () => setDuration(audio.duration));
            }
        };
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSliderChange = (event, value) => {
        const audio = audioRef.current;
        audio.currentTime = value;
        setCurrentTime(value);
    };

    const handleNext = () => {
        dispatch(musicSlice.actions.nextCurrentTrack())
        setCurrentTime(0);
        setIsPlaying(false);
    };

    const handlePrevious = () => {
        dispatch(musicSlice.actions.backCurrentTrack())
        setCurrentTime(0);
        setIsPlaying(false);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [music.currentTrack]);

    const handlePlayTrack = (index) => {
        dispatch(musicSlice.actions.changeCurrentTrack(index))
        setCurrentTime(0);
        setIsPlaying(true);
    };

    return (
        <div className="flex w-full"  >
            <div className="flex flex-col items-center shadow-lg rounded-lg mx-auto p-10" style={{ background: 'linear-gradient(to right, #00008b, #00bfff)' }}>
                {/* Đĩa nhạc */}
                <div
                    className={`relative w-40 h-40 rounded-full border-4  shadow-lg overflow-hidden 
                        ${isPlaying ? "animate-spin-slow" : ""}`}
                    style={{
                        backgroundImage: `url(${tracks[music.currentTrack].cover})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>

                {/* Tiêu đề */}
                <Typography sx={{ color: `${theme.palette.textColor.main}` }} variant="h6" className={`mt-4 font-bold text-[${theme.palette.textColor.main}] `}>
                    {tracks[music.currentTrack].title}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: `${theme.palette.textColor.main}` }}>
                    {tracks[music.currentTrack].artist}
                </Typography>

                {/* Slider và thời gian */}
                <div className="flex items-center w-64 mt-4 space-x-4">
                    <Typography variant="body2" className="text-gray-500">
                        {formatTime(currentTime)}
                    </Typography>
                    <Slider
                        value={currentTime}
                        max={duration}
                        onChange={handleSliderChange}
                        className="flex-grow"
                    />
                    <Typography variant="body2" className="text-gray-500">
                        {formatTime(duration)}
                    </Typography>
                </div>

                {/* Nút điều khiển */}
                <div className="flex items-center space-x-4 mt-4">
                    <IconButton onClick={handlePrevious} className="bg-blue-500 text-white p-3 rounded-full">
                        <SkipPrevious fontSize="large" />
                    </IconButton>
                    <IconButton onClick={togglePlay} className="bg-blue-500 text-white p-3 rounded-full">
                        {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
                    </IconButton>
                    <IconButton onClick={handleNext} className="bg-blue-500 text-white p-3 rounded-full">
                        <SkipNext fontSize="large" />
                    </IconButton>
                </div>
                {/* Audio */}
                <audio ref={audioRef} src={tracks[music.currentTrack].src} />
            </div>
        </div>

    );
}

export default MusicPlayer