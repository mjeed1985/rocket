import React, { useState } from 'react';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const PasswordFields = ({ formData, onChange, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handlePasswordChange = (value) => {
    onChange('password', value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return 'bg-error-500';
      case 2:
        return 'bg-warning-500';
      case 3:
        return 'bg-accent-500';
      case 4:
      case 5:
        return 'bg-success-500';
      default:
        return 'bg-slate-300';
    }
  };

  const getStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return 'ضعيفة';
      case 2:
        return 'متوسطة';
      case 3:
        return 'جيدة';
      case 4:
      case 5:
        return 'قوية جداً';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 rounded-full mb-3">
          <Icon name="Lock" size={24} className="text-accent-600" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary">إعداد كلمة المرور</h3>
        <p className="text-sm text-text-secondary mt-1">اختر كلمة مرور قوية لحماية حسابك</p>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          كلمة المرور <span className="text-error-500">*</span>
        </label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="أدخل كلمة مرور قوية"
            value={formData.password || ''}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className={`pl-12 rtl:pl-4 rtl:pr-12 ${errors.password ? 'border-error-300 focus:border-error-500 focus:ring-error-200' : ''}`}
            required
          />
          <Button
            variant="ghost"
            size="sm"
            iconName={showPassword ? 'EyeOff' : 'Eye'}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 p-1 h-auto w-auto text-text-muted hover:text-text-primary"
          />
        </div>

        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">قوة كلمة المرور</span>
              <span className={`text-xs font-medium ${
                passwordStrength <= 1 ? 'text-error-600' :
                passwordStrength === 2 ? 'text-warning-600' :
                passwordStrength === 3 ? 'text-accent-600': 'text-success-600'
              }`}>
                {getStrengthText(passwordStrength)}
              </span>
            </div>
            <div className="flex space-x-1 rtl:space-x-reverse">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`h-2 flex-1 rounded-full transition-colors duration-200 ${
                    level <= passwordStrength ? getStrengthColor(passwordStrength) : 'bg-slate-200'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        )}

        {errors.password && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.password}</span>
          </div>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          تأكيد كلمة المرور <span className="text-error-500">*</span>
        </label>
        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="أعد إدخال كلمة المرور"
            value={formData.confirmPassword || ''}
            onChange={(e) => onChange('confirmPassword', e.target.value)}
            className={`pl-12 rtl:pl-4 rtl:pr-12 ${errors.confirmPassword ? 'border-error-300 focus:border-error-500 focus:ring-error-200' : ''}`}
            required
          />
          <Button
            variant="ghost"
            size="sm"
            iconName={showConfirmPassword ? 'EyeOff' : 'Eye'}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 p-1 h-auto w-auto text-text-muted hover:text-text-primary"
          />
        </div>
        {errors.confirmPassword && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-error-600">
            <Icon name="AlertCircle" size={16} />
            <span>{errors.confirmPassword}</span>
          </div>
        )}
      </div>

      {/* Password Requirements */}
      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">متطلبات كلمة المرور:</h4>
        <div className="space-y-2">
          {[
            { text: 'لا تقل عن 8 أحرف', check: formData.password?.length >= 8 },
            { text: 'تحتوي على حرف صغير', check: /[a-z]/.test(formData.password || '') },
            { text: 'تحتوي على حرف كبير', check: /[A-Z]/.test(formData.password || '') },
            { text: 'تحتوي على رقم', check: /[0-9]/.test(formData.password || '') },
            { text: 'تحتوي على رمز خاص', check: /[^A-Za-z0-9]/.test(formData.password || '') }
          ].map((requirement, index) => (
            <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
              <Icon 
                name={requirement.check ? 'CheckCircle' : 'Circle'} 
                size={16} 
                className={requirement.check ? 'text-success-500' : 'text-slate-400'} 
              />
              <span className={`text-xs ${requirement.check ? 'text-success-600' : 'text-text-muted'}`}>
                {requirement.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PasswordFields;