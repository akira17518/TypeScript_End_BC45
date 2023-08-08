import React, { useEffect, useState } from "react";
import "../../style/style.scss";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import {
  CourseId,
  KhoaHoc,
  MyObject,
  User,
  confirmedCoursesApi,
  deleteCourseApi,
  getDetailCourseApi,
  getStudentsUnregisterdApi,
  getStudentsWatingApi,
  getStudentsofCourseApi,
  getUserListApi,
  pendingCoursesAPi,
  themKhoaHocApi,
} from "../../redux/reducers/adminReducer";
import { Pagination, Tabs } from "antd";
import EnrollModal from "../../components/EnrollModal/EnrollModal";
import { useFormik } from "formik";
import { string } from "yup";
import {
  getCategoryApi,
  getCoursesApi,
} from "../../redux/reducers/courseReducer";
import { USER_LOGIN, getStoreJson } from "../../utility/config";
import AddUserModal from "../../components/AddUserModal/AddUserModal";
import EditAddCourseModal from "../../components/EditAddCourseModal/EditAddCourseModal";
import CourseModal from "../../components/CourseModal/CourseModal";
import EditUserModal from "../../components/EditUserModal/EditUserModal";
import AddCourseModal from "../../components/AddCourseModal/AddCourseModal";
import { history } from "../..";

const { TabPane } = Tabs;

type Props = {};

const UserManagement = (props: Props) => {
  const [selectedUser, setSelectedUser] = useState< User | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const { arrCourse } = useSelector((state: RootState) => state.courseReducer);
  const {userLogin} = useSelector((state:RootState)=> state.userReducer)
  if (!getStoreJson(USER_LOGIN)) {
    history.push('/')
  }
  if (userLogin?.maLoaiNguoiDung !== 'GV') {
    history.push('/')
  }
  const { arrcategory } = useSelector(
    (state: RootState) => state.courseReducer
  );
  const {
    userList,
    courseDetail,
    studentsWaiting,
    studentsofCourse,
    studentsUnregisterd,
  } = useSelector((state: RootState) => state.adminReducer);
  const filteredUserList = userList.filter((item) =>
    item.hoTen  .toLowerCase().includes(searchKeyword.toLowerCase())
  );
  const getArrCourses = async () => {
    const action = getCoursesApi();
    dispatch(action);
  };

  useEffect(() => {
    getArrCourses();
  }, []);
  console.log(arrCourse);

  console.log(courseDetail);
  const dispatch: DispatchType = useDispatch();
  console.log(userList);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("users");
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
  const handleEditCourse = (courseId: string) => {
    const action = getDetailCourseApi(courseId);
    dispatch(action);
  };

  const getUserList = async () => {
    const action = getUserListApi();
    dispatch(action);
  };

  useEffect(() => {
    getUserList();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [enrollModalData, setEnrollModalData] = useState<MyObject | null>(null);

  
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const getCategory = () => {
    const action = getCategoryApi();
    dispatch(action);
  };
  useEffect(() => {
    getCategory();
  }, []);

  console.log(studentsofCourse);
  console.log(studentsWaiting);
  console.log(studentsUnregisterd);

  return (
    <div className="admin-page">
      <div className="container-xl">
        <CourseModal
          studentsWaiting={studentsWaiting}
          studentsofCourse={studentsofCourse}
          studentsUnregistered={studentsUnregisterd}
          courseDetail={courseDetail}
        />
         <EditUserModal user={selectedUser} />
        <AddUserModal />
        <AddCourseModal/>
        <EnrollModal data={enrollModalData} />
       
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane className='fw-semibold' tab="USERS" key="users">
          <div className="search-bar">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search by name..."
          />
        </div>
            {/* User table content */}
            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-sm-5">
                      <h2>
                        User <b>Management</b>
                      </h2>
                    </div>
                    <div className="col-sm-7">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#modalId2"
                        className="btn btn-secondary"
                      >
                        <i className="material-icons"></i>{" "}
                        <span>Add New User</span>
                      </button>
                    </div>
                  </div>
                </div>
                <table className="table  table-hover">
                  {/* Table header */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User </th>
                      <th>Type</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody>
                    {filteredUserList
                      ?.slice((currentPage - 1) * 6, currentPage * 6)
                      .map((item, index) => {
                        const actualIndex = (currentPage - 1) * 6 + index + 1;
                        return (
                          <tr key={index}>
                            <td>{actualIndex}</td>
                            <td>
                              <a href="#">
                                <img
                                  width={50}
                                  src={`https://i.pravatar.cc?u=${index}`}
                                  className="avatar"
                                  alt="Avatar"
                                />
                                {item.taiKhoan}
                              </a>
                            </td>
                            <td className="text-primary fw-bold">
                              {item.maLoaiNguoiDung}
                            </td>
                            <td>{item.hoTen}</td>
                            <td>{item.email}</td>
                            <td>{item.soDt}</td>
                            <td>
                              <div className="btn-group" role="group">
                                <button
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalId"
                                  className="btn btn-info"
                                  onClick={() => {
                                    console.log(5343643654);
                                    const objectTaiKhoan = {
                                      taiKhoan: item.taiKhoan,
                                    };
                                    setEnrollModalData(objectTaiKhoan);

                                    const action3 =
                                      pendingCoursesAPi(objectTaiKhoan);
                                    const action2 =
                                      confirmedCoursesApi(objectTaiKhoan);

                                    dispatch(action3);
                                    dispatch(action2);
                                  }}
                                >
                                  Enroll
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedUser(item);
                                  }}
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalEditUser"
                                  className="btn btn-warning mx-2"
                                >
                                  Edit
                                </button>
                                <button className="btn btn-danger">Del</button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {/* Pagination */}
                <div className="clearfix">
                  <ul className="pagination">
                    <Pagination
                      defaultCurrent={1}
                      total={userList.length}
                      pageSize={6}
                      onChange={handlePageChange}
                    />
                  </ul>
                </div>
              </div>
            </div>
          </TabPane>

          <TabPane tab="COURSES" key="other">
            <EditAddCourseModal courseDetail={courseDetail} />
            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-sm-5">
                      <h2>
                        User <b>Management</b>
                      </h2>
                    </div>
                    <div className="col-sm-7">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#modalAddCourse"
                        className="btn btn-secondary"
                      >
                        <i className="material-icons"></i>{" "}
                        <span>Add new course</span>
                      </button>
                    </div>
                  </div>
                </div>
                <table className="table table-hover">
                  {/* Table header */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Creator</th>
                      <th>Date</th>
                      <th className="text-center">
                        <i className="fa fa-cog"></i>
                      </th>
                    </tr>
                  </thead>
                  {/* Table body */}
                  <tbody>
                    {arrCourse
                      ?.slice((currentPage - 1) * 6, currentPage * 6)
                      .map((item, index) => {
                        const actualIndex = (currentPage - 1) * 6 + index + 1;
                        return (
                          <tr key={index}>
                            <td>{actualIndex}</td>
                            <td>
                              <a href="#">
                                <img
                                  width={50}
                                  src={item.hinhAnh}
                                  className="avatar"
                                  alt="Avatar"
                                />
                                {item.tenKhoaHoc}
                              </a>
                            </td>
                            <td className="text-primary">
                              {item.nguoiTao.taiKhoan}
                            </td>
                            <td>{item.ngayTao}</td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              <button
                                onClick={() => {
                                  handleEditCourse(item.maKhoaHoc);
                                  const courseId = {
                                    maKhoaHoc: item.maKhoaHoc,
                                  };
                                  const action = getStudentsWatingApi(courseId);
                                  dispatch(action);
                                  const action2 =
                                    getStudentsofCourseApi(courseId);
                                  dispatch(action2);
                                  const action3 =
                                    getStudentsUnregisterdApi(courseId);
                                  dispatch(action3);
                                }}
                                className="btn btn-success mx-1"
                                data-bs-toggle="modal"
                                data-bs-target="#courseModal"
                              >
                                Enroll
                              </button>
                              <button
                                onClick={() => handleEditCourse(item.maKhoaHoc)}
                                data-bs-toggle="modal"
                                data-bs-target="#modalAddEdit"
                                style={{
                                  marginRight: "5px",
                                  verticalAlign: "middle",
                                }}
                                className="btn btn-info"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  const action = deleteCourseApi(
                                    item.maKhoaHoc
                                  );
                                  dispatch(action);
                                }}
                                style={{ verticalAlign: "middle" }}
                                className="btn btn-info"
                              >
                                Del
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                {/* Pagination */}
                <div className="clearfix">
                  <ul className="pagination">
                    <Pagination
                      defaultCurrent={1}
                      total={arrCourse.length}
                      pageSize={6}
                      onChange={handlePageChange}
                    />
                  </ul>
                </div>
              </div>
            </div>
            
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default UserManagement;
