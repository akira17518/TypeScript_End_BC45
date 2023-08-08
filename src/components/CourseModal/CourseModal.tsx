import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import { Pagination } from "antd";
import Select from "react-select";


import {
  CourseDetail,
  CourseId,
  RegisterCourse,
  StudentsWaiting,
  cancelCourseApi,
  confirmCourseApi,
  deleteConfirmedCourse,
  getStudentsUnregisterdApi,
  getStudentsWatingApi,
  getStudentsofCourseApi,
  registerCourseApi,
} from "../../redux/reducers/adminReducer";
type CourseModalProps = {
  studentsWaiting: StudentsWaiting[] | null;
  studentsofCourse: StudentsWaiting[] | null;
  studentsUnregistered: StudentsWaiting[] | null;
  courseDetail: CourseDetail | null;
};

type Props = {};

const CourseModal: React.FC<CourseModalProps> = ({
  studentsWaiting,
  studentsofCourse,
  studentsUnregistered,
  courseDetail,
}) => {
  console.log(courseDetail);
  console.log(studentsWaiting);
  console.log(studentsofCourse);
  const dispatch: DispatchType = useDispatch();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  console.log(selectedUser);
  const getStudentsWating = async (courseID: CourseId) => {
    const action = getStudentsWatingApi(courseID);
    dispatch(action);
  };

  const getStudentUnregistered = async (courseID: CourseId) => {
    const action = getStudentsUnregisterdApi(courseID);
    dispatch(action);
  };

  const getStudentsofCourse = async (courseID : CourseId) => {
    const action = getStudentsofCourseApi(courseID);
    dispatch (action)
  }
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPage2, setCurrentPage2] = useState<number>(1);

  const itemsPerPage = 3; 
  const itemsPerPage2 = 3; 

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlePageChange2 = (page: number) => {
    setCurrentPage2(page);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfLastItem2 = currentPage2 * itemsPerPage2;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;

  return (
    <div className="modalCourseManagement">
      {/* Modal trigger button */}

      {/* Modal Body */}
      {/* if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard */}
      <div
        className="modal fade"
        id="courseModal"
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
            <div className="modal-header ">
              <h5 className="modal-title" id="modalTitleId">
               Course Management
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center">
              
                <Select className="w-75"
  options={studentsUnregistered?.map((item) => ({
    value: item.taiKhoan,
    label: item.hoTen,
  }))}
  value={selectedUser ? { value: selectedUser, label: selectedUser } : null}
  onChange={(selectedOption) => setSelectedUser(selectedOption?.value || null)}
  placeholder="Select a user"
/>
                <span className="d-inline-block ms-3 ">
                 
                  <button
                    onClick={async() => {
                      if (selectedUser) {
                        const courseId = {
                          maKhoaHoc : courseDetail?.maKhoaHoc
                        }
                        const userInfo = {
                          maKhoaHoc: courseDetail?.maKhoaHoc,
                          taiKhoan: selectedUser,
                        };
                         
                        const action = confirmCourseApi(userInfo);
                       await dispatch(action);
                       setSelectedUser(null);
                       getStudentsofCourse(courseId)
                      }
                    }}
                    className="btn btn-info "
                  >
                    Register
                  </button>
                </span>
              </div>
              <hr style={{ width: "5px" }} />
              <p className="text-center fw-bold fs-4">Students in lobby</p>
              {/* Table */}
              <table className="table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>User</th>
                    <th>Name</th>
                    <th>Pending</th>
                  </tr>
                </thead>
                <tbody>
                {studentsWaiting
              ?.slice(indexOfFirstItem, indexOfLastItem)
              .map((item, index) => {
                const actualIndex = (currentPage - 1) * 3 + index + 1;
                    return (
                      <tr key={index}>
                        <td>{actualIndex}</td>
                        <td>{item.taiKhoan}</td>
                        <td>{item.hoTen}</td>
                        <td style={{ whiteSpace: "nowrap" }}>
                          <button onClick={ async()=> {
                             const courseId = {
                              maKhoaHoc : courseDetail?.maKhoaHoc
                            }
                            const userInfo = {
                              maKhoaHoc: courseDetail?.maKhoaHoc,
                              taiKhoan: item.taiKhoan,
                            };
                            const action = confirmCourseApi (userInfo )
                           await  dispatch(action)
                           const action2 = deleteConfirmedCourse(courseDetail?.maKhoaHoc);
                           dispatch (action2)

                            getStudentsofCourse (courseId)
                            getStudentUnregistered(courseId);
                            getStudentsWating(courseId)
                          }}
                            style={{
                              marginRight: "5px",
                              verticalAlign: "middle",
                            }}
                            className="btn btn-primary"
                          >
                            Confirm
                          </button>
                          <button onClick={ async () => {
                             const courseId = {
                              maKhoaHoc : courseDetail?.maKhoaHoc
                            }
                             const userInfo = {
                              maKhoaHoc: courseDetail?.maKhoaHoc,
                              taiKhoan: item.taiKhoan,
                            };
                            
                            const action = cancelCourseApi (userInfo)
                           await dispatch (action)
                           getStudentsofCourse (courseId)
                           getStudentUnregistered(courseId);
                           getStudentsWating(courseId)

                           
                          }} className="btn btn-danger">Del</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination className="text-center"
          current={currentPage}
          onChange={handlePageChange}
          total={studentsWaiting?.length || 0}
          pageSize={itemsPerPage}
        />
              <hr />
              <p className="text-center fw-bold fs-4">Students registerd</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>User</th>
                    <th>Name</th>
                    <th>Pending</th>
                  </tr>
                </thead>
                <tbody>
                {studentsofCourse
              ?.slice(indexOfFirstItem2, indexOfLastItem2)
              .map((item, index) => {
                const actualIndex = (currentPage2 - 1) * 3 + index + 1;
                    return (
                      <tr key={index}>
                        <td>{actualIndex}</td>
                        <td>{item.taiKhoan}</td>
                        <td>{item.hoTen}</td>
                        <td>
                          <button onClick={async()=>{
                             const courseId = {
                              maKhoaHoc : courseDetail?.maKhoaHoc
                            }
                             const userInfo = {
                              maKhoaHoc: courseDetail?.maKhoaHoc,
                              taiKhoan: item.taiKhoan,
                            };
                            
                            const action = cancelCourseApi (userInfo)
                           await dispatch (action)
                           getStudentsofCourse (courseId)
                           getStudentUnregistered(courseId);
                           getStudentsWating(courseId)

                          }} className="btn btn-danger w-100">
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination className="text-center"
          current={currentPage2}
          onChange={handlePageChange2}
          total={studentsofCourse?.length || 0}
          pageSize={itemsPerPage2}
        />
              {/* End of Table */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Optional: Place to the bottom of scripts */}
    </div>
  );
};

export default CourseModal;
