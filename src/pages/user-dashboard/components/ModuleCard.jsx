import React from 'react';

import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const ModuleCard = ({ module }) => {
  const getGradientClass = (type) => {
    const gradients = {
      'operational-plans': 'from-blue-500 to-blue-600',
      'admin-communications': 'from-green-500 to-green-600',
      'internal-bulletins': 'from-purple-500 to-purple-600',
      'external-letters': 'from-orange-500 to-orange-600'
    };
    return gradients[type] || 'from-gray-500 to-gray-600';
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-success-500';
    if (percentage >= 50) return 'bg-warning-500';
    return 'bg-error-500';
  };

  return (
    <div className="bg-surface rounded-xl shadow-card-2 hover:shadow-card-3 transition-all duration-300 overflow-hidden group">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${getGradientClass(module.type)} p-6 text-white`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="bg-white bg-opacity-20 rounded-lg p-2">
              <Icon name={module.icon} size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{module.title}</h3>
              <p className="text-white text-opacity-80 text-sm">{module.subtitle}</p>
            </div>
          </div>
          
          {module.hasNotification && (
            <div className="bg-error-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {module.notificationCount}
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>التقدم</span>
            <span>{module.progress}%</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className={`${getProgressColor(module.progress)} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${module.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-text-secondary text-sm mb-4 leading-relaxed">
          {module.description}
        </p>

        {/* Recent Activity */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-text-primary mb-3">النشاط الأخير</h4>
          <div className="space-y-2">
            {module.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse text-sm">
                <div className={`w-2 h-2 rounded-full ${activity.status === 'completed' ? 'bg-success-500' : activity.status === 'pending' ? 'bg-warning-500' : 'bg-error-500'}`}></div>
                <span className="text-text-secondary flex-1">{activity.title}</span>
                <span className="text-text-muted text-xs">{activity.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {module.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-xs text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            size="sm"
            iconName={module.primaryAction.icon}
            iconPosition="right"
            onClick={() => window.location.href = module.primaryAction.href}
            className="flex-1"
          >
            {module.primaryAction.label}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName={module.secondaryAction.icon}
            iconPosition="right"
            onClick={() => window.location.href = module.secondaryAction.href}
            className="flex-1"
          >
            {module.secondaryAction.label}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;