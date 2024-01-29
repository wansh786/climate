import React from 'react';
import './login.css';

const Login: React.FC = () => {
  const loginWithGoogle = () => {
    window.open('http://localhost:6005/auth/google/callback', '_self');
  };

  return (
    <div id='banner'>
      <div className='login-page'>
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <div className='form'>
          <form className='login-form'>
            <input type='text' name='name' id='username' placeholder='username' />
            <input type='password' name='password' id='password' placeholder='password' />
            <button>Login</button>
            <p className='message'>
              Not Registered? <a href='#'>Credentials</a>
            </p>
          </form>
          <button className='login-with-google-btn' onClick={loginWithGoogle}>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

