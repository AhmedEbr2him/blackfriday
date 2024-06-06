import '../../styles/LoginPage.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeAuthRequest } from '../../reducers/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authData, authErrorMsg } = useSelector(state => state.authReducer);

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const formDataHandler = (e, property) => {
    setLoginData({
      ...loginData,
      [property]: e.target.value,
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(makeAuthRequest(loginData));
  };

  useEffect(() => {
    if (authData.isLoggedIn) navigate('/');
  }, [authData.isLoggedIn, navigate]);

  const notify = () => {
    toast('You are logged in!');
  };

  const checkLoginStatus = () => {
    if (authData.isLoggedIn) notify();
  };

  return (
    <main className='bg-secondary'>
      <div className='container'>
        <div className='sc-login'>
          <div className='login-content px-5 py-5'>
            <div className='login-title fs-20'>Login / Sign In</div>
            <form onSubmit={handleSubmit}>
              <div className='form-element'>
                <label htmlFor='username' className='form-label'>
                  Username:
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='username'
                  value={loginData.username}
                  onChange={e => formDataHandler(e, 'username')}
                />
              </div>
              <br />
              <div className='form-element'>
                <label htmlFor='password' className='form-label'>
                  Password:
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='password'
                  value={loginData.password}
                  onChange={e => formDataHandler(e, 'password')}
                />
              </div>
              <button
                type='submit'
                className='btn-login fs-16'
                onClick={checkLoginStatus}>
                Login
              </button>

              <div className='login-error-msg text-center my-3'>
                <p className='text-danger'>{authErrorMsg}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default LoginPage;
