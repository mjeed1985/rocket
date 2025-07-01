import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBackground from './components/LoginBackground';
import LoginCard from './components/LoginCard';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import userManagementService from '../../services/userManagementService';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/user-dashboard', { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      // محاولة تسجيل الدخول باستخدام خدمة إدارة المستخدمين
      const user = await userManagementService.loginUser(formData.email, formData.password);
      
      // تحديد وجهة التوجيه بناءً على دور المستخدم
      if (user.role === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else {
        navigate('/user-dashboard', { replace: true });
      }

    } catch (err) {
      setError(err.message || 'حدث خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background Component */}
      <LoginBackground />
      
      {/* Main Content */}
      <div className="w-full max-w-md relative z-10">
        <LoginCard>
          <LoginHeader />
          <LoginForm 
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error}
          />
        </LoginCard>
      </div>

      {/* Back to Landing Page */}
      <button
        onClick={() => navigate('/landing-page')}
        className="fixed top-4 left-4 z-20 bg-surface/80 backdrop-blur-sm border border-slate-200 rounded-lg p-2 text-text-secondary hover:text-primary-600 hover:bg-surface transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        disabled={isLoading}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>
    </div>
  );
};

export default LoginPage;