import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'
import { DispatchType, RootState } from '../../redux/store'
import { getCategoryApi } from '../../redux/reducers/courseReducer'
import '../../style/style.scss'
import { USER_LOGIN } from '../../utility/config'
import { loginAction, loginActionApi } from '../../redux/reducers/userReducder'
import { history } from '../..'
type Props = {
  logo?: JSX.Element
}

const Header = (props: Props) => {
  const {arrcategory} = useSelector ((state:RootState)=> state.courseReducer)
  const {userLogin} = useSelector((state:RootState)=>state.userReducer)
  const dispatch: DispatchType = useDispatch();
  
  const [showHello, setShowHello] = useState(false);

  useEffect(() => {
    if (userLogin?.accessToken) {
      setShowHello(true);

      const hideHelloInterval = setInterval(() => {
        setShowHello(false);
        clearInterval(hideHelloInterval);
      }, 5000); 

      return () => {
        clearInterval(hideHelloInterval);
      };
    }
  }, [userLogin?.accessToken]);

  const getCategory = () => {
    const action = getCategoryApi();
    dispatch(action)
  }
  useEffect (() => {
getCategory ()
  }, []);

  console.log(arrcategory)
  const renderLogin = () => {
    if (userLogin?.accessToken) {
      return (
        <div
          className="user-profile-link"
         
        >
          {userLogin.maLoaiNguoiDung === 'GV' && (
            <span
              onClick={() => {
                history.push('/admin');
              }}
              className='text-info mx-1 icon-cog'
            >
              <i className="fa fa-cog"></i>
            </span>
          )}
          <NavLink to={'/userProfile'}>
            <img
              src='https://bootdey.com/img/Content/avatar/avatar6.png'
              alt="..."
            />
          </NavLink>
          {showHello && <span className='hello-popup text-light '>{`Hello ${userLogin?.taiKhoan}`}</span>}
          <span
            className='text-info icon-logout'
            onClick={() => {
              localStorage.removeItem(USER_LOGIN);
              const action = loginAction({});
              dispatch(action);
              history.push('/');
            }}
          >
            <i className="fa fa-sign-out-alt"></i>
          </span>
        </div>
      );
    } else {
      return (
        <NavLink
          style={{ width: '150px' }}
          className="btn btn-outline-success my-2 my-sm-0"
          to={`/register`}
        >
          Login
        </NavLink>
      );
    }
  };

  
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light  headerComp">
      <div className="container">
        <NavLink className="navbar-brand" to='/' >{props.logo} Elearning</NavLink>
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Courses</a>
              <div className="dropdown-menu" aria-labelledby="dropdownId">
               
                  {arrcategory.map((item,index) => {
                    return  <NavLink key={index} className="dropdown-item" to={`/courses/${item.maDanhMuc}`}>{item.tenDanhMuc}</NavLink>
                  })}
              </div>
            </li>
          </ul>
          <form className="d-flex my-2 my-lg-0">
            <input className="form-control me-sm-2" type="text" placeholder="Search" />
             {renderLogin()}
          </form>
        </div>
      </div>
    </nav>


  )
}

export default Header