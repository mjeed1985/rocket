import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const DigitalTransformationSection = ({ planData, onPlanDataChange }) => {
  const [digitalStrategy, setDigitalStrategy] = useState({
    vision: planData?.digitalTransformation?.vision || '',
    currentStatus: planData?.digitalTransformation?.currentStatus || '',
    goals: planData?.digitalTransformation?.goals || [],
    infrastructure: planData?.digitalTransformation?.infrastructure || [],
    training: planData?.digitalTransformation?.training || [],
    applications: planData?.digitalTransformation?.applications || []
  });

  const handleTextChange = (field, value) => {
    const updatedStrategy = { ...digitalStrategy, [field]: value };
    setDigitalStrategy(updatedStrategy);
    updatePlanData(updatedStrategy);
  };

  const handleAddItem = (category) => {
    const newItem = {
      id: Date.now(),
      text: '',
      priority: 'medium',
      status: 'planned'
    };
    
    const updatedItems = [...digitalStrategy[category], newItem];
    const updatedStrategy = { ...digitalStrategy, [category]: updatedItems };
    setDigitalStrategy(updatedStrategy);
    updatePlanData(updatedStrategy);
  };

  const handleRemoveItem = (category, id) => {
    const updatedItems = digitalStrategy[category].filter(item => item.id !== id);
    const updatedStrategy = { ...digitalStrategy, [category]: updatedItems };
    setDigitalStrategy(updatedStrategy);
    updatePlanData(updatedStrategy);
  };

  const handleItemChange = (category, id, field, value) => {
    const updatedItems = digitalStrategy[category].map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    const updatedStrategy = { ...digitalStrategy, [category]: updatedItems };
    setDigitalStrategy(updatedStrategy);
    updatePlanData(updatedStrategy);
  };

  const updatePlanData = (strategy) => {
    onPlanDataChange({
      ...planData,
      digitalTransformation: strategy
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      goals: 'Target',
      infrastructure: 'Server',
      training: 'GraduationCap',
      applications: 'Smartphone'
    };
    return icons[category] || 'Circle';
  };

  const getCategoryTitle = (category) => {
    const titles = {
      goals: 'أهداف التحول الرقمي',
      infrastructure: 'البنية التحتية التقنية',
      training: 'التدريب والتطوير',
      applications: 'التطبيقات والبرامج'
    };
    return titles[category] || '';
  };

  const getCategoryDescription = (category) => {
    const descriptions = {
      goals: 'أهداف استراتيجية التحول الرقمي في المدرسة',
      infrastructure: 'متطلبات البنية التحتية التقنية اللازمة',
      training: 'برامج تدريب وتطوير المعلمين والطلاب',
      applications: 'التطبيقات والبرامج التعليمية المستخدمة'
    };
    return descriptions[category] || '';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'planned': { bg: 'bg-primary-100', text: 'text-primary-800', label: 'مخطط' },
      'in_progress': { bg: 'bg-warning-100', text: 'text-warning-800', label: 'قيد التنفيذ' },
      'completed': { bg: 'bg-success-100', text: 'text-success-800', label: 'مكتمل' },
      'cancelled': { bg: 'bg-error-100', text: 'text-error-800', label: 'ملغي' }
    };
    
    const config = statusConfig[status] || statusConfig.planned;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const renderItemsCategory = (category) => {
    const items = digitalStrategy[category] || [];
    const icon = getCategoryIcon(category);
    const title = getCategoryTitle(category);
    const description = getCategoryDescription(category);

    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name={icon} size={20} className="text-primary-600" />
            <div>
              <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
              <p className="text-sm text-text-secondary">{description}</p>
            </div>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleAddItem(category)}
            iconName="Plus"
            iconPosition="left"
          >
            إضافة
          </Button>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder={`أدخل ${title}...`}
                    value={item.text}
                    onChange={(e) => handleItemChange(category, item.id, 'text', e.target.value)}
                    className="w-full mb-2"
                  />
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <label className="text-xs text-text-secondary">الأولوية:</label>
                      <select
                        value={item.priority}
                        onChange={(e) => handleItemChange(category, item.id, 'priority', e.target.value)}
                        className="text-xs border-0 focus:ring-0 p-0 bg-transparent"
                      >
                        <option value="high">عالية</option>
                        <option value="medium">متوسطة</option>
                        <option value="low">منخفضة</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <label className="text-xs text-text-secondary">الحالة:</label>
                      <select
                        value={item.status}
                        onChange={(e) => handleItemChange(category, item.id, 'status', e.target.value)}
                        className="text-xs border-0 focus:ring-0 p-0 bg-transparent"
                      >
                        <option value="planned">مخطط</option>
                        <option value="in_progress">قيد التنفيذ</option>
                        <option value="completed">مكتمل</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                      {getStatusBadge(item.status)}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveItem(category, item.id)}
                  iconName="Trash2"
                  className="text-error-600 hover:bg-error-50"
                />
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-center py-6 text-text-muted">
              <Icon name={icon} size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">لم يتم إضافة {title} بعد</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
          <Icon name="Monitor" size={32} className="text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">استراتيجية التحول الرقمي في التعليم</h2>
        <p className="text-text-secondary">خطة التحول الرقمي والتقنية في المدرسة</p>
        
        {/* إرشادات */}
        <div className="mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200 max-w-md mx-auto">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-right rtl:text-left">
              <h3 className="text-sm font-semibold text-accent-800 mb-1">إرشادات</h3>
              <p className="text-xs text-accent-700 leading-relaxed">
                حدد رؤية واستراتيجية التحول الرقمي في المدرسة، والبنية التحتية والتطبيقات اللازمة
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* رؤية التحول الرقمي */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
          <Icon name="Eye" size={20} className="text-primary-600" />
          <h3 className="text-lg font-semibold text-text-primary">رؤية التحول الرقمي</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              رؤية المدرسة للتحول الرقمي
            </label>
            <textarea
              rows={4}
              placeholder="أدخل رؤية المدرسة للتحول الرقمي في التعليم..."
              value={digitalStrategy.vision}
              onChange={(e) => handleTextChange('vision', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              الوضع الحالي للتقنية في المدرسة
            </label>
            <textarea
              rows={4}
              placeholder="صف الوضع الحالي للتقنية في المدرسة..."
              value={digitalStrategy.currentStatus}
              onChange={(e) => handleTextChange('currentStatus', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
            />
          </div>
        </div>
      </div>

      {/* أهداف التحول الرقمي */}
      {renderItemsCategory('goals')}

      {/* البنية التحتية التقنية */}
      {renderItemsCategory('infrastructure')}

      {/* التدريب والتطوير */}
      {renderItemsCategory('training')}

      {/* التطبيقات والبرامج */}
      {renderItemsCategory('applications')}

      {/* نصائح للتحول الرقمي */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
          <Icon name="Info" size={20} className="text-accent-600" />
          <h3 className="text-lg font-semibold text-text-primary">نصائح للتحول الرقمي</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              1
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">التدرج في التنفيذ</h4>
              <p className="text-sm text-text-secondary">نفذ التحول الرقمي بشكل تدريجي ومدروس</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              2
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">تدريب الكادر التعليمي</h4>
              <p className="text-sm text-text-secondary">اهتم بتدريب المعلمين على استخدام التقنيات الحديثة</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              3
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">الأمن السيبراني</h4>
              <p className="text-sm text-text-secondary">ضع خطة للأمن السيبراني وحماية البيانات</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              4
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">الدعم الفني</h4>
              <p className="text-sm text-text-secondary">وفر دعماً فنياً مستمراً للمعلمين والطلاب</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              5
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">قياس الأثر</h4>
              <p className="text-sm text-text-secondary">قم بقياس أثر التحول الرقمي على العملية التعليمية</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalTransformationSection;