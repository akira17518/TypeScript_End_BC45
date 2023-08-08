import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DispatchType } from "../store";
import axios, { ResponseType } from "axios";
import { USER_LOGIN, getStoreJson } from "../../utility/config";
import Swal from "sweetalert2";

export interface MyObject {
  taiKhoan: string | undefined
}

export interface CourseId {
  maKhoaHoc : string | undefined
}

export interface StudentsWaiting {
  taiKhoan: string;
  biDanh:   string;
  hoTen:    string;
}

export interface User {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  maLoaiNguoiDung: string;
}
export interface pendingCourse {
  maKhoaHoc: string;
  tenKhoaHoc: string;
}

export interface RegisterCourse {
  maKhoaHoc: string | undefined
  taiKhoan: string | undefined
}
export interface ConfirmCourse  {
  maKhoaHoc: string | undefined | null
  taiKhoan: string | undefined | null
}
export interface Adduser {
  taiKhoan:        string;
  matKhau:         string;
  hoTen:           string;
  soDT:            string;
  maLoaiNguoiDung: string;
  maNhom:          string;
  email:           string;
}

export interface CourseUnregisterd {
  maKhoaHoc : string;
  biDanh : string;
  tenKhoaHoc : string;
}


export interface CourseDetail {
  maKhoaHoc:      string;
  biDanh:         string;
  tenKhoaHoc:     string;
  moTa:           string;
  luotXem:        number;
  hinhAnh:        string;
  maNhom:         string;
  ngayTao:        string;
  soLuongHocVien: number;
  nguoiTao:       NguoiTAO;
  danhMucKhoaHoc: DanhMucKhoaHoc;
}

export interface DanhMucKhoaHoc {
  maDanhMucKhoahoc:  string;
  tenDanhMucKhoaHoc: string;
}

export interface NguoiTAO {
  taiKhoan:         string;
  hoTen:            string;
  maLoaiNguoiDung:  string;
  tenLoaiNguoiDung: string;
}

export interface KhoaHoc {
  maKhoaHoc:        string;
  biDanh?:           string;
  tenKhoaHoc:       string;
  moTa:             string;
  luotXem:          number;
  danhGia:          number;
  hinhAnh:          string;
  maNhom:           string;
  ngayTao:          string;
  maDanhMucKhoaHoc: string;
  taiKhoanNguoiTao: string;
}

export interface CourseUpdate {
  maKhoaHoc:        string;
  biDanh:           string;
  tenKhoaHoc:       string;
  moTa:             string;
  luotXem:          number;
  danhGia:          number;
  hinhAnh:          string;
  maNhom:           string;
  ngayTao:          string;
  maDanhMucKhoaHoc: string;
  taiKhoanNguoiTao: string;
}
interface AdminState {
  userList: User[];
  pendingCourses: pendingCourse[];
  registerCourse: RegisterCourse | null;
  confirmCourse: ConfirmCourse | null;
  confimredCourses: pendingCourse[],
  themKhoaHoc : KhoaHoc | null,
  addUser : Adduser | null,
  courseDetail : CourseDetail | null ,
  updateCourse : CourseUpdate | null,
  studentsWaiting : StudentsWaiting[] | null,
  studentsofCourse : StudentsWaiting [] | null,
  studentsUnregisterd : StudentsWaiting[]| null,
  canCelCourse : null,
  unregisteredCoursesofUser : CourseUnregisterd[] | null
}

const initialState: AdminState = {
  userList: [],
  pendingCourses: [],
  registerCourse: null,
  confirmCourse: null,
  confimredCourses: [],
  themKhoaHoc : null,
  addUser :  null,
  courseDetail : null,
  updateCourse : null ,
  studentsWaiting : [],
  studentsofCourse : [],
  studentsUnregisterd : [],
  canCelCourse : null,
  unregisteredCoursesofUser : [],
  

};

const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    getUserListAction: (state, action) => {
      state.userList = action.payload;
    },
    pendingCoursesAction: (state, action) => {
      state.pendingCourses = action.payload;
    },
    registerCourseAction: (state, action) => {
      state.registerCourse = action.payload;
    },
    confirmCourseAction: (state, action) => {
      state.confirmCourse = action.payload;
    },
    getConfirmedCourseAction: (state, action) => {
      state.confimredCourses = action.payload;
    },
    deleteConfirmedCourse : (state,action) => {
      state.pendingCourses = state.pendingCourses.filter(item=> item.maKhoaHoc !== action.payload)
      

    },

    themKhoaHocAction : (state,action) => {
      state.themKhoaHoc = action.payload
    },
    addUserAction : (state,action) => {
      state.addUser = action.payload
    },
    getCourseDetailAction : (state,action) => {
     state.courseDetail = action.payload
    },
    updateCourseAction : (state,action) => {
      state.updateCourse = action.payload
    },
    getStudentsWatingAction : (state,action) => {
      state.studentsWaiting = action.payload 
    },
    getStudentsofCourseAction : (state,action)=> {
      state.studentsofCourse = action.payload
    },
    getStudentUnregisteredAction : (state,action) => {
      state.studentsUnregisterd = action.payload 
    },
    cancelCourseAction : (state,action) => {
      state.canCelCourse = action.payload
    },

    getUnregisteredCoursesofUserAction : (state,action) => {
      state.unregisteredCoursesofUser = action.payload
    }



  },
});

export const {
  getUserListAction,
  pendingCoursesAction,
  registerCourseAction,
  confirmCourseAction,
  getConfirmedCourseAction,
  deleteConfirmedCourse,
  themKhoaHocAction,
  addUserAction,
  getCourseDetailAction,
  updateCourseAction,
  getStudentsWatingAction,
  getStudentsofCourseAction,
  getStudentUnregisteredAction,
  cancelCourseAction,
  getUnregisteredCoursesofUserAction
} = adminReducer.actions;

export default adminReducer.reducer;

export const getUserListApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await axios({
        url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung ",
        method: "GET",
        headers: {
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`,
        },
      });

      const action = getUserListAction(res.data);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};

export const pendingCoursesAPi = (user: MyObject | null) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await axios({
        url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet",
        method: "POST",
        headers: {
          Authorization: `Bearer ${getStoreJson(USER_LOGIN).accessToken}`,
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`,
        },
        data: user,
      });
      const action: PayloadAction<pendingCourse[]> = pendingCoursesAction(
        res.data
      );
      dispatch(action);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
};

export const registerCourseApi = (course: RegisterCourse) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await axios({
        url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/DangKyKhoaHoc ",
        method: "POST",
        headers: {
          Authorization: `Bearer ${getStoreJson(USER_LOGIN).accessToken}`,
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`,
        },
        data: course,
      });
      const action = registerCourseAction(res.data);
      dispatch(action);
      console.log(res);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You have registered the course.',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (err : any) {
      if (err.response.data === 'Đã đăng ký khóa học này rồi!') {
        Swal.fire({
          icon: 'warning',
          title: 'Course is already registered!',
         
        })
      }
      console.log(err);
    }
  };
};

export const confirmedCoursesApi = (user: MyObject | null) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await axios({
        url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet",
        method: "POST",
        headers: {
          Authorization: `Bearer ${getStoreJson(USER_LOGIN).accessToken}`,
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`,
        },
        data: user,
      });

      const action = getConfirmedCourseAction(res.data);
      dispatch(action);
      
    } catch (err) {
      console.log(err);
    }
  };
};

export const confirmCourseApi = (course: ConfirmCourse  ) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await axios({
        url: "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/GhiDanhKhoaHoc",
        method: "POST",
        headers: {
          Authorization: `Bearer ${getStoreJson(USER_LOGIN).accessToken}`,
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`,
        },
        data: course,
      });
      const action = confirmCourseAction(res.data) ;
      dispatch (action )
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Course enrolled',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (err) {
      console.log(err)
    }
  };
};




export const themKhoaHocApi = (khoaHoc: KhoaHoc, file: File) => {
  return async (dispatch: DispatchType) => {
    try {
    
      const res1 = await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/ThemKhoaHoc',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getStoreJson(USER_LOGIN).accessToken}`,
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
          
        },
        data: khoaHoc,
      });

     
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tenKhoaHoc', khoaHoc.tenKhoaHoc);

      const res2 = await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc ',
        method: 'POST',
        headers: {
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
        },
        data: formData,
      });

      console.log('Course added:', res1.data);
      console.log('Image uploaded:', res2.data);

      const action = themKhoaHocAction(res1.data);
      dispatch(action);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Course is added!',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (err) {
      console.log(err);
    }
  };
};


export const addUserApi  = (user : Adduser) => {
  return async (dispatch : DispatchType) => {
    try {
       const res = await axios ({
        url : 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung',
        method : 'POST',
        headers : {
          Authorization: `Bearer ${getStoreJson(USER_LOGIN).accessToken}`,
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
        },
        data : user
       })
       const action = addUserAction (res.data);
       dispatch (action)
       alert('User is added')

    }catch(err){
      console.log(err)

    }
  }
}


export const getDetailCourseApi = (courseId: string ) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await axios ( {
        url : `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${courseId}`,
        method : 'GET',
        headers : {
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
        }
      })
      const action = getCourseDetailAction (res.data);
      dispatch (action)

    }catch (err)  { 
      console.log(err)
    }

  }
}

export const updateCourseApi =  (course : CourseUpdate, file: File) => {
  return async (dispatch : DispatchType) => {
    try {

      const res = await axios( {
        url : ' https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/CapNhatKhoaHoc ',
        method : 'PUT',
        headers : {
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
        },
        data : course 
      })
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tenKhoaHoc', course.tenKhoaHoc); 

      
      const res2 = await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc ',
        method: 'POST',
        headers: {
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
        },
        data: formData,
      });

      console.log('Course added:', res.data);
      console.log('Image uploaded:', res2.data);

      const action = updateCourseAction(res.data);
      dispatch(action);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'The course is updated',
        showConfirmButton: false,
        timer: 1500
      })


      
    }catch (err) {
      console.log(err)
    }
  }
}

export const deleteCourseApi = (courseId : string) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await axios ({
        url : `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${courseId}`,
        method : 'DELETE',
        headers : {
          Authorization: `Bearer ${getStoreJson(USER_LOGIN).accessToken}`,
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
        },
      })
      dispatch (res.data)

    }catch (err) {
      Swal.fire({
        icon: 'warning',
        title: 'Students have registered this course. You cannot delete',
        
      })
      console.log(err)
    }
  }
}


export const getStudentsWatingApi = (courseId : CourseId) => {
  return async (dispatch : DispatchType) =>  {
    try {

      const res = await axios ({
          url : 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet',
          method : 'POST',
          headers : {
            Authorization: `Bearer ${getStoreJson(USER_LOGIN).accessToken}`,
            TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
          },
          data : courseId
      })

      const action = getStudentsWatingAction(res.data);
      dispatch (action)

    }catch(err) {
      console.log(err)
    }
  }
}

export const getStudentsofCourseApi = (courseId : CourseId) => {
  return async (dispatch : DispatchType) => {
    try {
      const res = await axios ({
        url : 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc',
        method : 'POST',
        headers : {
          Authorization: `Bearer ${getStoreJson(USER_LOGIN).accessToken}`,
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
        },
        data : courseId
      })

      const action = getStudentsofCourseAction(res.data);
      dispatch (action)

    }catch (err) {
      console.log (err)
    }
  }
}

export const getStudentsUnregisterdApi = (courseId : CourseId) => {
  return async (dispatch : DispatchType) => {
    try {
      const res = await axios({
        url : 'https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh',
        method : 'POST',
        headers : {
          Authorization: `Bearer ${getStoreJson(USER_LOGIN).accessToken}`,
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
        },
        data : courseId
      })
      const action = getStudentUnregisteredAction(res.data);
      dispatch (action)

    }catch (err)  {
      console.log(err)
    }
  }
}

export const cancelCourseApi = (course : RegisterCourse ) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await axios ( { 
       url : 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh ',
       method : 'POST',
       headers : {
        Authorization: `Bearer ${getStoreJson(USER_LOGIN).accessToken}`,
        TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
      },
      data : course 
      })
      const action = cancelCourseAction(res.data);

     dispatch (action)
     Swal.fire({
      title: 'Course is canceled',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
    
     console.log(res.data)
     
    }catch (err) {
      console.log(err)
    }
  }
}


export const getUnregisteredCoursesOfUserApi = (userName: string | undefined) => {
  return async (dispatch : DispatchType) => {
    try {

      const res = await axios ({
        url : `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${userName}`,
        method  :'POST',
        headers : {
          Authorization: `Bearer ${getStoreJson(USER_LOGIN).accessToken}`,
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
        },
      })
      const action = getUnregisteredCoursesofUserAction (res.data);
      dispatch (action)

    }catch (err) {
      console.log(err)
    }
  }
}