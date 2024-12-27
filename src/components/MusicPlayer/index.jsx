import React, { useState, useRef, useEffect } from "react";
import { Slider, IconButton, Typography } from "@mui/material";
import { PlayArrow, Pause, SkipNext, SkipPrevious } from "@mui/icons-material";
import SongList from "../SongList";
import { useSelector } from "react-redux";
import { getThemeSelector } from "../../redux/selector";

export default function MusicPlayer() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(0);

    const theme = useSelector(getThemeSelector)

    const tracks = [
        {
            title: "Live From Space",
            artist: "Mac Miller",
            cover: "https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg",
            src: require("../music/id1.mp3"),
        },
        {
            title: "Âm Thầm Bên Em",
            artist: "Sơn Tùng MTP",
            cover: "https://res.cloudinary.com/dr9l1tvkn/image/upload/v1734956156/id1_vrpfrk.jpg",
            src: require("../music/id2.mp3"),
        },
        {
            title: "Chúng Ta Của Hiện Tại",
            artist: "Sơn Tùng MTP",
            cover: "https://res.cloudinary.com/dr9l1tvkn/image/upload/v1734956156/id3_kn577h.jpg",
            src: require("../music/id3.mp3"),
        },
        {
            title: "Đoạn Tuyệt Nàng Đi",
            artist: "Florentino",
            cover: "https://res.cloudinary.com/dr9l1tvkn/image/upload/v1734956156/id4_vqqjoo.jpg",
            src: require("../music/id4.mp3"),
        },
        {
            title: "Chài Điếp Nọng",
            artist: "Double 2T ft Hòa Minzy",
            cover: "https://res.cloudinary.com/dr9l1tvkn/image/upload/v1734956157/id5_xx7m1m.jpg",
            src: require("../music/id5.mp3"),
        },
        {
            title: "Tokyo Cypher",
            artist: "16 Type",
            cover: "https://res.cloudinary.com/dr9l1tvkn/image/upload/v1734956156/id6_gwpe27.jpg",
            src: require("../music/id6.mp3"),
        },
        {
            title: "Có Duyên Không Nợ",
            artist: "Artist 3",
            cover: "https://res.cloudinary.com/dr9l1tvkn/image/upload/v1734956156/id7_q5gt6j.jpg",
            src: require("../music/id7.mp3"),
        },
        {
            title: "id 2019",
            artist: "Artist 3",
            cover: "https://res.cloudinary.com/dr9l1tvkn/image/upload/v1734956156/id8_szgjyj.jpg",
            src: require("../music/id8.mp3"),
        },
    ];

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
        setCurrentTrack((prev) => (prev + 1) % tracks.length);
        setCurrentTime(0);
        setIsPlaying(false);
    };

    const handlePrevious = () => {
        setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
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
    }, [currentTrack]);

    const handlePlayTrack = (index) => {
        setCurrentTrack(index);
        setCurrentTime(0);
        setIsPlaying(true);
    };

    return (
        <div className='flex flex-col gap-y-10'>
            <div className="flex w-full" >
                <div className="flex flex-col items-center shadow-lg rounded-lg mx-auto px-10">
                    {/* Đĩa nhạc */}
                    <div
                        className={`relative w-40 h-40 rounded-full border-4 border-gray-300 shadow-lg overflow-hidden 
                        ${isPlaying ? "animate-spin-slow" : ""}`}
                        style={{
                            backgroundImage: `url(${tracks[currentTrack].cover})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>

                    {/* Tiêu đề */}
                    <Typography sx={{ color: `${theme.palette.textColor.main}` }} variant="h6" className={`mt-4 font-bold text-[${theme.palette.textColor.main}] `}>
                        {tracks[currentTrack].title}
                    </Typography>
                    <Typography variant="subtitle1" className="text-gray-500">
                        {tracks[currentTrack].artist}
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
                    <audio ref={audioRef} src={tracks[currentTrack].src} />
                </div>

            </div>
            <div className='w-full'>
                <SongList tracks={tracks} onPlay={handlePlayTrack} />
            </div>
        </div>
    );
}
