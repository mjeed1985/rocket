import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      title: "إضافة مستخدم جديد",
      description: "إنشاء حساب مستخدم جديد",
      icon: "UserPlus",
      color: "primary",
      action: () => console.log('Add new user')
    },
    {
      title: "إنشاء كود تفعيل",
      description: "توليد كود تفعيل جديد",
      icon: "Key",
      color: "success",
      action: () => console.log('Generate activation code')
    },
    {
      title: "إرسال إشعار عام",
      description: "إرسال رسالة لجميع المستخدمين",
      icon: "Bell",
      color: "warning",
      action: () => console.log('Send notification')
    },
    {
      title: "تصدير التقارير",
      description: "تحميل تقارير النظام",
      icon: "Download",
      color: "secondary",
      action: () => console.log('Export reports')
    },
    {
      title: "إعدادات النظام",
      description: "تكوين إعدادات المنصة",
      icon: "Settings",
      color: "primary",
      action: () => console.log('System settings')
    },
    {
      title: "النسخ الاحتياطي",
      description: "إنشاء نسخة احتياطية",
      icon: "Database",
      color: "success",
      action: () => console.log('Create backup')
    }
  ];

  const recentActivities = [
    {
      id: 1,
      user: "أحمد محمد",
      action: "قام بإنشاء خطة تشغيلية جديدة",
      time: "منذ 5 دقائق",
      icon: "FileText",
      color: "primary"
    },
    {
      id: 2,
      user: "فاطمة السالم",
      action: "استخدمت كود التفعيل SP-2024-ABC123",
      time: "منذ 15 دقيقة",
      icon: "Key",
      color: "success"
    },
    {
      id: 3,
      user: "محمد الخالد",
      action: "أرسل 3 خطابات إدارية",
      time: "منذ 30 دقيقة",
      icon: "Mail",
      color: "secondary"
    },
    {
      id: 4,
      user: "نورا المطيري",
      action: "حدثت معلومات المدرسة",
      time: "منذ ساعة",
      icon: "Edit",
      color: "warning"
    },
    {
      id: 5,
      user: "خالد الزهراني",
      action: "سجل دخول إلى النظام",
      time: "منذ ساعتين",
      icon: "LogIn",
      color: "primary"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary-50 text-primary-600 hover:bg-primary-100',
      success: 'bg-success-50 text-success-600 hover:bg-success-100',
      warning: 'bg-warning-50 text-warning-600 hover:bg-warning-100',
      secondary: 'bg-secondary-50 text-secondary-600 hover:bg-secondary-100'
    };
    return colors[color] || colors.primary;
  };

  const getActivityIconColor = (color) => {
    const colors = {
      primary: 'text-primary-600',
      success: 'text-success-600',
      warning: 'text-warning-600',
      secondary: 'text-secondary-600'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-surface rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">الإجراءات السريعة</h3>
          <Icon name="Zap" size={20} className="text-accent-600" />
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="flex items-center p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-200 text-right rtl:text-left group"
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200 ${getColorClasses(action.color)}`}>
                <Icon name={action.icon} size={20} />
              </div>
              <div className="flex-1 mr-3 rtl:mr-0 rtl:ml-3 min-w-0">
                <p className="text-sm font-medium text-text-primary group-hover:text-primary-700 transition-colors duration-200">
                  {action.title}
                </p>
                <p className="text-xs text-text-muted">
                  {action.description}
                </p>
              </div>
              <Icon name="ChevronLeft" size={16} className="text-text-muted group-hover:text-primary-600 transition-colors duration-200" />
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-surface rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">الأنشطة الأخيرة</h3>
          <Button variant="ghost" size="sm" iconName="RefreshCw">
            تحديث
          </Button>
        </div>
        
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 rtl:space-x-reverse">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 flex-shrink-0 ${getActivityIconColor(activity.color)}`}>
                <Icon name={activity.icon} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-text-muted mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-200">
          <Button variant="ghost" size="sm" iconName="Eye" className="w-full">
            عرض جميع الأنشطة
          </Button>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-surface rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">حالة النظام</h3>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-2 h-2 bg-success-400 rounded-full"></div>
            <span className="text-sm text-success-600 font-medium">يعمل بشكل طبيعي</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">خادم التطبيق</span>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-2 h-2 bg-success-400 rounded-full"></div>
              <span className="text-sm text-success-600">متصل</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">قاعدة البيانات</span>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-2 h-2 bg-success-400 rounded-full"></div>
              <span className="text-sm text-success-600">متصلة</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">خدمة البريد الإلكتروني</span>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-2 h-2 bg-warning-400 rounded-full"></div>
              <span className="text-sm text-warning-600">بطيئة</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">مساحة التخزين</span>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-16 bg-slate-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <span className="text-sm text-text-secondary">65%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;