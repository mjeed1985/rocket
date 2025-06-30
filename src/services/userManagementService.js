// خدمة إدارة المستخدمين
class UserManagementService {
  constructor() {
    this.storageKey = 'schoolplan_users';
    this.currentUserKey = 'schoolplan_current_user';
    this.initializeDefaultUsers();
  }

  // تهيئة المستخدمين الافتراضيين
  initializeDefaultUsers() {
    const existingUsers = this.getAllUsers();
    
    if (existingUsers.length === 0) {
      const defaultUsers = [
        {
          id: 'admin-001',
          name: 'مدير النظام الرئيسي',
          email: 'daxxxer@gmail.com',
          role: 'admin',
          status: 'active',
          schoolName: null,
          schoolLevel: null,
          phoneNumber: '+966501234567',
          registrationDate: '2024-01-01',
          lastLogin: new Date().toISOString(),
          loginCount: 15,
          isVerified: true,
          permissions: ['all'],
          avatar: null,
          notes: 'مدير النظام الرئيسي - صلاحيات كاملة'
        },
        {
          id: 'user-001',
          name: 'أحمد محمد الأحمد',
          email: 'ahmed@school.com',
          role: 'user',
          status: 'active',
          schoolName: 'مدرسة الأمل الابتدائية',
          schoolLevel: 'ابتدائية',
          phoneNumber: '+966501234568',
          registrationDate: '2024-01-15',
          lastLogin: '2024-01-20T10:30:00Z',
          loginCount: 8,
          isVerified: true,
          permissions: ['plans', 'communications', 'reports'],
          avatar: null,
          notes: 'مدير مدرسة نشط ومتفاعل'
        },
        {
          id: 'user-002',
          name: 'فاطمة علي السالم',
          email: 'fatima@school.com',
          role: 'user',
          status: 'active',
          schoolName: 'متوسطة النور للبنات',
          schoolLevel: 'متوسطة',
          phoneNumber: '+966501234569',
          registrationDate: '2024-01-10',
          lastLogin: '2024-01-19T14:15:00Z',
          loginCount: 12,
          isVerified: true,
          permissions: ['plans', 'communications'],
          avatar: null,
          notes: 'مديرة متميزة في استخدام النظام'
        },
        {
          id: 'user-003',
          name: 'محمد عبدالله الخالد',
          email: 'mohammed@school.com',
          role: 'user',
          status: 'inactive',
          schoolName: 'ثانوية الفيصل',
          schoolLevel: 'ثانوية',
          phoneNumber: '+966501234570',
          registrationDate: '2024-01-05',
          lastLogin: '2024-01-18T09:45:00Z',
          loginCount: 3,
          isVerified: false,
          permissions: ['plans'],
          avatar: null,
          notes: 'مستخدم جديد - يحتاج متابعة'
        }
      ];
      
      localStorage.setItem(this.storageKey, JSON.stringify(defaultUsers));
    }
  }

  // الحصول على جميع المستخدمين
  getAllUsers() {
    try {
      const users = localStorage.getItem(this.storageKey);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error loading users:', error);
      return [];
    }
  }

  // الحصول على مستخدم بواسطة ID
  getUserById(id) {
    const users = this.getAllUsers();
    return users.find(user => user.id === id);
  }

  // الحصول على مستخدم بواسطة البريد الإلكتروني
  getUserByEmail(email) {
    const users = this.getAllUsers();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
  }

  // إضافة مستخدم جديد
  addUser(userData) {
    const users = this.getAllUsers();
    
    // التحقق من عدم وجود البريد الإلكتروني مسبقاً
    if (this.getUserByEmail(userData.email)) {
      throw new Error('البريد الإلكتروني مستخدم بالفعل');
    }

    const newUser = {
      id: this.generateUserId(),
      name: userData.name,
      email: userData.email,
      role: userData.role || 'user',
      status: userData.status || 'active',
      schoolName: userData.schoolName || null,
      schoolLevel: userData.schoolLevel || null,
      phoneNumber: userData.phoneNumber || null,
      registrationDate: new Date().toISOString().split('T')[0],
      lastLogin: null,
      loginCount: 0,
      isVerified: userData.isVerified || false,
      permissions: userData.permissions || ['plans'],
      avatar: userData.avatar || null,
      notes: userData.notes || '',
      createdBy: this.getCurrentUser()?.id || 'system',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    
    // تسجيل العملية في سجل الأنشطة
    this.logActivity('user_created', `تم إنشاء مستخدم جديد: ${newUser.name}`, newUser.id);
    
    return newUser;
  }

  // تحديث مستخدم
  updateUser(userId, updateData) {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      throw new Error('المستخدم غير موجود');
    }

    // التحقق من البريد الإلكتروني إذا تم تغييره
    if (updateData.email && updateData.email !== users[userIndex].email) {
      const existingUser = this.getUserByEmail(updateData.email);
      if (existingUser && existingUser.id !== userId) {
        throw new Error('البريد الإلكتروني مستخدم بالفعل');
      }
    }

    const oldUser = { ...users[userIndex] };
    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
      updatedBy: this.getCurrentUser()?.id || 'system'
    };

    localStorage.setItem(this.storageKey, JSON.stringify(users));
    
    // تسجيل العملية في سجل الأنشطة
    this.logActivity('user_updated', `تم تحديث بيانات المستخدم: ${users[userIndex].name}`, userId);
    
    return users[userIndex];
  }

  // حذف مستخدم
  deleteUser(userId) {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      throw new Error('المستخدم غير موجود');
    }

    const deletedUser = users[userIndex];
    
    // منع حذف المدير الرئيسي
    if (deletedUser.email === 'daxxxer@gmail.com') {
      throw new Error('لا يمكن حذف المدير الرئيسي للنظام');
    }

    users.splice(userIndex, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    
    // تسجيل العملية في سجل الأنشطة
    this.logActivity('user_deleted', `تم حذف المستخدم: ${deletedUser.name}`, userId);
    
    return deletedUser;
  }

  // تغيير حالة المستخدم
  toggleUserStatus(userId) {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      throw new Error('المستخدم غير موجود');
    }

    const newStatus = users[userIndex].status === 'active' ? 'inactive' : 'active';
    users[userIndex].status = newStatus;
    users[userIndex].updatedAt = new Date().toISOString();
    users[userIndex].updatedBy = this.getCurrentUser()?.id || 'system';

    localStorage.setItem(this.storageKey, JSON.stringify(users));
    
    // تسجيل العملية في سجل الأنشطة
    this.logActivity('user_status_changed', 
      `تم ${newStatus === 'active' ? 'تفعيل' : 'إلغاء تفعيل'} المستخدم: ${users[userIndex].name}`, 
      userId
    );
    
    return users[userIndex];
  }

  // البحث في المستخدمين
  searchUsers(query, filters = {}) {
    let users = this.getAllUsers();
    
    // البحث النصي
    if (query) {
      const searchTerm = query.toLowerCase();
      users = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        (user.schoolName && user.schoolName.toLowerCase().includes(searchTerm))
      );
    }

    // تطبيق الفلاتر
    if (filters.role && filters.role !== 'all') {
      users = users.filter(user => user.role === filters.role);
    }

    if (filters.status && filters.status !== 'all') {
      users = users.filter(user => user.status === filters.status);
    }

    if (filters.schoolLevel && filters.schoolLevel !== 'all') {
      users = users.filter(user => user.schoolLevel === filters.schoolLevel);
    }

    if (filters.isVerified !== undefined) {
      users = users.filter(user => user.isVerified === filters.isVerified);
    }

    return users;
  }

  // الحصول على إحصائيات المستخدمين
  getUserStatistics() {
    const users = this.getAllUsers();
    
    return {
      total: users.length,
      active: users.filter(u => u.status === 'active').length,
      inactive: users.filter(u => u.status === 'inactive').length,
      admins: users.filter(u => u.role === 'admin').length,
      regularUsers: users.filter(u => u.role === 'user').length,
      verified: users.filter(u => u.isVerified).length,
      unverified: users.filter(u => !u.isVerified).length,
      bySchoolLevel: {
        elementary: users.filter(u => u.schoolLevel === 'ابتدائية').length,
        middle: users.filter(u => u.schoolLevel === 'متوسطة').length,
        high: users.filter(u => u.schoolLevel === 'ثانوية').length
      },
      recentRegistrations: users.filter(u => {
        const regDate = new Date(u.registrationDate);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return regDate >= weekAgo;
      }).length
    };
  }

  // تسجيل دخول المستخدم
  loginUser(email, password) {
    const user = this.getUserByEmail(email);
    
    if (!user) {
      throw new Error('البريد الإلكتروني غير مسجل');
    }

    if (user.status === 'inactive') {
      throw new Error('الحساب غير مفعل. يرجى التواصل مع الإدارة');
    }

    // في التطبيق الحقيقي، يجب التحقق من كلمة المرور المشفرة
    // هنا نستخدم كلمة مرور افتراضية للتجربة
    if (password !== '123456') {
      throw new Error('كلمة المرور غير صحيحة');
    }

    // تحديث معلومات تسجيل الدخول
    this.updateUser(user.id, {
      lastLogin: new Date().toISOString(),
      loginCount: (user.loginCount || 0) + 1
    });

    // حفظ المستخدم الحالي
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');

    // تسجيل العملية في سجل الأنشطة
    this.logActivity('user_login', `تسجيل دخول المستخدم: ${user.name}`, user.id);

    return user;
  }

  // تسجيل خروج المستخدم
  logoutUser() {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      this.logActivity('user_logout', `تسجيل خروج المستخدم: ${currentUser.name}`, currentUser.id);
    }

    localStorage.removeItem(this.currentUserKey);
    localStorage.removeItem('isAuthenticated');
  }

  // الحصول على المستخدم الحالي
  getCurrentUser() {
    try {
      const user = localStorage.getItem(this.currentUserKey);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // توليد ID فريد للمستخدم
  generateUserId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `user-${timestamp}-${random}`;
  }

  // تسجيل الأنشطة
  logActivity(action, description, userId = null) {
    try {
      const activities = JSON.parse(localStorage.getItem('schoolplan_activities') || '[]');
      const activity = {
        id: Date.now(),
        action,
        description,
        userId,
        performedBy: this.getCurrentUser()?.id || 'system',
        timestamp: new Date().toISOString(),
        ip: 'localhost', // في التطبيق الحقيقي، احصل على IP الحقيقي
        userAgent: navigator.userAgent
      };

      activities.unshift(activity);
      
      // الاحتفاظ بآخر 1000 نشاط فقط
      if (activities.length > 1000) {
        activities.splice(1000);
      }

      localStorage.setItem('schoolplan_activities', JSON.stringify(activities));
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }

  // الحصول على سجل الأنشطة
  getActivities(limit = 50) {
    try {
      const activities = JSON.parse(localStorage.getItem('schoolplan_activities') || '[]');
      return activities.slice(0, limit);
    } catch (error) {
      console.error('Error getting activities:', error);
      return [];
    }
  }

  // تصدير بيانات المستخدمين
  exportUsers(format = 'json') {
    const users = this.getAllUsers();
    
    if (format === 'csv') {
      const headers = ['الاسم', 'البريد الإلكتروني', 'الدور', 'الحالة', 'المدرسة', 'المرحلة', 'تاريخ التسجيل', 'آخر دخول'];
      const csvContent = [
        headers.join(','),
        ...users.map(user => [
          user.name,
          user.email,
          user.role === 'admin' ? 'مدير' : 'مستخدم',
          user.status === 'active' ? 'نشط' : 'غير نشط',
          user.schoolName || '',
          user.schoolLevel || '',
          user.registrationDate,
          user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('ar-SA') : 'لم يسجل دخول'
        ].join(','))
      ].join('\n');
      
      return csvContent;
    }
    
    return JSON.stringify(users, null, 2);
  }

  // إرسال دعوة للمستخدم
  sendInvitation(email, role = 'user', schoolData = {}) {
    // في التطبيق الحقيقي، سيتم إرسال بريد إلكتروني
    const invitation = {
      id: Date.now(),
      email,
      role,
      schoolData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      createdBy: this.getCurrentUser()?.id || 'system',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // ينتهي خلال أسبوع
    };

    const invitations = JSON.parse(localStorage.getItem('schoolplan_invitations') || '[]');
    invitations.push(invitation);
    localStorage.setItem('schoolplan_invitations', JSON.stringify(invitations));

    this.logActivity('invitation_sent', `تم إرسال دعوة إلى: ${email}`, null);

    return invitation;
  }

  // الحصول على الدعوات المرسلة
  getInvitations() {
    try {
      return JSON.parse(localStorage.getItem('schoolplan_invitations') || '[]');
    } catch (error) {
      console.error('Error getting invitations:', error);
      return [];
    }
  }
}

// إنشاء مثيل واحد من الخدمة
const userManagementService = new UserManagementService();

export default userManagementService;