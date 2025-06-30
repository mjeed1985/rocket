import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const SchoolStaffSection = ({ planData, onPlanDataChange }) => {
  const [staffList, setStaffList] = useState(
    planData?.schoolStaff?.list || []
  );

  const handleAddStaffMember = () => {
    const newMember = {
      id: Date.now(),
      name: '',
      role: '',
      specialization: '',
      qualification: '',
      yearsOfExperience: '',
      contactInfo: ''
    };
    
    const updatedStaffList = [...staffList, newMember];
    setStaffList(updatedStaffList);
    updatePlanData(updatedStaffList);
  };

  const handleRemoveStaffMember = (id) => {
    const updatedStaffList = staffList.filter(member => member.id !== id);
    setStaffList(updatedStaffList);
    updatePlanData(updatedStaffList);
  };

  const handleStaffMemberChange = (id, field, value) => {
    const updatedStaffList = staffList.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    );
    setStaffList(updatedStaffList);
    updatePlanData(updatedStaffList);
  };

  const updatePlanData = (list) => {
    onPlanDataChange({
      ...planData,
      schoolStaff: {
        list
      }
    });
  };

  const roleOptions = [
    { value: '', label: 'اختر الدور الوظيفي' },
    { value: 'مدير', label: 'مدير' },
    { value: 'وكيل', label: 'وكيل' },
    { value: 'معلم', label: 'معلم' },
    { value: 'مرشد طلابي', label: 'مرشد طلابي' },
    { value: 'محضر مختبر', label: 'محضر مختبر' },
    { value: 'أمين مصادر تعلم', label: 'أمين مصادر تعلم' },
    { value: 'سكرتير', label: 'سكرتير' },
    { value: 'مساعد إداري', label: 'مساعد إداري' },
    { value: 'أخرى', label: 'أخرى' }
  ];

  const qualificationOptions = [
    { value: '', label: 'اختر المؤهل العلمي' },
    { value: 'دكتوراه', label: 'دكتوراه' },
    { value: 'ماجستير', label: 'ماجستير' },
    { value: 'بكالوريوس', label: 'بكالوريوس' },
    { value: 'دبلوم', label: 'دبلوم' },
    { value: 'ثانوية عامة', label: 'ثانوية عامة' },
    { value: 'أخرى', label: 'أخرى' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-success-100 rounded-xl mb-4">
          <Icon name="Users" size={32} className="text-success-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">منسوبي المدرسة</h2>
        <p className="text-text-secondary">قائمة بالكادر التعليمي والإداري في المدرسة</p>
        
        {/* إرشادات */}
        <div className="mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200 max-w-md mx-auto">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-right rtl:text-left">
              <h3 className="text-sm font-semibold text-accent-800 mb-1">إرشادات</h3>
              <p className="text-xs text-accent-700 leading-relaxed">
                أضف جميع منسوبي المدرسة من الكادر التعليمي والإداري مع تحديد أدوارهم ومؤهلاتهم
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* قائمة منسوبي المدرسة */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="List" size={20} className="text-success-600" />
            <h3 className="text-lg font-semibold text-text-primary">قائمة منسوبي المدرسة</h3>
          </div>
          <Button
            variant="success"
            size="sm"
            onClick={handleAddStaffMember}
            iconName="UserPlus"
            iconPosition="left"
          >
            إضافة منسوب
          </Button>
        </div>

        {staffList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    الاسم
                  </th>
                  <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    الدور الوظيفي
                  </th>
                  <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    التخصص
                  </th>
                  <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    المؤهل
                  </th>
                  <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    سنوات الخبرة
                  </th>
                  <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    معلومات الاتصال
                  </th>
                  <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {staffList.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Input
                        type="text"
                        placeholder="أدخل الاسم"
                        value={member.name}
                        onChange={(e) => handleStaffMemberChange(member.id, 'name', e.target.value)}
                        className="border-0 focus:ring-0 p-0 text-sm"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={member.role}
                        onChange={(e) => handleStaffMemberChange(member.id, 'role', e.target.value)}
                        className="w-full border-0 focus:ring-0 p-0 text-sm bg-transparent"
                      >
                        {roleOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Input
                        type="text"
                        placeholder="التخصص"
                        value={member.specialization}
                        onChange={(e) => handleStaffMemberChange(member.id, 'specialization', e.target.value)}
                        className="border-0 focus:ring-0 p-0 text-sm"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={member.qualification}
                        onChange={(e) => handleStaffMemberChange(member.id, 'qualification', e.target.value)}
                        className="w-full border-0 focus:ring-0 p-0 text-sm bg-transparent"
                      >
                        {qualificationOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Input
                        type="number"
                        placeholder="سنوات الخبرة"
                        value={member.yearsOfExperience}
                        onChange={(e) => handleStaffMemberChange(member.id, 'yearsOfExperience', e.target.value)}
                        className="border-0 focus:ring-0 p-0 text-sm"
                        min="0"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Input
                        type="text"
                        placeholder="رقم الهاتف أو البريد"
                        value={member.contactInfo}
                        onChange={(e) => handleStaffMemberChange(member.id, 'contactInfo', e.target.value)}
                        className="border-0 focus:ring-0 p-0 text-sm"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right rtl:text-left">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveStaffMember(member.id)}
                        iconName="Trash2"
                        className="text-error-600 hover:bg-error-50"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-text-muted">
            <Icon name="Users" size={48} className="mx-auto mb-4 opacity-50" />
            <p>لم يتم إضافة منسوبين للمدرسة بعد</p>
            <p className="text-sm">انقر على "إضافة منسوب" للبدء</p>
          </div>
        )}

        {staffList.length > 0 && (
          <div className="flex justify-center mt-4">
            <Button
              variant="success"
              onClick={handleAddStaffMember}
              iconName="UserPlus"
              iconPosition="left"
            >
              إضافة منسوب آخر
            </Button>
          </div>
        )}
      </div>

      {/* إحصائيات الكادر */}
      {staffList.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
            <Icon name="BarChart3" size={20} className="text-success-600" />
            <h3 className="text-lg font-semibold text-text-primary">إحصائيات الكادر</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-success-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-success-700 mb-2">
                {staffList.filter(m => m.role === 'معلم').length}
              </div>
              <div className="text-sm text-success-600">معلمين</div>
            </div>
            
            <div className="bg-primary-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary-700 mb-2">
                {staffList.filter(m => ['مدير', 'وكيل', 'سكرتير', 'مساعد إداري'].includes(m.role)).length}
              </div>
              <div className="text-sm text-primary-600">إداريين</div>
            </div>
            
            <div className="bg-secondary-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-secondary-700 mb-2">
                {staffList.filter(m => ['مرشد طلابي', 'محضر مختبر', 'أمين مصادر تعلم'].includes(m.role)).length}
              </div>
              <div className="text-sm text-secondary-600">وظائف مساندة</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolStaffSection;