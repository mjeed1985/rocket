import React, { useState, useEffect } from 'react';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Icon from 'components/AppIcon';
import userManagementService from '../../../services/userManagementService';

const UserManagementTab = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
    schoolLevel: 'all',
    isVerified: undefined
  });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [statistics, setStatistics] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // تحميل البيانات عند بداية التشغيل
  useEffect(() => {
    loadUsers();
    loadStatistics();
  }, []);

  // تطبيق الفلاتر والبحث
  useEffect(() => {
    const filtered = userManagementService.searchUsers(searchTerm, filters);
    setFilteredUsers(filtered);
  }, [users, searchTerm, filters]);

  const loadUsers = () => {
    try {
      const allUsers = userManagementService.getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      alert('حدث خطأ في تحميل بيانات المستخدمين');
    }
  };

  const loadStatistics = () => {
    try {
      const stats = userManagementService.getUserStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المستخدم؟ هذا الإجراء لا يمكن التراجع عنه.')) {
      return;
    }

    try {
      setIsLoading(true);
      await userManagementService.deleteUser(userId);
      loadUsers();
      loadStatistics();
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
      alert('تم حذف المستخدم بنجاح');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert(error.message || 'حدث خطأ في حذف المستخدم');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId) => {
    try {
      setIsLoading(true);
      await userManagementService.toggleUserStatus(userId);
      loadUsers();
      loadStatistics();
      alert('تم تغيير حالة المستخدم بنجاح');
    } catch (error) {
      console.error('Error toggling user status:', error);
      alert(error.message || 'حدث خطأ في تغيير حالة المستخدم');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowEditUserModal(true);
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length 
        ? [] 
        : filteredUsers.map(user => user.id)
    );
  };

  const handleBulkAction = async (action) => {
    if (selectedUsers.length === 0) {
      alert('يرجى اختيار مستخدم واحد على الأقل');
      return;
    }

    const confirmMessage = action === 'delete' 
      ? `هل أنت متأكد من حذف ${selectedUsers.length} مستخدم؟`
      : `هل أنت متأكد من ${action === 'activate' ? 'تفعيل' : 'إلغاء تفعيل'} ${selectedUsers.length} مستخدم؟`;

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      setIsLoading(true);
      
      for (const userId of selectedUsers) {
        if (action === 'delete') {
          await userManagementService.deleteUser(userId);
        } else if (action === 'activate' || action === 'deactivate') {
          const user = userManagementService.getUserById(userId);
          if (user && ((action === 'activate' && user.status === 'inactive') || 
                      (action === 'deactivate' && user.status === 'active'))) {
            await userManagementService.toggleUserStatus(userId);
          }
        }
      }

      loadUsers();
      loadStatistics();
      setSelectedUsers([]);
      alert(`تم ${action === 'delete' ? 'حذف' : action === 'activate' ? 'تفعيل' : 'إلغاء تفعيل'} المستخدمين بنجاح`);
    } catch (error) {
      console.error(`Error performing bulk ${action}:`, error);
      alert('حدث خطأ في تنفيذ العملية');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportUsers = () => {
    try {
      const csvContent = userManagementService.exportUsers('csv');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `users_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error exporting users:', error);
      alert('حدث خطأ في تصدير البيانات');
    }
  };

  const getStatusBadge = (status) => {
    const isActive = status === 'active';
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive 
          ? 'bg-success-100 text-success-800' 
          : 'bg-error-100 text-error-800'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ml-1.5 rtl:ml-0 rtl:mr-1.5 ${
          isActive ? 'bg-success-400' : 'bg-error-400'
        }`}></span>
        {isActive ? 'نشط' : 'غير نشط'}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const isAdmin = role === 'admin';
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isAdmin 
          ? 'bg-primary-100 text-primary-800' 
          : 'bg-secondary-100 text-secondary-800'
      }`}>
        <Icon 
          name={isAdmin ? 'Crown' : 'User'} 
          size={12} 
          className={`ml-1.5 rtl:ml-0 rtl:mr-1.5 ${
            isAdmin ? 'text-primary-600' : 'text-secondary-600'
          }`} 
        />
        {isAdmin ? 'مدير' : 'مستخدم'}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'غير محدد';
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatLastLogin = (dateString) => {
    if (!dateString) return 'لم يسجل دخول';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'منذ أقل من ساعة';
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;
    if (diffInHours < 168) return `منذ ${Math.floor(diffInHours / 24)} يوم`;
    return formatDate(dateString);
  };

  return (
    <div className="space-y-6">
      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">إجمالي المستخدمين</p>
              <p className="text-2xl font-bold text-text-primary">{statistics.total || 0}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 text-primary-600">
              <Icon name="Users" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-surface rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">مستخدمون نشطون</p>
              <p className="text-2xl font-bold text-success-600">{statistics.active || 0}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success-50 text-success-600">
              <Icon name="UserCheck" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-surface rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">مديرو النظام</p>
              <p className="text-2xl font-bold text-primary-600">{statistics.admins || 0}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 text-primary-600">
              <Icon name="Crown" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-surface rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">تسجيلات جديدة</p>
              <p className="text-2xl font-bold text-accent-600">{statistics.recentRegistrations || 0}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-50 text-accent-600">
              <Icon name="UserPlus" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* أدوات البحث والفلترة */}
      <div className="bg-surface rounded-lg border border-slate-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">البحث</label>
            <div className="relative">
              <Input
                type="search"
                placeholder="البحث في الأسماء أو البريد..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rtl:pl-4 rtl:pr-10"
              />
              <div className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2">
                <Icon name="Search" size={16} className="text-text-muted" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">الدور</label>
            <select 
              value={filters.role}
              onChange={(e) => setFilters({...filters, role: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">جميع الأدوار</option>
              <option value="admin">مدير</option>
              <option value="user">مستخدم</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">الحالة</label>
            <select 
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">المرحلة</label>
            <select 
              value={filters.schoolLevel}
              onChange={(e) => setFilters({...filters, schoolLevel: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">جميع المراحل</option>
              <option value="ابتدائية">ابتدائية</option>
              <option value="متوسطة">متوسطة</option>
              <option value="ثانوية">ثانوية</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <Button 
              variant="primary" 
              iconName="Plus"
              onClick={() => setShowAddUserModal(true)}
              className="w-full"
            >
              إضافة مستخدم
            </Button>
          </div>
        </div>
      </div>

      {/* إجراءات مجمعة */}
      {selectedUsers.length > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary-800">
              تم تحديد {selectedUsers.length} مستخدم
            </span>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button 
                variant="secondary" 
                size="sm" 
                iconName="Mail"
                onClick={() => alert('ميزة إرسال الرسائل قيد التطوير')}
              >
                إرسال رسالة
              </Button>
              <Button 
                variant="warning" 
                size="sm" 
                iconName="UserX"
                onClick={() => handleBulkAction('deactivate')}
                disabled={isLoading}
              >
                إلغاء التفعيل
              </Button>
              <Button 
                variant="success" 
                size="sm" 
                iconName="UserCheck"
                onClick={() => handleBulkAction('activate')}
                disabled={isLoading}
              >
                تفعيل
              </Button>
              <Button 
                variant="danger" 
                size="sm" 
                iconName="Trash2"
                onClick={() => handleBulkAction('delete')}
                disabled={isLoading}
              >
                حذف
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* أدوات إضافية */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Button 
            variant="secondary" 
            size="sm" 
            iconName="Download"
            onClick={handleExportUsers}
          >
            تصدير البيانات
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            iconName="RefreshCw"
            onClick={() => {
              loadUsers();
              loadStatistics();
            }}
          >
            تحديث
          </Button>
        </div>
        
        <div className="text-sm text-text-secondary">
          عرض {filteredUsers.length} من أصل {users.length} مستخدم
        </div>
      </div>

      {/* جدول المستخدمين */}
      <div className="bg-surface rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
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
                  الدور
                </th>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  تاريخ التسجيل
                </th>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  آخر دخول
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
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <Icon name="User" size={20} className="text-primary-600" />
                        </div>
                      </div>
                      <div className="mr-4 rtl:mr-0 rtl:ml-4">
                        <div className="text-sm font-medium text-text-primary">{user.name}</div>
                        <div className="text-sm text-text-secondary">{user.email}</div>
                        {user.phoneNumber && (
                          <div className="text-xs text-text-muted">{user.phoneNumber}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-text-primary">
                        {user.schoolName || 'غير محدد'}
                      </div>
                      {user.schoolLevel && (
                        <div className="text-sm text-text-secondary">{user.schoolLevel}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {formatDate(user.registrationDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-secondary">
                      {formatLastLogin(user.lastLogin)}
                    </div>
                    {user.loginCount > 0 && (
                      <div className="text-xs text-text-muted">
                        {user.loginCount} مرة دخول
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        iconName="Eye"
                        onClick={() => alert(`عرض تفاصيل ${user.name}`)}
                      >
                        عرض
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        iconName="Edit"
                        onClick={() => handleEditUser(user)}
                      >
                        تعديل
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        iconName={user.status === 'active' ? 'UserX' : 'UserCheck'}
                        onClick={() => handleToggleUserStatus(user.id)}
                        disabled={isLoading}
                        className={user.status === 'active' ? 'text-warning-600 hover:text-warning-700' : 'text-success-600 hover:text-success-700'}
                      >
                        {user.status === 'active' ? 'إلغاء تفعيل' : 'تفعيل'}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        iconName="Trash2" 
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={isLoading || user.email === 'daxxxer@gmail.com'}
                        className="text-error-600 hover:text-error-700"
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
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="mx-auto text-text-muted mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">لا توجد مستخدمين</h3>
            <p className="text-text-secondary">
              {searchTerm || Object.values(filters).some(f => f !== 'all' && f !== undefined)
                ? 'لا توجد نتائج تطابق معايير البحث'
                : 'ابدأ بإضافة مستخدمين جدد للنظام'
              }
            </p>
          </div>
        )}
      </div>

      {/* نماذج الإضافة والتعديل */}
      {showAddUserModal && (
        <AddUserModal 
          onClose={() => setShowAddUserModal(false)}
          onUserAdded={() => {
            loadUsers();
            loadStatistics();
            setShowAddUserModal(false);
          }}
        />
      )}

      {showEditUserModal && editingUser && (
        <EditUserModal 
          user={editingUser}
          onClose={() => {
            setShowEditUserModal(false);
            setEditingUser(null);
          }}
          onUserUpdated={() => {
            loadUsers();
            loadStatistics();
            setShowEditUserModal(false);
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
};

// نموذج إضافة مستخدم جديد
const AddUserModal = ({ onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    schoolName: '',
    schoolLevel: '',
    phoneNumber: '',
    isVerified: false,
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من صحة البيانات
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!formData.email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      await userManagementService.addUser(formData);
      alert('تم إضافة المستخدم بنجاح');
      onUserAdded();
    } catch (error) {
      console.error('Error adding user:', error);
      alert(error.message || 'حدث خطأ في إضافة المستخدم');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">إضافة مستخدم جديد</h3>
            <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                الاسم الكامل <span className="text-error-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={errors.name ? 'border-error-300' : ''}
                placeholder="أدخل الاسم الكامل"
              />
              {errors.name && <p className="text-xs text-error-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                البريد الإلكتروني <span className="text-error-500">*</span>
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={errors.email ? 'border-error-300' : ''}
                placeholder="example@school.edu.sa"
              />
              {errors.email && <p className="text-xs text-error-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">الدور</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="user">مستخدم</option>
                <option value="admin">مدير</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">اسم المدرسة</label>
              <Input
                type="text"
                value={formData.schoolName}
                onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                placeholder="أدخل اسم المدرسة"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">المرحلة التعليمية</label>
              <select
                value={formData.schoolLevel}
                onChange={(e) => setFormData({...formData, schoolLevel: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">اختر المرحلة</option>
                <option value="ابتدائية">ابتدائية</option>
                <option value="متوسطة">متوسطة</option>
                <option value="ثانوية">ثانوية</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">رقم الهاتف</label>
              <Input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                placeholder="+966501234567"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isVerified"
                checked={formData.isVerified}
                onChange={(e) => setFormData({...formData, isVerified: e.target.checked})}
                className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="isVerified" className="mr-2 rtl:mr-0 rtl:ml-2 text-sm text-text-secondary">
                حساب مفعل
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">ملاحظات</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="ملاحظات إضافية..."
              />
            </div>

            <div className="flex items-center justify-end space-x-3 rtl:space-x-reverse pt-4">
              <Button variant="ghost" onClick={onClose} disabled={isLoading}>
                إلغاء
              </Button>
              <Button 
                type="submit" 
                variant="primary" 
                loading={isLoading}
                iconName="UserPlus"
              >
                إضافة المستخدم
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// نموذج تعديل المستخدم
const EditUserModal = ({ user, onClose, onUserUpdated }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    role: user.role || 'user',
    schoolName: user.schoolName || '',
    schoolLevel: user.schoolLevel || '',
    phoneNumber: user.phoneNumber || '',
    isVerified: user.isVerified || false,
    notes: user.notes || ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من صحة البيانات
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!formData.email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      await userManagementService.updateUser(user.id, formData);
      alert('تم تحديث بيانات المستخدم بنجاح');
      onUserUpdated();
    } catch (error) {
      console.error('Error updating user:', error);
      alert(error.message || 'حدث خطأ في تحديث بيانات المستخدم');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">تعديل بيانات المستخدم</h3>
            <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                الاسم الكامل <span className="text-error-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={errors.name ? 'border-error-300' : ''}
                placeholder="أدخل الاسم الكامل"
              />
              {errors.name && <p className="text-xs text-error-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                البريد الإلكتروني <span className="text-error-500">*</span>
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={errors.email ? 'border-error-300' : ''}
                placeholder="example@school.edu.sa"
              />
              {errors.email && <p className="text-xs text-error-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">الدور</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={user.email === 'daxxxer@gmail.com'}
              >
                <option value="user">مستخدم</option>
                <option value="admin">مدير</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">اسم المدرسة</label>
              <Input
                type="text"
                value={formData.schoolName}
                onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                placeholder="أدخل اسم المدرسة"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">المرحلة التعليمية</label>
              <select
                value={formData.schoolLevel}
                onChange={(e) => setFormData({...formData, schoolLevel: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">اختر المرحلة</option>
                <option value="ابتدائية">ابتدائية</option>
                <option value="متوسطة">متوسطة</option>
                <option value="ثانوية">ثانوية</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">رقم الهاتف</label>
              <Input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                placeholder="+966501234567"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isVerified"
                checked={formData.isVerified}
                onChange={(e) => setFormData({...formData, isVerified: e.target.checked})}
                className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="isVerified" className="mr-2 rtl:mr-0 rtl:ml-2 text-sm text-text-secondary">
                حساب مفعل
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">ملاحظات</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="ملاحظات إضافية..."
              />
            </div>

            <div className="flex items-center justify-end space-x-3 rtl:space-x-reverse pt-4">
              <Button variant="ghost" onClick={onClose} disabled={isLoading}>
                إلغاء
              </Button>
              <Button 
                type="submit" 
                variant="primary" 
                loading={isLoading}
                iconName="Save"
              >
                حفظ التغييرات
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTab;