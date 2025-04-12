import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { loginUser, registerUser, clearError } from '../store/slices/authSlice';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import Spinner from '../components/layout/Spinner';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const message = searchParams.get('message');
    if (message === 'session_expired') {
      dispatch(clearError());
    }
  }, [searchParams, dispatch]);

  const handleSubmit = async (formData) => {
    if (isLogin) {
      await dispatch(loginUser(formData));
    } else {
      await dispatch(registerUser(formData));
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="auth-container">
      {error && <div className="alert error">{error}</div>}
      {isLogin ? (
        <LoginForm 
          onSubmit={handleSubmit}
          switchToRegister={() => setIsLogin(false)}
        />
      ) : (
        <RegisterForm
          onSubmit={handleSubmit}
          switchToLogin={() => setIsLogin(true)}
        />
      )}
    </div>
  );
};

export default AuthPage;