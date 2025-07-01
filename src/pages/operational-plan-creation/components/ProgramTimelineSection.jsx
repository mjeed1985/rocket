import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const ProgramTimelineSection = ({ planData, onPlanDataChange }) => {
  const [programs, setPrograms] = useState(
    planData?.programTimeline?.programs || [
      { id: 1, name: 'بيئة صحية آمنة', month: '', week: '' },
      { id: 2, name: 'برنامج (هيا ننجح سوا)', month: '', week: '' },
      { id: 3, name: 'برنامج (خذ حذرك)', month: '', week: '' },
      { id: 4, name: 'برنامج (رؤيتي معلمتي)', month: '', week: '' },
      { id: 5, name: 'برنامج (نستفيد من قراءتك)', month: '', week: '' },
      { id: 6, name: 'برنامج (أنت أهم)', month: '', week: '' },
      { id: 7, name: 'برنامج (ضحكتك)', month: '', week: '' },
      { id: 8, name: 'برنامج (أنا قادر)', month: '', week: '' },
      { id: 9, name: 'مستجدين', month: '', week: '' },
      { id: 10, name: 'برنامج (التعلم النشط)', month: '', week: '' },
      { id: 11, name: 'برنامج الدروس الاستثنائية', month: '', week: '' },
      { id: 12, name: 'تكريم المتميزين في تنفيذ الاستراتيجيات', month: '', week: '' },
      { id: 13, name: 'مسابقة أجمل تنفيذ', month: '', week: '' },
      { id: 14, name: 'مسابقة فارس الكلمة', month: '', week: '' },
      { id: 15, name: 'ساحة الإبداع', month: '', week: '' },
      { id: 16, name: 'أنت مبدع', month: '', week: '' },
      { id: 17, name: 'استبيان البرنامج العلاجي لسلوكيات الطلاب', month: '', week: '' }
    ]
  );

  // قائمة الأشهر الهجرية
  const hijriMonths = [
    { value: '', label: 'اختر الشهر' },
    { value: 'محرم', label: 'محرم' },
    { value: 'صفر', label: 'صفر' },
    { value: 'ربيع أول', label: 'ربيع أول' },
    { value: 'ربيع آخر', label: 'ربيع آخر' },
    { value: 'جمادى الأولى', label: 'جمادى الأولى' },
    { value: 'جمادى الآخرة', label: 'جمادى الآخرة' },
    { value: 'رجب', label: 'رجب' },
    { value: 'شعبان', label: 'شعبان' },
    { value: 'رمضان', label: 'رمضان' },
    { value: 'شوال', label: 'شوال' },
    { value: 'ذو القعدة', label: 'ذو القعدة' },
    { value: 'ذو الحجة', label: 'ذو الحجة' }
  ];

  // قائمة الأسابيع
  const weeks = [
    { value: '', label: 'اختر الأسبوع' },
    { value: 'الأسبوع 1', label: 'الأسبوع 1' },
    { value: 'الأسبوع 2', label: 'الأسبوع 2' },
    { value: 'الأسبوع 3', label: 'الأسبوع 3' },
    { value: 'الأسبوع 4', label: 'الأسبوع 4' }
  ];

  // تحديث بيانات البرنامج
  const handleProgramChange = (id, field, value) => {
    const updatedPrograms = programs.map(program => 
      program.id === id ? { ...program, [field]: value } : program
    );
    setPrograms(updatedPrograms);
    updatePlanData(updatedPrograms);
  };

  // إضافة برنامج جديد
  const handleAddProgram = () => {
    const newId = programs.length > 0 ? Math.max(...programs.map(p => p.id)) + 1 : 1;
    const newProgram = {
      id: newId,
      name: '',
      month: '',
      week: ''
    };
    
    const updatedPrograms = [...programs, newProgram];
    setPrograms(updatedPrograms);
    updatePlanData(updatedPrograms);
  };

  // حذف برنامج
  const handleDeleteProgram = (id) => {
    const updatedPrograms = programs.filter(program => program.id !== id);
    setPrograms(updatedPrograms);
    updatePlanData(updatedPrograms);
  };

  // تحديث بيانات الخطة
  const updatePlanData = (programsList) => {
    onPlanDataChange({
      ...planData,
      programTimeline: {
        programs: programsList
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
          <Icon name="Calendar" size={32} className="text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">نموذج الكشف الزمني لتحديد موعد تنفيذ البرامج</h2>
        <p className="text-text-secondary">تحديد الإطار الزمني لتنفيذ البرامج والمبادرات</p>
        
        {/* إرشادات */}
        <div className="mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200 max-w-md mx-auto">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-right rtl:text-left">
              <h3 className="text-sm font-semibold text-accent-800 mb-1">إرشادات</h3>
              <p className="text-xs text-accent-700 leading-relaxed">
                حدد الشهر والأسبوع المناسب لتنفيذ كل برنامج من البرامج المدرجة
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* جدول البرامج */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="Calendar" size={20} className="text-primary-600" />
            <h3 className="text-lg font-semibold text-text-primary">جدول البرامج</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg" dir="rtl">
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-right rtl:text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                  اسم البرنامج
                </th>
                <th className="px-6 py-3 text-right rtl:text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                  الشهر
                </th>
                <th className="px-6 py-3 text-right rtl:text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                  الأسبوع
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-text-secondary uppercase tracking-wider">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {programs.map((program) => (
                <tr key={program.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Input
                      type="text"
                      value={program.name}
                      onChange={(e) => handleProgramChange(program.id, 'name', e.target.value)}
                      placeholder="أدخل اسم البرنامج"
                      className="w-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={program.month}
                      onChange={(e) => handleProgramChange(program.id, 'month', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
                    >
                      {hijriMonths.map(month => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={program.week}
                      onChange={(e) => handleProgramChange(program.id, 'week', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
                    >
                      {weeks.map(week => (
                        <option key={week.value} value={week.value}>
                          {week.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteProgram(program.id)}
                      iconName="Trash2"
                      className="text-error-600 hover:bg-error-50"
                      title="حذف البرنامج"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* زر إضافة برنامج جديد */}
        <div className="flex justify-center mt-4">
          <Button
            variant="success"
            onClick={handleAddProgram}
            iconName="Plus"
            iconPosition="left"
            className="bg-green-600 hover:bg-green-700"
          >
            إضافة برنامج جديد
          </Button>
        </div>
      </div>

      {/* نصائح للتخطيط الزمني */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
          <Icon name="Info" size={20} className="text-accent-600" />
          <h3 className="text-lg font-semibold text-text-primary">نصائح للتخطيط الزمني</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              1
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">التوزيع المتوازن</h4>
              <p className="text-sm text-text-secondary">وزع البرامج بشكل متوازن على مدار العام الدراسي</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              2
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">مراعاة المناسبات</h4>
              <p className="text-sm text-text-secondary">راعِ المناسبات والإجازات عند تحديد مواعيد التنفيذ</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              3
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">الأولويات</h4>
              <p className="text-sm text-text-secondary">ضع البرامج ذات الأولوية العالية في بداية العام الدراسي</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              4
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">المرونة</h4>
              <p className="text-sm text-text-secondary">حافظ على المرونة في الجدول الزمني لاستيعاب المتغيرات</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              5
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">التقييم المستمر</h4>
              <p className="text-sm text-text-secondary">راجع الجدول الزمني بشكل دوري وعدله حسب الحاجة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramTimelineSection;