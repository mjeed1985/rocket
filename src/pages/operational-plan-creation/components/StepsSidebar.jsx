import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import PlanningStepCard from './PlanningStepCard';

const StepsSidebar = ({ steps, currentStep, completedSteps, onStepClick, isCollapsed, onToggleCollapse }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSteps = steps.filter(step =>
    step.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    step.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className={`bg-white border-l border-slate-200 shadow-card-2 transition-all duration-300 ease-out ${
      isCollapsed ? 'w-16' : 'w-80'
    } flex flex-col h-full`}>
      
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold text-text-primary">خطوات الإنشاء</h2>
              <p className="text-sm text-text-secondary">
                {completedSteps.length} من {steps.length} خطوات مكتملة
              </p>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            iconName={isCollapsed ? "ChevronLeft" : "ChevronRight"}
            onClick={onToggleCollapse}
            className="flex-shrink-0"
          />
        </div>

        {/* Search Bar */}
        {!isCollapsed && (
          <div className="mt-4 relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
            />
            <input
              type="text"
              placeholder="البحث في الخطوات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 text-sm"
            />
          </div>
        )}
      </div>

      {/* Steps List */}
      <div className="flex-1 overflow-y-auto p-4">
        {isCollapsed ? (
          // Collapsed View - Show only icons
          <div className="space-y-3">
            {steps.map((step, index) => {
              const isActive = currentStep === index + 1;
              const isCompleted = completedSteps.includes(index + 1);
              
              return (
                <div
                  key={step.id}
                  onClick={() => onStepClick(index + 1)}
                  className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary-500 border-primary-500 text-white' 
                      : isCompleted
                      ? 'bg-success-500 border-success-500 text-white' :'bg-white border-slate-300 text-slate-500 hover:border-primary-300 hover:text-primary-600'
                  }`}
                  title={step.title}
                >
                  {isCompleted ? (
                    <Icon name="Check" size={14} />
                  ) : (
                    <span className="text-xs font-bold">{step.id}</span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // Expanded View - Show full cards
          <div className="space-y-3">
            {filteredSteps.length > 0 ? (
              filteredSteps.map((step, index) => {
                const originalIndex = steps.findIndex(s => s.id === step.id);
                const stepNumber = originalIndex + 1;
                const isActive = currentStep === stepNumber;
                const isCompleted = completedSteps.includes(stepNumber);
                
                return (
                  <PlanningStepCard
                    key={step.id}
                    step={step}
                    isActive={isActive}
                    isCompleted={isCompleted}
                    onClick={() => onStepClick(stepNumber)}
                  />
                );
              })
            ) : (
              <div className="text-center py-8">
                <Icon name="Search" size={32} className="text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-text-secondary">لا توجد خطوات تطابق البحث</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sidebar Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-200 flex-shrink-0">
          {/* Progress Summary */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-primary-800">التقدم الإجمالي</span>
              <span className="text-sm font-bold text-primary-600">
                {Math.round((completedSteps.length / steps.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-white rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Quick Tip */}
          <div className="bg-accent-50 rounded-lg p-3">
            <div className="flex items-start space-x-2 rtl:space-x-reverse">
              <Icon name="Lightbulb" size={16} className="text-accent-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-accent-800 mb-1">نصيحة</p>
                <p className="text-xs text-accent-700 leading-relaxed">
                  يمكنك الانتقال بين الخطوات بالضغط على أي خطوة من القائمة الجانبية.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default StepsSidebar;