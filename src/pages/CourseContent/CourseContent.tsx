import React, { useEffect } from 'react';
import '../../style/style.scss';
import { useParams } from 'react-router-dom';
import { getCourseDetailApi } from '../../redux/reducers/courseReducer';
import { DispatchType, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { registerCourseApi } from '../../redux/reducers/adminReducer';
import { USER_LOGIN, getStoreJson } from '../../utility/config';
import Swal from 'sweetalert2';
import { type } from 'os';

type Props = {};

type RouteParams = {
  courseID: string;
}

const CourseContent = (props: Props) => {
  const { courseDetail } = useSelector((state: RootState) => state.courseReducer);
  const dispatch: DispatchType = useDispatch();
  const params = useParams() as RouteParams;
  console.log(params);

  const getCourseContent = async () => {
    const action = getCourseDetailApi(params.courseID);
    dispatch(action);
  };

  useEffect(() => {
    getCourseContent();
  }, [params.courseID]);

  console.log(courseDetail);

  return (
    <div className='courseContentPage' >
  <header style={{minHeight:'100vh'}}>
  <section className="hero-section">
  <img className='rounded-circle' src={courseDetail?.hinhAnh} alt="..." width={150}/>
  <h1>{courseDetail?.tenKhoaHoc}</h1>
  <h2>{courseDetail?.moTa}</h2>
  <button onClick={()=>{
    if (getStoreJson(USER_LOGIN)) {
      const course = {
        maKhoaHoc : courseDetail?.maKhoaHoc,
        taiKhoan : getStoreJson(USER_LOGIN).taiKhoan
      }
      const action = registerCourseApi(course);
      dispatch (action)
    }else {

      Swal.fire({
        icon: 'error',
        title: 'Please login to register the Course.',
      })
    }
  }}>Register</button>
</section>
</header>
</div>
  );
};
export default CourseContent;
