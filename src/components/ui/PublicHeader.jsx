import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const PublicHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-header bg-surface border-b border-slate-200 shadow-card-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/landing-page" className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-primary">
              <Icon name="GraduationCap" size={24} color="white" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-heading text-[rgba(142,100,16,1)]">خطتك التشغيلية الذكية</span>
              <span className="text-sm font-medium text-primary-600 -mt-1">Pro</span>
            </div>
          </Link>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Button
              variant="ghost"
              size="sm"
              iconName="LogIn"
              iconPosition="left"
              onClick={() => window.location.href = '/login-page'}
              className="hidden sm:flex">

              تسجيل الدخول
            </Button>
            
            <Button
              variant="primary"
              size="sm"
              iconName="UserPlus"
              iconPosition="left"
              onClick={() => window.location.href = '/user-registration'}>

              إنشاء حساب
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              iconName="Menu"
              onClick={() => {
                // Mobile menu toggle logic would go here
                console.log('Mobile menu toggle');
              }}
              className="sm:hidden" />

          </div>
        </div>
      </div>
    </header>);

};

export default PublicHeader;