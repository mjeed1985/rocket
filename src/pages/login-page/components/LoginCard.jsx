import React from 'react';

const LoginCard = ({ children }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-surface rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Card Header with Gradient */}
        <div className="h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"></div>
        
        {/* Card Content */}
        <div className="p-8 sm:p-10">
          {children}
        </div>
        
        {/* Card Footer */}
        <div className="px-8 pb-6 pt-0">
          <div className="border-t border-slate-200 pt-6">
            <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse text-xs text-text-muted">
              <span>© {new Date().getFullYear()} SchoolPlan Pro</span>
              <span>•</span>
              <button 
                type="button"
                className="hover:text-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-1 py-1"
                onClick={() => {
                  console.log('Privacy policy clicked');
                }}
              >
                سياسة الخصوصية
              </button>
              <span>•</span>
              <button 
                type="button"
                className="hover:text-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-1 py-1"
                onClick={() => {
                  console.log('Terms clicked');
                }}
              >
                الشروط والأحكام
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Info Card */}
      <div className="mt-6 bg-surface/80 backdrop-blur-sm rounded-xl border border-slate-200 p-4">
        <div className="text-center">
          <p className="text-sm text-text-secondary mb-2">
            للحصول على المساعدة أو الدعم الفني
          </p>
          <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
            <button 
              type="button"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-2 py-1"
              onClick={() => {
                console.log('Contact support clicked');
              }}
            >
              تواصل معنا
            </button>
            <span className="text-text-muted">•</span>
            <button 
              type="button"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-2 py-1"
              onClick={() => {
                console.log('Help center clicked');
              }}
            >
              مركز المساعدة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;