import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const SuccessMessage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/user-dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGoToDashboard = () => {
    navigate('/user-dashboard');
  };

  const handleGoToLogin = () => {
    navigate('/login-page');
  };

  return (
    <div className="bg-white rounded-xl shadow-card-2 p-8 text-center max-w-md mx-auto">
      {/* Success Icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 bg-success-100 rounded-full mb-6">
        <Icon name="CheckCircle" size={40} className="text-success-600" />
      </div>

      {/* Success Message */}
      <h2 className="text-2xl font-bold text-text-primary mb-4 font-heading">
        تم إنشاء الحساب بنجاح!
      </h2>
      
      <p className="text-text-secondary mb-6 leading-relaxed">
        مرحباً بك في منصة SchoolPlan Pro. تم إنشاء حسابك بنجاح ويمكنك الآن البدء في استخدام جميع الميزات المتاحة.
      </p>

      {/* Account Details */}
      <div className="bg-primary-50 rounded-lg p-4 mb-6 text-right rtl:text-left">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">البريد الإلكتروني:</span>
          <span className="text-sm font-medium text-text-primary">user@example.com</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">نوع الحساب:</span>
          <span className="text-sm font-medium text-primary-700">مدير مدرسة</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="primary"
          onClick={handleGoToDashboard}
          iconName="LayoutDashboard"
          iconPosition="left"
          fullWidth
        >
          الانتقال إلى لوحة التحكم
        </Button>
        
        <Button
          variant="ghost"
          onClick={handleGoToLogin}
          iconName="LogIn"
          iconPosition="left"
          fullWidth
        >
          تسجيل الدخول لاحقاً
        </Button>
      </div>

      {/* Auto Redirect Notice */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-xs text-text-muted">
          <Icon name="Clock" size={14} />
          <span>سيتم توجيهك تلقائياً إلى لوحة التحكم خلال 5 ثوانٍ</span>
        </div>
      </div>

      {/* Welcome Tips */}
      <div className="mt-6 bg-accent-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
          <Icon name="Lightbulb" size={16} className="text-accent-600" />
          <span className="text-sm font-medium text-accent-800">نصائح للبداية</span>
        </div>
        <ul className="text-xs text-accent-700 space-y-1 text-right rtl:text-left">
          <li>• ابدأ بإنشاء خطتك التشغيلية الأولى</li>
          <li>• استكشف أدوات التبليغات الإدارية</li>
          <li>• راجع دليل المستخدم للحصول على المساعدة</li>
        </ul>
      </div>
    </div>
  );
};

export default SuccessMessage;