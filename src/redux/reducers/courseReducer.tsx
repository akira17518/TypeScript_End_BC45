import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import { DispatchType } from '../store';
import { http } from '../../utility/config';
import axios from 'axios';

export interface CourseItem {
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

export interface categoryItem {
    maDanhMuc:  string;
    tenDanhMuc: string;  
}

export interface coursesByCate {
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


interface CourseState {
    arrCourse : CourseItem[],
    arrcategory : categoryItem[],
    arrCoursesbyCategory : coursesByCate[],
    courseDetail : CourseItem | null 
}
const initialState: CourseState = {
   arrCourse : [],
   arrcategory : [],
   arrCoursesbyCategory  : [],
   courseDetail : null
}

const courseReducer = createSlice({
  name: 'courseReducer' ,
  initialState,
  reducers: {
    getCoursesAction : (state:CourseState,action:PayloadAction<CourseItem[]> ) => {
        state.arrCourse = action.payload
    },
    getCategoryAction : (state:CourseState,action: PayloadAction<categoryItem[]>) => {
        state.arrcategory = action.payload;

    },

    getCoursesByCategoryAction : (state : CourseState, action  : PayloadAction<coursesByCate[]>) => {
        state.arrCoursesbyCategory  = action.payload
    },

    getCourseDetailAction: (state,action) => {
        state.courseDetail = action.payload
    }

  }
});

export const {getCoursesAction,getCategoryAction,getCoursesByCategoryAction,getCourseDetailAction} = courseReducer.actions

export default courseReducer.reducer

export const getCoursesApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await axios({
        url: 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc',
        method: 'GET',
        headers: {
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`,
        },
      });

      
      const loadImage = (src: string) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = (error) => reject(error);
          img.src = src;
        });
      };

     
      const filteredCourses = await Promise.all(
        res.data.map(async (item: CourseItem) => {
          try {
            const img = await loadImage(item.hinhAnh);
            if (img.complete && img.naturalWidth !== 0) {
              return item;
            }
          } catch (error) {
            console.error('Error loading image:', error);
          }
          return null;
        })
      );

      
      const validCourses = filteredCourses.filter((item) => item !== null);

      const action: PayloadAction<CourseItem[]> = getCoursesAction(validCourses);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};


export const getCategoryApi = () => {
    return async (dispatch : DispatchType) => {
        try {
          const res = await axios ({
             url : 'https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc ',
             method : 'GET' ,
             headers : {
                TokenCybersoft : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`
             }
          })

          const action:PayloadAction <categoryItem[]> = getCategoryAction(res.data);
          dispatch (action)
        }catch (err) {
            console.log(err)
        }
    }
}

export const getCoursesbyCategoryApi = (category: string | undefined) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await axios({
        url: `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${category}`,
        method: 'GET',
        headers: {
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`,
        },
      });
   
     
      const action: PayloadAction<coursesByCate[]> = getCoursesByCategoryAction(res.data);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
};


export const getCourseDetailApi = (courseId : string| undefined) => {
  return async (dispatch : DispatchType) => {
     try {
      const res = await axios ({
        url : `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${courseId} `,
        method :  'GET',
        headers: {
          TokenCybersoft: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjA4LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMTk5MzYwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyMTQxMjAwfQ.1MKFgiR_REeXZ8RKBhPFQLyitVek8kDJ3u1JPaCB1MU`,
        },

      })

      const action = getCourseDetailAction(res.data);
      dispatch (action)

     }catch (err) {
      console.log (err)
     }
  }
}
