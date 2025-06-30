import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const OperationalPlanProgress = ({ planData }) => {
  const totalSteps = 20;
  const completedSteps = planData.completedSteps;
  const currentStep = planData.currentStep;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

  const stepCategories = [
    { name: 'التخطيط الأساسي', steps: [1, 2, 3, 4], color: 'bg-blue-500' },
    { name: 'تحليل البيئة', steps: [5, 6, 7, 8], color: 'bg-green-500' },
    { name: 'وضع الأهداف', steps: [9, 10, 11, 12], color: 'bg-purple-500' },
    { name: 'التنفيذ والمتابعة', steps: [13, 14, 15, 16], color: 'bg-orange-500' },
    { name: 'التقييم والتطوير', steps: [17, 18, 19, 20], color: 'bg-red-500' }
  ];

  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'pending';
  };

  const getStepColor = (status) => {
    const colors = {
      'completed': 'bg-success-500 text-white',
      'current': 'bg-primary-500 text-white',
      'pending': 'bg-slate-200 text-slate-500'
    };
    return colors[status];
  };

  return (
    <div className="bg-surface rounded-xl shadow-card-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">تقدم الخطة التشغيلية</h3>
          <p className="text-sm text-text-secondary">نظام الـ 20 خطوة</p>
        </div>
        <div className="text-right rtl:text-left">
          <p className="text-2xl font-bold text-primary-600">{progressPercentage}%</p>
          <p className="text-xs text-text-muted">مكتمل</p>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-text-secondary">الخطوة {currentStep} من {totalSteps}</span>
          <span className="text-text-secondary">{completedSteps} خطوة مكتملة</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Step Categories */}
      <div className="space-y-4 mb-6">
        {stepCategories.map((category, index) => {
          const categoryCompleted = category.steps.filter(step => step < currentStep).length;
          const categoryProgress = Math.round((categoryCompleted / category.steps.length) * 100);
          
          return (
            <div key={index} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-text-primary">{category.name}</h4>
                <span className="text-xs text-text-muted">{categoryProgress}%</span>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                {category.steps.map((stepNumber) => {
                  const status = getStepStatus(stepNumber);
                  return (
                    <div
                      key={stepNumber}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 ${getStepColor(status)}`}
                    >
                      {status === 'completed' ? (
                        <Icon name="Check" size={14} />
                      ) : (
                        stepNumber
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="w-full bg-slate-200 rounded-full h-1">
                <div 
                  className={`${category.color} h-1 rounded-full transition-all duration-300`}
                  style={{ width: `${categoryProgress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Step Info */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
            {currentStep}
          </div>
          <div>
            <p className="text-sm font-medium text-primary-800">{planData.currentStepTitle}</p>
            <p className="text-xs text-primary-600">{planData.currentStepDescription}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="primary"
          size="sm"
          iconName="Play"
          iconPosition="right"
          onClick={() => window.location.href = '/operational-plan-creation'}
          className="flex-1"
        >
          متابعة الخطة
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="right"
          className="flex-1"
        >
          معاينة التقدم
        </Button>
      </div>
    </div>
  );
};

export default OperationalPlanProgress;