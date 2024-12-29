import React from "react";
import { IconButton, Typography } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getMusicSelector, getThemeSelector } from "../../redux/selector";
import musicSlice from "../music/musicSlice";
import AddIcon from '@mui/icons-material/Add';
import CreatePlaylistModal from "./CreatePlaylistModal";

const PlayLists = () => {
    const theme = useSelector(getThemeSelector)
    const music = useSelector(getMusicSelector)

    const dispatch = useDispatch()
    const onPlay = (index) => {
        dispatch(musicSlice.actions.changeCurrentTrack(index))
    }
    return (
        <div className="flex flex-wrap py-4 gap-y-2">
            <div
                className={`min-w-[200px] hover:animate-bounce flex flex-col items-center justify-center cursor-pointer `}
            // onClick={() => onPlay(index)}
            >
                {/* Playlist Cover */}
                <CreatePlaylistModal ></CreatePlaylistModal>
                {/* Playlist Title */}
                <Typography sx={{ color: `${theme.palette.textColor.main}` }} variant="body2" className="mt-2 text-center text-gray-700">
                    Tạo Playlist
                </Typography>
            </div>
            {music.playlists.map((playlist, index) => (
                <div
                    key={index}
                    className={`min-w-[200px] hover:animate-bounce flex flex-col items-center cursor-pointer `}
                    onClick={() => onPlay(index)}
                >
                    {/* Playlist Cover */}
                    <div className="w-24 h-24 rounded-md overflow-hidden ">
                        <img src={playlist.cover} alt={playlist.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Playlist Title */}
                    <Typography sx={{ color: `${theme.palette.textColor.main}` }} variant="body2" className="mt-2 text-center text-gray-700">
                        {playlist.name}
                    </Typography>
                </div>
            ))}
        </div>
    );
};

export default PlayLists;
