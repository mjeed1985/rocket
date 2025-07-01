import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavigation from 'components/ui/UserNavigation';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const AdministrativeNotifications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('notifications');

  const notificationTypes = [
    {
      id: 'notifications',
      name: 'التبليغات الإدارية',
      description: 'إنشاء وإدارة التبليغات الإدارية للمعلمين والإداريين',
      icon: 'MessageSquare',
      color: 'primary'
    },
    {
      id: 'bulletins',
      name: 'النشرات الداخلية',
      description: 'إنشاء ونشر النشرات الداخلية للمدرسة',
      icon: 'Newspaper',
      color: 'secondary'
    },
    {
      id: 'external-letters',
      name: 'الخطابات الخارجية',
      description: 'إنشاء وإدارة الخطابات الرسمية للجهات الخارجية',
      icon: 'Mail',
      color: 'accent'
    }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleCreateNew = (type) => {
    navigate(`/administrative-notifications/${type}/create`);
  };

  const handleViewSaved = (type) => {
    navigate(`/administrative-notifications/${type}/saved`);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <UserNavigation />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl p-6 text-white shadow-card-2 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                  التبليغات والمراسلات الإدارية
                </h1>
                <p className="text-primary-100 text-lg">
                  إنشاء وإدارة التبليغات والنشرات والخطابات الرسمية
                </p>
              </div>
              
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon name="FileText" size={24} className="text-white" />
                  </div>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-primary-100 text-sm">تبليغ وخطاب</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4">
              {notificationTypes.map((type) => (
                <div
                  key={type.id}
                  className={`flex-1 min-w-[250px] cursor-pointer transition-all duration-300 ${
                    activeTab === type.id ? 'transform -translate-y-2' : ''
                  }`}
                  onClick={() => handleTabChange(type.id)}
                >
                  <div className={`bg-white rounded-xl border-2 p-6 h-full shadow-card-1 hover:shadow-card-2 transition-all duration-300 ${
                    activeTab === type.id ? `border-${type.color}-400` : 'border-transparent'
                  }`}>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-${type.color}-100`}>
                        <Icon name={type.icon} size={24} className={`text-${type.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-text-primary">{type.name}</h3>
                        <p className="text-sm text-text-secondary">{type.description}</p>
                      </div>
                    </div>
                    
                    <div className={`mt-4 pt-4 border-t border-slate-100 ${
                      activeTab === type.id ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
                    } transition-all duration-300`}>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          iconName="Plus"
                          iconPosition="left"
                          onClick={() => handleCreateNew(type.id)}
                          className="flex-1"
                        >
                          إنشاء جديد
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="List"
                          iconPosition="left"
                          onClick={() => handleViewSaved(type.id)}
                          className="flex-1"
                        >
                          عرض السابقة
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  البحث في التبليغات والخطابات
                </label>
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="ابحث بالعنوان أو المحتوى..."
                    className="pl-10 rtl:pl-4 rtl:pr-10"
                  />
                  <div className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2">
                    <Icon name="Search" size={16} className="text-text-muted" />
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-48">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  النوع
                </label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
                >
                  <option value="all">جميع الأنواع</option>
                  <option value="notifications">التبليغات الإدارية</option>
                  <option value="bulletins">النشرات الداخلية</option>
                  <option value="external-letters">الخطابات الخارجية</option>
                </select>
              </div>
              
              <div className="w-full md:w-48">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  التاريخ
                </label>
                <select
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
                >
                  <option value="all">جميع الفترات</option>
                  <option value="today">اليوم</option>
                  <option value="week">هذا الأسبوع</option>
                  <option value="month">هذا الشهر</option>
                  <option value="year">هذا العام</option>
                </select>
              </div>
              
              <div>
                <Button
                  variant="secondary"
                  size="md"
                  iconName="Filter"
                  iconPosition="left"
                >
                  تطبيق الفلتر
                </Button>
              </div>
            </div>
          </div>

          {/* Recent Items */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">آخر التبليغات والخطابات</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="RefreshCw"
                className="text-text-muted"
              >
                تحديث
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      العنوان
                    </th>
                    <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      النوع
                    </th>
                    <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      التاريخ
                    </th>
                    <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {[
                    {
                      id: 1,
                      title: 'تبليغ اجتماع المعلمين الأسبوعي',
                      type: 'notification',
                      date: '2024-06-28',
                      status: 'sent',
                      views: 15
                    },
                    {
                      id: 2,
                      title: 'نشرة الأنشطة الطلابية للفصل الدراسي الثاني',
                      type: 'bulletin',
                      date: '2024-06-25',
                      status: 'sent',
                      views: 22
                    },
                    {
                      id: 3,
                      title: 'خطاب طلب صيانة المختبرات',
                      type: 'external-letter',
                      date: '2024-06-20',
                      status: 'draft',
                      views: 0
                    },
                    {
                      id: 4,
                      title: 'تبليغ بشأن الاختبارات النهائية',
                      type: 'notification',
                      date: '2024-06-18',
                      status: 'sent',
                      views: 18
                    },
                    {
                      id: 5,
                      title: 'خطاب شكر لأولياء الأمور المتعاونين',
                      type: 'external-letter',
                      date: '2024-06-15',
                      status: 'sent',
                      views: 0
                    }
                  ].map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-text-primary">{item.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.type === 'notification' ? 'bg-primary-100 text-primary-800' :
                          item.type === 'bulletin' ? 'bg-secondary-100 text-secondary-800' :
                          'bg-accent-100 text-accent-800'
                        }`}>
                          {item.type === 'notification' ? 'تبليغ إداري' :
                           item.type === 'bulletin' ? 'نشرة داخلية' :
                           'خطاب خارجي'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-text-secondary">
                          {new Date(item.date).toLocaleDateString('ar-SA')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === 'sent' ? 'bg-success-100 text-success-800' :
                          item.status === 'draft' ? 'bg-warning-100 text-warning-800' :
                          'bg-error-100 text-error-800'
                        }`}>
                          {item.status === 'sent' ? 'تم الإرسال' :
                           item.status === 'draft' ? 'مسودة' :
                           'ملغي'}
                        </span>
                        {item.type !== 'external-letter' && item.status === 'sent' && (
                          <div className="text-xs text-text-muted mt-1">
                            {item.views} مشاهدة
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="Eye"
                            className="text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                          >
                            عرض
                          </Button>
                          {item.type !== 'external-letter' && item.status === 'sent' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="Users"
                              className="text-secondary-600 hover:text-secondary-700 hover:bg-secondary-50"
                            >
                              المطلعون
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="Trash2"
                            className="text-error-600 hover:text-error-700 hover:bg-error-50"
                          >
                            حذف
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdministrativeNotifications;