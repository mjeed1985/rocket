import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const ActivityFeed = ({ activities }) => {
  const [filter, setFilter] = useState('all');

  const getActivityIcon = (type) => {
    const icons = {
      'plan': 'FileText',
      'communication': 'MessageSquare',
      'bulletin': 'Newspaper',
      'letter': 'Mail',
      'system': 'Settings',
      'user': 'User'
    };
    return icons[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      'plan': 'text-blue-600 bg-blue-50',
      'communication': 'text-green-600 bg-green-50',
      'bulletin': 'text-purple-600 bg-purple-50',
      'letter': 'text-orange-600 bg-orange-50',
      'system': 'text-gray-600 bg-gray-50',
      'user': 'text-primary-600 bg-primary-50'
    };
    return colors[type] || 'text-gray-600 bg-gray-50';
  };

  const formatActivityTime = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'الآن';
    if (diffInMinutes < 60) return `${diffInMinutes} دقيقة`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ساعة`;
    return `${Math.floor(diffInMinutes / 1440)} يوم`;
  };

  const filterOptions = [
    { value: 'all', label: 'جميع الأنشطة', icon: 'Activity' },
    { value: 'plan', label: 'الخطط', icon: 'FileText' },
    { value: 'communication', label: 'التبليغات', icon: 'MessageSquare' },
    { value: 'bulletin', label: 'النشرات', icon: 'Newspaper' },
    { value: 'letter', label: 'الخطابات', icon: 'Mail' }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  return (
    <div className="bg-surface rounded-xl shadow-card-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">سجل الأنشطة</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="Filter"
          className="text-text-muted"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-slate-100 rounded-lg">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              filter === option.value
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={option.icon} size={16} />
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
              <Icon name={getActivityIcon(activity.type)} size={18} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-text-primary">
                  {activity.title}
                </p>
                <span className="text-xs text-text-muted">
                  {formatActivityTime(activity.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-text-secondary mb-2 leading-relaxed">
                {activity.description}
              </p>
              
              {activity.metadata && (
                <div className="flex items-center space-x-4 rtl:space-x-reverse text-xs text-text-muted">
                  {activity.metadata.user && (
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Icon name="User" size={12} />
                      <span>{activity.metadata.user}</span>
                    </div>
                  )}
                  {activity.metadata.module && (
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Icon name="Layers" size={12} />
                      <span>{activity.metadata.module}</span>
                    </div>
                  )}
                  {activity.metadata.status && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.metadata.status === 'success' ? 'bg-success-100 text-success-800' :
                      activity.metadata.status === 'warning' ? 'bg-warning-100 text-warning-800' :
                      activity.metadata.status === 'error'? 'bg-error-100 text-error-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.metadata.statusText}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary">لا توجد أنشطة لعرضها</p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-slate-200">
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreHorizontal"
          iconPosition="right"
          className="w-full text-primary-600 hover:bg-primary-50"
        >
          عرض جميع الأنشطة
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeed;