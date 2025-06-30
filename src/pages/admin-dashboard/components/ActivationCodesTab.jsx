import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import activationCodeService from '../../../services/activationCodeService';

const ActivationCodesTab = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activationCodes, setActivationCodes] = useState([]);
  const [codeStats, setCodeStats] = useState({ total: 0, active: 0, used: 0, expired: 0 });
  const [isCreating, setIsCreating] = useState(false);
  const [newCodeData, setNewCodeData] = useState({
    quantity: 1,
    expiryDays: 30,
    schoolLevel: 'all',
    description: ''
  });

  // Load codes and statistics on component mount
  useEffect(() => {
    loadCodesAndStats();
  }, []);

  const loadCodesAndStats = () => {
    const codes = activationCodeService.getAllCodes();
    const stats = activationCodeService.getCodeStatistics();
    setActivationCodes(codes);
    setCodeStats(stats);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'نشط': { bg: 'bg-success-100', text: 'text-success-800', dot: 'bg-success-400' },
      'مستخدم': { bg: 'bg-primary-100', text: 'text-primary-800', dot: 'bg-primary-400' },
      'منتهي الصلاحية': { bg: 'bg-error-100', text: 'text-error-800', dot: 'bg-error-400' }
    };
    
    const config = statusConfig[status] || statusConfig['نشط'];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ml-1.5 rtl:ml-0 rtl:mr-1.5 ${config.dot}`}></span>
        {status}
      </span>
    );
  };

  const handleCreateCodes = async () => {
    if (newCodeData.quantity < 1 || newCodeData.quantity > 100) {
      alert('عدد الأكواد يجب أن يكون بين 1 و 100');
      return;
    }

    setIsCreating(true);
    
    try {
      const createdCodes = activationCodeService.createCodes({
        quantity: parseInt(newCodeData.quantity),
        expiryDays: parseInt(newCodeData.expiryDays),
        schoolLevel: newCodeData.schoolLevel,
        description: newCodeData.description
      });

      // Refresh the codes list and statistics
      loadCodesAndStats();
      
      // Reset form and close modal
      setNewCodeData({
        quantity: 1,
        expiryDays: 30,
        schoolLevel: 'all',
        description: ''
      });
      setShowCreateForm(false);

      // Show success message
      alert(`تم إنشاء ${createdCodes.length} كود تفعيل بنجاح!`);
      
    } catch (error) {
      console.error('Error creating activation codes:', error);
      alert('حدث خطأ أثناء إنشاء أكواد التفعيل. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteCode = (codeId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الكود؟')) {
      activationCodeService.deleteCode(codeId);
      loadCodesAndStats();
    }
  };

  const handleExportCodes = () => {
    try {
      const csvContent = activationCodeService.exportCodes();
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `activation_codes_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error exporting codes:', error);
      alert('حدث خطأ أثناء تصدير الأكواد');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log('Code copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy code:', err);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">أكواد التفعيل</h3>
          <p className="text-sm text-text-secondary">إدارة أكواد التفعيل للمستخدمين الجدد</p>
        </div>
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Button 
            variant="secondary" 
            size="sm" 
            iconName="Download"
            onClick={handleExportCodes}
          >
            تصدير الأكواد
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            iconName="Plus"
            onClick={() => setShowCreateForm(true)}
          >
            إنشاء أكواد جديدة
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">إجمالي الأكواد</p>
              <p className="text-2xl font-bold text-text-primary">{codeStats.total}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 text-primary-600">
              <Icon name="Key" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-surface rounded-lg border border-slate-200 p-4 cursor-pointer hover:bg-slate-50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">أكواد نشطة</p>
              <p className="text-2xl font-bold text-success-600">{codeStats.active}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success-50 text-success-600">
              <Icon name="CheckCircle" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-surface rounded-lg border border-slate-200 p-4 cursor-pointer hover:bg-slate-50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">أكواد مستخدمة</p>
              <p className="text-2xl font-bold text-primary-600">{codeStats.used}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 text-primary-600">
              <Icon name="UserCheck" size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-surface rounded-lg border border-slate-200 p-4 cursor-pointer hover:bg-slate-50 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">أكواد منتهية</p>
              <p className="text-2xl font-bold text-error-600">{codeStats.expired}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-error-50 text-error-600">
              <Icon name="XCircle" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Create New Codes Form */}
      {showCreateForm && (
        <div className="bg-surface rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-text-primary">إنشاء أكواد تفعيل جديدة</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              iconName="X"
              onClick={() => setShowCreateForm(false)}
              disabled={isCreating}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">عدد الأكواد</label>
              <Input
                type="number"
                min="1"
                max="100"
                value={newCodeData.quantity}
                onChange={(e) => setNewCodeData({...newCodeData, quantity: parseInt(e.target.value) || 1})}
                placeholder="أدخل عدد الأكواد المطلوبة"
                disabled={isCreating}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">مدة الصلاحية (بالأيام)</label>
              <Input
                type="number"
                min="1"
                max="365"
                value={newCodeData.expiryDays}
                onChange={(e) => setNewCodeData({...newCodeData, expiryDays: parseInt(e.target.value) || 30})}
                placeholder="أدخل مدة الصلاحية"
                disabled={isCreating}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">المرحلة التعليمية</label>
              <select 
                value={newCodeData.schoolLevel}
                onChange={(e) => setNewCodeData({...newCodeData, schoolLevel: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-slate-50"
                disabled={isCreating}
              >
                <option value="all">جميع المراحل</option>
                <option value="ابتدائية">ابتدائية</option>
                <option value="متوسطة">متوسطة</option>
                <option value="ثانوية">ثانوية</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">وصف الأكواد</label>
              <Input
                type="text"
                value={newCodeData.description}
                onChange={(e) => setNewCodeData({...newCodeData, description: e.target.value})}
                placeholder="وصف اختياري للأكواد"
                disabled={isCreating}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-3 rtl:space-x-reverse">
            <Button 
              variant="ghost" 
              onClick={() => setShowCreateForm(false)}
              disabled={isCreating}
            >
              إلغاء
            </Button>
            <Button 
              variant="primary" 
              iconName="Plus"
              onClick={handleCreateCodes}
              loading={isCreating}
              disabled={isCreating}
            >
              {isCreating ? 'جاري الإنشاء...' : 'إنشاء الأكواد'}
            </Button>
          </div>
        </div>
      )}

      {/* Codes Table */}
      <div className="bg-surface rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  كود التفعيل
                </th>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  المرحلة التعليمية
                </th>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  تاريخ الإنشاء
                </th>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  تاريخ الانتهاء
                </th>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  المستخدم
                </th>
                <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {activationCodes.map((code) => (
                <tr key={code.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <code className="text-sm font-mono bg-slate-100 px-2 py-1 rounded text-text-primary">
                        {code.code}
                      </code>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        iconName="Copy" 
                        className="mr-2 rtl:mr-0 rtl:ml-2"
                        onClick={() => copyToClipboard(code.code)}
                      />
                    </div>
                    {code.description && (
                      <p className="text-xs text-text-muted mt-1">{code.description}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(code.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {code.schoolLevel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {code.createdDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {code.expiryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {code.usedBy ? (
                      <div>
                        <div className="text-sm font-medium text-text-primary">{code.usedBy}</div>
                        <div className="text-xs text-text-muted">{code.usedDate}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-text-muted">غير مستخدم</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      {code.status === 'نشط' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          iconName="Share"
                          onClick={() => copyToClipboard(code.code)}
                        >
                          مشاركة
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        iconName="Trash2" 
                        className="text-error-600 hover:text-error-700"
                        onClick={() => handleDeleteCode(code.id)}
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
        
        {activationCodes.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Key" size={48} className="mx-auto text-text-muted mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">لا توجد أكواد تفعيل</h3>
            <p className="text-text-secondary">ابدأ بإنشاء أكواد تفعيل جديدة للمستخدمين</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivationCodesTab;