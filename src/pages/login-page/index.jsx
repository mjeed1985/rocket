import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginBackground from './components/LoginBackground';
import LoginCard from './components/LoginCard';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock user data for authentication
  const mockUsers = [
    {
      email: "daxxxer@gmail.com",
      password: "123456",
      role: "admin",
      name: "مدير النظام"
    },
    {
      email: "ahmed@school.com",
      password: "123456",
      role: "user",
      name: "أحمد محمد",
      school: "مدرسة الأمل الابتدائية"
    },
    {
      email: "fatima@school.com",
      password: "123456",
      role: "user",
      name: "فاطمة علي",
      school: "مدرسة النور المتوسطة"
    }
  ];

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Find user in mock data
      const user = mockUsers.find(u => 
        u.email.toLowerCase() === formData.email.toLowerCase() && 
        u.password === formData.password
      );

      if (!user) {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.');
        return;
      }

      // Store user data in localStorage (in real app, use secure token storage)
      const userData = {
        id: user.email,
        email: user.email,
        name: user.name,
        role: user.role,
        school: user.school || null,
        loginTime: new Date().toISOString(),
        rememberMe: formData.rememberMe
      };

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');

      // Role-based redirection
      if (user.role === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else {
        navigate('/user-dashboard', { replace: true });
      }

    } catch (err) {
      setError('حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى لاحقاً.');
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