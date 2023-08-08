import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { USER_LOGIN, getStoreJson } from "../../utility/config";
import { KhoaHoc, themKhoaHocApi } from "../../redux/reducers/adminReducer";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import { getCategoryApi } from "../../redux/reducers/courseReducer";

type Props = {};

const AddCourseModal = (props: Props) => {
  const { arrcategory } = useSelector(
    (state: RootState) => state.courseReducer
  );
  const [imgSrc, setImgSrc] = useState ('');

  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch: DispatchType = useDispatch();
  const form = useFormik({
    initialValues: {
      maKhoaHoc: "",
      biDanh: "tltltl",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      hinhAnh: "",
      maNhom: "",
      ngayTao: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: `${getStoreJson(USER_LOGIN).taiKhoan}`,
    },
    onSubmit: (values: KhoaHoc) => {
      console.log(values);

      values.hinhAnh = selectedFileName;
      if (selectedFile) {
        const action = themKhoaHocApi(values, selectedFile);
        dispatch(action);
      }
    },
  });
  const getCategory = () => {
    const action = getCategoryApi();
    dispatch(action);
  };
  useEffect(() => {
    getCategory();
  }, []);
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let file: File | null = e.target.files ? e.target.files[0] : null;
    if (file) {
      let reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setImgSrc(e.target.result as string);
        }
      };
    }
  };
  return (
    <div>
      <form onSubmit={form.handleSubmit}>
        {/* Modal trigger button */}
        {/* Modal Body */}
        {/* if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard */}
        <div
          className="modal fade"
          id="modalAddCourse"
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
                  Create course
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
                    <input
                      id="maKhoaHoc"
                      name="maKhoaHoc"
                      type="text"
                      className="form-control"
                      placeholder="Course Id"
                      onChange={form.handleChange}
                    />
                  </div>
                  <div className="col">
                    <input
                      id="tenKhoaHoc"
                      name="tenKhoaHoc"
                      onChange={form.handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Course Name"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <select
                      id="maDanhMucKhoaHoc"
                      name="maDanhMucKhoaHoc"
                      onChange={(e) => {
                        form.handleChange(e);
                        form.setFieldValue("maDanhMucKhoaHoc", e.target.value);
                      }}
                      className="form-control"
                    >
                      <option>Select Course Category</option>
                      {arrcategory?.map((item, index) => {
                        return (
                          <option key={index} value={item.maDanhMuc}>
                            {item.tenDanhMuc}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col">
                    <input
                      id="ngayTao"
                      name="ngayTao"
                      onChange={form.handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Date Created"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <div className="input-group">
                      <input
                        id="danhGia"
                        name="danhGia"
                        onChange={form.handleChange}
                        type="number"
                        className="form-control"
                        placeholder="Rate"
                      />
                      <span className="input-group-text">
                        <i className="bi bi-star-fill"></i>
                      </span>
                    </div>
                  </div>
                  <div className="col">
                    <input
                      id="luotXem"
                      name="luotXem"
                      onChange={form.handleChange}
                      type="number"
                      className="form-control"
                      placeholder="Views"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      id="taiKhoanNguoiTao"
                      name="taiKhoanNguoiTao"
                      onChange={form.handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Creator"
                      value={getStoreJson(USER_LOGIN).taiKhoan}
                    />
                  </div>
                  <div className="col">
                    <input
                      name="hinhAnh"
                      id="hinhAnh"
                      onChange={(event) => {
                        handleChangeFile(event)
                        const file = event.target.files?.[0];
                        setSelectedFile(file || null);
                        setSelectedFileName(file ? file.name : "");
                      }}
                      type="file"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-3">

                  <div className="col">
                  <img
                      src= {imgSrc}
                      alt="..."
                      width={100}
                      className="mt-1"
                    />
                    <select
                      onChange={(e) => {
                        form.handleChange(e);
                        form.setFieldValue("maNhom", e.target.value);
                      }}
                      name="maNhom"
                      id="maNhom"
                      className="form-control mt-2"
                    >
                      <option value="">Group</option>
                      <option value="GP01">GP01</option>
                      <option value="GP02">GP02</option>
                    </select>
                  
                    <textarea
                      
                      rows={4}
                      id="moTa"
                      name="moTa"
                      onChange={form.handleChange}
                      className="form-control mt-3"
                      placeholder="Description"
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
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* Optional: Place to the bottom of scripts */}
    </div>
  );
};

export default AddCourseModal;
