import React, { useState } from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';
import ActivationCodeField from './ActivationCodeField';
import PersonalInfoFields from './PersonalInfoFields';
import SchoolInfoFields from './SchoolInfoFields';
import PasswordFields from './PasswordFields';
import activationCodeService from '../../../services/activationCodeService';
import userManagementService from '../../../services/userManagementService';

const RegistrationForm = ({ onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [validCodeData, setValidCodeData] = useState(null);
  const [formData, setFormData] = useState({
    activationCode: '',
    principalName: '',
    email: '',
    phoneNumber: '',
    schoolName: '',
    schoolLevel: '',
    schoolType: '',
    schoolAddress: '',
    studentCount: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const totalSteps = 4;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCodeValidation = (isValid, codeData = null) => {
    setIsCodeValid(isValid);
    setValidCodeData(codeData);
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.activationCode) {
          newErrors.activationCode = 'كود التفعيل مطلوب';
        } else if (!isCodeValid) {
          newErrors.activationCode = 'كود التفعيل غير صحيح';
        }
        break;

      case 2:
        if (!formData.principalName.trim()) {
          newErrors.principalName = 'اسم المدير مطلوب';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'البريد الإلكتروني مطلوب';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'البريد الإلكتروني غير صحيح';
        }
        if (formData.phoneNumber && !/^05\d{8}$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = 'رقم الجوال غير صحيح (يجب أن يبدأ بـ 05 ويحتوي على 10 أرقام)';
        }
        break;

      case 3:
        if (!formData.schoolName.trim()) {
          newErrors.schoolName = 'اسم المدرسة مطلوب';
        }
        if (!formData.schoolLevel) {
          newErrors.schoolLevel = 'المرحلة التعليمية مطلوبة';
        }
        if (!formData.schoolType) {
          newErrors.schoolType = 'نوع المدرسة مطلوب';
        }
        break;

      case 4:
        if (!formData.password) {
          newErrors.password = 'كلمة المرور مطلوبة';
        } else if (formData.password.length < 8) {
          newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
        }
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // إنشاء بيانات المستخدم الجديد
      const userData = {
        name: formData.principalName,
        email: formData.email,
        role: 'user',
        schoolName: formData.schoolName,
        schoolLevel: formData.schoolLevel,
        phoneNumber: formData.phoneNumber,
        isVerified: true,
        notes: `تم التسجيل باستخدام كود التفعيل: ${formData.activationCode}`
      };

      // إضافة المستخدم إلى النظام
      const newUser = await userManagementService.addUser(userData);
      
      // تسجيل استخدام كود التفعيل
      if (validCodeData) {
        const userInfo = {
          name: formData.principalName,
          email: formData.email,
          schoolName: formData.schoolName,
          registrationDate: new Date().toISOString()
        };
        
        activationCodeService.useCode(formData.activationCode, userInfo);
      }
      
      console.log('Registration successful:', newUser);
      onSuccess();
    } catch (error) {
      console.error('Registration failed:', error);
      alert(error.message || 'حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ActivationCodeField
            value={formData.activationCode}
            onChange={(value) => handleInputChange('activationCode', value)}
            onValidation={handleCodeValidation}
          />
        );
      case 2:
        return (
          <PersonalInfoFields
            formData={formData}
            onChange={handleInputChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <SchoolInfoFields
            formData={formData}
            onChange={handleInputChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <PasswordFields
            formData={formData}
            onChange={handleInputChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return isCodeValid && formData.activationCode;
      case 2:
        return formData.principalName && formData.email;
      case 3:
        return formData.schoolName && formData.schoolLevel && formData.schoolType;
      case 4:
        return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
      default:
        return false;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-card-2 p-6 md:p-8">
      {/* Step Content */}
      <div className="mb-8">
        {renderStepContent()}
      </div>

      {/* Show activation code info if valid */}
      {currentStep === 1 && isCodeValid && validCodeData && (
        <div className="mb-6 p-4 bg-success-50 border border-success-200 rounded-lg">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Icon name="CheckCircle" size={20} className="text-success-600" />
            <div className="text-success-800">
              <p className="font-medium">كود التفعيل صحيح!</p>
              <p className="text-sm text-success-700">
                المرحلة التعليمية: {validCodeData.schoolLevel}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Button
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          iconName="ChevronRight"
          iconPosition="right"
          className="order-2 sm:order-1"
        >
          السابق
        </Button>

        <div className="flex gap-3 order-1 sm:order-2">
          {currentStep < totalSteps ? (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!canProceed()}
              iconName="ChevronLeft"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              التالي
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!canProceed() || isLoading}
              loading={isLoading}
              iconName="UserPlus"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
            </Button>
          )}
        </div>
      </div>

      {/* Terms and Privacy */}
      {currentStep === totalSteps && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Shield" size={16} className="text-primary-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-text-muted leading-relaxed">
              بإنشاء حساب، فإنك توافق على{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                شروط الاستخدام
              </a>{' '}
              و{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700 underline">
                سياسة الخصوصية
              </a>
              . نحن نلتزم بحماية بياناتك وخصوصيتك.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;