import React, { useState } from 'react';

import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const UserManagementTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    {
      id: 1,
      managerName: "أحمد محمد الأحمد",
      schoolName: "مدرسة الأمل الابتدائية",
      level: "ابتدائية",
      email: "ahmed.ahmad@school.edu.sa",
      registrationDate: "2024-01-15",
      lastActivity: "2024-01-20",
      status: "نشط",
      plansCount: 3,
      lettersCount: 15
    },
    {
      id: 2,
      managerName: "فاطمة علي السالم",
      schoolName: "متوسطة النور للبنات",
      level: "متوسطة",
      email: "fatima.salem@school.edu.sa",
      registrationDate: "2024-01-10",
      lastActivity: "2024-01-19",
      status: "نشط",
      plansCount: 2,
      lettersCount: 8
    },
    {
      id: 3,
      managerName: "محمد عبدالله الخالد",
      schoolName: "ثانوية الفيصل",
      level: "ثانوية",
      email: "mohammed.khalid@school.edu.sa",
      registrationDate: "2024-01-05",
      lastActivity: "2024-01-18",
      status: "غير نشط",
      plansCount: 1,
      lettersCount: 5
    },
    {
      id: 4,
      managerName: "نورا سعد المطيري",
      schoolName: "ابتدائية الرياض النموذجية",
      level: "ابتدائية",
      email: "nora.mutairi@school.edu.sa",
      registrationDate: "2023-12-28",
      lastActivity: "2024-01-21",
      status: "نشط",
      plansCount: 4,
      lettersCount: 22
    },
    {
      id: 5,
      managerName: "خالد أحمد الزهراني",
      schoolName: "متوسطة الملك فهد",
      level: "متوسطة",
      email: "khalid.zahrani@school.edu.sa",
      registrationDate: "2023-12-20",
      lastActivity: "2024-01-17",
      status: "نشط",
      plansCount: 2,
      lettersCount: 12
    }
  ];

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(user => user.id));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.managerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || user.level === filterLevel;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const isActive = status === 'نشط';
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive 
          ? 'bg-success-100 text-success-800' :'bg-error-100 text-error-800'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ml-1.5 rtl:ml-0 rtl:mr-1.5 ${
          isActive ? 'bg-success-400' : 'bg-error-400'
        }`}></span>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-surface rounded-lg border border-slate-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">البحث</label>
            <Input
              type="search"
              placeholder="البحث في الأسماء أو المدارس..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">المرحلة التعليمية</label>
            <select 
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">جميع المراحل</option>
              <option value="ابتدائية">ابتدائية</option>
              <option value="متوسطة">متوسطة</option>
              <option value="ثانوية">ثانوية</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">حالة النشاط</label>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">جميع الحالات</option>
              <option value="نشط">نشط</option>
              <option value="غير نشط">غير نشط</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <Button variant="primary" iconName="Search" className="w-full">
              بحث
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary-800">
              تم تحديد {selectedUsers.length} مستخدم
            </span>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button variant="secondary" size="sm" iconName="Mail">
                إرسال رسالة
              </Button>
              <Button variant="warning" size="sm" iconName="UserX">
                إلغاء التفعيل
              </Button>
              <Button variant="danger" size="sm" iconName="Trash2">
                حذف
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-surface rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === users.length}
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  معلومات المستخدم
                </th>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  المدرسة
                </th>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  تاريخ التسجيل
                </th>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  آخر نشاط
                </th>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  الإحصائيات
                </th>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-text-primary">{user.managerName}</div>
                      <div className="text-sm text-text-secondary">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-text-primary">{user.schoolName}</div>
                      <div className="text-sm text-text-secondary">{user.level}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {user.registrationDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {user.lastActivity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-secondary">
                      <div>{user.plansCount} خطط</div>
                      <div>{user.lettersCount} خطاب</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button variant="ghost" size="sm" iconName="Eye">
                        عرض
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Edit">
                        تعديل
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Trash2" className="text-error-600 hover:text-error-700">
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

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-text-secondary">
          عرض {filteredUsers.length} من أصل {users.length} مستخدم
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button variant="ghost" size="sm" iconName="ChevronRight" disabled>
            السابق
          </Button>
          <Button variant="ghost" size="sm" className="bg-primary-100 text-primary-700">
            1
          </Button>
          <Button variant="ghost" size="sm">
            2
          </Button>
          <Button variant="ghost" size="sm">
            3
          </Button>
          <Button variant="ghost" size="sm" iconName="ChevronLeft">
            التالي
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTab;