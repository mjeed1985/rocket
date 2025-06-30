import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const RecentDocuments = ({ documents }) => {
  const getDocumentIcon = (type) => {
    const icons = {
      'plan': 'FileText',
      'communication': 'MessageSquare',
      'bulletin': 'Newspaper',
      'letter': 'Mail'
    };
    return icons[type] || 'File';
  };

  const getStatusColor = (status) => {
    const colors = {
      'completed': 'text-success-600 bg-success-50',
      'draft': 'text-warning-600 bg-warning-50',
      'pending': 'text-primary-600 bg-primary-50',
      'review': 'text-purple-600 bg-purple-50'
    };
    return colors[status] || 'text-gray-600 bg-gray-50';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      'completed': 'مكتمل',
      'draft': 'مسودة',
      'pending': 'معلق',
      'review': 'قيد المراجعة'
    };
    return statusTexts[status] || status;
  };

  return (
    <div className="bg-surface rounded-xl shadow-card-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">المستندات الأخيرة</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreHorizontal"
          className="text-text-muted"
        />
      </div>

      <div className="space-y-4">
        {documents.map((doc, index) => (
          <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200 cursor-pointer group">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Icon name={getDocumentIcon(doc.type)} size={20} className="text-primary-600" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate group-hover:text-primary-600 transition-colors">
                {doc.title}
              </p>
              <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                  {getStatusText(doc.status)}
                </span>
                <span className="text-xs text-text-muted">{doc.lastModified}</span>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <Icon name="ChevronLeft" size={16} className="text-text-muted group-hover:text-primary-600 transition-colors rtl:rotate-180" />
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
          إنشاء مستند جديد
        </Button>
      </div>
    </div>
  );
};

export default RecentDocuments;