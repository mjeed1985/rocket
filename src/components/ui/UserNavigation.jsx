import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const UserNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      name: 'لوحة التحكم',
      href: '/user-dashboard',
      icon: 'LayoutDashboard',
      badge: null
    },
    {
      name: 'إنشاء خطة تشغيلية',
      href: '/operational-plan-creation',
      icon: 'FileText',
      badge: 'جديد'
    },
    {
      name: 'خططي التشغيلية',
      href: '/user-dashboard/my-plans',
      icon: 'FolderOpen',
      badge: null
    },
    {
      name: 'التقارير',
      href: '/user-dashboard/reports',
      icon: 'BarChart3',
      badge: null
    },
    {
      name: 'الرسائل',
      href: '/user-dashboard/messages',
      icon: 'MessageSquare',
      badge: '3'
    },
    {
      name: 'المساعدة',
      href: '/user-dashboard/help',
      icon: 'HelpCircle',
      badge: null
    }
  ];

  const isActiveRoute = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    // تأكيد تسجيل الخروج
    const confirmLogout = window.confirm('هل أنت متأكد من تسجيل الخروج؟');
    
    if (confirmLogout) {
      // مسح بيانات المستخدم من localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      
      // إعادة توجيه إلى الصفحة الرئيسية
      navigate('/landing-page', { replace: true });
    }
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-header bg-surface border-b border-slate-200 shadow-card-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/user-dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-primary">
                <Icon name="GraduationCap" size={20} color="white" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary-800 font-heading">SchoolPlan Pro</span>
                <span className="text-xs font-medium text-primary-600 -mt-1">منصة التخطيط التعليمي</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
              {navigationItems.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActiveRoute(item.href)
                      ? 'text-primary-700 bg-primary-50' :'text-text-secondary hover:text-primary-700 hover:bg-primary-50'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className={`ml-2 rtl:ml-0 rtl:mr-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                      item.badge === 'جديد' ?'bg-accent-100 text-accent-800' :'bg-primary-100 text-primary-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Header Actions */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {/* Quick Actions - Desktop */}
              <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MessageSquare"
                  className="relative"
                >
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Bell"
                  className="relative"
                >
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-500 rounded-full"></span>
                </Button>
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="hidden sm:block text-right rtl:text-left">
                  <p className="text-sm font-medium text-text-primary">أحمد محمد</p>
                  <p className="text-xs text-text-secondary">مدير المدرسة</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="User"
                  className="w-8 h-8 rounded-full bg-secondary-100 text-secondary-700"
                />
              </div>

              {/* Logout Button - Desktop */}
              <Button
                variant="ghost"
                size="sm"
                iconName="LogOut"
                onClick={handleLogout}
                className="hidden lg:flex text-error-600 hover:text-error-700 hover:bg-error-50"
                title="تسجيل الخروج"
              />

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                iconName="Menu"
                onClick={toggleMobileMenu}
                className="lg:hidden"
              />
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-slate-200 bg-surface">
              <nav className="px-4 py-4 space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center justify-between px-3 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isActiveRoute(item.href)
                        ? 'text-primary-700 bg-primary-50' :'text-text-secondary hover:text-primary-700 hover:bg-primary-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Icon name={item.icon} size={20} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        item.badge === 'جديد' ?'bg-accent-100 text-accent-800' :'bg-primary-100 text-primary-800'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
                
                {/* Mobile Quick Actions */}
                <div className="pt-4 mt-4 border-t border-slate-200">
                  <div className="flex items-center justify-around">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MessageSquare"
                      className="flex-1 mx-1"
                    >
                      الرسائل
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="HelpCircle"
                      className="flex-1 mx-1"
                    >
                      المساعدة
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="LogOut"
                      className="flex-1 mx-1 text-error-600"
                      onClick={handleLogout}
                    >
                      تسجيل الخروج
                    </Button>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default UserNavigation;