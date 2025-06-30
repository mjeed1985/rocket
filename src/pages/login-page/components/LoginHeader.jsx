import React from 'react';
import Icon from 'components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-lg">
          <Icon name="GraduationCap" size={32} color="white" strokeWidth={2} />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-text-primary mb-2 font-heading">
        مرحباً بك في SchoolPlan Pro
      </h1>
      
      {/* Subtitle */}
      <p className="text-lg text-text-secondary mb-6">
        منصة التخطيط التعليمي الذكية
      </p>

      {/* Welcome Message */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-2">
          <Icon name="Shield" size={20} className="text-primary-600" />
          <span className="text-sm font-medium text-primary-800">تسجيل دخول آمن</span>
        </div>
        <p className="text-sm text-primary-700">
          استخدم بياناتك للوصول إلى لوحة التحكم وإدارة خططك التشغيلية
        </p>
      </div>

      {/* User Type Indicators */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-3">
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-1">
            <Icon name="Users" size={16} className="text-secondary-600" />
            <span className="text-xs font-medium text-secondary-800">المستخدمون</span>
          </div>
          <p className="text-xs text-secondary-700">مديرو المدارس والمعلمون</p>
        </div>
        
        <div className="bg-accent-50 border border-accent-200 rounded-lg p-3">
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-1">
            <Icon name="Settings" size={16} className="text-accent-600" />
            <span className="text-xs font-medium text-accent-800">المديرون</span>
          </div>
          <p className="text-xs text-accent-700">إدارة النظام والمستخدمين</p>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;