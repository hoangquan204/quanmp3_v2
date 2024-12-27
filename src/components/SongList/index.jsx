import React from "react";
import { IconButton, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { getThemeSelector } from "../../redux/selector";

const SongList = ({ tracks, onPlay, currentTrack }) => {
    const theme = useSelector(getThemeSelector)

    return (
        <div className="flex flex-wrap py-4 gap-y-2">
            {tracks.map((track, index) => (
                <div
                    key={index}
                    className={`min-w-[200px] hover:animate-bounce flex flex-col items-center cursor-pointer ${currentTrack === index ? "border-2 border-blue-500" : ""}`}
                    onClick={() => onPlay(index)}
                >
                    {/* Album Cover */}
                    <div className="w-24 h-24 rounded-md overflow-hidden ">
                        <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Song Title */}
                    <Typography sx={{ color: `${theme.palette.textColor.main}` }} variant="body2" className="mt-2 text-center text-gray-700">
                        {track.title}
                    </Typography>
                </div>
            ))}
        </div>
    );
};

export default SongList;
