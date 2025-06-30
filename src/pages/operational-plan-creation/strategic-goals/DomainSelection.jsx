import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const DomainSelection = ({ domains, selectedDomains, onAddDomain, onRemoveDomain }) => {
  const getDomainIcon = (domainId) => {
    const icons = {
      'teaching-learning': 'BookOpen',
      'student-development': 'Users',
      'school-environment': 'Building',
      'community-partnership': 'Handshake',
      'leadership-management': 'Crown',
      'professional-development': 'GraduationCap'
    };
    return icons[domainId] || 'Target';
  };

  const getDomainColor = (domainId) => {
    const colors = {
      'teaching-learning': 'primary',
      'student-development': 'secondary',
      'school-environment': 'accent',
      'community-partnership': 'success',
      'leadership-management': 'warning',
      'professional-development': 'error'
    };
    return colors[domainId] || 'primary';
  };

  const getColorClasses = (color, isSelected) => {
    const colorMap = {
      primary: isSelected 
        ? 'border-primary-300 bg-primary-50 text-primary-800' 
        : 'border-slate-200 hover:border-primary-200 hover:bg-primary-25',
      secondary: isSelected 
        ? 'border-secondary-300 bg-secondary-50 text-secondary-800' 
        : 'border-slate-200 hover:border-secondary-200 hover:bg-secondary-25',
      accent: isSelected 
        ? 'border-accent-300 bg-accent-50 text-accent-800' 
        : 'border-slate-200 hover:border-accent-200 hover:bg-accent-25',
      success: isSelected 
        ? 'border-success-300 bg-success-50 text-success-800' 
        : 'border-slate-200 hover:border-success-200 hover:bg-success-25',
      warning: isSelected 
        ? 'border-warning-300 bg-warning-50 text-warning-800' 
        : 'border-slate-200 hover:border-warning-200 hover:bg-warning-25',
      error: isSelected 
        ? 'border-error-300 bg-error-50 text-error-800' 
        : 'border-slate-200 hover:border-error-200 hover:bg-error-25'
    };
    return colorMap[color] || colorMap.primary;
  };

  const getIconColorClass = (color, isSelected) => {
    const colorMap = {
      primary: isSelected ? 'text-primary-600' : 'text-slate-500',
      secondary: isSelected ? 'text-secondary-600' : 'text-slate-500',
      accent: isSelected ? 'text-accent-600' : 'text-slate-500',
      success: isSelected ? 'text-success-600' : 'text-slate-500',
      warning: isSelected ? 'text-warning-600' : 'text-slate-500',
      error: isSelected ? 'text-error-600' : 'text-slate-500'
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {domains.map((domain) => {
          const isSelected = selectedDomains.includes(domain.id);
          const color = getDomainColor(domain.id);
          
          return (
            <div
              key={domain.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${getColorClasses(color, isSelected)}`}
              onClick={() => isSelected ? onRemoveDomain(domain.id) : onAddDomain(domain.id)}
            >
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                  isSelected ? `bg-${color}-100` : 'bg-slate-100'
                }`}>
                  <Icon 
                    name={getDomainIcon(domain.id)} 
                    size={20} 
                    className={getIconColorClass(color, isSelected)}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold mb-1">{domain.label}</h4>
                  <p className="text-xs opacity-80 leading-relaxed">{domain.description}</p>
                  
                  {domain.objectives && (
                    <div className="mt-2">
                      <span className="text-xs font-medium opacity-70">
                        {domain.objectives.length} هدف فرعي
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex-shrink-0">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected 
                      ? `border-${color}-500 bg-${color}-500` 
                      : 'border-slate-300'
                  }`}>
                    {isSelected && (
                      <Icon name="Check" size={12} className="text-white" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedDomains.length > 0 && (
        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
            <Icon name="CheckCircle" size={16} className="text-primary-600" />
            <span className="text-sm font-medium text-primary-800">
              تم اختيار {selectedDomains.length} مجال استراتيجي
            </span>
          </div>
          <div className="text-xs text-primary-700">
            يمكنك الآن تحديد الأهداف الفرعية لكل مجال مختار
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainSelection;