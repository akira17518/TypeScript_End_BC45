import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../store';
import axios from 'axios';
import { USER_LOGIN, getStoreJson, setStoreJson } from '../../utility/config';
import Swal from 'sweetalert2';

export interface UserRegister { 
    
    taiKhoan: string,
    matKhau: string,
    hoTen: string,
    soDT: string,
    maNhom: string,
    email: string
  
}
export interface UserLogin {
    taiKhoan: string,
    matKhau: string,
    accessToken? : string,
    maLoaiNguoiDung? : string
    
}

export interface UserProfile {
    chiTietKhoaHocGhiDanh: any[];
    taiKhoan:              string;
    matKhau:               string;
    hoTen:                 string;
    soDT:                  string;
    maLoaiNguoiDung:       string;
    maNhom:                string;
    email:                 string;
}
export interface UserUpdate {
    taiKhoan:        string;
    matKhau:         string;
    hoTen:           string;
    soDT:            string;
    maLoaiNguoiDung: string;
    maNhom:          string;
    email:           string;
}

interface Userstate {
    userRegister : UserRegister | null,
    userLogin : UserLogin | null,
    userProfile : UserProfile| null
    userUpdate : UserUpdate | null ,

}
const initialState: Userstate = {
   userRegister : null,
   userLogin : getStoreJson(USER_LOGIN),
   userProfile : null,
   userUpdate : null,
   
}

const userReducder = createSlice({
  name: 'userReducder',
  initialState,
  reducers: {
    registerAction :(state,action) => {
        state.userRegister = action.payload
    },
    loginAction : (state, action) => {
        state.userLogin = action.payload
    },
    getProfileAction : (state,action) => {
        state.userProfile = action.payload
    },

    updateProfileAction : (state,action) => {
        state.userUpdate = action.payload 
    }
  }
});

export const {registerAction,loginAction,getProfileAction,updateProfileAction} = userReducder.actions

export default userReducder.reducer


export const registerActionApi = (userRegister : UserRegister) => {
     return async (dispatch:DispatchType) => {
            try{
              const res = await axios({
                     url : 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy',
                     method : 'POST',
                     headers : {
                        TokenCybersoft : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
                    },
                    data : userRegister
              })

              const action: PayloadAction<UserRegister> = registerAction (res.data);
              dispatch(action)
              alert('succesful registration')
            }catch(err) {
                console.log(err)
            }
     }
}


export const loginActionApi = (userLogin: UserLogin) => {
    return async (dispatch : DispatchType) => {
        try {
           const res = await axios ({
               url : 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap  ',
               method : 'POST' ,
               headers: {
                TokenCybersoft : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU` 
               },
               data : userLogin
           })
           const action  :  PayloadAction<UserLogin> = loginAction(res.data);
           dispatch (action)
           let timerInterval: NodeJS.Timeout;

Swal.fire({
  title: `Hello ${userLogin.taiKhoan}!`,
 
  timer: 1000,
 
  didOpen: () => {
    Swal.showLoading();
    const b = Swal.getHtmlContainer()?.querySelector('b');
    if (b) {
      timerInterval = setInterval(() => {
        const timerLeft = Swal.getTimerLeft();
        if (timerLeft !== undefined) {
          b.textContent = timerLeft.toString();
        }
      }, 100);
    }
  },
  willClose: () => {
    clearInterval(timerInterval);
  },
}).then((result) => {
 
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer');
  }
});
           setStoreJson(USER_LOGIN,res.data)
        }catch (err: any) { 
            if (err.response.status = 500) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Please try again. Make sure you fill the correct username and password',
                  
                  })
            }
            console.log(err)
        }
    }
}

export const getProfileApi = () => {
    return async (dispatch : DispatchType) => {
        try {
            const res = await axios ({
                url : 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan' ,
                method : 'POST', 
                headers : {
                    Authorization : `Bearer ${getStoreJson(USER_LOGIN).accessToken}`,
                    TokenCybersoft : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU` 
                }
            })
           const action : PayloadAction<UserProfile> = getProfileAction(res.data);
           dispatch(action)
        }catch (err) {
            console.log(err)
        }
    }
}


export const updateProfileApi= (userUpdate: UserUpdate) => {
    return async (dispatch : DispatchType) => {
        try {
        const res = await axios({
            url : 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung ',
            method : 'PUT',
            headers : {
                Authorization : `Bearer ${getStoreJson(USER_LOGIN).accessToken}`,
                TokenCybersoft : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU` 
            },
            data: userUpdate
        })
        console.log(res)
        const action : PayloadAction <UserUpdate> = updateProfileAction (res.data);
        dispatch (action)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Profile is updated',
            showConfirmButton: false,
            timer: 1500
          })
        }catch(err) {
            console.log(err)
        }
    }
}


