import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const SchoolAspectsSection = ({ planData, onPlanDataChange }) => {
  const [rankedAspects, setRankedAspects] = useState(
    planData?.schoolAspects?.ranked || []
  );

  const defaultAspects = [
    { id: 'aspect-1', name: 'التحصيل الدراسي', description: 'مستوى تحصيل الطلاب الأكاديمي' },
    { id: 'aspect-2', name: 'البيئة المدرسية', description: 'جودة البيئة المدرسية وملاءمتها للتعلم' },
    { id: 'aspect-3', name: 'الأنشطة الطلابية', description: 'تنوع وفعالية الأنشطة اللاصفية' },
    { id: 'aspect-4', name: 'التطوير المهني', description: 'تنمية قدرات الكادر التعليمي والإداري' },
    { id: 'aspect-5', name: 'التقنية التعليمية', description: 'توظيف التقنية في العملية التعليمية' },
    { id: 'aspect-6', name: 'الشراكة المجتمعية', description: 'التواصل والتعاون مع المجتمع المحلي' },
    { id: 'aspect-7', name: 'الإرشاد الطلابي', description: 'خدمات الإرشاد والدعم النفسي للطلاب' },
    { id: 'aspect-8', name: 'القيادة المدرسية', description: 'فعالية القيادة والإدارة المدرسية' }
  ];

  // إضافة الجوانب الافتراضية إذا كانت القائمة فارغة
  useEffect(() => {
    if (rankedAspects.length === 0) {
      setRankedAspects(defaultAspects);
      updatePlanData(defaultAspects);
    }
  }, []);

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newRankedAspects = [...rankedAspects];
    [newRankedAspects[index], newRankedAspects[index - 1]] = [newRankedAspects[index - 1], newRankedAspects[index]];
    setRankedAspects(newRankedAspects);
    updatePlanData(newRankedAspects);
  };

  const handleMoveDown = (index) => {
    if (index === rankedAspects.length - 1) return;
    const newRankedAspects = [...rankedAspects];
    [newRankedAspects[index], newRankedAspects[index + 1]] = [newRankedAspects[index + 1], newRankedAspects[index]];
    setRankedAspects(newRankedAspects);
    updatePlanData(newRankedAspects);
  };

  const handleAddAspect = () => {
    const aspectName = prompt('أدخل اسم الجانب المدرسي:');
    if (!aspectName || !aspectName.trim()) return;
    
    const aspectDescription = prompt('أدخل وصف الجانب المدرسي:');
    
    const newAspect = {
      id: `aspect-${Date.now()}`,
      name: aspectName.trim(),
      description: aspectDescription ? aspectDescription.trim() : ''
    };
    
    const newRankedAspects = [...rankedAspects, newAspect];
    setRankedAspects(newRankedAspects);
    updatePlanData(newRankedAspects);
  };

  const handleRemoveAspect = (id) => {
    const newRankedAspects = rankedAspects.filter(aspect => aspect.id !== id);
    setRankedAspects(newRankedAspects);
    updatePlanData(newRankedAspects);
  };

  const updatePlanData = (aspects) => {
    onPlanDataChange({
      ...planData,
      schoolAspects: {
        ...planData?.schoolAspects,
        ranked: aspects
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
          <Icon name="ListOrdered" size={32} className="text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">الجوانب المدرسية العامة وترتيبها</h2>
        <p className="text-text-secondary">أولويات التطوير والتحسين</p>
        
        {/* إرشادات */}
        <div className="mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200 max-w-md mx-auto">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-right rtl:text-left">
              <h3 className="text-sm font-semibold text-accent-800 mb-1">إرشادات</h3>
              <p className="text-xs text-accent-700 leading-relaxed">
                رتب الجوانب المدرسية حسب أولوية التطوير والتحسين. يمكنك تحريك العناصر لأعلى أو لأسفل لتغيير ترتيبها.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* قائمة الجوانب المدرسية */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="ListOrdered" size={20} className="text-primary-600" />
            <h3 className="text-lg font-semibold text-text-primary">ترتيب الجوانب المدرسية حسب الأولوية</h3>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddAspect}
            iconName="Plus"
            iconPosition="left"
          >
            إضافة جانب جديد
          </Button>
        </div>

        <div className="space-y-4">
          {rankedAspects.map((aspect, index) => (
            <div 
              key={aspect.id} 
              className="flex items-center space-x-3 rtl:space-x-reverse p-4 border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">
                {index + 1}
              </div>
              
              <div className="flex-1">
                <h4 className="text-md font-medium text-text-primary">{aspect.name}</h4>
                {aspect.description && (
                  <p className="text-sm text-text-secondary mt-1">{aspect.description}</p>
                )}
              </div>
              
              <div className="flex-shrink-0 flex items-center space-x-1 rtl:space-x-reverse">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMoveUp(index)}
                  iconName="ChevronUp"
                  className="text-primary-600 hover:bg-primary-50"
                  disabled={index === 0}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMoveDown(index)}
                  iconName="ChevronDown"
                  className="text-primary-600 hover:bg-primary-50"
                  disabled={index === rankedAspects.length - 1}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveAspect(aspect.id)}
                  iconName="Trash2"
                  className="text-error-600 hover:bg-error-50"
                />
              </div>
            </div>
          ))}
        </div>

        {rankedAspects.length === 0 && (
          <div className="text-center py-8 text-text-muted">
            <Icon name="List" size={48} className="mx-auto mb-4 opacity-50" />
            <p>لم يتم إضافة جوانب مدرسية بعد</p>
            <p className="text-sm">انقر على "إضافة جانب جديد" للبدء</p>
          </div>
        )}
      </div>

      {/* توضيح الأولويات */}
      {rankedAspects.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
            <Icon name="Info" size={20} className="text-accent-600" />
            <h3 className="text-lg font-semibold text-text-primary">توضيح أولويات التطوير</h3>
          </div>

          <div className="space-y-4">
            <p className="text-text-secondary">
              تم ترتيب الجوانب المدرسية أعلاه حسب أولوية التطوير والتحسين. سيتم التركيز على الجوانب ذات الأولوية العالية في الخطة التشغيلية.
            </p>
            
            {rankedAspects.length >= 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      1
                    </div>
                    <h4 className="font-medium text-primary-800">{rankedAspects[0].name}</h4>
                  </div>
                  <p className="text-sm text-primary-700">أولوية قصوى</p>
                </div>
                
                <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <div className="w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      2
                    </div>
                    <h4 className="font-medium text-secondary-800">{rankedAspects[1].name}</h4>
                  </div>
                  <p className="text-sm text-secondary-700">أولوية عالية</p>
                </div>
                
                <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                    <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      3
                    </div>
                    <h4 className="font-medium text-accent-800">{rankedAspects[2].name}</h4>
                  </div>
                  <p className="text-sm text-accent-700">أولوية متوسطة</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolAspectsSection;