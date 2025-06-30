import React, { useState } from 'react';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Icon from 'components/AppIcon';

const LoginForm = ({ onSubmit, isLoading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'يرجى إدخال بريد إلكتروني صحيح';
    }
    
    if (!formData.password.trim()) {
      errors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      errors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        rememberMe
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-text-primary">
          البريد الإلكتروني
        </label>
        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="أدخل بريدك الإلكتروني"
            className={`w-full pr-10 ${validationErrors.email ? 'border-error-300 focus:border-error-500 focus:ring-error-200' : ''}`}
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon name="Mail" size={20} className="text-text-muted" />
          </div>
        </div>
        {validationErrors.email && (
          <p className="text-sm text-error-600 flex items-center space-x-1 rtl:space-x-reverse">
            <Icon name="AlertCircle" size={16} />
            <span>{validationErrors.email}</span>
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-text-primary">
          كلمة المرور
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            placeholder="أدخل كلمة المرور"
            className={`w-full pr-10 pl-10 ${validationErrors.password ? 'border-error-300 focus:border-error-500 focus:ring-error-200' : ''}`}
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon name="Lock" size={20} className="text-text-muted" />
          </div>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 left-0 pl-3 flex items-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md"
            disabled={isLoading}
          >
            <Icon 
              name={showPassword ? 'EyeOff' : 'Eye'} 
              size={20} 
              className="text-text-muted hover:text-text-primary transition-colors duration-200" 
            />
          </button>
        </div>
        {validationErrors.password && (
          <p className="text-sm text-error-600 flex items-center space-x-1 rtl:space-x-reverse">
            <Icon name="AlertCircle" size={16} />
            <span>{validationErrors.password}</span>
          </p>
        )}
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
            disabled={isLoading}
          />
          <label htmlFor="rememberMe" className="text-sm text-text-secondary">
            تذكرني
          </label>
        </div>
        
        <button
          type="button"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-1 py-1"
          onClick={() => {
            // Forgot password functionality would go here
            console.log('Forgot password clicked');
          }}
          disabled={isLoading}
        >
          نسيت كلمة المرور؟
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-error-50 border border-error-200 rounded-lg p-3">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Icon name="AlertCircle" size={20} className="text-error-600 flex-shrink-0" />
            <p className="text-sm text-error-700">{error}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        iconName="LogIn"
        iconPosition="right"
        className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
      </Button>

      {/* Registration Link */}
      <div className="text-center">
        <p className="text-sm text-text-secondary">
          ليس لديك حساب؟{' '}
          <button
            type="button"
            onClick={() => window.location.href = '/user-registration'}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-1 py-1"
            disabled={isLoading}
          >
            إنشاء حساب جديد
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;