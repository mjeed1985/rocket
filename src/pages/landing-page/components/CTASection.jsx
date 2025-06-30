import React from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-20 left-20 opacity-20">
          <Icon name="GraduationCap" size={40} className="text-white" />
        </div>
        <div className="absolute top-40 right-32 opacity-20">
          <Icon name="BookOpen" size={32} className="text-white" />
        </div>
        <div className="absolute bottom-32 left-40 opacity-20">
          <Icon name="Target" size={36} className="text-white" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-20">
          <Icon name="Award" size={28} className="text-white" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main CTA Content */}
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              ابدأ رحلتك في التخطيط الذكي
              <br />
              <span className="text-accent-300">اليوم مجاناً</span>
            </h2>
            
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              انضم إلى آلاف المؤسسات التعليمية التي تثق في منصتنا لإدارة خططها التشغيلية وتبليغاتها الإدارية
            </p>
          </div>

          {/* Features Highlight */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg">
                <Icon name="Zap" size={20} className="text-accent-300" />
              </div>
              <div className="text-right rtl:text-left">
                <p className="text-sm font-medium text-white">إعداد سريع</p>
                <p className="text-xs text-primary-200">في أقل من 5 دقائق</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg">
                <Icon name="Gift" size={20} className="text-accent-300" />
              </div>
              <div className="text-right rtl:text-left">
                <p className="text-sm font-medium text-white">تجربة مجانية</p>
                <p className="text-xs text-primary-200">30 يوماً كاملة</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg">
                <Icon name="HeadphonesIcon" size={20} className="text-accent-300" />
              </div>
              <div className="text-right rtl:text-left">
                <p className="text-sm font-medium text-white">دعم مجاني</p>
                <p className="text-xs text-primary-200">فريق متخصص</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 rtl:space-x-reverse mb-12">
            <Button
              variant="primary"
              size="xl"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={() => window.location.href = '/user-registration'}
              className="bg-white text-primary-700 hover:bg-primary-50 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 px-8 py-4 font-semibold"
            >
              ابدأ الآن مجاناً
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
              className="text-white border-white/30 hover:bg-white/10 hover:border-white/50"
            >
              تحدث مع فريق المبيعات
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="border-t border-white/20 pt-8">
            <p className="text-sm text-primary-200 mb-6">
              موثوق به من قبل أكثر من 1,250 مؤسسة تعليمية
            </p>
            
            <div className="flex flex-wrap items-center justify-center space-x-8 rtl:space-x-reverse opacity-70">
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                <Icon name="Shield" size={16} className="text-success-300" />
                <span className="text-xs text-white">بيانات آمنة ومحمية</span>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                <Icon name="Award" size={16} className="text-accent-300" />
                <span className="text-xs text-white">معتمد من وزارة التعليم</span>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                <Icon name="Users" size={16} className="text-secondary-300" />
                <span className="text-xs text-white">أكثر من 8,500 مستخدم نشط</span>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                <Icon name="Star" size={16} className="text-accent-300 fill-current" />
                <span className="text-xs text-white">تقييم 4.9/5 نجوم</span>
              </div>
            </div>
          </div>

          {/* Urgency Element */}
          <div className="mt-8 inline-flex items-center space-x-2 rtl:space-x-reverse bg-accent-500/20 border border-accent-400/30 rounded-full px-4 py-2">
            <Icon name="Clock" size={16} className="text-accent-300" />
            <span className="text-sm text-accent-200">
              عرض محدود: احصل على 3 أشهر إضافية مجاناً عند التسجيل هذا الشهر
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;