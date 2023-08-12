import React, { useEffect, useState } from 'react'
import { DispatchType, RootState } from '../../redux/store'
import {useSelector, useDispatch} from 'react-redux'
import { getCoursesApi } from '../../redux/reducers/courseReducer'
import '../../style/style.scss'

import WOW from 'wowjs'
import 'wowjs/css/libs/animate.css';
import Swal from 'sweetalert2'
import { Button } from 'antd'
import { NavLink } from 'react-router-dom'
import { USER_LOGIN, getStoreJson } from '../../utility/config'
import { registerCourseApi } from '../../redux/reducers/adminReducer'
type Props = {}

const HomePage = (props: Props) => {
  const {arrCourse}  = useSelector ((state:RootState)=> state.courseReducer)
  console.log(arrCourse)
  const dispatch:DispatchType =  useDispatch()

  const getCourses  = async() => {
    const action = getCoursesApi();
    dispatch (action)
  }

  useEffect(() => {
    new WOW.WOW({
      live: false
    }).init();
  }, [])
useEffect (() => {
   getCourses()
},[])
  return (
    <div className='container-fluid home-component' >
      


<div className='homepageTest'>
{/* <video  className="video-background w-100" autoPlay muted loop   controls={false} onContextMenu={(e) => e.preventDefault()} >
          <source src="./images/video1.webm"  />
          Your browser does not support the video tag.
        </video> */}
  <div className="container-fluid py-5">
    <div className="container">
      <div className="row g-4">
        <div className="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="service-item text-center pt-3">
            <div className="p-4">
              <i className="fa fa-3x fa-book-reader text-primary mb-4"></i>
              <h5 className="mb-3">Personalized learning</h5>
              <p>Learn at your own pace, reinforcing old knowledge and supplementing advanced knowledge.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
          <div className="service-item text-center pt-3">
            <div className="p-4">
            <i className="fa fa-3x fa-graduation-cap text-primary mb-4"></i>
              <h5 className="mb-3">Trusted content</h5>
              <p>The system of lectures and practical exercises is built specifically for different courses.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
          <div className="service-item text-center pt-3">
            <div className="p-4">
              <i className="fa fa-3x fa-home text-primary mb-4" />
              <h5 className="mb-3">Home Projects</h5>
              <p>Choose from face-to-face learning at the center or interactive online learning to suit students' needs</p>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
          <div className="service-item text-center pt-3">
            <div className="p-4">
              <i className="fa fa-3x fa-book-open text-primary mb-4" />
              <h5 className="mb-3">Code Library</h5>
                    <p>Access our extensive coding library for references.</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  </div>
  {/* Service End */}
  {/* Categories Start */}
  <div className="container-xxl py-5 category">
    <div className="container">
      <div className="text-center wow fadeInUp" data-wow-delay="0.2s">
        <h6 className="section-title bg-white text-center text-primary px-3">Categories</h6>
        <h1 className="mb-5">Courses Categories</h1>
      </div>
      <div className="row g-3">
        <div className="col-lg-7 col-md-6">
          <div className="row g-3">
            
            <div className="col-lg-12 col-md-12 wow zoomIn" data-wow-delay="0.3s">
              <NavLink to={`/courses/BackEnd`}  className="position-relative d-block overflow-hidden" >
                <img className="img-fluid" src="./images/cat-1.jpg" alt='...' />
                <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style={{margin: 1}}>
                  <h5 className="m-0">Backend</h5>
                  <small className="text-primary">49 Courses</small>
                </div>
              </NavLink>
            </div>
            <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.4s">
              <NavLink to={`/courses/Design`} className="position-relative d-block overflow-hidden" >
                <img className="img-fluid" src="./images/cat-2.jpg" alt='...' />
                <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style={{margin: 1}}>
                  <h5 className="m-0">Web Design</h5>
                  <small className="text-primary">49 Courses</small>
                </div>
              </NavLink>
            </div>
            <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.5s">
              <NavLink to={`/courses/DiDong`} className="position-relative d-block overflow-hidden" >
                <img className="img-fluid" src="./images/cat-3.jpg" alt='...' />
                <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style={{margin: 1}}>
                  <h5 className="m-0">Mobile Development</h5>
                  <small className="text-primary">49 Courses</small>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-6 wow zoomIn" data-wow-delay="0.7s" style={{minHeight: 350}}>
          <NavLink to={`/courses/FullStack`} className="position-relative d-block h-100 overflow-hidden" >
            <img className="img-fluid position-absolute w-100 h-100" src="./images/cat-4.jpg" alt='...' style={{objectFit: 'cover'}} />
            <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style={{margin: 1}}>
              <h5 className="m-0">FullStack Development</h5>
              <small className="text-primary">49 Courses</small>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  </div>
  {/* Categories Start */}
  {/* Courses Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
        <h6 className="section-title bg-white text-center text-primary px-3">Courses</h6>
        <h1 className="mb-5">Popular Courses</h1>
      </div>
      <div className="row g-4 justify-content-center">
        {arrCourse?.slice(0,9).map((item,index) => {
           
            return   <div className="col-lg-4 col-md-6 wow fadeInUp card-group" data-wow-delay="0.1s" key={index}>
            <div className="course-item bg-light card">
              <div className="position-relative overflow-hidden">
                <img style={{width: '100%', height:'200px', objectFit:'cover'}} className="img-fluid " src={item.hinhAnh} alt='...'  />
                <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                  <NavLink to={`/detail/${item.maKhoaHoc}`}className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end" style={{borderRadius: '30px 0 0 30px'}}>Read More</NavLink>
                  <Button onClick={()=> {
                    if (getStoreJson(USER_LOGIN)){
                      const course  = {
                        maKhoaHoc : item.maKhoaHoc,
                        taiKhoan : getStoreJson(USER_LOGIN)?.taiKhoan
                      }
                      const action =   registerCourseApi (course);
                      dispatch (action);
                    }else {
                      alert ('You must login first!')
                    }
                  }} className="flex-shrink-0 btn btn-sm btn-primary px-3" style={{borderRadius: '0 30px 30px 0'}}>Register</Button>
                </div>
              </div>
              <div className="text-center p-4 pb-0">
                <h3 className="mb-0">$149.00</h3>
                <div className="mb-3">
                  <small className="fa fa-star text-primary" />
                  <small className="fa fa-star text-primary" />
                  <small className="fa fa-star text-primary" />
                  <small className="fa fa-star text-primary" />
                  <small className="fa fa-star text-primary" />
                  <small>(123)</small>
                </div>
                <h5 className="mb-4">Web Design &amp; Development Course for Beginners</h5>
              </div>
              <div className="d-flex border-top">
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2" />Khai Truong</small>
                <small className="flex-fill text-center border-end py-2"><i className="fa fa-clock text-primary me-2" />1.49 Hrs</small>
                <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2" />30 Students</small>
              </div>
            </div>
          </div>
        
        
      
        })} 
      </div>
    </div>
  </div>
  {/* Courses End */}
  {/* Team Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
        <h6 className="section-title bg-white text-center text-primary px-3">Instructors</h6>
        <h1 className="mb-5">Expert Instructors</h1>
      </div>
      <div className="row g-4">
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="team-item bg-light">
            <div className="overflow-hidden">
              <img className="img-fluid" src="./images/team-1.jpg" alt='...' />
            </div>
            <div className="position-relative d-flex justify-content-center" style={{marginTop: '-23px'}}>
              <div className="bg-light d-flex justify-content-center pt-2 px-1">
                <a className="btn btn-sm-square btn-primary mx-1" ><i className="fab fa-facebook-f" /></a>
                <a className="btn btn-sm-square btn-primary mx-1" ><i className="fab fa-twitter" /></a>
                <a className="btn btn-sm-square btn-primary mx-1" ><i className="fab fa-instagram" /></a>
              </div>
            </div>
            <div className="text-center p-4">
              <h5 className="mb-0">Joe Rogan</h5>
              <small> Computer Science </small>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
          <div className="team-item bg-light">
            <div className="overflow-hidden">
              <img className="img-fluid" src="./images/team-2.jpg" alt='...'  />
            </div>
            <div className="position-relative d-flex justify-content-center" style={{marginTop: '-23px'}}>
              <div className="bg-light d-flex justify-content-center pt-2 px-1">
                <a className="btn btn-sm-square btn-primary mx-1" ><i className="fab fa-facebook-f" /></a>
                <a className="btn btn-sm-square btn-primary mx-1" ><i className="fab fa-twitter" /></a>
                <a className="btn btn-sm-square btn-primary mx-1" ><i className="fab fa-instagram" /></a>
              </div>
            </div>
            <div className="text-center p-4">
              <h5 className="mb-0"> Anna Kendrick</h5>
              <small>HTML/CSS</small>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
          <div className="team-item bg-light">
            <div className="overflow-hidden">
              <img className="img-fluid" src="./images/team-3.jpg" alt='...' />
            </div>
            <div className="position-relative d-flex justify-content-center" style={{marginTop: '-23px'}}>
              <div className="bg-light d-flex justify-content-center pt-2 px-1">
                <a className="btn btn-sm-square btn-primary mx-1" ><i className="fab fa-facebook-f" /></a>
                <a className="btn btn-sm-square btn-primary mx-1" ><i className="fab fa-twitter" /></a>
                <a className="btn btn-sm-square btn-primary mx-1" ><i className="fab fa-instagram" /></a>
              </div>
            </div>
            <div className="text-center p-4">
              <h5 className="mb-0">Lex Fridmann</h5>
              <small>Data Science 
</small>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
          <div className="team-item bg-light">
            <div className="overflow-hidden">
              <img className="img-fluid" src="./images/team-4.jpg" alt='...' />
            </div>
            <div className="position-relative d-flex justify-content-center" style={{marginTop: '-23px'}}>
              <div className="bg-light d-flex justify-content-center pt-2 px-1">
                <a className="btn btn-sm-square btn-primary mx-1" ><i className="fab fa-facebook-f" /></a>
                <a className="btn btn-sm-square btn-primary mx-1" ><i className="fab fa-twitter" /></a>
                <a className="btn btn-sm-square btn-primary mx-1" ><i className="fab fa-instagram" /></a>
              </div>
            </div>
            <div className="text-center p-4">
              <h5 className="mb-0">Camilla Belle</h5>
              <small>UX/UI</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Team End */}
  {/* About Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style={{minHeight: 400}}>
          <div className="position-relative h-100">
            <img className="img-fluid position-absolute w-100 h-100" src="./images/about.jpg" alt='...' style={{objectFit: 'cover'}} />
          </div>
        </div>
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
          <h6 className="section-title bg-white text-start text-primary pe-3">About Us</h6>
          <h1 className="mb-4">Welcome to eLEARNING</h1>
          <p className="mb-4">Welcome to the Coding World, where we foster a passion for coding and development. We believe that coding is an art, and we are dedicated to helping aspiring developers reach their full potential.</p>
        <p className="mb-4">Our mission is to provide top-notch coding education through our skilled instructors and online classes. We encourage students to work on real-world projects from the comfort of their homes and build a solid code library for future reference.</p>
          <div className="row gy-2 gx-4 mb-4">
            <div className="col-sm-6">
              <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />Skilled Instructors</p>
            </div>
            <div className="col-sm-6">
              <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />Online Classes</p>
            </div>
            <div className="col-sm-6">
              <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />International Certificate</p>
            </div>
            <div className="col-sm-6">
              <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />Skilled Instructors</p>
            </div>
            <div className="col-sm-6">
              <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />Online Classes</p>
            </div>
            <div className="col-sm-6">
              <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2" />International Certificate</p>
            </div>
          </div>
          <a className="btn btn-primary py-3 px-5 mt-2" >Read More</a>
        </div>
      </div>
    </div>
  </div>
  {/* About End */}
  
  {/* Footer Start */}
  
</div>

  
      
    </div>
  )
}

export default HomePage