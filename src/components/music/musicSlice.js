import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api";

// export const getListMessage = createAsyncThunk('message/get-list-message', async (values) => {
//     try {
//         const { data } = await api.get(`/api/message/${values}`)
//         return data
//     } catch (error) {
//         return error.message
//     }
// })

// export const createMessage = createAsyncThunk('message/create', async (values) => {
//     try {
//         const { data } = await api.post("/api/message", values)
//         return data
//     } catch (error) {
//         return error.message
//     }
// })

export default createSlice({
    name: 'music',
    initialState: {
        list: [
            {
                id: 0,
                title: "Live From Space",
                artist: "Mac Miller",
                cover: "https://cdn.pixabay.com/photo/2023/09/04/17/48/flamingos-8233303_1280.jpg",
                src: require("../music/id1.mp3"),
            },
            {
                id: 1,
                title: "Âm Thầm Bên Em",
                artist: "Sơn Tùng MTP",
                cover: "https://res.cloudinary.com/dr9l1tvkn/image/upload/v1734956156/id1_vrpfrk.jpg",
                src: require("../music/id2.mp3"),
            },
            {
                id: 2,
                title: "Chúng Ta Của Hiện Tại",
                artist: "Sơn Tùng MTP",
                cover: "https://res.cloudinary.com/dr9l1tvkn/image/upload/v1734956156/id3_kn577h.jpg",
                src: require("../music/id3.mp3"),
            },
            {
                id: 3,
                title: "Đoạn Tuyệt Nàng Đi",
                artist: "Florentino",
                cover: "https://res.cloudinary.com/dr9l1tvkn/image/upload/v1734956156/id4_vqqjoo.jpg",
                src: require("../music/id4.mp3"),
            },
            {
                id: 4,
                title: "Chài Điếp Nọng",
                artist: "Double 2T ft Hòa Minzy",
                cover: "https://res.cloudinary.com/dr9l1tvkn/image/upload/v1734956157/id5_xx7m1m.jpg",
                src: require("../music/id5.mp3"),
            },
            {
                id: 5,
                title: "Tokyo Cypher",
                artist: "16 Type",
                cover: "https://res.cloudinary.com/dr9l1tvkn/image/upload/v1734956156/id6_gwpe27.jpg",
                src: require("../music/id6.mp3"),
            },
            {
                id: 6,
                title: "Có Duyên Không Nợ",
                artist: "Artist 3",
                cover: "https://res.cloudinary.com/dr9l1tvkn/image/upload/v1734956156/id7_q5gt6j.jpg",
                src: require("../music/id7.mp3"),
            },
            {
                id: 7,
                title: "id 2019",
                artist: "Artist 3",
                cover: "https://res.cloudinary.com/dr9l1tvkn/image/upload/v1734956156/id8_szgjyj.jpg",
                src: require("../music/id8.mp3"),
            },
            {
                id: 8,
                title: 'Bình Yên',
                artist: 'Vũ ft BinZ',
                cover: 'https://i.ytimg.com/vi/f9P7_qWrf38/0.jpg',
                src: require("../music/id9.mp3")
            },
            {
                id: 9,
                title: 'The Box',
                artist: 'Robby Ricch',
                cover: 'https://i.ytimg.com/vi/KPpouY3N6Vs/0.jpg',
                src: require("../music/id10.mp3")
            }
        ],
        currentTrack: 0,
        error: false,
        loading: false,
        success: false,
        message: ''
    },
    reducers: {
        changeCurrentTrack: (state, action) => {
            state.currentTrack = action.payload
        },
        nextCurrentTrack: (state, action) => {
            state.currentTrack = (state.currentTrack + 1) % state.list.length
        },
        backCurrentTrack: (state, action) => {
            state.currentTrack = (state.currentTrack - 1 + state.list.length) % state.list.length
        }
    },
})