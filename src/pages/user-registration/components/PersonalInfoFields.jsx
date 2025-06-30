import React from 'react';
import Input from 'components/ui/Input';
import Icon from 'components/AppIcon';

const PersonalInfoFields = ({ formData, onChange, errors }) => {
  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-3">
          <Icon name="User" size={24} className="text-primary-600" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary">المعلومات الشخصية</h3>
        <p className="text-sm text-text-secondary mt-1">أدخل معلوماتك الشخصية كمدير للمدرسة</p>
      </div>

      {/* Principal Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          اسم المدير <span className="text-error-500">*</span>
        </label>
        <Input
          type="text"
          placeholder="أدخل اسم مدير المدرسة"
          value={formData.principalName || ''}
          onChange={(e) => handleInputChange('principalName', e.target.value)}
          className={errors.principalName ? 'border-error-300 focus:border-error-500 focus:ring-error-200' : ''}
          required
        />
        {errors.principalName && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.principalName}</span>
          </div>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          البريد الإلكتروني <span className="text-error-500">*</span>
        </label>
        <Input
          type="email"
          placeholder="example@school.edu.sa"
          value={formData.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={errors.email ? 'border-error-300 focus:border-error-500 focus:ring-error-200' : ''}
          required
        />
        {errors.email && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.email}</span>
          </div>
        )}
        <p className="text-xs text-text-muted">
          سيتم استخدام هذا البريد لتسجيل الدخول وإرسال الإشعارات المهمة
        </p>
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          رقم الجوال
        </label>
        <Input
          type="tel"
          placeholder="05xxxxxxxx"
          value={formData.phoneNumber || ''}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          className={errors.phoneNumber ? 'border-error-300 focus:border-error-500 focus:ring-error-200' : ''}
        />
        {errors.phoneNumber && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.phoneNumber}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoFields;