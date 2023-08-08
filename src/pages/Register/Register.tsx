import React, { useRef,useEffect ,useState} from 'react';
import '../../style/style.scss';
import { useFormik } from 'formik';
import { UserLogin, UserRegister, loginActionApi, registerActionApi } from '../../redux/reducers/userReducder';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/store';
import { history } from '../..';

type Props = {};

const Register = (props: Props) => {
const {userLogin} = useSelector((state: RootState)=>state.userReducer)
const dispatch: DispatchType = useDispatch()
const [isRegistered, setIsRegistered] = useState(false);
  const register = useFormik ({
    initialValues : {
         hoTen : '',
        matKhau : '',
        soDT: '',
        maNhom: '',
       taiKhoan  :'',
        email : ''

        

    },
    onSubmit : (values: UserRegister) => {
        console.log(values)
        const action  = registerActionApi(values);
        dispatch (action)
        setIsRegistered(true);
        
    }
  })

  const login = useFormik({
    initialValues : {
         taiKhoan : '',
         matKhau : ''
    },
    onSubmit  :(values: UserLogin) => {
        const action  = loginActionApi(values);
        dispatch (action)
        
       
    }
    
  })
  useEffect(() => {
    if (isRegistered) {
    
      document.querySelectorAll<HTMLInputElement>('.form-container input').forEach((input) => {
        input.value = '';
      });
    }
  }, [isRegistered, register]);

  useEffect(() => {
    if (userLogin?.maLoaiNguoiDung === 'GV') {
      history.push('/admin');
    } else if (userLogin?.maLoaiNguoiDung === 'HV') {
      history.push('/');
    }
  }, [userLogin?.maLoaiNguoiDung]);

  console.log(userLogin)
  const containerRef = useRef<HTMLDivElement>(null);
  const signInEmailRef = useRef<HTMLInputElement>(null);
  const signUpEmailRef = useRef<HTMLInputElement>(null);

  const openSignIn = () => {
    if (containerRef.current) {
      containerRef.current.classList.remove('right-panel-active');
      if (signUpEmailRef.current && signInEmailRef.current) {
        signInEmailRef.current.value = signUpEmailRef.current.value;
      }
    }
  };

  const openSignUp = () => {
    if (containerRef.current) {
      containerRef.current.classList.add('right-panel-active');
      if (signInEmailRef.current && signUpEmailRef.current) {
        signUpEmailRef.current.value = signInEmailRef.current.value;
      }
    }
  };

  return (
    <div className='register-page'>
      <div style={{marginTop:'120px'}} className='container ' id='container' ref={containerRef}>
        <div className='form-container sign-up-container '>
          <form onSubmit={register.handleSubmit}>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <input type='text' placeholder='username' id='taiKhoan' name='taiKhoan' onChange={register.handleChange} />
            <input type='text' placeholder='Name' id='hoTen' name='hoTen' onChange={register.handleChange} />
            <input type='text' placeholder='Phone' id='soDT' name='soDT' onChange={register.handleChange}/>

            <input type='text' placeholder='Group name' id='maNhom' name='maNhom' onChange={register.handleChange} />


            <input type='email' id='emmail' name='email' placeholder='Email'  ref={signUpEmailRef} onChange={register.handleChange} />
            <input type='password' placeholder='Password' id='matKhau' name='matKhau' onChange={register.handleChange} />

            <button type='submit'>Sign Up</button>
          </form>
        </div>
        <div className='form-container sign-in-container'>
          <form onSubmit={login.handleSubmit}>
            <h1>Sign in</h1>
            <span>or use your account</span>
            <input id='taiKhoan' name='taiKhoan' placeholder='User name' ref={signInEmailRef} onChange={login.handleChange} />
            <input id='natKhau' name='matKhau' type='password' placeholder='Password'  onChange={login.handleChange} />
            <button type='submit'>Sign In</button>
          </form>
        </div>
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us, please login with your personal info</p>
              <button className='ghost' id='signIn' onClick={openSignIn}>
                Sign In
              </button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className='ghost' id='signUp' onClick={openSignUp}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
