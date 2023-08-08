import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/store'
import { UserUpdate, getProfileApi, updateProfileApi } from '../../redux/reducers/userReducder'
import { DisabledType } from 'antd/es/config-provider/DisabledContext'
import { useFormik } from 'formik'

type Props = {}

const Profile = (props: Props) => {
  const [formValues, setFormValues] = useState<UserUpdate>({
    taiKhoan: '',
    hoTen: '',
    email: '',
    maNhom: '',
    maLoaiNguoiDung: '',
    soDT: '',
    matKhau: ''
  });
  const {userProfile,userUpdate} = useSelector((state: RootState)=>state.userReducer);
  const dispatch: DispatchType = useDispatch()

  const getProFile = () => {
    const action = getProfileApi();
    dispatch (action )
  };
  useEffect(() => {
    if (userProfile) {
      setFormValues(userProfile);
    }
  }, [userProfile]);
 useEffect(()=>{
   getProFile()
 },[])


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





 console.log(userProfile)
  return (
    <div className='profile-page'>
 <div className="container emp-profile">
      
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt='...' />
              <div className="file btn btn-lg btn-primary">
                Change Photo
                <input type="file" name="file" />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h5>
                Kshiti Ghelani
              </h5>
              <h6>
                Web Developer and Designer
              </h6>
              <p className="proile-rating">RANKINGS : <span>8/10</span></p>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                </li>
              </ul>
            </div>
          </div>
         
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="profile-work">
              <p>WORK LINK</p>
              <a >Website Link</a><br />
              <a >Bootsnipp Profile</a><br />
              <a >Bootply Profile</a>
              <p>SKILLS</p>
              <a>Web Designer</a><br />
              <a>Web Developer</a><br />
              <a>WordPress</a><br />
              <a>WooCommerce</a><br />
              <a>PHP, .Net</a><br />
            </div>
          </div>
          <div className="col-md-8">
            <div className="tab-content profile-tab" id="myTabContent">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <form onSubmit={frm.handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <label>User Name</label>
                  </div>
                  <div className="col-md-6">
                     <input type="text" id='taiKhoan' name='taiKhoan' value={frm.values.taiKhoan}   onChange={frm.handleChange}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                   <input id='hoTen' name='hoTen' type="text"  value={frm.values.hoTen} onChange={frm.handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                   <input id='email' name='email' type="text"  value={frm.values.email} onChange={frm.handleChange} />
                    
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Phone</label>
                  </div>
                  <div className="col-md-6">
                  <input id='soDT' name='soDT' type="text"  value={frm.values.soDT}  onChange={frm.handleChange} />
                 
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Type</label>
                  </div>
                  <div className="col-md-6">
                   <input id='maLoaiNguoiDung' name='maLoaiNguoiDung' type="text" value={frm.values.maLoaiNguoiDung}  onChange={frm.handleChange} />
                     
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Group</label>
                  </div>
                  <div className="col-md-6">
                   <input id='maNhom' name='maNhom' type="text" value={frm.values.maNhom}  onChange={frm.handleChange} />
                     
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Password</label>
                  </div>
                  <div className="col-md-6">
                   <input id='matKhau' name='matKhau' type="password" value={frm.values.matKhau}  onChange={frm.handleChange} />
                     
                  </div>
                </div>
                <button type='submit' className='btn btn-danger'>Update</button>
                </form>
                
              </div>
              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div className="row">
                  <div className="col-md-6">
                    <label>Experience</label>
                  </div>
                  <div className="col-md-6">
                    <p>Expert</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Hourly Rate</label>
                  </div>
                  <div className="col-md-6">
                    <p>10$/hr</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Total Projects</label>
                  </div>
                  <div className="col-md-6">
                    <p>230</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>English Level</label>
                  </div>
                  <div className="col-md-6">
                    <p>Expert</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Availability</label>
                  </div>
                  <div className="col-md-6">
                    <p>6 months</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label>Your Bio</label><br />
                    <p>Your detail description</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </div>

    </div>
   
  )
}

export default Profile