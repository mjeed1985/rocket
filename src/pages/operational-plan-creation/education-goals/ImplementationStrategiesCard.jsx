import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const ImplementationStrategiesCard = ({ planData, onChange }) => {
  const [strategies, setStrategies] = useState(planData?.educationGoals?.strategies || []);

  const predefinedStrategies = [
    {
      category: 'استراتيجيات التدريس',
      items: [
        'التعلم النشط والتفاعلي',
        'التعلم القائم على المشاريع',
        'التعلم التعاوني والجماعي',
        'التعلم المدمج والرقمي',
        'التعلم القائم على حل المشكلات',
        'التعلم المتمايز حسب احتياجات الطلاب'
      ]
    },
    {
      category: 'استراتيجيات التقييم',
      items: [
        'التقييم التكويني المستمر',
        'التقييم الختامي الشامل',
        'التقييم الذاتي للطلاب',
        'تقييم الأقران',
        'ملف الإنجاز الإلكتروني',
        'التقييم القائم على الأداء'
      ]
    },
    {
      category: 'استراتيجيات التطوير المهني',
      items: [
        'ورش العمل التدريبية',
        'التعلم من الأقران',
        'المجتمعات التعلمية المهنية',
        'التدريب الإلكتروني',
        'البحث الإجرائي',
        'التوجيه والإرشاد المهني'
      ]
    },
    {
      category: 'استراتيجيات إشراك المجتمع',
      items: [
        'مجالس أولياء الأمور',
        'الشراكات المجتمعية',
        'الأنشطة المجتمعية',
        'برامج التطوع',
        'المعارض والفعاليات',
        'وسائل التواصل الاجتماعي'
      ]
    }
  ];

  const handleStrategyToggle = (strategy) => {
    const updatedStrategies = strategies.includes(strategy)
      ? strategies.filter(s => s !== strategy)
      : [...strategies, strategy];
    
    setStrategies(updatedStrategies);
    onChange({
      ...planData,
      educationGoals: {
        ...planData?.educationGoals,
        strategies: updatedStrategies
      }
    });
  };

  const addCustomStrategy = (category) => {
    const customStrategy = prompt(`أدخل استراتيجية مخصصة في ${category}:`);
    if (customStrategy && customStrategy.trim()) {
      handleStrategyToggle(customStrategy.trim());
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent-100 rounded-lg">
          <Icon name="Lightbulb" size={20} className="text-accent-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">استراتيجيات التنفيذ</h3>
          <p className="text-sm text-text-secondary">اختر الاستراتيجيات المناسبة لتحقيق الأهداف</p>
        </div>
      </div>

      <div className="space-y-6">
        {predefinedStrategies.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-md font-medium text-text-primary">{category.category}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addCustomStrategy(category.category)}
                iconName="Plus"
                className="text-accent-600 hover:bg-accent-50"
              >
                إضافة
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.items.map((strategy, index) => (
                <div
                  key={index}
                  onClick={() => handleStrategyToggle(strategy)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    strategies.includes(strategy)
                      ? 'border-accent-300 bg-accent-50 text-accent-800'
                      : 'border-slate-200 bg-white hover:border-accent-200'
                  }`}
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      strategies.includes(strategy)
                        ? 'border-accent-500 bg-accent-500'
                        : 'border-slate-300'
                    }`}>
                      {strategies.includes(strategy) && (
                        <Icon name="Check" size={10} className="text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{strategy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {strategies.length > 0 && (
        <div className="mt-6 p-4 bg-accent-50 rounded-lg">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
            <Icon name="CheckCircle" size={16} className="text-accent-600" />
            <span className="text-sm font-medium text-accent-800">
              تم اختيار {strategies.length} استراتيجية تنفيذ
            </span>
          </div>
          <div className="text-xs text-accent-700">
            هذه الاستراتيجيات ستوجه عملية تنفيذ الأهداف التعليمية
          </div>
        </div>
      )}
    </div>
  );
};

export default ImplementationStrategiesCard;