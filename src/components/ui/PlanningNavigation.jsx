import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const PlanningNavigation = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const planningSteps = [
    {
      id: 1,
      name: 'معلومات أساسية',
      href: '/operational-plan-creation/basic-info',
      icon: 'FileText',
      status: 'completed'
    },
    {
      id: 2,
      name: 'تحليل البيئة',
      href: '/operational-plan-creation/environment-analysis',
      icon: 'Search',
      status: 'completed'
    },
    {
      id: 3,
      name: 'الأهداف الاستراتيجية',
      href: '/operational-plan-creation/strategic-goals',
      icon: 'Target',
      status: 'current'
    },
    {
      id: 4,
      name: 'الأهداف التشغيلية',
      href: '/operational-plan-creation/operational-goals',
      icon: 'CheckSquare',
      status: 'pending'
    },
    {
      id: 5,
      name: 'المبادرات والبرامج',
      href: '/operational-plan-creation/initiatives',
      icon: 'Lightbulb',
      status: 'pending'
    },
    {
      id: 6,
      name: 'الموارد المطلوبة',
      href: '/operational-plan-creation/resources',
      icon: 'Package',
      status: 'pending'
    },
    {
      id: 7,
      name: 'الجدول الزمني',
      href: '/operational-plan-creation/timeline',
      icon: 'Calendar',
      status: 'pending'
    },
    {
      id: 8,
      name: 'مؤشرات الأداء',
      href: '/operational-plan-creation/kpis',
      icon: 'BarChart3',
      status: 'pending'
    },
    {
      id: 9,
      name: 'المخاطر والتحديات',
      href: '/operational-plan-creation/risks',
      icon: 'AlertTriangle',
      status: 'pending'
    },
    {
      id: 10,
      name: 'خطة التواصل',
      href: '/operational-plan-creation/communication',
      icon: 'MessageCircle',
      status: 'pending'
    },
    {
      id: 11,
      name: 'المراجعة والتقييم',
      href: '/operational-plan-creation/review',
      icon: 'Eye',
      status: 'pending'
    },
    {
      id: 12,
      name: 'الموافقة والنشر',
      href: '/operational-plan-creation/approval',
      icon: 'CheckCircle',
      status: 'pending'
    }
  ];

  const currentStepIndex = planningSteps.findIndex(step => 
    location.pathname === step.href || location.pathname.startsWith(step.href + '/')
  );

  const completedSteps = planningSteps.filter(step => step.status === 'completed').length;
  const progressPercentage = Math.round((completedSteps / planningSteps.length) * 100);

  const getStepStatus = (index) => {
    if (index < currentStepIndex) return 'completed';
    if (index === currentStepIndex) return 'current';
    return 'pending';
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-header bg-surface border-b border-slate-200 shadow-card-1">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Mobile Sidebar Toggle */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Menu"
            onClick={toggleMobileSidebar}
            className="lg:hidden"
          />

          {/* Logo and Title */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Link to="/user-dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-primary">
                <Icon name="GraduationCap" size={20} color="white" strokeWidth={2} />
              </div>
              <span className="hidden sm:block text-lg font-bold text-primary-800 font-heading">SchoolPlan Pro</span>
            </Link>
            
            <div className="hidden md:block h-6 w-px bg-slate-300"></div>
            
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-text-primary">إنشاء خطة تشغيلية جديدة</h1>
              <p className="text-sm text-text-secondary">الخطوة {currentStepIndex + 1} من {planningSteps.length}</p>
            </div>
          </div>

          {/* Progress Bar - Mobile */}
          <div className="flex-1 mx-4 md:hidden">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-text-secondary mt-1 text-center">{progressPercentage}% مكتمل</p>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Button
              variant="ghost"
              size="sm"
              iconName="Save"
              className="hidden sm:flex"
            >
              حفظ
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              iconName="Eye"
              className="hidden md:flex"
            >
              معاينة
            </Button>

            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => window.location.href = '/user-dashboard'}
              className="text-text-muted hover:text-error-600"
            />
          </div>
        </div>

        {/* Progress Bar - Desktop */}
        <div className="hidden md:block px-6 pb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">التقدم الإجمالي</span>
            <span className="text-sm text-text-secondary">{completedSteps} من {planningSteps.length} خطوات مكتملة</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 z-sidebar h-[calc(100vh-4rem)] bg-surface border-r border-slate-200 shadow-card-2 transition-all duration-200 ease-out ${
        isSidebarCollapsed ? 'w-16' : 'w-80'
      } ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          {!isSidebarCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-text-primary">خطوات الإنشاء</h2>
              <p className="text-sm text-text-secondary">اتبع الخطوات لإكمال خطتك</p>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            iconName={isSidebarCollapsed ? "ChevronRight" : "ChevronLeft"}
            onClick={toggleSidebar}
            className="hidden lg:flex"
          />
        </div>

        {/* Steps Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {planningSteps.map((step, index) => {
              const status = getStepStatus(index);
              const isActive = location.pathname === step.href;
              
              return (
                <Link
                  key={step.id}
                  to={step.href}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-primary-50 border border-primary-200 shadow-sm' 
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  {/* Step Number/Status */}
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium transition-all duration-200 ${
                    status === 'completed' 
                      ? 'bg-success-500 border-success-500 text-white' 
                      : status === 'current' ?'bg-primary-500 border-primary-500 text-white' :'bg-white border-slate-300 text-slate-500'
                  }`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>

                  {!isSidebarCollapsed && (
                    <div className="flex-1 mr-3 rtl:mr-0 rtl:ml-3 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium truncate ${
                          isActive ? 'text-primary-800' : 'text-text-primary'
                        }`}>
                          {step.name}
                        </p>
                        <Icon 
                          name={step.icon} 
                          size={16} 
                          className={`ml-2 rtl:ml-0 rtl:mr-2 flex-shrink-0 ${
                            isActive ? 'text-primary-600' : 'text-text-muted'
                          }`} 
                        />
                      </div>
                      
                      {status === 'current' && (
                        <p className="text-xs text-primary-600 mt-1">الخطوة الحالية</p>
                      )}
                      
                      {status === 'completed' && (
                        <p className="text-xs text-success-600 mt-1">مكتملة</p>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        {!isSidebarCollapsed && (
          <div className="p-4 border-t border-slate-200">
            <div className="bg-accent-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icon name="Lightbulb" size={16} className="text-accent-600" />
                <span className="text-sm font-medium text-accent-800">نصيحة</span>
              </div>
              <p className="text-xs text-accent-700 mt-1">
                يمكنك حفظ تقدمك في أي وقت والعودة لاحقاً لإكمال الخطة.
              </p>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-overlay bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default PlanningNavigation;