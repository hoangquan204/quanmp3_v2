import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getMusicSelector, getThemeSelector } from '../../redux/selector';
import musicSlice from '../music/musicSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
};

export default function SearchModal() {
    const [open, setOpen] = React.useState(false);
    const [resultSearch, setResultSearch] = React.useState([])
    const music = useSelector(getMusicSelector)
    const theme = useSelector(getThemeSelector)

    const dispatch = useDispatch()

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSearch = (e) => {
        const resultList = music.list.filter((item) => {
            return item.title.includes(e.target.value)
        })
        setResultSearch(resultList)
    }
    const handleChangeCurrentTrack = (index) => {
        dispatch(musicSlice.actions.changeCurrentTrack(index))
        setOpen(false)
    }

    return (
        <div>
            <IconButton onClick={handleOpen} variant='outlined'>
                <SearchIcon></SearchIcon>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        id="filled-basic"
                        label={
                            <>
                                <SearchIcon style={{ marginRight: '5px' }} />
                                {'Tìm kiếm'}
                            </>
                        }
                        variant="standard"
                        onChange={handleSearch}
                        fullWidth
                    />

                    <List
                        sx={{ width: '500px', height: '400px', overflow: 'scroll', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Kết quả tìm kiếm
                            </ListSubheader>
                        }
                    >
                        {resultSearch.map((item) => {
                            return <ListItemButton onClick={() => {
                                handleChangeCurrentTrack(item.id)
                            }}>
                                <ListItemIcon>
                                    <img className='w-[60px] h-[50px] object-cover rounded-md' src={item.cover}></img>
                                </ListItemIcon>
                                <ListItemText sx={{ color: `${theme.palette.textColor.main}`, px: '4px' }} primary={item.title} />
                            </ListItemButton>
                        })}
                    </List>
                </Box>
            </Modal>
        </div>
    );
}