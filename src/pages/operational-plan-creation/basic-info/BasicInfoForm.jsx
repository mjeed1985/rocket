import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const BasicInfoForm = ({ planData, onPlanDataChange }) => {
  const [formData, setFormData] = useState({
    schoolName: planData?.schoolName || '',
    principalName: planData?.principalName || '',
    schoolLevel: planData?.schoolLevel || '',
    schoolType: planData?.schoolType || '',
    academicYear: planData?.academicYear || '',
    planPeriod: planData?.planPeriod || '',
    preparationDate: planData?.preparationDate || new Date().toISOString().split('T')[0],
    ...planData
  });

  const [errors, setErrors] = useState({});

  const schoolLevels = [
    { value: '', label: 'اختر المرحلة التعليمية' },
    { value: 'ابتدائية', label: 'ابتدائية' },
    { value: 'متوسطة', label: 'متوسطة' },
    { value: 'ثانوية', label: 'ثانوية' },
    { value: 'جميع المراحل', label: 'جميع المراحل' }
  ];

  const schoolTypes = [
    { value: '', label: 'اختر نوع المدرسة' },
    { value: 'حكومية', label: 'حكومية' },
    { value: 'أهلية', label: 'أهلية' },
    { value: 'عالمية', label: 'عالمية' }
  ];

  const planPeriods = [
    { value: '', label: 'اختر فترة الخطة' },
    { value: 'فصل دراسي واحد', label: 'فصل دراسي واحد' },
    { value: 'عام دراسي كامل', label: 'عام دراسي كامل' },
    { value: 'ثلاث سنوات', label: 'ثلاث سنوات' },
    { value: 'خمس سنوات', label: 'خمس سنوات' }
  ];

  const handleInputChange = (field, value) => {
    const updatedData = {
      ...formData,
      [field]: value
    };
    setFormData(updatedData);
    onPlanDataChange(updatedData);
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.schoolName.trim()) {
      newErrors.schoolName = 'اسم المدرسة مطلوب';
    }
    if (!formData.principalName.trim()) {
      newErrors.principalName = 'اسم المدير مطلوب';
    }
    if (!formData.schoolLevel) {
      newErrors.schoolLevel = 'المرحلة التعليمية مطلوبة';
    }
    if (!formData.schoolType) {
      newErrors.schoolType = 'نوع المدرسة مطلوب';
    }
    if (!formData.academicYear.trim()) {
      newErrors.academicYear = 'العام الدراسي مطلوب';
    }
    if (!formData.planPeriod) {
      newErrors.planPeriod = 'فترة الخطة مطلوبة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
          <Icon name="FileText" size={32} className="text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">المعلومات الأساسية للخطة</h2>
        <p className="text-text-secondary">أدخل المعلومات الأساسية للمدرسة والخطة التشغيلية</p>
      </div>

      {/* Form Fields */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        {/* School Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            اسم المدرسة <span className="text-error-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="أدخل اسم المدرسة الكامل"
            value={formData.schoolName}
            onChange={(e) => handleInputChange('schoolName', e.target.value)}
            className={errors.schoolName ? 'border-error-300 focus:border-error-500 focus:ring-error-200' : ''}
          />
          {errors.schoolName && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
              <Icon name="AlertCircle" size={16} />
              <span>{errors.schoolName}</span>
            </div>
          )}
        </div>

        {/* Principal Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            اسم مدير المدرسة <span className="text-error-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="أدخل اسم مدير المدرسة"
            value={formData.principalName}
            onChange={(e) => handleInputChange('principalName', e.target.value)}
            className={errors.principalName ? 'border-error-300 focus:border-error-500 focus:ring-error-200' : ''}
          />
          {errors.principalName && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
              <Icon name="AlertCircle" size={16} />
              <span>{errors.principalName}</span>
            </div>
          )}
        </div>

        {/* School Level and Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              المرحلة التعليمية <span className="text-error-500">*</span>
            </label>
            <select
              value={formData.schoolLevel}
              onChange={(e) => handleInputChange('schoolLevel', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
                errors.schoolLevel ? 'border-error-300' : 'border-slate-300'
              }`}
            >
              {schoolLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            {errors.schoolLevel && (
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
                <Icon name="AlertCircle" size={16} />
                <span>{errors.schoolLevel}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              نوع المدرسة <span className="text-error-500">*</span>
            </label>
            <select
              value={formData.schoolType}
              onChange={(e) => handleInputChange('schoolType', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
                errors.schoolType ? 'border-error-300' : 'border-slate-300'
              }`}
            >
              {schoolTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.schoolType && (
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
                <Icon name="AlertCircle" size={16} />
                <span>{errors.schoolType}</span>
              </div>
            )}
          </div>
        </div>

        {/* Academic Year and Plan Period */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              العام الدراسي <span className="text-error-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="مثال: 1446/1447 هـ"
              value={formData.academicYear}
              onChange={(e) => handleInputChange('academicYear', e.target.value)}
              className={errors.academicYear ? 'border-error-300 focus:border-error-500 focus:ring-error-200' : ''}
            />
            {errors.academicYear && (
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
                <Icon name="AlertCircle" size={16} />
                <span>{errors.academicYear}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              فترة الخطة <span className="text-error-500">*</span>
            </label>
            <select
              value={formData.planPeriod}
              onChange={(e) => handleInputChange('planPeriod', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
                errors.planPeriod ? 'border-error-300' : 'border-slate-300'
              }`}
            >
              {planPeriods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
            {errors.planPeriod && (
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
                <Icon name="AlertCircle" size={16} />
                <span>{errors.planPeriod}</span>
              </div>
            )}
          </div>
        </div>

        {/* Preparation Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            تاريخ إعداد الخطة
          </label>
          <Input
            type="date"
            value={formData.preparationDate}
            onChange={(e) => handleInputChange('preparationDate', e.target.value)}
          />
        </div>

        {/* Additional Notes */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            ملاحظات إضافية
          </label>
          <textarea
            rows={4}
            placeholder="أدخل أي ملاحظات أو معلومات إضافية حول الخطة..."
            value={formData.additionalNotes || ''}
            onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
          />
        </div>
      </div>

      {/* Validation Button */}
      <div className="flex justify-center">
        <Button
          variant="secondary"
          onClick={validateForm}
          iconName="CheckCircle"
          iconPosition="left"
        >
          التحقق من صحة البيانات
        </Button>
      </div>
    </div>
  );
};

export default BasicInfoForm;