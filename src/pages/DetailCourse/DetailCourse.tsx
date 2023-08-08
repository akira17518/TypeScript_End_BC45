import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { DispatchType, RootState } from '../../redux/store';
import { getCoursesbyCategoryApi } from '../../redux/reducers/courseReducer';
import { registerCourseApi } from '../../redux/reducers/adminReducer';
import { USER_LOGIN, getStoreJson } from '../../utility/config';

type Props = {};
type RouteParams = {
  course: string;
}

const DetailCourse = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const params = useParams() as RouteParams;
  console.log(params);
  const { arrCoursesbyCategory } = useSelector((state: RootState) => state.courseReducer);
  const [filteredCourses, setFilteredCourses] = useState(arrCoursesbyCategory);

  const getArrCoursesbyCategory = async () => {
    const action = getCoursesbyCategoryApi(params.course);
    dispatch(action);
  };


  useEffect(() => {
    getArrCoursesbyCategory();
  }, [params.course]);

  useEffect(() => {
    setFilteredCourses(arrCoursesbyCategory);
  }, [arrCoursesbyCategory]);

  const handleImageError = (index: number) => {
    setFilteredCourses((prevCourses) => {
      const updatedCourses = [...prevCourses];
      updatedCourses.splice(index, 1);
      return updatedCourses;
    });
  };

  return (
    <div className="container detail-page">
    
      <div className="row">
        {filteredCourses?.map((item, index) => (
          <div className="col-4 mt-2 card-group" key={index}>
            <div className="card">
              <img className="card-img-top" src={item.hinhAnh} onError={() => handleImageError(index)} alt="..." />
              <div className="card-block">
                <p className='fw-bold'>{item.tenKhoaHoc}</p>
                <p>{item.moTa.length > 40 ? `${item.moTa.substring(0, 40)}...` : item.moTa}</p>
              </div>
              <div className="card-block course-info">
                <div className="card-course-info">
                  <figure>
                    <img src="https://images.unsplash.com/photo-1494571180607-f17765ead771?auto=format&fit=crop&w=983&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="" />
                  </figure>
                  <p className="card-text tutor-name">Kaylee Warren</p>
                  <span className="tutor-description">TUTOR</span>
                </div>
                <div className="card-course-info">
                  <span>
                    <i className="fa fa-clock-o" aria-hidden="true" /> about 4 hours
                  </span>
                  <span>
                    <i className="fa fa-graduation-cap" aria-hidden="true" />
                    287
                  </span>
                </div>
               
              </div>
              <div className="card-block card-bottom">
                <NavLink to={`/detail/${item.maKhoaHoc}`} className="btn">
                  Start
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailCourse;