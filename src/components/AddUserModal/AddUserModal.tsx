import { useFormik } from "formik";
import React from "react";
import { Adduser, addUserApi } from "../../redux/reducers/adminReducer";
import { DispatchType } from "../../redux/store";
import { useDispatch } from "react-redux";

type Props = {};

const AddUserModal = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const frm = useFormik({
    initialValues: {
      hoTen: "",
      taiKhoan: " ",
      email: "",
      matKhau: "",
      maLoaiNguoiDung: "",
      soDT: "",
      maNhom: "",
    },
    onSubmit: (values: Adduser) => {
      console.log(values);
      const action = addUserApi(values);
      dispatch(action);
    },
  });
  return (
    
      <form onSubmit={frm.handleSubmit}>
      <div>
        {/* Modal trigger button */}

        {/* Modal Body */}
        {/* Remove data-bs-backdrop and data-bs-keyboard to allow clicking outside and pressing Escape to close */}
        <div
          className="modal fade"
          id="modalId2"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modalTitleId"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-scrollable modal-dialog-centered  modal-medium"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header  text-center">
                <h5 className="modal-title " id="modalTitleId">
                   Add user
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-user" />
                        </span>
                      </div>
                      <input
                        onChange={frm.handleChange}
                        name="taiKhoan"
                        id="tknv"
                        className="form-control input-sm"
                        placeholder="User name"
                       
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-address-book" />
                        </span>
                      </div>
                      <input
                        onChange={frm.handleChange}

                        type="text"
                        name="hoTen"
                        id="name"
                        className="form-control input-sm"
                        placeholder="Full name"
                      
                        
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-envelope" />
                        </span>
                      </div>
                      <input
                        onChange={frm.handleChange}

                        type="text"
                        name="email"
                        id="email"
                        className="form-control input-sm"
                        placeholder="Email"
                       
                        
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-key" />
                        </span>
                      </div>
                      <input
                         onChange={frm.handleChange}
                        type="password"
                        name="matKhau"
                        id="password"
                        className="form-control input-sm"
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-phone" />
                        </span>
                      </div>
                      <input
                        onChange={frm.handleChange}

                        type="text"
                        name="soDT"
                        id="datepicker"
                        className="form-control"
                        placeholder="Phone number"

                       
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-briefcase" />
                        </span>
                      </div>
                      <select
                        onChange={frm.handleChange}

                      
                        
                        className="form-control"
                        id="chucvu"
                        name="maLoaiNguoiDung"
                      >
                        <option>Type</option>
                        <option value="GV">Teacher</option>
                        <option value="HV">Student</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-briefcase" />
                        </span>
                      </div>
                      <select
                        onChange={frm.handleChange}
                        
                        className="form-control"
                        id="maNhom"
                        name="maNhom"
                      >
                        <option>Group</option>
                        <option value="GP01">GP01</option>
                        <option value="GP02">GP02</option>
                      </select>
                    </div>
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
                  Add
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

export default AddUserModal;
