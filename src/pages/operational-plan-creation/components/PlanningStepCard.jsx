import React from 'react';
import Icon from 'components/AppIcon';

const PlanningStepCard = ({ step, isActive, isCompleted, onClick }) => {
  const getStepStatus = () => {
    if (isCompleted) return 'completed';
    if (isActive) return 'current';
    return 'pending';
  };

  const status = getStepStatus();

  return (
    <div
      onClick={onClick}
      className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer group ${
        isActive 
          ? 'bg-primary-50 border-primary-200 shadow-md' 
          : isCompleted
          ? 'bg-success-50 border-success-200 hover:bg-success-100' :'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
      }`}
    >
      {/* Step Number/Status Icon */}
      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-bold transition-all duration-200 ${
        status === 'completed' 
          ? 'bg-success-500 border-success-500 text-white' 
          : status === 'current' ?'bg-primary-500 border-primary-500 text-white' :'bg-white border-slate-300 text-slate-500 group-hover:border-primary-300 group-hover:text-primary-600'
      }`}>
        {status === 'completed' ? (
          <Icon name="Check" size={18} />
        ) : (
          <span>{step.id}</span>
        )}
      </div>

      {/* Step Content */}
      <div className="flex-1 mr-4 rtl:mr-0 rtl:ml-4 min-w-0">
        <h3 className={`text-sm font-semibold truncate ${
          isActive ? 'text-primary-800' : isCompleted ? 'text-success-800' : 'text-text-primary'
        }`}>
          {step.title}
        </h3>
        <p className={`text-xs mt-1 truncate ${
          isActive ? 'text-primary-600' : isCompleted ? 'text-success-600' : 'text-text-secondary'
        }`}>
          {step.description}
        </p>
        
        {/* Status Badge */}
        {status === 'current' && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mt-2">
            الخطوة الحالية
          </span>
        )}
        
        {status === 'completed' && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800 mt-2">
            مكتملة
          </span>
        )}
      </div>

      {/* Step Icon */}
      <Icon 
        name={step.icon} 
        size={20} 
        className={`flex-shrink-0 ${
          isActive ? 'text-primary-600' : isCompleted ? 'text-success-600' : 'text-text-muted group-hover:text-primary-600'
        }`} 
      />
    </div>
  );
};

export default PlanningStepCard;