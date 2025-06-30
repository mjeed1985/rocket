import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const BasicInfoForm = ({ planData, onPlanDataChange }) => {
  const [formData, setFormData] = useState({
    // معلومات المدرسة الأساسية
    schoolName: planData?.schoolName || '',
    principalName: planData?.principalName || '',
    schoolLevel: planData?.schoolLevel || '',
    schoolType: planData?.schoolType || '',
    academicYear: planData?.academicYear || '',
    planPeriod: planData?.planPeriod || '',
    preparationDate: planData?.preparationDate || new Date().toISOString().split('T')[0],
    
    // معلومات إضافية من الصورة
    schoolEmail: planData?.schoolEmail || '',
    schoolPhone: planData?.schoolPhone || '',
    educationDepartment: planData?.educationDepartment || '',
    
    // الكادر التعليمي والإداري والطلاب
    totalTeachers: planData?.totalTeachers || 0,
    totalAdministrators: planData?.totalAdministrators || 0,
    totalClassrooms: planData?.totalClassrooms || 0,
    totalStudentsPerGrade: planData?.totalStudentsPerGrade || 0,
    
    // أعداد الطلاب لكل مرحلة
    primaryStudents: planData?.primaryStudents || 0,
    middleStudents: planData?.middleStudents || 0,
    highStudents: planData?.highStudents || 0,
    
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

  const handleNumberChange = (field, value) => {
    const numValue = parseInt(value) || 0;
    handleInputChange(field, numValue);
  };

  const incrementNumber = (field) => {
    const currentValue = formData[field] || 0;
    handleInputChange(field, currentValue + 1);
  };

  const decrementNumber = (field) => {
    const currentValue = formData[field] || 0;
    if (currentValue > 0) {
      handleInputChange(field, currentValue - 1);
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
    if (formData.schoolEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.schoolEmail)) {
      newErrors.schoolEmail = 'البريد الإلكتروني غير صحيح';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const NumberInput = ({ field, label, placeholder }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">{label}</label>
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Button
          variant="outline"
          size="sm"
          onClick={() => decrementNumber(field)}
          iconName="Minus"
          className="w-10 h-10 p-0"
        />
        <Input
          type="number"
          placeholder={placeholder}
          value={formData[field] || 0}
          onChange={(e) => handleNumberChange(field, e.target.value)}
          className="text-center flex-1"
          min="0"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => incrementNumber(field)}
          iconName="Plus"
          className="w-10 h-10 p-0"
        />
      </div>
    </div>
  );

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

      {/* معلومات المدرسة الأساسية */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
          <Icon name="School" size={20} className="text-primary-600" />
          <h3 className="text-lg font-semibold text-text-primary">المعلومات الأساسية</h3>
        </div>

        {/* اسم المدرسة */}
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

        {/* اسم المدير */}
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

        {/* المرحلة التعليمية ونوع المدرسة */}
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

        {/* العام الدراسي وفترة الخطة */}
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

        {/* البريد الإلكتروني ورقم الهاتف */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              البريد الإلكتروني للمدرسة
            </label>
            <Input
              type="email"
              placeholder="example@school.edu.sa"
              value={formData.schoolEmail}
              onChange={(e) => handleInputChange('schoolEmail', e.target.value)}
              className={errors.schoolEmail ? 'border-error-300 focus:border-error-500 focus:ring-error-200' : ''}
            />
            {errors.schoolEmail && (
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
                <Icon name="AlertCircle" size={16} />
                <span>{errors.schoolEmail}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              رقم هاتف المدرسة
            </label>
            <Input
              type="tel"
              placeholder="XXX-XXXX-011"
              value={formData.schoolPhone}
              onChange={(e) => handleInputChange('schoolPhone', e.target.value)}
            />
          </div>
        </div>

        {/* إدارة التعليم */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            إدارة التعليم
          </label>
          <Input
            type="text"
            placeholder="أدخل اسم إدارة التعليم"
            value={formData.educationDepartment}
            onChange={(e) => handleInputChange('educationDepartment', e.target.value)}
          />
        </div>

        {/* تاريخ إعداد الخطة */}
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
      </div>

      {/* الكادر التعليمي والإداري والطلاب */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
          <Icon name="Users" size={20} className="text-secondary-600" />
          <h3 className="text-lg font-semibold text-text-primary">الكادر التعليمي والإداري والطلاب</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NumberInput
            field="totalTeachers"
            label="إجمالي عدد المعلمين/المعلمات"
            placeholder="0"
          />

          <NumberInput
            field="totalAdministrators"
            label="عدد الإداريين/الإداريات"
            placeholder="0"
          />

          <NumberInput
            field="totalClassrooms"
            label="عدد الفصول الدراسية"
            placeholder="0"
          />

          <NumberInput
            field="totalStudentsPerGrade"
            label="أعداد الطلاب لكل مرحلة"
            placeholder="0"
          />
        </div>
      </div>

      {/* أعداد الطلاب حسب المرحلة */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
          <Icon name="GraduationCap" size={20} className="text-accent-600" />
          <h3 className="text-lg font-semibold text-text-primary">أعداد الطلاب حسب المرحلة</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              اختيار اسم المرحلة (مثال: الصف الأول الابتدائي)
            </label>
            <Input
              type="text"
              placeholder="أدخل اسم المرحلة"
              value={formData.gradeName || ''}
              onChange={(e) => handleInputChange('gradeName', e.target.value)}
            />
          </div>

          <div className="col-span-2">
            <NumberInput
              field="gradeStudentCount"
              label="عدد الطلاب في هذه المرحلة"
              placeholder="0"
            />
          </div>
        </div>

        {/* زر إضافة مرحلة جديدة */}
        <div className="pt-4 border-t border-slate-200">
          <Button
            variant="outline"
            onClick={() => {
              // يمكن إضافة منطق لإضافة مرحلة جديدة هنا
              console.log('إضافة مرحلة جديدة');
            }}
            iconName="Plus"
            iconPosition="left"
            className="w-full"
          >
            إضافة توزيع طلاب لمرحلة جديدة
          </Button>
        </div>
      </div>

      {/* ملاحظات إضافية */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Icon name="FileText" size={20} className="text-primary-600" />
          <h3 className="text-lg font-semibold text-text-primary">ملاحظات إضافية</h3>
        </div>
        
        <textarea
          rows={4}
          placeholder="أدخل أي ملاحظات أو معلومات إضافية حول الخطة..."
          value={formData.additionalNotes || ''}
          onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
        />
      </div>

      {/* زر التحقق من صحة البيانات */}
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