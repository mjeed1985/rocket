import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const SystemNotifications = ({ notifications }) => {
  const [showAll, setShowAll] = useState(false);

  const getNotificationIcon = (type) => {
    const icons = {
      'system': 'Settings',
      'update': 'Download',
      'reminder': 'Bell',
      'warning': 'AlertTriangle',
      'info': 'Info'
    };
    return icons[type] || 'Bell';
  };

  const getNotificationColor = (type) => {
    const colors = {
      'system': 'text-primary-600 bg-primary-50',
      'update': 'text-success-600 bg-success-50',
      'reminder': 'text-warning-600 bg-warning-50',
      'warning': 'text-error-600 bg-error-50',
      'info': 'text-blue-600 bg-blue-50'
    };
    return colors[type] || 'text-gray-600 bg-gray-50';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'الآن';
    if (diffInMinutes < 60) return `${diffInMinutes} دقيقة`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ساعة`;
    return `${Math.floor(diffInMinutes / 1440)} يوم`;
  };

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 5);

  return (
    <div className="bg-surface rounded-xl shadow-card-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">إشعارات النظام</h3>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
            {notifications.filter(n => !n.read).length} جديد
          </span>
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            className="text-text-muted"
          />
        </div>
      </div>

      <div className="space-y-3">
        {displayedNotifications.map((notification, index) => (
          <div key={index} className={`flex items-start space-x-3 rtl:space-x-reverse p-3 rounded-lg transition-all duration-200 ${
            notification.read ? 'opacity-60' : 'bg-slate-50'
          }`}>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
              <Icon name={getNotificationIcon(notification.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${notification.read ? 'text-text-secondary' : 'text-text-primary font-medium'}`}>
                {notification.title}
              </p>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                {notification.message}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-text-muted">
                  {formatTimeAgo(notification.timestamp)}
                </span>
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Check"
                    className="text-xs text-primary-600 hover:bg-primary-50 px-2 py-1"
                  >
                    تم القراءة
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length > 5 && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <Button
            variant="ghost"
            size="sm"
            iconName={showAll ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            onClick={() => setShowAll(!showAll)}
            className="w-full text-primary-600 hover:bg-primary-50"
          >
            {showAll ? 'عرض أقل' : `عرض جميع الإشعارات (${notifications.length})`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SystemNotifications;