import React from 'react';
import UserNavigation from 'components/ui/UserNavigation';
import WelcomeHeader from './components/WelcomeHeader';
import ModuleCard from './components/ModuleCard';
import RecentDocuments from './components/RecentDocuments';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import SystemNotifications from './components/SystemNotifications';
import OperationalPlanProgress from './components/OperationalPlanProgress';
import ActivityFeed from './components/ActivityFeed';

const UserDashboard = () => {
  // Mock user data
  const userInfo = {
    principalName: "أحمد محمد العلي",
    schoolName: "مدرسة الأمل الابتدائية",
    educationLevel: "المرحلة الابتدائية",
    lastLogin: "اليوم الساعة 09:30 صباحاً"
  };

  const stats = {
    completedPlans: 3,
    pendingCommunications: 7,
    systemAlerts: 2
  };

  // Mock modules data
  const modules = [
    {
      type: 'operational-plans',
      title: 'الخطط التشغيلية',
      subtitle: 'نظام الـ 20 خطوة',
      icon: 'FileText',
      progress: 65,
      description: 'إنشاء وإدارة الخطط التشغيلية للمدرسة باستخدام نظام الخطوات المتقدم',
      hasNotification: true,
      notificationCount: 2,
      recentActivity: [
        { title: 'تم حفظ الخطة الاستراتيجية', status: 'completed', date: 'منذ ساعتين' },
        { title: 'مراجعة الأهداف التشغيلية', status: 'pending', date: 'أمس' },
        { title: 'تحديث مؤشرات الأداء', status: 'completed', date: '3 أيام' }
      ],
      stats: [
        { value: '3', label: 'خطط مكتملة' },
        { value: '2', label: 'قيد التنفيذ' }
      ],
      primaryAction: {
        label: 'إنشاء خطة جديدة',
        icon: 'Plus',
        href: '/operational-plan-creation'
      },
      secondaryAction: {
        label: 'عرض الخطط',
        icon: 'Eye',
        href: '/user-dashboard/my-plans'
      }
    },
    {
      type: 'admin-communications',
      title: 'التبليغات الإدارية',
      subtitle: 'إدارة التواصل الرسمي',
      icon: 'MessageSquare',
      progress: 80,
      description: 'إرسال واستقبال التبليغات الإدارية والمراسلات الرسمية مع الجهات المختصة',
      hasNotification: true,
      notificationCount: 5,
      recentActivity: [
        { title: 'تبليغ جديد من إدارة التعليم', status: 'new', date: 'منذ 30 دقيقة' },
        { title: 'رد على تبليغ الحضور والغياب', status: 'completed', date: 'صباح اليوم' },
        { title: 'تبليغ اجتماع المديرين', status: 'pending', date: 'أمس' }
      ],
      stats: [
        { value: '12', label: 'تبليغ جديد' },
        { value: '8', label: 'تم الرد عليها' }
      ],
      primaryAction: {
        label: 'التبليغات الجديدة',
        icon: 'Mail',
        href: '/user-dashboard/communications'
      },
      secondaryAction: {
        label: 'إرسال تبليغ',
        icon: 'Send',
        href: '/user-dashboard/send-communication'
      }
    },
    {
      type: 'internal-bulletins',
      title: 'النشرات الداخلية',
      subtitle: 'التواصل مع الطاقم التعليمي',
      icon: 'Newspaper',
      progress: 45,
      description: 'إنشاء ونشر النشرات الداخلية للمعلمين والموظفين في المدرسة',
      hasNotification: false,
      notificationCount: 0,
      recentActivity: [
        { title: 'نشرة اجتماع المعلمين', status: 'completed', date: 'منذ يومين' },
        { title: 'نشرة الأنشطة الطلابية', status: 'draft', date: '4 أيام' },
        { title: 'نشرة التقويم الدراسي', status: 'completed', date: 'الأسبوع الماضي' }
      ],
      stats: [
        { value: '6', label: 'نشرة هذا الشهر' },
        { value: '2', label: 'مسودات' }
      ],
      primaryAction: {
        label: 'إنشاء نشرة',
        icon: 'Plus',
        href: '/user-dashboard/create-bulletin'
      },
      secondaryAction: {
        label: 'النشرات السابقة',
        icon: 'Archive',
        href: '/user-dashboard/bulletins'
      }
    },
    {
      type: 'external-letters',
      title: 'الخطابات الخارجية',
      subtitle: 'المراسلات مع الجهات الخارجية',
      icon: 'Mail',
      progress: 90,
      description: 'إنشاء وإرسال الخطابات الرسمية للجهات الخارجية وأولياء الأمور',
      hasNotification: true,
      notificationCount: 1,
      recentActivity: [
        { title: 'خطاب لأولياء الأمور', status: 'completed', date: 'صباح اليوم' },
        { title: 'خطاب طلب صيانة', status: 'pending', date: 'أمس' },
        { title: 'خطاب شكر للمتطوعين', status: 'completed', date: 'منذ 3 أيام' }
      ],
      stats: [
        { value: '15', label: 'خطاب هذا الشهر' },
        { value: '3', label: 'في الانتظار' }
      ],
      primaryAction: {
        label: 'كتابة خطاب',
        icon: 'PenTool',
        href: '/user-dashboard/create-letter'
      },
      secondaryAction: {
        label: 'الخطابات المرسلة',
        icon: 'Send',
        href: '/user-dashboard/letters'
      }
    }
  ];

  // Mock recent documents
  const recentDocuments = [
    {
      title: 'الخطة التشغيلية للفصل الثاني 2024',
      type: 'plan',
      status: 'completed',
      lastModified: 'منذ ساعتين'
    },
    {
      title: 'تبليغ اجتماع أولياء الأمور',
      type: 'communication',
      status: 'draft',
      lastModified: 'أمس'
    },
    {
      title: 'نشرة الأنشطة الطلابية',
      type: 'bulletin',
      status: 'review',
      lastModified: 'منذ يومين'
    },
    {
      title: 'خطاب طلب صيانة المختبر',
      type: 'letter',
      status: 'pending',
      lastModified: '3 أيام'
    },
    {
      title: 'خطة تطوير المناهج',
      type: 'plan',
      status: 'draft',
      lastModified: 'الأسبوع الماضي'
    }
  ];

  // Mock upcoming deadlines
  const upcomingDeadlines = [
    {
      title: 'تسليم التقرير الشهري',
      description: 'تقرير أداء الطلاب والمعلمين',
      date: '2024-01-15',
      priority: 'high',
      type: 'report'
    },
    {
      title: 'اجتماع مجلس الإدارة',
      description: 'مناقشة الخطة التطويرية',
      date: '2024-01-18',
      priority: 'medium',
      type: 'meeting'
    },
    {
      title: 'تسليم الخطة التشغيلية',
      description: 'الخطة التشغيلية للفصل الثاني',
      date: '2024-01-20',
      priority: 'high',
      type: 'plan'
    },
    {
      title: 'رد على تبليغ إدارة التعليم',
      description: 'تبليغ بخصوص الأنشطة اللاصفية',
      date: '2024-01-22',
      priority: 'medium',
      type: 'submission'
    }
  ];

  // Mock system notifications
  const systemNotifications = [
    {
      title: 'تحديث جديد متوفر',
      message: 'إصدار جديد من النظام يتضمن تحسينات على واجهة المستخدم',
      type: 'update',
      timestamp: '2024-01-10T10:30:00Z',
      read: false
    },
    {
      title: 'تذكير: موعد تسليم التقرير',
      message: 'يرجى تسليم التقرير الشهري قبل نهاية الأسبوع',
      type: 'reminder',
      timestamp: '2024-01-10T09:15:00Z',
      read: false
    },
    {
      title: 'تم حفظ الخطة بنجاح',
      message: 'تم حفظ الخطة التشغيلية الجديدة في النظام',
      type: 'system',
      timestamp: '2024-01-09T16:45:00Z',
      read: true
    },
    {
      title: 'تحذير: مساحة التخزين',
      message: 'مساحة التخزين المتاحة أقل من 10%، يرجى حذف الملفات غير المستخدمة',
      type: 'warning',
      timestamp: '2024-01-09T14:20:00Z',
      read: false
    },
    {
      title: 'معلومات النظام',
      message: 'سيتم إجراء صيانة دورية للنظام يوم الجمعة من 12-2 ظهراً',
      type: 'info',
      timestamp: '2024-01-08T11:00:00Z',
      read: true
    }
  ];

  // Mock operational plan progress
  const planData = {
    completedSteps: 13,
    currentStep: 14,
    currentStepTitle: 'تحديد الموارد المطلوبة',
    currentStepDescription: 'تحديد الموارد البشرية والمالية والتقنية اللازمة لتنفيذ الخطة'
  };

  // Mock activity feed
  const activities = [
    {
      title: 'تم إنشاء خطة تشغيلية جديدة',
      description: 'تم إنشاء خطة تشغيلية للفصل الدراسي الثاني 2024',
      type: 'plan',
      timestamp: '2024-01-10T10:30:00Z',
      metadata: {
        user: 'أحمد محمد العلي',
        module: 'الخطط التشغيلية',
        status: 'success',
        statusText: 'مكتمل'
      }
    },
    {
      title: 'تم استلام تبليغ إداري جديد',
      description: 'تبليغ من إدارة التعليم بخصوص الأنشطة اللاصفية',
      type: 'communication',
      timestamp: '2024-01-10T09:15:00Z',
      metadata: {
        module: 'التبليغات الإدارية',
        status: 'warning',
        statusText: 'يتطلب رد'
      }
    },
    {
      title: 'تم نشر نشرة داخلية',
      description: 'نشرة بخصوص اجتماع المعلمين الأسبوعي',
      type: 'bulletin',
      timestamp: '2024-01-09T16:45:00Z',
      metadata: {
        user: 'أحمد محمد العلي',
        module: 'النشرات الداخلية',
        status: 'success',
        statusText: 'تم النشر'
      }
    },
    {
      title: 'تم إرسال خطاب خارجي',
      description: 'خطاب لأولياء الأمور بخصوص الأنشطة الطلابية',
      type: 'letter',
      timestamp: '2024-01-09T14:20:00Z',
      metadata: {
        user: 'أحمد محمد العلي',
        module: 'الخطابات الخارجية',
        status: 'success',
        statusText: 'تم الإرسال'
      }
    },
    {
      title: 'تحديث معلومات المستخدم',
      description: 'تم تحديث معلومات الملف الشخصي',
      type: 'user',
      timestamp: '2024-01-08T11:00:00Z',
      metadata: {
        user: 'أحمد محمد العلي',
        status: 'success',
        statusText: 'محدث'
      }
    },
    {
      title: 'تم تحديث النظام',
      description: 'تم تطبيق التحديث الأمني الجديد على النظام',
      type: 'system',
      timestamp: '2024-01-08T08:30:00Z',
      metadata: {
        status: 'success',
        statusText: 'مكتمل'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <UserNavigation />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header */}
          <WelcomeHeader userInfo={userInfo} stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-8">
              {/* Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {modules.map((module, index) => (
                  <ModuleCard key={index} module={module} />
                ))}
              </div>

              {/* Operational Plan Progress */}
              <OperationalPlanProgress planData={planData} />

              {/* Activity Feed */}
              <ActivityFeed activities={activities} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Recent Documents */}
              <RecentDocuments documents={recentDocuments} />

              {/* Upcoming Deadlines */}
              <UpcomingDeadlines deadlines={upcomingDeadlines} />

              {/* System Notifications */}
              <SystemNotifications notifications={systemNotifications} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;