import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const UpcomingDeadlines = ({ deadlines }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'text-error-600 bg-error-50 border-error-200',
      'medium': 'text-warning-600 bg-warning-50 border-warning-200',
      'low': 'text-success-600 bg-success-50 border-success-200'
    };
    return colors[priority] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getPriorityText = (priority) => {
    const priorities = {
      'high': 'عالية',
      'medium': 'متوسطة',
      'low': 'منخفضة'
    };
    return priorities[priority] || priority;
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'متأخر';
    if (diffDays === 0) return 'اليوم';
    if (diffDays === 1) return 'غداً';
    return `${diffDays} أيام`;
  };

  const getDeadlineIcon = (type) => {
    const icons = {
      'plan': 'Calendar',
      'report': 'FileText',
      'meeting': 'Users',
      'submission': 'Send'
    };
    return icons[type] || 'Clock';
  };

  return (
    <div className="bg-surface rounded-xl shadow-card-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">المواعيد النهائية القادمة</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="Calendar"
          className="text-text-muted"
        />
      </div>

      <div className="space-y-4">
        {deadlines.map((deadline, index) => (
          <div key={index} className={`border rounded-lg p-4 ${getPriorityColor(deadline.priority)}`}>
            <div className="flex items-start space-x-3 rtl:space-x-reverse">
              <div className="flex-shrink-0 mt-1">
                <Icon name={getDeadlineIcon(deadline.type)} size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium mb-1">{deadline.title}</p>
                <p className="text-xs opacity-80 mb-2">{deadline.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Icon name="Clock" size={14} />
                    <span className="text-xs">{getDaysUntilDeadline(deadline.date)}</span>
                  </div>
                  
                  <span className="text-xs font-medium">
                    {getPriorityText(deadline.priority)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200">
        <Button
          variant="ghost"
          size="sm"
          iconName="Plus"
          iconPosition="right"
          className="w-full text-primary-600 hover:bg-primary-50"
        >
          إضافة موعد نهائي
        </Button>
      </div>
    </div>
  );
};

export default UpcomingDeadlines;