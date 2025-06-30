import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'الميزات', href: '#features' },
      { name: 'الأسعار', href: '#pricing' },
      { name: 'التحديثات', href: '#updates' },
      { name: 'الدعم الفني', href: '#support' }
    ],
    company: [
      { name: 'من نحن', href: '#about' },
      { name: 'فريق العمل', href: '#team' },
      { name: 'الوظائف', href: '#careers' },
      { name: 'اتصل بنا', href: '#contact' }
    ],
    resources: [
      { name: 'مركز المساعدة', href: '#help' },
      { name: 'الأدلة التعليمية', href: '#guides' },
      { name: 'المدونة', href: '#blog' },
      { name: 'الندوات', href: '#webinars' }
    ],
    legal: [
      { name: 'سياسة الخصوصية', href: '#privacy' },
      { name: 'شروط الاستخدام', href: '#terms' },
      { name: 'اتفاقية الخدمة', href: '#service' },
      { name: 'ملفات تعريف الارتباط', href: '#cookies' }
    ]
  };

  const socialLinks = [
    { name: 'تويتر', icon: 'Twitter', href: '#twitter', color: 'hover:text-blue-400' },
    { name: 'لينكد إن', icon: 'Linkedin', href: '#linkedin', color: 'hover:text-blue-600' },
    { name: 'يوتيوب', icon: 'Youtube', href: '#youtube', color: 'hover:text-red-500' },
    { name: 'إنستغرام', icon: 'Instagram', href: '#instagram', color: 'hover:text-pink-500' }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/landing-page" className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-primary">
                <Icon name="GraduationCap" size={24} color="white" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white font-heading">SchoolPlan</span>
                <span className="text-sm font-medium text-primary-400 -mt-1">Pro</span>
              </div>
            </Link>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              منصة متكاملة لإدارة المؤسسات التعليمية وإنشاء الخطط التشغيلية بطريقة ذكية ومبتكرة. نساعد المدارس على تحقيق أهدافها بكفاءة عالية.
            </p>
            
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`flex items-center justify-center w-10 h-10 bg-slate-800 rounded-lg transition-all duration-200 hover:bg-slate-700 ${social.color}`}
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">المنتج</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">الشركة</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">الموارد</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">قانوني</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">
                اشترك في نشرتنا الإخبارية
              </h3>
              <p className="text-slate-300 text-sm">
                احصل على آخر التحديثات والنصائح حول إدارة المؤسسات التعليمية
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 rtl:space-x-reverse">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <Icon name="Send" size={16} />
                <span>اشتراك</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm text-slate-400">
              <span>© {currentYear} SchoolPlan Pro. جميع الحقوق محفوظة.</span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline">صُنع بـ ❤️ في المملكة العربية السعودية</span>
            </div>
            
            <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm text-slate-400">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icon name="MapPin" size={14} />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icon name="Phone" size={14} />
                <span dir="ltr">+966 11 123 4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;