import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import { Pagination } from "antd";
import Select from "react-select";

import {
  MyObject,
  cancelCourseApi,
  confirmCourseAction,
  confirmCourseApi,
  confirmedCoursesApi,
  deleteConfirmedCourse,
  getUnregisteredCoursesOfUserApi,
  getUnregisteredCoursesofUserAction,
  pendingCoursesAPi,
} from "../../redux/reducers/adminReducer";
import "../../style/style.scss";

type EnrollModalProps = {
  data: MyObject | null;
};
type Props = {};

const EnrollModal = ({ data }: EnrollModalProps) => {
  const dispatch: DispatchType = useDispatch();
  const { pendingCourses, confimredCourses, unregisteredCoursesofUser } =
    useSelector((state: RootState) => state.adminReducer);
  const getPendingCourses = async () => {
    const action = pendingCoursesAPi(data as MyObject);
    dispatch(action);
  };

  useEffect(() => {
    getPendingCourses();
  }, []);
  const [selectedCourse, setSelectedCourse] = useState<
    string | null | undefined
  >(null);
  const confirmedCourses = async () => {
    const action = confirmedCoursesApi(data as MyObject);
    dispatch(action);
  };

  const getUnregisteredCourses = async () => {
    const action = getUnregisteredCoursesOfUserApi(data?.taiKhoan);
    dispatch(action);
  };
  useEffect(() => {
    getUnregisteredCourses();
  }, [data?.taiKhoan]);

  useEffect(() => {
    confirmedCourses();
  }, []);
  console.log(unregisteredCoursesofUser);
  console.log(pendingCourses);
  console.log(data);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPage2, setCurrentPage2] = useState<number>(1);

  const itemsPerPage = 5;
  const itemsPerPage2 = 5;

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

  console.log(selectedCourse);

  return (
    <div className="enrollModal">
      {/* Modal trigger button */}

      {/* Modal Body */}
      {/* if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard */}
      <div
        className="modal fade"
        id="modalId"
        tabIndex={-1}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
          role="document"
        >
          <div
            className="modal-content"
            style={{ minWidth: "800px", width: "1000px" }}
          >
            <div className="modal-header bg-info">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center">
                {" "}
                <Select
                  className="w-75"
                  options={unregisteredCoursesofUser?.map((item) => ({
                    value: item.maKhoaHoc, 
                    label: item.tenKhoaHoc, 
                  }))}
                  value={
                    selectedCourse
                      ? {
                          value: selectedCourse,
                          label: unregisteredCoursesofUser?.find(
                            (item) => item.maKhoaHoc === selectedCourse
                          )?.tenKhoaHoc,
                        }
                      : null
                  }
                  onChange={(selectedOption) =>
                    setSelectedCourse(selectedOption?.value || null)
                  }
                  placeholder="Select a course"
                />
                
                <button
                  onClick={async () => {
                    if (selectedCourse) {
                      const course = {
                        maKhoaHoc: selectedCourse,
                        taiKhoan: data?.taiKhoan,
                      };
                      const action = confirmCourseApi(course);
                      await dispatch(action);
                      setSelectedCourse(null);
                      confirmedCourses();
                      getUnregisteredCourses();
                    }
                  }}
                  className="btn btn-info mx-2 w-25"
                >
                  Register
                </button>
              </div>
              <p className="text-center fs-4 fw-bold">Pending courses</p>
              <table className="w-100">
                <thead className="text-info">
                  <th>Order</th>
                  <th>Course</th>
                  <th className="text-center">Pending</th>
                </thead>
                <tbody>
                  {pendingCourses
                    ?.slice(indexOfFirstItem, indexOfLastItem)
                    .map((item, index) => {
                      const actualIndex = (currentPage - 1) * 5 + index + 1;
                      return (
                        <tr key={index}>
                          <td>{actualIndex}</td>
                          <td>{item.tenKhoaHoc}</td>
                          <td className="text-center">
                            <button
                              onClick={() => {
                                const course = {
                                  maKhoaHoc: item.maKhoaHoc,
                                  taiKhoan: data?.taiKhoan,
                                };

                                const action2 = confirmCourseApi(course);
                                dispatch(action2);
                                console.log(item.maKhoaHoc);
                                const action = deleteConfirmedCourse(
                                  item.maKhoaHoc
                                );
                                dispatch(action);
                                confirmedCourses();
                              }}
                              className="btn btn-info"
                            >
                              Confirm
                            </button>
                            <button  onClick={async () => {
                                const course = {
                                  maKhoaHoc: item.maKhoaHoc,
                                  taiKhoan: data?.taiKhoan,
                                };
                                const action = cancelCourseApi(course);
                                await dispatch(action);

                                getUnregisteredCourses();
                                confirmedCourses();
                              }} className="btn btn-danger mx-2">Del</button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <Pagination
                className="text-center"
                current={currentPage}
                onChange={handlePageChange}
                total={pendingCourses?.length || 0}
                pageSize={itemsPerPage}
              />
              <p className="text-center fs-4 fw-bold">Registered courses</p>
              <table className="w-100">
                <thead className="text-info">
                  <th>Order</th>
                  <th>Course</th>
                  <th className="text-center">Pending</th>
                </thead>
                <tbody>
                  {confimredCourses
                    ?.slice(indexOfFirstItem2, indexOfLastItem2)
                    .map((item, index) => {
                      const actualIndex = (currentPage2 - 1) * 5 + index + 1;
                      return (
                        <tr key={index}>
                          <td>{actualIndex}</td>
                          <td>{item.tenKhoaHoc}</td>
                          <td className="text-center">
                            <button
                              onClick={async () => {
                                const course = {
                                  maKhoaHoc: item.maKhoaHoc,
                                  taiKhoan: data?.taiKhoan,
                                };
                                const action = cancelCourseApi(course);
                                await dispatch(action);

                                getUnregisteredCourses();
                                confirmedCourses();
                              }}
                              className="btn btn-danger w-50"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <Pagination
                className="text-center"
                current={currentPage2}
                onChange={handlePageChange2}
                total={confimredCourses?.length || 0}
                pageSize={itemsPerPage2}
              />
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

export default EnrollModal;
