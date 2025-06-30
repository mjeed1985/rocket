import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const AnalyticsTab = () => {
  const [dateRange, setDateRange] = useState('30days');

  const userGrowthData = [
    { month: 'يناير', users: 45, schools: 12 },
    { month: 'فبراير', users: 78, schools: 18 },
    { month: 'مارس', users: 92, schools: 25 },
    { month: 'أبريل', users: 134, schools: 32 },
    { month: 'مايو', users: 167, schools: 41 },
    { month: 'يونيو', users: 198, schools: 48 }
  ];

  const featureUsageData = [
    { feature: 'الخطط التشغيلية', usage: 85, color: '#3B82F6' },
    { feature: 'التبليغات الإدارية', usage: 72, color: '#10B981' },
    { feature: 'النشرات الداخلية', usage: 68, color: '#F59E0B' },
    { feature: 'الخطابات الخارجية', usage: 91, color: '#8B5CF6' }
  ];

  const schoolLevelData = [
    { name: 'ابتدائية', value: 45, color: '#3B82F6' },
    { name: 'متوسطة', value: 32, color: '#10B981' },
    { name: 'ثانوية', value: 23, color: '#F59E0B' }
  ];

  const activityData = [
    { time: '00:00', activity: 12 },
    { time: '04:00', activity: 8 },
    { time: '08:00', activity: 45 },
    { time: '12:00', activity: 78 },
    { time: '16:00', activity: 65 },
    { time: '20:00', activity: 34 }
  ];

  const topSchools = [
    { name: "مدرسة الأمل الابتدائية", plans: 15, letters: 89, manager: "أحمد محمد" },
    { name: "ثانوية الفيصل", plans: 12, letters: 76, manager: "محمد الخالد" },
    { name: "متوسطة النور للبنات", plans: 10, letters: 65, manager: "فاطمة السالم" },
    { name: "ابتدائية الرياض النموذجية", plans: 9, letters: 54, manager: "نورا المطيري" },
    { name: "متوسطة الملك فهد", plans: 8, letters: 43, manager: "خالد الزهراني" }
  ];

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">التحليلات والإحصائيات</h3>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="7days">آخر 7 أيام</option>
            <option value="30days">آخر 30 يوم</option>
            <option value="90days">آخر 3 أشهر</option>
            <option value="1year">آخر سنة</option>
          </select>
          <Button variant="secondary" size="sm" iconName="Download">
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-surface rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-text-primary">نمو المستخدمين</h4>
            <Icon name="TrendingUp" size={20} className="text-success-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  name="المستخدمين"
                />
                <Line 
                  type="monotone" 
                  dataKey="schools" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  name="المدارس"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Usage Chart */}
        <div className="bg-surface rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-text-primary">استخدام الميزات</h4>
            <Icon name="BarChart3" size={20} className="text-primary-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureUsageData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" stroke="#64748B" fontSize={12} />
                <YAxis dataKey="feature" type="category" stroke="#64748B" fontSize={12} width={120} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="usage" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* School Level Distribution */}
        <div className="bg-surface rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-text-primary">توزيع المراحل التعليمية</h4>
            <Icon name="PieChart" size={20} className="text-secondary-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={schoolLevelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {schoolLevelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 rtl:space-x-reverse mt-4">
            {schoolLevelData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full ml-2 rtl:ml-0 rtl:mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-text-secondary">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-surface rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-text-primary">النشاط اليومي</h4>
            <Icon name="Clock" size={20} className="text-accent-600" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="time" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="activity" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Performing Schools */}
      <div className="bg-surface rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-medium text-text-primary">أفضل المدارس أداءً</h4>
          <Icon name="Award" size={20} className="text-accent-600" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-right rtl:text-left py-3 text-sm font-medium text-text-secondary">الترتيب</th>
                <th className="text-right rtl:text-left py-3 text-sm font-medium text-text-secondary">المدرسة</th>
                <th className="text-right rtl:text-left py-3 text-sm font-medium text-text-secondary">المدير</th>
                <th className="text-right rtl:text-left py-3 text-sm font-medium text-text-secondary">الخطط</th>
                <th className="text-right rtl:text-left py-3 text-sm font-medium text-text-secondary">الخطابات</th>
                <th className="text-right rtl:text-left py-3 text-sm font-medium text-text-secondary">النشاط</th>
              </tr>
            </thead>
            <tbody>
              {topSchools.map((school, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4">
                    <div className="flex items-center">
                      <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        index === 0 ? 'bg-accent-100 text-accent-800' :
                        index === 1 ? 'bg-slate-100 text-slate-600' :
                        index === 2 ? 'bg-warning-100 text-warning-800': 'bg-slate-50 text-slate-500'
                      }`}>
                        {index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="text-sm font-medium text-text-primary">{school.name}</div>
                  </td>
                  <td className="py-4">
                    <div className="text-sm text-text-secondary">{school.manager}</div>
                  </td>
                  <td className="py-4">
                    <div className="text-sm font-medium text-primary-600">{school.plans}</div>
                  </td>
                  <td className="py-4">
                    <div className="text-sm font-medium text-success-600">{school.letters}</div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-slate-200 rounded-full h-2 ml-2 rtl:ml-0 rtl:mr-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${Math.min((school.plans + school.letters) / 2, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-text-muted">عالي</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;