import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const ClassVisitPlanSection = ({ planData, onPlanDataChange }) => {
  const [visitPlan, setVisitPlan] = useState({
    objectives: planData?.classVisitPlan?.objectives || '',
    methodology: planData?.classVisitPlan?.methodology || '',
    evaluationCriteria: planData?.classVisitPlan?.evaluationCriteria || '',
    visits: planData?.classVisitPlan?.visits || []
  });

  const handleTextChange = (field, value) => {
    const updatedPlan = { ...visitPlan, [field]: value };
    setVisitPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const handleAddVisit = () => {
    const newVisit = {
      id: Date.now(),
      teacherName: '',
      subject: '',
      grade: '',
      date: '',
      period: '',
      objectives: '',
      notes: ''
    };
    
    const updatedVisits = [...visitPlan.visits, newVisit];
    const updatedPlan = { ...visitPlan, visits: updatedVisits };
    setVisitPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const handleRemoveVisit = (id) => {
    const updatedVisits = visitPlan.visits.filter(visit => visit.id !== id);
    const updatedPlan = { ...visitPlan, visits: updatedVisits };
    setVisitPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const handleVisitChange = (id, field, value) => {
    const updatedVisits = visitPlan.visits.map(visit => 
      visit.id === id ? { ...visit, [field]: value } : visit
    );
    const updatedPlan = { ...visitPlan, visits: updatedVisits };
    setVisitPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const updatePlanData = (plan) => {
    onPlanDataChange({
      ...planData,
      classVisitPlan: plan
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
          <Icon name="Calendar" size={32} className="text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">خطة زيارات المدير للمعلمين</h2>
        <p className="text-text-secondary">جدول زيارات المدير للفصول الدراسية</p>
        
        {/* إرشادات */}
        <div className="mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200 max-w-md mx-auto">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-right rtl:text-left">
              <h3 className="text-sm font-semibold text-accent-800 mb-1">إرشادات</h3>
              <p className="text-xs text-accent-700 leading-relaxed">
                حدد أهداف ومنهجية زيارات المدير للمعلمين، وأضف جدول الزيارات المخطط لها
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* أهداف ومنهجية الزيارات */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
          <Icon name="Target" size={20} className="text-primary-600" />
          <h3 className="text-lg font-semibold text-text-primary">أهداف ومنهجية الزيارات</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              أهداف زيارات المدير للمعلمين
            </label>
            <textarea
              rows={4}
              placeholder="أدخل أهداف زيارات المدير للمعلمين..."
              value={visitPlan.objectives}
              onChange={(e) => handleTextChange('objectives', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              منهجية الزيارات
            </label>
            <textarea
              rows={4}
              placeholder="أدخل منهجية تنفيذ الزيارات..."
              value={visitPlan.methodology}
              onChange={(e) => handleTextChange('methodology', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              معايير التقييم
            </label>
            <textarea
              rows={4}
              placeholder="أدخل معايير تقييم الزيارات..."
              value={visitPlan.evaluationCriteria}
              onChange={(e) => handleTextChange('evaluationCriteria', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
            />
          </div>
        </div>
      </div>

      {/* جدول الزيارات */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="Calendar" size={20} className="text-secondary-600" />
            <h3 className="text-lg font-semibold text-text-primary">جدول الزيارات</h3>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAddVisit}
            iconName="Plus"
            iconPosition="left"
          >
            إضافة زيارة
          </Button>
        </div>

        {visitPlan.visits.length > 0 ? (
          <div className="space-y-4">
            {visitPlan.visits.map((visit) => (
              <div key={visit.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-medium text-text-primary">
                    {visit.teacherName ? `زيارة: ${visit.teacherName}` : 'زيارة جديدة'}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveVisit(visit.id)}
                    iconName="Trash2"
                    className="text-error-600 hover:bg-error-50"
                  >
                    حذف
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      اسم المعلم <span className="text-error-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="أدخل اسم المعلم"
                      value={visit.teacherName}
                      onChange={(e) => handleVisitChange(visit.id, 'teacherName', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      المادة الدراسية
                    </label>
                    <Input
                      type="text"
                      placeholder="أدخل المادة الدراسية"
                      value={visit.subject}
                      onChange={(e) => handleVisitChange(visit.id, 'subject', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      الصف/المرحلة
                    </label>
                    <Input
                      type="text"
                      placeholder="مثال: الصف الثالث الابتدائي"
                      value={visit.grade}
                      onChange={(e) => handleVisitChange(visit.id, 'grade', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      تاريخ الزيارة
                    </label>
                    <Input
                      type="date"
                      value={visit.date}
                      onChange={(e) => handleVisitChange(visit.id, 'date', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      الحصة/الفترة
                    </label>
                    <Input
                      type="text"
                      placeholder="مثال: الحصة الثالثة"
                      value={visit.period}
                      onChange={(e) => handleVisitChange(visit.id, 'period', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      أهداف الزيارة
                    </label>
                    <Input
                      type="text"
                      placeholder="أدخل أهداف الزيارة"
                      value={visit.objectives}
                      onChange={(e) => handleVisitChange(visit.id, 'objectives', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-medium text-text-primary">
                      ملاحظات
                    </label>
                    <textarea
                      rows={2}
                      placeholder="أدخل أي ملاحظات إضافية..."
                      value={visit.notes}
                      onChange={(e) => handleVisitChange(visit.id, 'notes', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-text-muted">
            <Icon name="Calendar" size={48} className="mx-auto mb-4 opacity-50" />
            <p>لم يتم إضافة زيارات بعد</p>
            <p className="text-sm">انقر على "إضافة زيارة" للبدء</p>
          </div>
        )}
      </div>

      {/* نصائح للزيارات الصفية */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
          <Icon name="Info" size={20} className="text-accent-600" />
          <h3 className="text-lg font-semibold text-text-primary">نصائح للزيارات الصفية</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              1
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">التخطيط المسبق</h4>
              <p className="text-sm text-text-secondary">حدد أهداف الزيارة وأبلغ المعلم مسبقاً بموعدها</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              2
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">الملاحظة الموضوعية</h4>
              <p className="text-sm text-text-secondary">استخدم نماذج ملاحظة موحدة ومعايير واضحة للتقييم</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              3
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">التغذية الراجعة البناءة</h4>
              <p className="text-sm text-text-secondary">قدم تغذية راجعة بناءة وإيجابية بعد الزيارة مباشرة</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              4
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">المتابعة المستمرة</h4>
              <p className="text-sm text-text-secondary">تابع تنفيذ التوصيات وقدم الدعم اللازم للمعلم</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              5
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">التوثيق الدقيق</h4>
              <p className="text-sm text-text-secondary">وثق نتائج الزيارات واستخدمها في تطوير الأداء</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassVisitPlanSection;