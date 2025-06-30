import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const RegistrationHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <Link to="/landing-page" className="inline-flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-lg">
          <Icon name="GraduationCap" size={32} color="white" strokeWidth={2} />
        </div>
      </Link>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3 font-heading">
        إنشاء حساب جديد
      </h1>
      
      {/* Subtitle */}
      <p className="text-lg text-text-secondary max-w-md mx-auto leading-relaxed">
        انضم إلى منصة SchoolPlan Pro وابدأ في إنشاء خططك التشغيلية بسهولة
      </p>

      {/* Login Link */}
      <div className="mt-6">
        <p className="text-sm text-text-secondary">
          لديك حساب بالفعل؟{' '}
          <Link 
            to="/login-page" 
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationHeader;