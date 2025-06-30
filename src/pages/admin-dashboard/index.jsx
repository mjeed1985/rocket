import React, { useState } from 'react';
import AdminNavigation from 'components/ui/AdminNavigation';
import MetricsCard from './components/MetricsCard';
import UserManagementTab from './components/UserManagementTab';
import AnalyticsTab from './components/AnalyticsTab';
import ActivationCodesTab from './components/ActivationCodesTab';
import QuickActions from './components/QuickActions';
import Icon from 'components/AppIcon';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const overviewMetrics = [
    {
      title: "إجمالي المستخدمين",
      value: "248",
      subtitle: "مستخدم نشط",
      icon: "Users",
      trend: "up",
      trendValue: "+12%",
      color: "primary"
    },
    {
      title: "المدارس المسجلة",
      value: "89",
      subtitle: "مدرسة فعالة",
      icon: "Building",
      trend: "up",
      trendValue: "+8%",
      color: "success"
    },
    {
      title: "الخطابات المُنشأة",
      value: "1,247",
      subtitle: "خطاب هذا الشهر",
      icon: "FileText",
      trend: "up",
      trendValue: "+23%",
      color: "secondary"
    },
    {
      title: "معدل الاستخدام",
      value: "94%",
      subtitle: "نشاط يومي",
      icon: "Activity",
      trend: "up",
      trendValue: "+5%",
      color: "warning"
    }
  ];

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: 'LayoutDashboard' },
    { id: 'users', name: 'إدارة المستخدمين', icon: 'Users' },
    { id: 'analytics', name: 'التحليلات', icon: 'BarChart3' },
    { id: 'activation-codes', name: 'أكواد التفعيل', icon: 'Key' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3 space-y-6">
              {/* Overview Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewMetrics.map((metric, index) => (
                  <MetricsCard key={index} {...metric} />
                ))}
              </div>
              
              {/* Recent Activity Overview */}
              <div className="bg-surface rounded-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-text-primary">نشاط المنصة اليوم</h3>
                  <Icon name="TrendingUp" size={20} className="text-success-600" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-50 rounded-lg mx-auto mb-3">
                      <Icon name="UserPlus" size={24} className="text-primary-600" />
                    </div>
                    <p className="text-2xl font-bold text-text-primary">12</p>
                    <p className="text-sm text-text-secondary">مستخدم جديد</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-success-50 rounded-lg mx-auto mb-3">
                      <Icon name="FileText" size={24} className="text-success-600" />
                    </div>
                    <p className="text-2xl font-bold text-text-primary">89</p>
                    <p className="text-sm text-text-secondary">خطة جديدة</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-secondary-50 rounded-lg mx-auto mb-3">
                      <Icon name="Mail" size={24} className="text-secondary-600" />
                    </div>
                    <p className="text-2xl font-bold text-text-primary">156</p>
                    <p className="text-sm text-text-secondary">خطاب مُرسل</p>
                  </div>
                </div>
              </div>
              
              {/* System Health */}
              <div className="bg-surface rounded-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-text-primary">صحة النظام</h3>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="w-2 h-2 bg-success-400 rounded-full"></div>
                    <span className="text-sm text-success-600 font-medium">ممتاز</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-text-primary">أداء الخادم</span>
                      <span className="text-sm text-success-600">98%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-success-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-text-primary">استخدام الذاكرة</span>
                      <span className="text-sm text-primary-600">67%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-text-primary">مساحة التخزين</span>
                      <span className="text-sm text-warning-600">45%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-warning-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-text-primary">سرعة الاستجابة</span>
                      <span className="text-sm text-success-600">234ms</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-success-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Actions Sidebar */}
            <div className="xl:col-span-1">
              <QuickActions />
            </div>
          </div>
        );
      case 'users':
        return <UserManagementTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'activation-codes':
        return <ActivationCodesTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      
      <main className="lg:mr-64 rtl:lg:mr-0 rtl:lg:ml-64 pt-16">
        <div className="p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-text-primary mb-2">لوحة التحكم الإدارية</h1>
                <p className="text-text-secondary">إدارة شاملة لمنصة SchoolPlan Pro</p>
              </div>
              
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="text-right rtl:text-left">
                  <p className="text-sm font-medium text-text-primary">آخر تحديث</p>
                  <p className="text-xs text-text-secondary">
                    {new Date().toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-primary">
                  <Icon name="Shield" size={20} color="white" />
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-slate-200">
              <nav className="-mb-px flex space-x-8 rtl:space-x-reverse overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 rtl:space-x-reverse py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600' :'border-transparent text-text-muted hover:text-text-secondary hover:border-slate-300'
                    }`}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;