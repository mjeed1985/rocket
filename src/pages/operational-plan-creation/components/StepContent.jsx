import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const StepContent = ({ step, onNext, onPrevious, isFirstStep, isLastStep }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    step.fields?.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} مطلوب`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext(formData);
    }
  };

  const renderField = (field) => {
    const commonProps = {
      value: formData[field.name] || '',
      onChange: (e) => handleInputChange(field.name, e.target.value),
      placeholder: field.placeholder,
      required: field.required,
      className: "w-full"
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={field.rows || 4}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
          />
        );
      
      case 'select':
        return (
          <select
            {...commonProps}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
          >
            <option value="">اختر {field.label}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'file':
        return (
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors duration-200">
            <Icon name="Upload" size={32} className="text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-text-secondary mb-2">اسحب الملفات هنا أو انقر للتحديد</p>
            <Input
              type="file"
              accept={field.accept}
              multiple={field.multiple}
              className="hidden"
              id={`file-${field.name}`}
            />
            <label
              htmlFor={`file-${field.name}`}
              className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-md cursor-pointer hover:bg-primary-100 transition-colors duration-200"
            >
              <Icon name="Paperclip" size={16} className="ml-2 rtl:ml-0 rtl:mr-2" />
              اختر ملف
            </label>
          </div>
        );
      
      default:
        return <Input {...commonProps} type={field.type || 'text'} />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-card-1">
      {/* Step Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-start space-x-4 rtl:space-x-reverse">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-primary">
            <Icon name={step.icon} size={24} color="white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              {step.title}
            </h1>
            <p className="text-text-secondary leading-relaxed">
              {step.description}
            </p>
            
            {step.instructions && (
              <div className="mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-accent-800 mb-1">إرشادات</h3>
                    <p className="text-sm text-accent-700 leading-relaxed">
                      {step.instructions}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        {step.fields && step.fields.length > 0 ? (
          <div className="space-y-6">
            {step.fields.map((field, index) => (
              <div key={field.name || index}>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  {field.label}
                  {field.required && <span className="text-error-500 mr-1 rtl:mr-0 rtl:ml-1">*</span>}
                </label>
                
                {field.description && (
                  <p className="text-sm text-text-secondary mb-3">
                    {field.description}
                  </p>
                )}
                
                {renderField(field)}
                
                {errors[field.name] && (
                  <p className="mt-2 text-sm text-error-600 flex items-center">
                    <Icon name="AlertCircle" size={16} className="ml-1 rtl:ml-0 rtl:mr-1" />
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              محتوى هذه الخطوة قيد التطوير
            </h3>
            <p className="text-text-secondary">
              سيتم إضافة النماذج والحقول المطلوبة قريباً
            </p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="p-6 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {!isFirstStep && (
              <Button
                variant="ghost"
                iconName="ChevronRight"
                iconPosition="right"
                onClick={onPrevious}
              >
                الخطوة السابقة
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Button
              variant="secondary"
              iconName="Save"
              iconPosition="left"
              onClick={() => console.log('Save draft')}
            >
              حفظ كمسودة
            </Button>
            
            <Button
              variant="primary"
              iconName={isLastStep ? "CheckCircle" : "ChevronLeft"}
              iconPosition="left"
              onClick={handleNext}
            >
              {isLastStep ? "إنهاء الخطة" : "الخطوة التالية"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepContent;