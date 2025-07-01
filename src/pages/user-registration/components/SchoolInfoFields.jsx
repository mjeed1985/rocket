import React from 'react';
import Input from 'components/ui/Input';
import Icon from 'components/AppIcon';

const SchoolInfoFields = ({ formData, onChange, errors }) => {
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

  const schoolCategories = [
    { value: '', label: 'اختر فئة المدرسة' },
    { value: 'بنين', label: 'بنين' },
    { value: 'بنات', label: 'بنات' },
    { value: 'رياض أطفال', label: 'رياض أطفال' }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  // تحديد ما إذا كان المستخدم أنثى بناءً على فئة المدرسة
  const isFemale = formData.schoolCategory === 'بنات' || formData.schoolCategory === 'رياض أطفال';

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-full mb-3">
          <Icon name="School" size={24} className="text-secondary-600" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary">معلومات المدرسة</h3>
        <p className="text-sm text-text-secondary mt-1">أدخل التفاصيل الخاصة بمؤسستك التعليمية</p>
      </div>

      {/* School Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          اسم المدرسة <span className="text-error-500">*</span>
        </label>
        <Input
          type="text"
          placeholder="أدخل اسم المدرسة الكامل"
          value={formData.schoolName || ''}
          onChange={(e) => handleInputChange('schoolName', e.target.value)}
          className={errors.schoolName ? 'border-error-300 focus:border-error-500 focus:ring-error-200' : ''}
          required
        />
        {errors.schoolName && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.schoolName}</span>
          </div>
        )}
      </div>

      {/* School Category, Level and Type - Three Column Layout on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* School Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            فئة المدرسة <span className="text-error-500">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.schoolCategory || ''}
              onChange={(e) => handleInputChange('schoolCategory', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
                errors.schoolCategory ? 'border-error-300' : 'border-slate-300'
              }`}
              required
            >
              {schoolCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <div className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Icon name="ChevronDown" size={16} className="text-text-muted" />
            </div>
          </div>
          {errors.schoolCategory && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
              <Icon name="AlertCircle" size={16} />
              <span>{errors.schoolCategory}</span>
            </div>
          )}
        </div>

        {/* School Level */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            المرحلة التعليمية <span className="text-error-500">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.schoolLevel || ''}
              onChange={(e) => handleInputChange('schoolLevel', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
                errors.schoolLevel ? 'border-error-300' : 'border-slate-300'
              }`}
              required
            >
              {schoolLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            <div className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Icon name="ChevronDown" size={16} className="text-text-muted" />
            </div>
          </div>
          {errors.schoolLevel && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
              <Icon name="AlertCircle" size={16} />
              <span>{errors.schoolLevel}</span>
            </div>
          )}
        </div>

        {/* School Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            نوع المدرسة <span className="text-error-500">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.schoolType || ''}
              onChange={(e) => handleInputChange('schoolType', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
                errors.schoolType ? 'border-error-300' : 'border-slate-300'
              }`}
              required
            >
              {schoolTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <div className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <Icon name="ChevronDown" size={16} className="text-text-muted" />
            </div>
          </div>
          {errors.schoolType && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
              <Icon name="AlertCircle" size={16} />
              <span>{errors.schoolType}</span>
            </div>
          )}
        </div>
      </div>

      {/* School Address */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          عنوان المدرسة
        </label>
        <Input
          type="text"
          placeholder="المدينة، الحي، الشارع"
          value={formData.schoolAddress || ''}
          onChange={(e) => handleInputChange('schoolAddress', e.target.value)}
          className={errors.schoolAddress ? 'border-error-300 focus:border-error-500 focus:ring-error-200' : ''}
        />
        {errors.schoolAddress && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.schoolAddress}</span>
          </div>
        )}
      </div>

      {/* Student Count */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          عدد {isFemale ? 'الطالبات' : 'الطلاب'} (تقريبي)
        </label>
        <Input
          type="number"
          placeholder="مثال: 500"
          value={formData.studentCount || ''}
          onChange={(e) => handleInputChange('studentCount', e.target.value)}
          min="1"
          className={errors.studentCount ? 'border-error-300 focus:border-error-500 focus:ring-error-200' : ''}
        />
        {errors.studentCount && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.studentCount}</span>
          </div>
        )}
      </div>

      {/* School Category Info */}
      {formData.schoolCategory && (
        <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
            <Icon name="Info" size={16} className="text-primary-600" />
            <span className="text-sm font-medium text-primary-800">
              معلومات فئة المدرسة
            </span>
          </div>
          <p className="text-sm text-primary-700">
            {formData.schoolCategory === 'بنين' 
              ? 'سيتم تخصيص الواجهة لمدارس البنين واستخدام صيغة المذكر في جميع أجزاء النظام.' 
              : formData.schoolCategory === 'بنات'
              ? 'سيتم تخصيص الواجهة لمدارس البنات واستخدام صيغة المؤنث في جميع أجزاء النظام.'
              : 'سيتم تخصيص الواجهة لمدارس رياض الأطفال واستخدام صيغة المؤنث في جميع أجزاء النظام.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SchoolInfoFields;