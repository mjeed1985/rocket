import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const PlanSourcesSection = ({ planData, onPlanDataChange }) => {
  const [sources, setSources] = useState(
    planData?.planSources?.list || []
  );
  const [sourcesText, setSourcesText] = useState(
    planData?.planSources?.text || ''
  );

  const defaultSources = [
    { id: 'source-1', name: 'رؤية المملكة 2030', selected: false },
    { id: 'source-2', name: 'الخطة الاستراتيجية لوزارة التعليم', selected: false },
    { id: 'source-3', name: 'الخطة التشغيلية لإدارة التعليم', selected: false },
    { id: 'source-4', name: 'نتائج التقويم الذاتي للمدرسة', selected: false },
    { id: 'source-5', name: 'نتائج تحصيل الطلاب', selected: false },
    { id: 'source-6', name: 'تقارير المشرفين التربويين', selected: false },
    { id: 'source-7', name: 'استطلاعات رأي المستفيدين', selected: false },
    { id: 'source-8', name: 'الخطط التشغيلية السابقة', selected: false }
  ];

  // إضافة المصادر الافتراضية إذا كانت القائمة فارغة
  React.useEffect(() => {
    if (sources.length === 0) {
      setSources(defaultSources);
      updatePlanData(defaultSources, sourcesText);
    }
  }, []);

  const handleSourceToggle = (id) => {
    const updatedSources = sources.map(source => 
      source.id === id ? { ...source, selected: !source.selected } : source
    );
    setSources(updatedSources);
    updatePlanData(updatedSources, sourcesText);
  };

  const handleAddSource = () => {
    const sourceName = prompt('أدخل اسم المصدر الجديد:');
    if (!sourceName || !sourceName.trim()) return;
    
    const newSource = {
      id: `source-${Date.now()}`,
      name: sourceName.trim(),
      selected: true
    };
    
    const updatedSources = [...sources, newSource];
    setSources(updatedSources);
    updatePlanData(updatedSources, sourcesText);
  };

  const handleRemoveSource = (id) => {
    const updatedSources = sources.filter(source => source.id !== id);
    setSources(updatedSources);
    updatePlanData(updatedSources, sourcesText);
  };

  const handleSourcesTextChange = (e) => {
    const newText = e.target.value;
    setSourcesText(newText);
    updatePlanData(sources, newText);
  };

  const updatePlanData = (sourcesList, text) => {
    onPlanDataChange({
      ...planData,
      planSources: {
        list: sourcesList,
        text
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
          <Icon name="BookOpen" size={32} className="text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">مصادر بناء الخطة التشغيلية</h2>
        <p className="text-text-secondary">المراجع والمصادر المستخدمة في بناء الخطة</p>
        
        {/* إرشادات */}
        <div className="mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200 max-w-md mx-auto">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-right rtl:text-left">
              <h3 className="text-sm font-semibold text-accent-800 mb-1">إرشادات</h3>
              <p className="text-xs text-accent-700 leading-relaxed">
                حدد المصادر والمراجع التي تم الاعتماد عليها في بناء الخطة التشغيلية
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* قائمة المصادر */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="BookOpen" size={20} className="text-primary-600" />
            <h3 className="text-lg font-semibold text-text-primary">مصادر بناء الخطة</h3>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddSource}
            iconName="Plus"
            iconPosition="left"
          >
            إضافة مصدر
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map((source) => (
            <div
              key={source.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                source.selected
                  ? 'border-primary-300 bg-primary-50 text-primary-800'
                  : 'border-slate-200 bg-white hover:border-primary-200 hover:bg-primary-25'
              }`}
              onClick={() => handleSourceToggle(source.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    source.selected
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-slate-300'
                  }`}>
                    {source.selected && (
                      <Icon name="Check" size={12} className="text-white" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{source.name}</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveSource(source.id);
                  }}
                  iconName="Trash2"
                  className="text-error-600 hover:bg-error-50"
                />
              </div>
            </div>
          ))}
        </div>

        {sources.length === 0 && (
          <div className="text-center py-8 text-text-muted">
            <Icon name="BookOpen" size={48} className="mx-auto mb-4 opacity-50" />
            <p>لم يتم إضافة مصادر بعد</p>
            <p className="text-sm">انقر على "إضافة مصدر" للبدء</p>
          </div>
        )}
      </div>

      {/* وصف المصادر */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
          <Icon name="FileText" size={20} className="text-secondary-600" />
          <h3 className="text-lg font-semibold text-text-primary">وصف مصادر بناء الخطة</h3>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            وصف تفصيلي للمصادر المستخدمة
          </label>
          <textarea
            rows={6}
            placeholder="اكتب وصفاً تفصيلياً للمصادر والمراجع التي تم الاعتماد عليها في بناء الخطة التشغيلية..."
            value={sourcesText}
            onChange={handleSourcesTextChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
          />
        </div>

        {/* اقتراحات للوصف */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <h4 className="text-sm font-medium text-text-primary mb-3">اقتراحات للوصف:</h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex items-start space-x-2 rtl:space-x-reverse">
              <Icon name="Check" size={16} className="text-success-500 mt-0.5 flex-shrink-0" />
              <span>تم الاعتماد على رؤية المملكة 2030 كإطار عام للخطة التشغيلية</span>
            </li>
            <li className="flex items-start space-x-2 rtl:space-x-reverse">
              <Icon name="Check" size={16} className="text-success-500 mt-0.5 flex-shrink-0" />
              <span>تم تحليل نتائج التقويم الذاتي للمدرسة لتحديد مجالات التحسين</span>
            </li>
            <li className="flex items-start space-x-2 rtl:space-x-reverse">
              <Icon name="Check" size={16} className="text-success-500 mt-0.5 flex-shrink-0" />
              <span>تم الاستفادة من تقارير المشرفين التربويين لتحديد نقاط القوة والضعف</span>
            </li>
            <li className="flex items-start space-x-2 rtl:space-x-reverse">
              <Icon name="Check" size={16} className="text-success-500 mt-0.5 flex-shrink-0" />
              <span>تم تحليل نتائج الطلاب في الاختبارات الوطنية والدولية</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ملخص المصادر المختارة */}
      {sources.filter(s => s.selected).length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
            <Icon name="CheckSquare" size={20} className="text-success-600" />
            <h3 className="text-lg font-semibold text-text-primary">المصادر المختارة</h3>
          </div>

          <div className="bg-success-50 rounded-lg p-4 border border-success-200">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
              <Icon name="CheckCircle" size={16} className="text-success-600" />
              <span className="text-sm font-medium text-success-800">
                تم اختيار {sources.filter(s => s.selected).length} مصدر
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {sources.filter(s => s.selected).map((source) => (
                <span key={source.id} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success-100 text-success-800">
                  {source.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanSourcesSection;