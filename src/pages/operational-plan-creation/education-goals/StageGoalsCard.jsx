import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const StageGoalsCard = ({ planData, onChange }) => {
  const [selectedStage, setSelectedStage] = useState(planData?.schoolLevel || '');
  const [stageGoals, setStageGoals] = useState(planData?.educationGoals?.stage || []);

  const stageSpecificGoals = {
    'ابتدائية': [
      'تنمية المهارات الأساسية في القراءة والكتابة والحساب',
      'تطوير الشخصية الإسلامية والقيم الأخلاقية',
      'تنمية المهارات الاجتماعية والتفاعل الإيجابي',
      'تطوير المهارات الحركية والبدنية',
      'تنمية الإبداع والخيال لدى الطلاب',
      'إكساب الطلاب مهارات التفكير النقدي البسيط',
      'تعزيز حب التعلم والاستطلاع'
    ],
    'متوسطة': [
      'تطوير المهارات الأكاديمية المتقدمة',
      'تنمية مهارات التفكير النقدي والتحليلي',
      'إعداد الطلاب للمرحلة الثانوية',
      'تطوير المهارات القيادية والعمل الجماعي',
      'تنمية الوعي المهني والتوجيه المستقبلي',
      'تعزيز استخدام التقنيات التعليمية',
      'تطوير مهارات البحث والاستقصاء'
    ],
    'ثانوية': [
      'إعداد الطلاب للتعليم الجامعي والعالي',
      'تطوير مهارات التفكير العلمي والبحثي',
      'تنمية المهارات المهنية والتخصصية',
      'تطوير القدرات القيادية والإدارية',
      'تعزيز الوعي بالمسؤولية المجتمعية',
      'تطوير مهارات ريادة الأعمال والابتكار',
      'إعداد الطلاب لسوق العمل المستقبلي'
    ]
  };

  const handleStageChange = (stage) => {
    setSelectedStage(stage);
    setStageGoals([]);
    onChange({
      ...planData,
      educationGoals: {
        ...planData?.educationGoals,
        stage: []
      }
    });
  };

  const handleGoalToggle = (goal) => {
    const updatedGoals = stageGoals.includes(goal)
      ? stageGoals.filter(g => g !== goal)
      : [...stageGoals, goal];
    
    setStageGoals(updatedGoals);
    onChange({
      ...planData,
      educationGoals: {
        ...planData?.educationGoals,
        stage: updatedGoals
      }
    });
  };

  const addCustomGoal = () => {
    const customGoal = prompt(`أدخل هدف مخصص للمرحلة ${selectedStage}:`);
    if (customGoal && customGoal.trim()) {
      handleGoalToggle(customGoal.trim());
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-secondary-100 rounded-lg">
          <Icon name="GraduationCap" size={20} className="text-secondary-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">أهداف المرحلة التعليمية</h3>
          <p className="text-sm text-text-secondary">اختر الأهداف الخاصة بالمرحلة التعليمية</p>
        </div>
      </div>

      {/* Stage Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-3">
          اختر المرحلة التعليمية
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.keys(stageSpecificGoals).map((stage) => (
            <button
              key={stage}
              onClick={() => handleStageChange(stage)}
              className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                selectedStage === stage
                  ? 'border-secondary-300 bg-secondary-50 text-secondary-800'
                  : 'border-slate-200 bg-white hover:border-secondary-200'
              }`}
            >
              <span className="font-medium">{stage}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stage Goals */}
      {selectedStage && (
        <div className="space-y-4">
          <h4 className="text-md font-medium text-text-primary">
            أهداف المرحلة {selectedStage}
          </h4>
          
          <div className="space-y-3">
            {stageSpecificGoals[selectedStage].map((goal, index) => (
              <div
                key={index}
                onClick={() => handleGoalToggle(goal)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  stageGoals.includes(goal)
                    ? 'border-secondary-300 bg-secondary-50 text-secondary-800'
                    : 'border-slate-200 bg-white hover:border-secondary-200'
                }`}
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    stageGoals.includes(goal)
                      ? 'border-secondary-500 bg-secondary-500'
                      : 'border-slate-300'
                  }`}>
                    {stageGoals.includes(goal) && (
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
              إضافة هدف مخصص للمرحلة {selectedStage}
            </Button>
          </div>

          {stageGoals.length > 0 && (
            <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                <Icon name="CheckCircle" size={16} className="text-secondary-600" />
                <span className="text-sm font-medium text-secondary-800">
                  تم اختيار {stageGoals.length} هدف للمرحلة {selectedStage}
                </span>
              </div>
              <div className="text-xs text-secondary-700">
                هذه الأهداف ستوجه العمل التعليمي في المرحلة المحددة
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StageGoalsCard;