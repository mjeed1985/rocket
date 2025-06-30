import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const SwotAnalysisSection = ({ planData, onPlanDataChange }) => {
  const [swotData, setSwotData] = useState({
    strengths: planData?.swotAnalysis?.strengths || [],
    weaknesses: planData?.swotAnalysis?.weaknesses || [],
    opportunities: planData?.swotAnalysis?.opportunities || [],
    threats: planData?.swotAnalysis?.threats || []
  });

  const handleAddItem = (category) => {
    const newItem = {
      id: Date.now(),
      text: '',
      priority: 'medium'
    };
    
    const updatedItems = [...swotData[category], newItem];
    const updatedSwotData = { ...swotData, [category]: updatedItems };
    setSwotData(updatedSwotData);
    updatePlanData(updatedSwotData);
  };

  const handleRemoveItem = (category, id) => {
    const updatedItems = swotData[category].filter(item => item.id !== id);
    const updatedSwotData = { ...swotData, [category]: updatedItems };
    setSwotData(updatedSwotData);
    updatePlanData(updatedSwotData);
  };

  const handleItemChange = (category, id, field, value) => {
    const updatedItems = swotData[category].map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    const updatedSwotData = { ...swotData, [category]: updatedItems };
    setSwotData(updatedSwotData);
    updatePlanData(updatedSwotData);
  };

  const updatePlanData = (data) => {
    onPlanDataChange({
      ...planData,
      swotAnalysis: data
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      strengths: 'ThumbsUp',
      weaknesses: 'ThumbsDown',
      opportunities: 'Zap',
      threats: 'AlertTriangle'
    };
    return icons[category] || 'Circle';
  };

  const getCategoryColor = (category) => {
    const colors = {
      strengths: 'success',
      weaknesses: 'error',
      opportunities: 'primary',
      threats: 'warning'
    };
    return colors[category] || 'primary';
  };

  const getCategoryTitle = (category) => {
    const titles = {
      strengths: 'نقاط القوة',
      weaknesses: 'نقاط الضعف',
      opportunities: 'الفرص',
      threats: 'التهديدات'
    };
    return titles[category] || '';
  };

  const getCategoryDescription = (category) => {
    const descriptions = {
      strengths: 'العوامل الداخلية الإيجابية التي تميز المدرسة',
      weaknesses: 'العوامل الداخلية السلبية التي تحتاج إلى تحسين',
      opportunities: 'العوامل الخارجية الإيجابية التي يمكن استثمارها',
      threats: 'العوامل الخارجية السلبية التي قد تؤثر سلباً'
    };
    return descriptions[category] || '';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-error-100 text-error-800 border-error-200',
      medium: 'bg-warning-100 text-warning-800 border-warning-200',
      low: 'bg-success-100 text-success-800 border-success-200'
    };
    return colors[priority] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  const renderSwotCategory = (category) => {
    const items = swotData[category] || [];
    const icon = getCategoryIcon(category);
    const color = getCategoryColor(category);
    const title = getCategoryTitle(category);
    const description = getCategoryDescription(category);

    return (
      <div className={`bg-${color}-50 rounded-xl border border-${color}-200 p-6 space-y-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className={`flex items-center justify-center w-10 h-10 bg-${color}-100 rounded-lg`}>
              <Icon name={icon} size={20} className={`text-${color}-600`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
              <p className="text-sm text-text-secondary">{description}</p>
            </div>
          </div>
          <Button
            variant={color}
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
            <div key={item.id} className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder={`أدخل ${title}...`}
                    value={item.text}
                    onChange={(e) => handleItemChange(category, item.id, 'text', e.target.value)}
                    className="w-full mb-2"
                  />
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
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
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${getPriorityColor(item.priority)}`}>
                      {item.priority === 'high' ? 'عالية' : item.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                    </span>
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
              <Icon name={icon} size={32} className={`mx-auto mb-2 text-${color}-300 opacity-50`} />
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
          <Icon name="PieChart" size={32} className="text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">التحليل الرباعي (SWOT)</h2>
        <p className="text-text-secondary">تحليل نقاط القوة والضعف والفرص والتهديدات</p>
        
        {/* إرشادات */}
        <div className="mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200 max-w-md mx-auto">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-right rtl:text-left">
              <h3 className="text-sm font-semibold text-accent-800 mb-1">إرشادات</h3>
              <p className="text-xs text-accent-700 leading-relaxed">
                قم بتحليل البيئة الداخلية (نقاط القوة والضعف) والبيئة الخارجية (الفرص والتهديدات) للمدرسة
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SWOT Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderSwotCategory('strengths')}
        {renderSwotCategory('weaknesses')}
        {renderSwotCategory('opportunities')}
        {renderSwotCategory('threats')}
      </div>

      {/* SWOT Summary */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
          <Icon name="CheckSquare" size={20} className="text-primary-600" />
          <h3 className="text-lg font-semibold text-text-primary">ملخص التحليل الرباعي</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-success-50 rounded-lg p-4 border border-success-200">
            <Icon name="ThumbsUp" size={24} className="mx-auto mb-2 text-success-600" />
            <h4 className="font-medium text-success-800 mb-1">نقاط القوة</h4>
            <p className="text-2xl font-bold text-success-700">{swotData.strengths.length}</p>
          </div>
          
          <div className="bg-error-50 rounded-lg p-4 border border-error-200">
            <Icon name="ThumbsDown" size={24} className="mx-auto mb-2 text-error-600" />
            <h4 className="font-medium text-error-800 mb-1">نقاط الضعف</h4>
            <p className="text-2xl font-bold text-error-700">{swotData.weaknesses.length}</p>
          </div>
          
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
            <Icon name="Zap" size={24} className="mx-auto mb-2 text-primary-600" />
            <h4 className="font-medium text-primary-800 mb-1">الفرص</h4>
            <p className="text-2xl font-bold text-primary-700">{swotData.opportunities.length}</p>
          </div>
          
          <div className="bg-warning-50 rounded-lg p-4 border border-warning-200">
            <Icon name="AlertTriangle" size={24} className="mx-auto mb-2 text-warning-600" />
            <h4 className="font-medium text-warning-800 mb-1">التهديدات</h4>
            <p className="text-2xl font-bold text-warning-700">{swotData.threats.length}</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-text-secondary">
            سيتم استخدام نتائج التحليل الرباعي في تحديد الأهداف الاستراتيجية والتشغيلية للمدرسة، وتوجيه الخطة نحو تعزيز نقاط القوة ومعالجة نقاط الضعف واستثمار الفرص ومواجهة التهديدات.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SwotAnalysisSection;