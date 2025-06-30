import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const PlanningCommitteeSection = ({ planData, onPlanDataChange }) => {
  const [committeeMembers, setCommitteeMembers] = useState(
    planData?.planningCommittee?.members || []
  );
  const [responsibilities, setResponsibilities] = useState(
    planData?.planningCommittee?.responsibilities || ''
  );

  const handleAddMember = () => {
    const newMember = {
      id: Date.now(),
      name: '',
      role: '',
      position: '',
      specialization: ''
    };
    
    const updatedMembers = [...committeeMembers, newMember];
    setCommitteeMembers(updatedMembers);
    updatePlanData(updatedMembers, responsibilities);
  };

  const handleRemoveMember = (id) => {
    const updatedMembers = committeeMembers.filter(member => member.id !== id);
    setCommitteeMembers(updatedMembers);
    updatePlanData(updatedMembers, responsibilities);
  };

  const handleMemberChange = (id, field, value) => {
    const updatedMembers = committeeMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    );
    setCommitteeMembers(updatedMembers);
    updatePlanData(updatedMembers, responsibilities);
  };

  const handleResponsibilitiesChange = (value) => {
    setResponsibilities(value);
    updatePlanData(committeeMembers, value);
  };

  const updatePlanData = (members, resp) => {
    onPlanDataChange({
      ...planData,
      planningCommittee: {
        members,
        responsibilities: resp
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
          <Icon name="Users" size={32} className="text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">تكوين لجنة إعداد الخطة التشغيلية</h2>
        <p className="text-text-secondary">تشكيل وتحديد مهام لجنة إعداد الخطة التشغيلية</p>
        
        {/* إرشادات */}
        <div className="mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200 max-w-md mx-auto">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-right rtl:text-left">
              <h3 className="text-sm font-semibold text-accent-800 mb-1">إرشادات</h3>
              <p className="text-xs text-accent-700 leading-relaxed">
                قم بإضافة أعضاء لجنة إعداد الخطة التشغيلية وتحديد مهامهم ومسؤولياتهم
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* أعضاء اللجنة */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="Users" size={20} className="text-primary-600" />
            <h3 className="text-lg font-semibold text-text-primary">أعضاء لجنة إعداد الخطة</h3>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddMember}
            iconName="UserPlus"
            iconPosition="left"
          >
            إضافة عضو
          </Button>
        </div>

        {committeeMembers.length > 0 ? (
          <div className="space-y-4">
            {committeeMembers.map((member) => (
              <div key={member.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-medium text-text-primary">
                    {member.name || 'عضو جديد'}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveMember(member.id)}
                    iconName="Trash2"
                    className="text-error-600 hover:bg-error-50"
                  >
                    حذف
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      الاسم <span className="text-error-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="أدخل اسم العضو"
                      value={member.name}
                      onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      المسمى الوظيفي <span className="text-error-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="مثال: معلم، وكيل، مرشد طلابي"
                      value={member.role}
                      onChange={(e) => handleMemberChange(member.id, 'role', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      المنصب في اللجنة
                    </label>
                    <select
                      value={member.position}
                      onChange={(e) => handleMemberChange(member.id, 'position', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
                    >
                      <option value="">اختر المنصب</option>
                      <option value="رئيس">رئيس</option>
                      <option value="نائب">نائب</option>
                      <option value="عضو">عضو</option>
                      <option value="مقرر">مقرر</option>
                      <option value="منسق">منسق</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      التخصص
                    </label>
                    <Input
                      type="text"
                      placeholder="أدخل التخصص"
                      value={member.specialization}
                      onChange={(e) => handleMemberChange(member.id, 'specialization', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-text-muted">
            <Icon name="Users" size={48} className="mx-auto mb-4 opacity-50" />
            <p>لم يتم إضافة أعضاء للجنة بعد</p>
            <p className="text-sm">انقر على "إضافة عضو" للبدء</p>
          </div>
        )}
      </div>

      {/* مهام ومسؤوليات اللجنة */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
          <Icon name="ClipboardList" size={20} className="text-secondary-600" />
          <h3 className="text-lg font-semibold text-text-primary">مهام ومسؤوليات اللجنة</h3>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            وصف مهام ومسؤوليات اللجنة
          </label>
          <textarea
            rows={6}
            placeholder="أدخل وصفاً تفصيلياً لمهام ومسؤوليات لجنة إعداد الخطة التشغيلية..."
            value={responsibilities}
            onChange={(e) => handleResponsibilitiesChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
          />
        </div>

        {/* اقتراحات للمهام */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <h4 className="text-sm font-medium text-text-primary mb-3">اقتراحات للمهام والمسؤوليات:</h4>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex items-start space-x-2 rtl:space-x-reverse">
              <Icon name="Check" size={16} className="text-success-500 mt-0.5 flex-shrink-0" />
              <span>إعداد وتطوير الخطة التشغيلية وفق رؤية ورسالة المدرسة</span>
            </li>
            <li className="flex items-start space-x-2 rtl:space-x-reverse">
              <Icon name="Check" size={16} className="text-success-500 mt-0.5 flex-shrink-0" />
              <span>تحليل الوضع الراهن للمدرسة وتحديد نقاط القوة والضعف</span>
            </li>
            <li className="flex items-start space-x-2 rtl:space-x-reverse">
              <Icon name="Check" size={16} className="text-success-500 mt-0.5 flex-shrink-0" />
              <span>تحديد الأهداف الاستراتيجية والتشغيلية للمدرسة</span>
            </li>
            <li className="flex items-start space-x-2 rtl:space-x-reverse">
              <Icon name="Check" size={16} className="text-success-500 mt-0.5 flex-shrink-0" />
              <span>وضع مؤشرات الأداء وآليات المتابعة والتقييم</span>
            </li>
            <li className="flex items-start space-x-2 rtl:space-x-reverse">
              <Icon name="Check" size={16} className="text-success-500 mt-0.5 flex-shrink-0" />
              <span>متابعة تنفيذ الخطة وتقديم تقارير دورية عن مستوى الإنجاز</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanningCommitteeSection;