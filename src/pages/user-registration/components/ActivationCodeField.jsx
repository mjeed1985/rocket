import React, { useState, useEffect } from 'react';
import Input from 'components/ui/Input';
import Icon from 'components/AppIcon';
import activationCodeService from '../../../services/activationCodeService';

const ActivationCodeField = ({ value, onChange, onValidation }) => {
  const [validationStatus, setValidationStatus] = useState('idle'); // idle, validating, valid, invalid
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    const validateCode = async () => {
      if (value && value.length >= 6) {
        setValidationStatus('validating');
        
        try {
          // Add small delay to show loading state
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const result = await activationCodeService.validateCode(value);
          setValidationStatus(result.isValid ? 'valid' : 'invalid');
          setValidationMessage(result.message);
          onValidation?.(result.isValid, result.codeData);
        } catch (error) {
          console.error('Error validating activation code:', error);
          setValidationStatus('invalid');
          setValidationMessage('حدث خطأ أثناء التحقق من الكود');
          onValidation?.(false);
        }
      } else {
        setValidationStatus('idle');
        setValidationMessage('');
        onValidation?.(false);
      }
    };

    const debounceTimer = setTimeout(validateCode, 300);
    return () => clearTimeout(debounceTimer);
  }, [value, onValidation]);

  const getStatusIcon = () => {
    switch (validationStatus) {
      case 'validating':
        return <Icon name="Loader2" size={20} className="animate-spin text-primary-500" />;
      case 'valid':
        return <Icon name="CheckCircle" size={20} className="text-success-500" />;
      case 'invalid':
        return <Icon name="XCircle" size={20} className="text-error-500" />;
      default:
        return <Icon name="Key" size={20} className="text-text-muted" />;
    }
  };

  const getFieldClassName = () => {
    switch (validationStatus) {
      case 'valid':
        return 'border-success-300 focus:border-success-500 focus:ring-success-200';
      case 'invalid':
        return 'border-error-300 focus:border-error-500 focus:ring-error-200';
      case 'validating':
        return 'border-primary-300 focus:border-primary-500 focus:ring-primary-200';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toUpperCase();
    // Only allow alphanumeric characters and hyphens
    const cleanValue = inputValue.replace(/[^A-Z0-9-]/g, '');
    onChange(cleanValue);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-text-primary">
        كود التفعيل <span className="text-error-500">*</span>
      </label>
      
      <div className="relative">
        <Input
          type="text"
          placeholder="أدخل كود التفعيل المرسل إليك (مثال: SP-2024-ABC123)"
          value={value}
          onChange={handleInputChange}
          className={`pl-12 rtl:pl-4 rtl:pr-12 ${getFieldClassName()}`}
          required
          disabled={validationStatus === 'validating'}
        />
        
        <div className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2">
          {getStatusIcon()}
        </div>
      </div>

      {/* Validation Message */}
      {validationMessage && (
        <div className={`flex items-center space-x-2 rtl:space-x-reverse text-sm ${
          validationStatus === 'valid' ? 'text-success-600' : 'text-error-600'
        }`}>
          <Icon 
            name={validationStatus === 'valid' ? 'CheckCircle' : 'AlertCircle'} 
            size={16} 
          />
          <span>{validationMessage}</span>
        </div>
      )}

      {/* Help Text */}
      <div className="space-y-2">
        <p className="text-xs text-text-muted">
          يمكنك الحصول على كود التفعيل من إدارة النظام أو من خلال التواصل مع الدعم الفني
        </p>
        
        {/* Code format help */}
        <div className="bg-slate-50 rounded-md p-3">
          <div className="flex items-start space-x-2 rtl:space-x-reverse">
            <Icon name="Info" size={16} className="text-primary-500 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-text-secondary">
              <p className="font-medium mb-1">تنسيق الكود:</p>
              <p>يجب أن يكون الكود بالتنسيق: SP-سنة-حروف/أرقام</p>
              <p className="text-primary-600 font-mono">مثال: SP-2024-ABC123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivationCodeField;