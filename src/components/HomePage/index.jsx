import { Button, IconButton, TextField } from '@mui/material';
import '../../css/base.css'
import '../../css/main.css'
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import MusicPlayer from '../MusicPlayer';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { getThemeSelector } from '../../redux/selector'
import { useState } from 'react';
import MenuLeft, { DrawerList } from '../MenuLeft';
import themeSlice from '../../theme/themeSlice';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { getMusicSelector } from "../../redux/selector";
import SearchModal from '../SearchModal';
import SongList from '../SongList';
import LoginModal from '../User/AuthModal';
function HomePage() {
    const theme = useSelector(getThemeSelector)
    const music = useSelector(getMusicSelector)
    const dispatch = useDispatch()
    const handleChangeMode = () => {
        dispatch(themeSlice.actions.changeMode(theme.palette.mode === 'light' ? 'dark' : 'light'))
    }

    return <>
        <div className="flex">
            <nav className="hidden md:flex flex-col bg-[#242222] w-[400px] h-screen text-white">
                <ul>
                    <img className="h-[100px]" src={'https://res.cloudinary.com/dr9l1tvkn/image/upload/v1734956157/logo-qmp3-2_s0ut2s.png'} alt="" />
                    <li className="nav-item">
                        <a className="nav-item-link" href="index.html">
                            <i className="fa-solid fa-clipboard-list" />
                            Trang chủ
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-item-link" href="listmusic.html">
                            <i className="fa-solid fa-headphones" />
                            Danh sách phát
                        </a>
                    </li>
                    <li className="nav-item">
                        <i className="fa-solid fa-music" />
                        Top 100
                    </li>
                    <li className="nav-item">
                        <i className="fa-solid fa-guitar" />
                        Chủ đề/Thể loại
                    </li>
                    <li className="nav-item">
                        <i className="fa-solid fa-radio" />
                        Radio
                    </li>
                </ul>
                <ul className="nav-list">
                    <li className="nav-item">
                        <i className="fa-solid fa-ranking-star" />
                        Nhạc 2024
                    </li>
                    <li className="nav-item">
                        <i className="fa-solid fa-star" />
                        Ca sĩ mới
                    </li>
                    <li className="nav-item">
                        <i className="fa-solid fa-arrow-trend-up" />
                        Top thịnh hành
                    </li>
                    <li className="nav-item">
                        <i className="fa-solid fa-calendar-days" />
                        Hot trend 2024
                    </li>
                    <li className="nav-item">
                        <i className="fa-solid fa-newspaper" />
                        Tin tức
                    </li>
                </ul>
            </nav>
            <div className="flex flex-col gap-y-10 p-1 ">
                <div className='flex items-center justify-between w-full'>
                    <div>
                        <div className='flex md:hidden items-center gap-x-1'>
                            <MenuLeft ></MenuLeft>
                            <img className='w-[100px] rounded-md' src={'https://res.cloudinary.com/dr9l1tvkn/image/upload/v1734956157/logo-qmp3-2_s0ut2s.png'} alt="" />
                        </div>
                    </div>
                    <div className='flex items-end gap-x-1'>
                        <SearchModal></SearchModal>
                        <IconButton onClick={handleChangeMode}>
                            {theme.palette.mode === 'light' ? <DarkModeIcon></DarkModeIcon> : <WbSunnyIcon></WbSunnyIcon>}
                        </IconButton>
                        <LoginModal></LoginModal>
                    </div>
                </div>
                <div className='flex flex-col gap-y-10'>
                    <MusicPlayer></MusicPlayer>
                    <div className='w-full'>
                        <SongList tracks={music.list} />
                    </div>
                </div>
            </div>
        </div>
    </>

}

export default HomePage;