import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import musicSlice from '../music/musicSlice';
import notificationSlice from '../Notification/notificationSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    p: 4,
};

const imgCover = [
    'https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg',
    'https://cdn.pixabay.com/photo/2024/01/07/10/50/grey-wolf-8492789_640.png',
    'https://cdn.pixabay.com/photo/2023/01/23/00/45/cat-7737618_640.jpg',
    'https://cdn.pixabay.com/photo/2024/11/03/12/57/lion-tamarin-9171365_640.jpg',
    'https://cdn.pixabay.com/photo/2024/11/22/18/18/mute-swan-9217198_640.jpg'
]

export default function CreatePlaylistModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [name, setName] = React.useState('')
    const [cover, setCover] = React.useState(imgCover[0])

    const dispatch = useDispatch()



    const handleCreatePlaylist = () => {
        const playlist = {
            name,
            cover
        }
        dispatch(musicSlice.actions.createPlayList(playlist))

        dispatch(notificationSlice.actions.showNotification({
            type: 'success',
            message: 'Tạo Play list thành công!'
        }))

        handleClose()
    }

    return (
        <div>
            <Button sx={{ width: '100%' }} variant='outlined' onClick={handleOpen}>
                <AddIcon></AddIcon>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='flex flex-col gap-y-2'>
                        <TextField id="filled-basic" label="Tiêu đề" variant="filled" value={name} onChange={(e) => {
                            setName(e.target.value)
                        }} />
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-filled-label">Hình ảnh thu nhỏ:</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={cover}
                                onChange={(e) => {
                                    setCover(e.target.value)
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {imgCover.map((item) => {
                                    return <MenuItem className value={item}>
                                        <img className='w-full h-[100px] object-cover' src={item}></img>
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <Button variant='contained' onClick={handleCreatePlaylist}>Tạo</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}