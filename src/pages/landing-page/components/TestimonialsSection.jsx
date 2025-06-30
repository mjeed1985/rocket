import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "د. أحمد محمد العلي",
      position: "مدير مدرسة الفاروق الابتدائية",
      school: "مدرسة الفاروق الابتدائية - الرياض",
      rating: 5,
      content: `منصة SchoolPlan Pro غيرت طريقة عملنا بالكامل. الآن يمكننا إنشاء الخطط التشغيلية في وقت قياسي مع ضمان الجودة والدقة.\n\nالنظام سهل الاستخدام ويوفر كل ما نحتاجه من أدوات التخطيط والتبليغات الإدارية.`,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      schoolLogo: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=60&h=60&fit=crop"
    },
    {
      id: 2,
      name: "أ. فاطمة سالم الزهراني",
      position: "مديرة مدرسة النور المتوسطة",
      school: "مدرسة النور المتوسطة - جدة",
      rating: 5,
      content: `أعجبني كثيراً نظام الخطوات العشرين لإنشاء الخطة التشغيلية. كل خطوة واضحة ومفصلة، والنتائج احترافية جداً.\n\nوفرت علينا ساعات طويلة من العمل اليدوي، والآن خططنا أكثر تنظيماً وفعالية.`,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      schoolLogo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=60&h=60&fit=crop"
    },
    {
      id: 3,
      name: "أ. محمد عبدالله القحطاني",
      position: "مدير مدرسة الأمل الثانوية",
      school: "مدرسة الأمل الثانوية - الدمام",
      rating: 5,
      content: `الدعم الفني ممتاز والفريق متعاون جداً. المنصة تطورت كثيراً منذ بداية استخدامنا لها.\n\nأنصح كل مدير مدرسة بتجربة هذه المنصة، ستلاحظ الفرق من أول استخدام.`,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      schoolLogo: "https://images.unsplash.com/photo-1562774053-701939374585?w=60&h=60&fit=crop"
    },
    {
      id: 4,
      name: "د. نورا إبراهيم الشمري",
      position: "مديرة مدرسة الرواد الابتدائية",
      school: "مدرسة الرواد الابتدائية - المدينة المنورة",
      rating: 5,
      content: `ما يميز المنصة هو سهولة الاستخدام والتصميم الجميل. حتى المعلمين الذين لا يجيدون التقنية استطاعوا التعامل معها بسهولة.\n\nالتقارير والإحصائيات مفيدة جداً في متابعة تقدم العمل.`,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      schoolLogo: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=60&h=60&fit=crop"
    },
    {
      id: 5,
      name: "أ. خالد سعد الغامدي",
      position: "مدير مدرسة التميز المتوسطة",
      school: "مدرسة التميز المتوسطة - أبها",
      rating: 5,
      content: `المنصة وفرت علينا الكثير من الوقت والجهد. الآن نركز على التطوير والتحسين بدلاً من قضاء الوقت في الأعمال الإدارية الروتينية.\n\nنتائج رائعة وخدمة عملاء متميزة.`,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      schoolLogo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop"
    },
    {
      id: 6,
      name: "أ. سارة محمد البقمي",
      position: "مديرة مدرسة الإبداع الثانوية",
      school: "مدرسة الإبداع الثانوية - الطائف",
      rating: 5,
      content: `أحب كيف أن المنصة تدعم اللغة العربية بشكل كامل وتراعي خصوصيات النظام التعليمي السعودي.\n\nالتحديثات المستمرة والميزات الجديدة تجعل العمل أكثر متعة وإنتاجية.`,
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      schoolLogo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=60&h=60&fit=crop"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-accent-500 fill-current" : "text-slate-300"}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            ماذا يقول عملاؤنا
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            آراء وتجارب حقيقية من مديري المدارس الذين يستخدمون منصتنا يومياً
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <div className="relative bg-white rounded-2xl shadow-card-2 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="relative">
                  <Image
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-primary-100"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Image
                      src={testimonials[currentTestimonial].schoolLogo}
                      alt="School Logo"
                      className="w-4 h-4 rounded-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary text-lg">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {testimonials[currentTestimonial].position}
                  </p>
                  <p className="text-xs text-text-muted">
                    {testimonials[currentTestimonial].school}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
            </div>

            <blockquote className="text-text-secondary leading-relaxed whitespace-pre-line">
              "{testimonials[currentTestimonial].content}"
            </blockquote>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevTestimonial}
              className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-card-1 hover:shadow-card-2 transition-all duration-200"
            >
              <Icon name="ChevronRight" size={20} className="text-text-secondary" />
            </button>

            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentTestimonial ? 'bg-primary-500 w-8' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-card-1 hover:shadow-card-2 transition-all duration-200"
            >
              <Icon name="ChevronLeft" size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-card-2 hover:shadow-card-3 p-8 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="relative">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-4 border-primary-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Image
                        src={testimonial.schoolLogo}
                        alt="School Logo"
                        className="w-3 h-3 rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {renderStars(testimonial.rating)}
                </div>
              </div>

              {/* Content */}
              <blockquote className="text-text-secondary leading-relaxed text-sm whitespace-pre-line mb-4">
                "{testimonial.content}"
              </blockquote>

              {/* School Info */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-text-muted">
                  {testimonial.school}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 rtl:space-x-reverse bg-gradient-to-r from-success-50 to-primary-50 rounded-2xl px-8 py-6">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Icon name="Star" size={20} className="text-accent-500 fill-current" />
              <span className="text-lg font-bold text-text-primary">4.9</span>
              <span className="text-sm text-text-secondary">متوسط التقييم</span>
            </div>
            <div className="w-px h-8 bg-slate-300"></div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Icon name="Users" size={20} className="text-primary-500" />
              <span className="text-lg font-bold text-text-primary">1,250+</span>
              <span className="text-sm text-text-secondary">مدرسة راضية</span>
            </div>
            <div className="w-px h-8 bg-slate-300"></div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Icon name="Award" size={20} className="text-secondary-500" />
              <span className="text-lg font-bold text-text-primary">98%</span>
              <span className="text-sm text-text-secondary">نسبة الرضا</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;