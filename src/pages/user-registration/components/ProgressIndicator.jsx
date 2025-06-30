import React from 'react';
import Icon from 'components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, completedSteps }) => {
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

  const steps = [
    { id: 1, name: 'كود التفعيل', icon: 'Key' },
    { id: 2, name: 'المعلومات الأساسية', icon: 'User' },
    { id: 3, name: 'معلومات المدرسة', icon: 'School' },
    { id: 4, name: 'كلمة المرور', icon: 'Lock' }
  ];

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">التقدم</span>
          <span className="text-sm text-text-secondary">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Steps Indicator - Desktop */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < completedSteps;
          const isCurrent = index === currentStep - 1;
          
          return (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                isCompleted 
                  ? 'bg-success-500 border-success-500 text-white' 
                  : isCurrent
                  ? 'bg-primary-500 border-primary-500 text-white' :'bg-white border-slate-300 text-slate-500'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step.icon} size={20} />
                )}
              </div>
              
              <div className="mr-3 rtl:mr-0 rtl:ml-3">
                <p className={`text-sm font-medium ${
                  isCurrent ? 'text-primary-700' : isCompleted ? 'text-success-700' : 'text-text-muted'
                }`}>
                  {step.name}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  isCompleted ? 'bg-success-300' : 'bg-slate-200'
                }`}></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Current Step - Mobile */}
      <div className="md:hidden text-center">
        <p className="text-sm text-text-secondary">
          الخطوة {currentStep} من {totalSteps}: {steps[currentStep - 1]?.name}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;