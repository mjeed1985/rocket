import React from 'react';
import Icon from 'components/AppIcon';

const WelcomeHeader = ({ userInfo, stats }) => {
  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'صباح الخير';
    if (hour < 18) return 'مساء الخير';
    return 'مساء الخير';
  };

  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl p-6 text-white shadow-card-2 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            {getCurrentGreeting()}، {userInfo.principalName}
          </h1>
          <p className="text-primary-100 text-lg">
            مدير {userInfo.schoolName} - {userInfo.educationLevel}
          </p>
          <p className="text-primary-200 text-sm mt-1">
            آخر تسجيل دخول: {userInfo.lastLogin}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 lg:gap-6">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center min-w-[100px]">
            <div className="flex items-center justify-center mb-2">
              <Icon name="FileText" size={24} className="text-white" />
            </div>
            <p className="text-2xl font-bold">{stats.completedPlans}</p>
            <p className="text-primary-100 text-sm">خطة مكتملة</p>
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center min-w-[100px]">
            <div className="flex items-center justify-center mb-2">
              <Icon name="MessageSquare" size={24} className="text-white" />
            </div>
            <p className="text-2xl font-bold">{stats.pendingCommunications}</p>
            <p className="text-primary-100 text-sm">تبليغ معلق</p>
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center min-w-[100px]">
            <div className="flex items-center justify-center mb-2">
              <Icon name="Bell" size={24} className="text-white" />
            </div>
            <p className="text-2xl font-bold">{stats.systemAlerts}</p>
            <p className="text-primary-100 text-sm">تنبيه جديد</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;