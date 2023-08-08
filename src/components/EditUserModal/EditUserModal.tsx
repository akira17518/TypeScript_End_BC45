import React, { useEffect, useState } from "react";
import { UserUpdate, getProfileApi, updateProfileApi } from "../../redux/reducers/userReducder";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import { User } from "../../redux/reducers/adminReducer";
import { useFormik } from "formik";
type EditUserModalProps = {
  user: User | null;
};
type Props = {};

const EditUserModal = (props: EditUserModalProps) => {
    const dispatch : DispatchType = useDispatch()
  const [formValues, setFormValues] = useState<UserUpdate>({
    taiKhoan: "",
    hoTen: "",
    email: "",
    maNhom: "",
    maLoaiNguoiDung: "",
    soDT: "",
    matKhau: "",
  });
  const { user } = props;
  useEffect(() => {
    if (user) {
      setFormValues ({
        taiKhoan : user.taiKhoan,
        hoTen : user.hoTen,
        email  : user.email,
        maNhom: '',
        maLoaiNguoiDung : user.maLoaiNguoiDung,
        soDT: user.soDt,
        matKhau: ''
      })
    }
  }, [user]);

  const frm = useFormik({
    initialValues: formValues,
    onSubmit:(values:UserUpdate)=> {
       const action  = updateProfileApi(values);
       dispatch (action)
    }
  });
  
  useEffect(() => {
    frm.setValues(formValues);
  }, [formValues]);
  
  console.log(user);

  return (
    <form onSubmit={frm.handleSubmit}>
      <div>
        {/* Modal trigger button */}

        {/* Modal Body */}
        {/* Remove data-bs-backdrop and data-bs-keyboard to allow clicking outside and pressing Escape to close */}
        <div
          className="modal fade"
          id="modalEditUser"
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
                  Update user
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
                        value={frm.values.taiKhoan}
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
                        value={frm.values.hoTen}
                        
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
                        value={frm.values.email}
                        
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
                        name="soDt"
                        id="datepicker"
                        className="form-control"
                        placeholder="Phone number"
                        value={frm.values.soDT}
                       
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

                        value={frm.values.maLoaiNguoiDung}
                        
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
                  Update
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

export default EditUserModal;
