import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const StatisticsSection = () => {
  const [counters, setCounters] = useState({
    schools: 0,
    letters: 0,
    plans: 0,
    users: 0
  });

  const finalValues = {
    schools: 1250,
    letters: 45000,
    plans: 3200,
    users: 8500
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = Object.keys(finalValues).map(key => {
      const increment = finalValues[key] / steps;
      let currentValue = 0;
      
      return setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValues[key]) {
          currentValue = finalValues[key];
          clearInterval(intervals.find(interval => interval === this));
        }
        
        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(currentValue)
        }));
      }, stepDuration);
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, []);

  const statisticsData = [
    {
      id: 1,
      title: 'المدارس المخدومة',
      value: counters.schools,
      suffix: '+',
      icon: 'School',
      color: 'primary',
      description: 'مؤسسة تعليمية تثق بخدماتنا'
    },
    {
      id: 2,
      title: 'الخطابات المُنشأة',
      value: counters.letters,
      suffix: '+',
      icon: 'FileText',
      color: 'secondary',
      description: 'خطاب وتبليغ إداري تم إنشاؤه'
    },
    {
      id: 3,
      title: 'الخطط التشغيلية',
      value: counters.plans,
      suffix: '+',
      icon: 'Target',
      color: 'accent',
      description: 'خطة تشغيلية مكتملة ومعتمدة'
    },
    {
      id: 4,
      title: 'المستخدمون النشطون',
      value: counters.users,
      suffix: '+',
      icon: 'Users',
      color: 'success',
      description: 'مدير ومسؤول يستخدم المنصة'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50',
        iconBg: 'bg-primary-100',
        iconText: 'text-primary-600',
        accent: 'text-primary-600'
      },
      secondary: {
        bg: 'bg-secondary-50',
        iconBg: 'bg-secondary-100',
        iconText: 'text-secondary-600',
        accent: 'text-secondary-600'
      },
      accent: {
        bg: 'bg-accent-50',
        iconBg: 'bg-accent-100',
        iconText: 'text-accent-600',
        accent: 'text-accent-600'
      },
      success: {
        bg: 'bg-success-50',
        iconBg: 'bg-success-100',
        iconText: 'text-success-600',
        accent: 'text-success-600'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            أرقام تتحدث عن نفسها
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            نفخر بثقة المؤسسات التعليمية في منصتنا ونسعى لتقديم أفضل الخدمات
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statisticsData.map((stat) => {
            const colors = getColorClasses(stat.color);
            
            return (
              <div
                key={stat.id}
                className={`${colors.bg} rounded-2xl p-8 text-center shadow-card-2 hover:shadow-card-3 transform hover:-translate-y-2 transition-all duration-300 border border-white/50`}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.iconBg} rounded-xl mb-6`}>
                  <Icon name={stat.icon} size={28} className={colors.iconText} />
                </div>

                {/* Value */}
                <div className="mb-4">
                  <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                    <span className={`text-4xl sm:text-5xl font-bold ${colors.accent}`}>
                      {stat.value.toLocaleString('ar-SA')}
                    </span>
                    <span className={`text-2xl font-bold ${colors.accent}`}>
                      {stat.suffix}
                    </span>
                  </div>
                </div>

                {/* Title and Description */}
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white shadow-card-3">
            <h3 className="text-2xl font-bold mb-4">
              انضم إلى آلاف المؤسسات التعليمية
            </h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              ابدأ رحلتك في التخطيط الذكي وإدارة المؤسسة التعليمية بكفاءة عالية
            </p>
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm">
              <Icon name="CheckCircle" size={16} className="text-success-300" />
              <span>تجربة مجانية لمدة ٣٠ يوماً</span>
              <span className="mx-2">•</span>
              <Icon name="Shield" size={16} className="text-success-300" />
              <span>بيانات آمنة ومحمية</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;