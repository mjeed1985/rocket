import React from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary-200 to-secondary-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-accent-200 to-accent-300 rounded-full opacity-10 blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Main Headline */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                إنشاء الخطة التشغيلية
              </span>
              <br />
              <span className="text-text-primary">في ٢٠ خطوة</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-text-secondary mb-4 max-w-3xl mx-auto leading-relaxed">
              منصة متكاملة لإدارة المؤسسات التعليمية وإنشاء الخطط التشغيلية
            </p>
            
            <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
              نظام ذكي لكتابة الخطابات والتبليغات الإدارية مع أدوات التخطيط المتقدمة
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-card-1">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg">
                <Icon name="FileText" size={20} className="text-primary-600" />
              </div>
              <span className="text-sm font-medium text-text-primary">خطط تشغيلية شاملة</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-card-1">
              <div className="flex items-center justify-center w-10 h-10 bg-secondary-100 rounded-lg">
                <Icon name="MessageSquare" size={20} className="text-secondary-600" />
              </div>
              <span className="text-sm font-medium text-text-primary">كتابة ذكية للخطابات</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-card-1">
              <div className="flex items-center justify-center w-10 h-10 bg-accent-100 rounded-lg">
                <Icon name="BarChart3" size={20} className="text-accent-600" />
              </div>
              <span className="text-sm font-medium text-text-primary">تقارير وإحصائيات</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
            <Button
              variant="primary"
              size="xl"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={() => window.location.href = '/user-registration'}
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 px-8 py-4"
            >
              ابدأ الآن مجاناً
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              iconName="Play"
              iconPosition="left"
              className="text-text-secondary hover:text-primary-600"
            >
              شاهد العرض التوضيحي
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-sm text-text-muted mb-4">موثوق به من قبل المؤسسات التعليمية الرائدة</p>
            <div className="flex items-center justify-center space-x-8 rtl:space-x-reverse opacity-60">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icon name="Shield" size={16} className="text-success-500" />
                <span className="text-xs font-medium text-text-secondary">آمن ومحمي</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icon name="Clock" size={16} className="text-primary-500" />
                <span className="text-xs font-medium text-text-secondary">متاح ٢٤/٧</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icon name="Users" size={16} className="text-secondary-500" />
                <span className="text-xs font-medium text-text-secondary">دعم فني متخصص</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;