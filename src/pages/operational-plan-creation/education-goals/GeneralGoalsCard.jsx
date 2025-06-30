import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const GeneralGoalsCard = ({ planData, onChange }) => {
  const [goals, setGoals] = useState(planData?.educationGoals?.general || []);

  const predefinedGoals = [
    'تحسين جودة التعليم والتعلم',
    'تطوير مهارات المعلمين والكادر التعليمي',
    'تعزيز البيئة التعليمية الآمنة والمحفزة',
    'تطوير المناهج والبرامج التعليمية',
    'تعزيز التقنيات التعليمية الحديثة',
    'تحسين مستوى الطلاب الأكاديمي',
    'تطوير الأنشطة اللاصفية والإثرائية',
    'تعزيز الشراكة مع المجتمع المحلي'
  ];

  const handleGoalToggle = (goal) => {
    const updatedGoals = goals.includes(goal)
      ? goals.filter(g => g !== goal)
      : [...goals, goal];
    
    setGoals(updatedGoals);
    onChange({
      ...planData,
      educationGoals: {
        ...planData?.educationGoals,
        general: updatedGoals
      }
    });
  };

  const addCustomGoal = () => {
    const customGoal = prompt('أدخل الهدف التعليمي العام:');
    if (customGoal && customGoal.trim()) {
      handleGoalToggle(customGoal.trim());
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg">
          <Icon name="Target" size={20} className="text-primary-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">الأهداف التعليمية العامة</h3>
          <p className="text-sm text-text-secondary">اختر الأهداف التعليمية العامة للمدرسة</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {predefinedGoals.map((goal, index) => (
            <div
              key={index}
              onClick={() => handleGoalToggle(goal)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                goals.includes(goal)
                  ? 'border-primary-300 bg-primary-50 text-primary-800'
                  : 'border-slate-200 bg-white hover:border-primary-200 hover:bg-primary-25'
              }`}
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  goals.includes(goal)
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-slate-300'
                }`}>
                  {goals.includes(goal) && (
                    <Icon name="Check" size={12} className="text-white" />
                  )}
                </div>
                <span className="text-sm font-medium">{goal}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-200">
          <Button
            variant="outline"
            onClick={addCustomGoal}
            iconName="Plus"
            iconPosition="left"
            className="w-full"
          >
            إضافة هدف مخصص
          </Button>
        </div>

        {goals.length > 0 && (
          <div className="mt-6 p-4 bg-success-50 rounded-lg">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
              <Icon name="CheckCircle" size={16} className="text-success-600" />
              <span className="text-sm font-medium text-success-800">
                تم اختيار {goals.length} هدف تعليمي عام
              </span>
            </div>
            <div className="text-xs text-success-700">
              الأهداف المختارة ستكون الأساس لبناء الخطة التشغيلية
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralGoalsCard;