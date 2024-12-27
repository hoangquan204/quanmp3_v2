import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import '../../css/base.css'
import '../../css/main.css'
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


export default function MenuLeft() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250, bgcolor: '#242222' }} role="presentation" onClick={toggleDrawer(false)}>
            <nav className="flex flex-col  w-[400px] h-screen text-white">
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
        </Box>
    );

    return (
        <div>
            <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon></MenuIcon>
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
}
