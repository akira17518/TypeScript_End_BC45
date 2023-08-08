import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  CourseDetail,
  CourseUpdate,
  updateCourseApi,
} from "../../redux/reducers/adminReducer";
import { updateProfileApi } from "../../redux/reducers/userReducder";
import { getCoursesApi } from "../../redux/reducers/courseReducer";

type EditAddCourseModalProps = {
  courseDetail: CourseDetail | null
};


type Props = {};

const EditAddCourseModal = ({ courseDetail }: EditAddCourseModalProps) => {
  const {arrCourse} = useSelector((state: RootState)=> state.courseReducer)

  const getArrCourse = async () => {
    const action = getCoursesApi ();
    dispatch (action)
  }
  useEffect(() => {
    getArrCourse()
  }, [])
  const dispatch: DispatchType = useDispatch();
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formValues, setFormValues] = useState<CourseUpdate>({
    maKhoaHoc:        "",
  biDanh:           "bc45",
  tenKhoaHoc:       "",
  moTa:             "",
  luotXem:          0,
  danhGia:          0,
  hinhAnh:          "",
  maNhom:           "",
  ngayTao:          "",
  maDanhMucKhoaHoc: "",
  taiKhoanNguoiTao: '',
  });
  
  useEffect(() => {
    if (courseDetail) {
      setFormValues({
        maKhoaHoc: courseDetail.maKhoaHoc,
        biDanh: courseDetail.biDanh,
        tenKhoaHoc: courseDetail.tenKhoaHoc,
        moTa: courseDetail.moTa,
        luotXem: courseDetail.luotXem,
        danhGia: 0,
        hinhAnh: courseDetail.hinhAnh,
        maNhom: courseDetail.maNhom,
        ngayTao: courseDetail.ngayTao,
        maDanhMucKhoaHoc: courseDetail.danhMucKhoaHoc.maDanhMucKhoahoc, 
        taiKhoanNguoiTao: courseDetail.nguoiTao.taiKhoan, 
      });
    }
  }, [courseDetail]);
  
const frm = useFormik({
  initialValues: formValues,
  onSubmit:(values:CourseUpdate)=> {
   
    values.hinhAnh = selectedFileName;
    if (selectedFile) {
      const action = updateCourseApi(values, selectedFile);
      dispatch(action);
      getArrCourse()
    }
  }
});
useEffect(() => {
  frm.setValues(formValues);
}, [formValues]);






  return (
    <form onSubmit={frm.handleSubmit}>
      <div>
        {/* Modal trigger button */}
        {/* Modal Body */}
        {/* if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard */}
        <div
          className="modal fade"
          id="modalAddEdit"
          tabIndex={-1}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="modalTitleId"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalTitleId">
                  <img
                    src={courseDetail?.hinhAnh}
                    alt="..."
                    width={50}
                    className="rounded-circle"
                  />
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="courseId" className="form-label">
                      Course ID
                    </label>
                    <input
                      onChange={frm.handleChange}
                      type="text"
                      className="form-control"
                      id="maKhoaHoc"
                      name="maKhoaHoc"
                      value={frm.values.maKhoaHoc}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="courseName" className="form-label">
                      Course Name
                    </label>
                    <input
                      onChange={frm.handleChange}
                      type="text"
                      className="form-control"
                      id="tenKhoaHoc"
                      name="tenKhoaHoc"
                      value={frm.values.tenKhoaHoc}

                     
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="courseCategory" className="form-label">
                      Course Category
                    </label>
                    <select
                       onChange={(e) => {
                        frm.handleChange(e);
                        frm.setFieldValue(
                          "maDanhMucKhoaHoc",
                          e.target.value
                        ); 
                      }}
                      
                     
                      value={frm.values.maDanhMucKhoaHoc}
                      className="form-control"
                      name="maDanhMucKhoahoc"
                      id="maDanhMucKhoahoc"
                    >
                      <option value="BackEnd">Backend</option>
                      <option value="Design">Design</option>
                      <option value="DiDong">Mobile</option>
                      <option value="FrontEnd">FrontEnd</option>
                      <option value="FullStack">Fullstack</option>
                      <option value="TuDuy">Logic</option>
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="date" className="form-label">
                      Date
                    </label>
                    <input
                      value={frm.values.ngayTao}

                      onChange={frm.handleChange}
                      type="text"
                      className="form-control"
                      id="ngayTao"
                      name="ngayTao"
                     
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="views" className="form-label">
                      Views
                    </label>
                    <input
                      value={frm.values.luotXem}

                      onChange={frm.handleChange}
                      type="number"
                      className="form-control"
                      id="luotXem"
                      name="luotXem"
                     
                     
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="rating" className="form-label">
                      Rating
                    </label>
                    <div className="input-group">
                      <input
                        onChange={frm.handleChange}
                        type="number"
                        className="form-control"
                        id="danhGia"
                        name="danhGia"
                      value={frm.values.danhGia}

                     
                        
                      />
                      <span className="input-group-text">
                        <i className="fa fa-star"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="creator" className="form-label">
                      Creator
                    </label>
                    <input
                      onChange={frm.handleChange}
                      type="text"
                      className="form-control"
                      id="taiKhoanNguoiTao"
                      name="taiKhoanNguoiTao"
                      value={frm.values.taiKhoanNguoiTao}
                      
                    
                     
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="file" className="form-label">
                      File
                    </label>
                    <input
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        setSelectedFile(file || null);
                        setSelectedFileName(file ? file.name : "");
                      }}
                      type="file"
                      className="form-control"
                      id="hinhAnh"
                      name="hinhAnh"
                    />
                  </div>
                </div>
                <select
                
                value={frm.values.maNhom}
                      
                onChange={(e) => {
                  frm.handleChange(e);
                  frm.setFieldValue(
                    "maNhom",
                    e.target.value
                  ); 
                }}
                  className="w-100"
                  name="maNhom"
                  id="maNhom"
                >
                  <option value="GP01">GP01</option>
                  <option value="GP02">GP02</option>
                  <option value="GP03">GP03</option>
                  <option value="GP04">GP04</option>
                  <option value="GP05">GP05</option>
                  <option value="GP06">GP06</option>
                  <option value="GP07">GP07</option>
                  <option value="GP08">GP08</option>
                  <option value="GP09">GP09</option>
                  <option value="GP10">GP10</option>
                  <option value="GP11">GP11</option>
                  <option value="GP12">GP12</option>
                  <option value="GP13">GP13</option>
                  <option value="GP14">GP14</option>
                  <option value="GP15">GP15</option>
                </select>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      value={frm.values.moTa}

                      name="moTa"
                      onChange={frm.handleChange}
                     
                    
                      className="form-control"
                      id="moTa"
                      rows={4}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
               
              </div>
            </div>
          </div>
        </div>
        {/* Optional: Place to the bottom of scripts */}
      </div>
    </form>
  );
};

export default EditAddCourseModal;
