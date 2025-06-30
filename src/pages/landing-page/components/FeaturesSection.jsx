import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "نظام الخطوات العشرين",
      description: "منهجية مدروسة لإنشاء خطط تشغيلية شاملة ومتكاملة في 20 خطوة واضحة ومنظمة",
      icon: "ListChecks",
      color: "primary",
      benefits: [
        "خطوات واضحة ومرتبة",
        "إرشادات تفصيلية لكل مرحلة",
        "ضمان عدم تفويت أي عنصر مهم",
        "توفير الوقت والجهد"
      ]
    },
    {
      id: 2,
      title: "الكتابة الذكية للخطابات",
      description: "نظام متطور لإنشاء الخطابات والتبليغات الإدارية بذكاء اصطناعي مع قوالب جاهزة",
      icon: "PenTool",
      color: "secondary",
      benefits: [
        "قوالب متنوعة للخطابات",
        "تخصيص تلقائي للمحتوى",
        "مراجعة لغوية ونحوية",
        "حفظ وإدارة المسودات"
      ]
    },
    {
      id: 3,
      title: "إدارة شاملة للمؤسسة",
      description: "أدوات متكاملة لإدارة جميع جوانب المؤسسة التعليمية من التخطيط إلى التنفيذ والمتابعة",
      icon: "Building2",
      color: "accent",
      benefits: [
        "لوحة تحكم شاملة",
        "إدارة المستخدمين والصلاحيات",
        "متابعة التقدم والإنجازات",
        "تقارير تفصيلية ومرئية"
      ]
    },
    {
      id: 4,
      title: "التقارير والتحليلات",
      description: "نظام تقارير متقدم يوفر رؤى عميقة حول أداء المؤسسة ومؤشرات الإنجاز",
      icon: "BarChart3",
      color: "success",
      benefits: [
        "تقارير تفاعلية ومرئية",
        "مؤشرات أداء رئيسية",
        "تحليل البيانات المتقدم",
        "تصدير التقارير بصيغ متعددة"
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary-50',
        iconBg: 'bg-primary-500',
        iconText: 'text-white',
        accent: 'text-primary-600',
        border: 'border-primary-200'
      },
      secondary: {
        bg: 'bg-secondary-50',
        iconBg: 'bg-secondary-500',
        iconText: 'text-white',
        accent: 'text-secondary-600',
        border: 'border-secondary-200'
      },
      accent: {
        bg: 'bg-accent-50',
        iconBg: 'bg-accent-500',
        iconText: 'text-white',
        accent: 'text-accent-600',
        border: 'border-accent-200'
      },
      success: {
        bg: 'bg-success-50',
        iconBg: 'bg-success-500',
        iconText: 'text-white',
        accent: 'text-success-600',
        border: 'border-success-200'
      }
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            ميزات تجعل إدارة مدرستك أسهل
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            مجموعة شاملة من الأدوات المتطورة المصممة خصيصاً لتلبية احتياجات المؤسسات التعليمية
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={feature.id}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center space-y-8 lg:space-y-0 lg:space-x-8 rtl:space-x-reverse`}
              >
                {/* Feature Image/Icon */}
                <div className="flex-shrink-0">
                  <div className={`relative ${colors.bg} rounded-2xl p-8 shadow-card-2`}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.iconBg} rounded-xl shadow-lg`}>
                      <Icon name={feature.icon} size={32} className={colors.iconText} />
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-white to-slate-100 rounded-full shadow-sm"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-tr from-white to-slate-100 rounded-full shadow-sm"></div>
                  </div>
                </div>

                {/* Feature Content */}
                <div className="flex-1 text-center lg:text-right rtl:lg:text-left">
                  <h3 className="text-2xl font-bold text-text-primary mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Benefits List */}
                  <div className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className="flex items-center space-x-3 rtl:space-x-reverse justify-center lg:justify-start rtl:lg:justify-end"
                      >
                        <div className={`flex items-center justify-center w-5 h-5 ${colors.iconBg} rounded-full`}>
                          <Icon name="Check" size={12} className="text-white" />
                        </div>
                        <span className="text-sm text-text-secondary">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Features Grid */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-12">
            مزايا إضافية تميز منصتنا
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "Shield",
                title: "أمان البيانات",
                description: "حماية متقدمة لجميع بياناتك"
              },
              {
                icon: "Clock",
                title: "متاح ٢٤/٧",
                description: "وصول مستمر من أي مكان"
              },
              {
                icon: "Smartphone",
                title: "متوافق مع الجوال",
                description: "تصميم متجاوب لجميع الأجهزة"
              },
              {
                icon: "HeadphonesIcon",
                title: "دعم فني متميز",
                description: "فريق دعم متخصص باللغة العربية"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-6 bg-slate-50 rounded-xl hover:bg-white hover:shadow-card-2 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg mb-4">
                  <Icon name={item.icon} size={24} className="text-white" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">{item.title}</h4>
                <p className="text-sm text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;