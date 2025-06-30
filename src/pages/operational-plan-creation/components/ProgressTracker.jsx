import React from 'react';
import Icon from 'components/AppIcon';

const ProgressTracker = ({ currentStep, totalSteps, completedSteps }) => {
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
  const estimatedTimeRemaining = Math.max(0, (totalSteps - completedSteps) * 15); // 15 minutes per step

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-card-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-text-primary">التقدم الإجمالي</h2>
          <p className="text-sm text-text-secondary">
            الخطوة {currentStep} من {totalSteps}
          </p>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Icon name="Clock" size={20} className="text-accent-600" />
          <span className="text-sm font-medium text-accent-800">
            {estimatedTimeRemaining} دقيقة متبقية
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">
            {completedSteps} خطوات مكتملة
          </span>
          <span className="text-sm font-bold text-primary-600">
            {progressPercentage}%
          </span>
        </div>
        
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-success-100 rounded-full mx-auto mb-2">
            <Icon name="CheckCircle" size={16} className="text-success-600" />
          </div>
          <p className="text-lg font-bold text-success-600">{completedSteps}</p>
          <p className="text-xs text-text-secondary">مكتملة</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full mx-auto mb-2">
            <Icon name="Play" size={16} className="text-primary-600" />
          </div>
          <p className="text-lg font-bold text-primary-600">1</p>
          <p className="text-xs text-text-secondary">جارية</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full mx-auto mb-2">
            <Icon name="Clock" size={16} className="text-slate-600" />
          </div>
          <p className="text-lg font-bold text-slate-600">{totalSteps - completedSteps - 1}</p>
          <p className="text-xs text-text-secondary">متبقية</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Icon name="Save" size={16} className="text-accent-600" />
            <span className="text-sm text-text-secondary">آخر حفظ: منذ دقيقتين</span>
          </div>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-success-600 font-medium">محفوظ تلقائياً</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;