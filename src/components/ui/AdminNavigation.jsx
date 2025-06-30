import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const AdminNavigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      name: 'لوحة التحكم',
      href: '/admin-dashboard',
      icon: 'LayoutDashboard',
      description: 'نظرة عامة على النظام'
    },
    {
      name: 'إدارة المستخدمين',
      href: '/admin-dashboard/users',
      icon: 'Users',
      description: 'إدارة حسابات المستخدمين'
    },
    {
      name: 'أكواد التفعيل',
      href: '/admin-dashboard/activation-codes',
      icon: 'Key',
      description: 'إنشاء وإدارة أكواد التفعيل'
    },
    {
      name: 'التقارير والإحصائيات',
      href: '/admin-dashboard/analytics',
      icon: 'BarChart3',
      description: 'تحليل البيانات والتقارير'
    },
    {
      name: 'إعدادات النظام',
      href: '/admin-dashboard/settings',
      icon: 'Settings',
      description: 'تكوين إعدادات النظام'
    },
    {
      name: 'سجل الأنشطة',
      href: '/admin-dashboard/activity-log',
      icon: 'FileText',
      description: 'مراجعة سجل العمليات'
    }
  ];

  const isActiveRoute = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-header bg-surface border-b border-slate-200 shadow-card-1">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Menu"
            onClick={toggleSidebar}
            className="lg:hidden"
          />

          {/* Logo */}
          <Link to="/admin-dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-primary">
              <Icon name="GraduationCap" size={20} color="white" strokeWidth={2} />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-bold text-primary-800 font-heading">SchoolPlan Pro</span>
              <span className="text-xs font-medium text-primary-600 -mt-1">لوحة الإدارة</span>
            </div>
          </Link>

          {/* Header Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              iconName="Bell"
              className="relative"
            >
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-error-500 rounded-full"></span>
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="hidden md:block text-right rtl:text-left">
                <p className="text-sm font-medium text-text-primary">مدير النظام</p>
                <p className="text-xs text-text-secondary">admin@schoolplan.com</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="User"
                className="w-8 h-8 rounded-full bg-primary-100 text-primary-700"
              />
            </div>

            {/* Logout */}
            <Button
              variant="ghost"
              size="sm"
              iconName="LogOut"
              onClick={() => {
                // Logout logic
                console.log('Logout');
              }}
              className="text-error-600 hover:text-error-700 hover:bg-error-50"
            />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 z-sidebar w-64 h-[calc(100vh-4rem)] bg-surface border-r border-slate-200 shadow-card-2 transform transition-transform duration-200 ease-out lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-item group ${
                  isActiveRoute(item.href) ? 'active' : ''
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className="ml-3 rtl:ml-0 rtl:mr-3 flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-text-muted truncate">{item.description}</p>
                </div>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center space-x-3 rtl:space-x-reverse text-xs text-text-muted">
              <Icon name="Shield" size={16} />
              <span>الإصدار 1.0.0</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-overlay bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default AdminNavigation;