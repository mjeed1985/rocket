import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const StaffDevelopmentSection = ({ planData, onPlanDataChange }) => {
  const [developmentPlan, setDevelopmentPlan] = useState({
    vision: planData?.staffDevelopment?.vision || '',
    needs: planData?.staffDevelopment?.needs || [],
    programs: planData?.staffDevelopment?.programs || []
  });

  const handleVisionChange = (value) => {
    const updatedPlan = { ...developmentPlan, vision: value };
    setDevelopmentPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const handleAddNeed = () => {
    const newNeed = {
      id: Date.now(),
      description: '',
      targetGroup: '',
      priority: 'medium'
    };
    
    const updatedNeeds = [...developmentPlan.needs, newNeed];
    const updatedPlan = { ...developmentPlan, needs: updatedNeeds };
    setDevelopmentPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const handleRemoveNeed = (id) => {
    const updatedNeeds = developmentPlan.needs.filter(need => need.id !== id);
    const updatedPlan = { ...developmentPlan, needs: updatedNeeds };
    setDevelopmentPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const handleNeedChange = (id, field, value) => {
    const updatedNeeds = developmentPlan.needs.map(need => 
      need.id === id ? { ...need, [field]: value } : need
    );
    const updatedPlan = { ...developmentPlan, needs: updatedNeeds };
    setDevelopmentPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const handleAddProgram = () => {
    const newProgram = {
      id: Date.now(),
      title: '',
      description: '',
      targetGroup: '',
      objectives: '',
      duration: '',
      provider: '',
      timeline: '',
      status: 'planned'
    };
    
    const updatedPrograms = [...developmentPlan.programs, newProgram];
    const updatedPlan = { ...developmentPlan, programs: updatedPrograms };
    setDevelopmentPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const handleRemoveProgram = (id) => {
    const updatedPrograms = developmentPlan.programs.filter(program => program.id !== id);
    const updatedPlan = { ...developmentPlan, programs: updatedPrograms };
    setDevelopmentPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const handleProgramChange = (id, field, value) => {
    const updatedPrograms = developmentPlan.programs.map(program => 
      program.id === id ? { ...program, [field]: value } : program
    );
    const updatedPlan = { ...developmentPlan, programs: updatedPrograms };
    setDevelopmentPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const updatePlanData = (plan) => {
    onPlanDataChange({
      ...planData,
      staffDevelopment: plan
    });
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-error-100 text-error-800 border-error-200',
      medium: 'bg-warning-100 text-warning-800 border-warning-200',
      low: 'bg-success-100 text-success-800 border-success-200'
    };
    return colors[priority] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'planned': { bg: 'bg-primary-100', text: 'text-primary-800', label: 'مخطط' },
      'in_progress': { bg: 'bg-warning-100', text: 'text-warning-800', label: 'قيد التنفيذ' },
      'completed': { bg: 'bg-success-100', text: 'text-success-800', label: 'مكتمل' },
      'cancelled': { bg: 'bg-error-100', text: 'text-error-800', label: 'ملغي' }
    };
    
    const config = statusConfig[status] || statusConfig.planned;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
          <Icon name="GraduationCap" size={32} className="text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">تنمية الكادر التعليمي والإداري</h2>
        <p className="text-text-secondary">خطة تطوير قدرات الكادر التعليمي والإداري</p>
        
        {/* إرشادات */}
        <div className="mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200 max-w-md mx-auto">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-right rtl:text-left">
              <h3 className="text-sm font-semibold text-accent-800 mb-1">إرشادات</h3>
              <p className="text-xs text-accent-700 leading-relaxed">
                حدد احتياجات التطوير المهني للكادر التعليمي والإداري، وضع برامج تدريبية مناسبة
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* رؤية التطوير المهني */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
          <Icon name="Eye" size={20} className="text-primary-600" />
          <h3 className="text-lg font-semibold text-text-primary">رؤية التطوير المهني</h3>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            رؤية المدرسة للتطوير المهني
          </label>
          <textarea
            rows={4}
            placeholder="أدخل رؤية المدرسة للتطوير المهني للكادر التعليمي والإداري..."
            value={developmentPlan.vision}
            onChange={(e) => handleVisionChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
          />
        </div>
      </div>

      {/* احتياجات التطوير المهني */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="ListCheck" size={20} className="text-secondary-600" />
            <h3 className="text-lg font-semibold text-text-primary">احتياجات التطوير المهني</h3>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAddNeed}
            iconName="Plus"
            iconPosition="left"
          >
            إضافة احتياج
          </Button>
        </div>

        {developmentPlan.needs.length > 0 ? (
          <div className="space-y-4">
            {developmentPlan.needs.map((need) => (
              <div key={need.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="flex-1">
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-primary">
                          وصف الاحتياج <span className="text-error-500">*</span>
                        </label>
                        <Input
                          type="text"
                          placeholder="أدخل وصف احتياج التطوير المهني"
                          value={need.description}
                          onChange={(e) => handleNeedChange(need.id, 'description', e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-text-primary">
                            الفئة المستهدفة
                          </label>
                          <Input
                            type="text"
                            placeholder="مثال: معلمي اللغة العربية، الإداريين"
                            value={need.targetGroup}
                            onChange={(e) => handleNeedChange(need.id, 'targetGroup', e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-text-primary">
                            الأولوية
                          </label>
                          <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <select
                              value={need.priority}
                              onChange={(e) => handleNeedChange(need.id, 'priority', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
                            >
                              <option value="high">عالية</option>
                              <option value="medium">متوسطة</option>
                              <option value="low">منخفضة</option>
                            </select>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(need.priority)}`}>
                              {need.priority === 'high' ? 'عالية' : need.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveNeed(need.id)}
                    iconName="Trash2"
                    className="text-error-600 hover:bg-error-50"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-text-muted">
            <Icon name="ListCheck" size={48} className="mx-auto mb-4 opacity-50" />
            <p>لم يتم إضافة احتياجات تطوير مهني بعد</p>
            <p className="text-sm">انقر على "إضافة احتياج" للبدء</p>
          </div>
        )}
      </div>

      {/* برامج التطوير المهني */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="GraduationCap" size={20} className="text-accent-600" />
            <h3 className="text-lg font-semibold text-text-primary">برامج التطوير المهني</h3>
          </div>
          <Button
            variant="accent"
            size="sm"
            onClick={handleAddProgram}
            iconName="Plus"
            iconPosition="left"
          >
            إضافة برنامج
          </Button>
        </div>

        {developmentPlan.programs.length > 0 ? (
          <div className="space-y-6">
            {developmentPlan.programs.map((program) => (
              <div key={program.id} className="border border-slate-200 rounded-lg overflow-hidden">
                {/* Program Header */}
                <div className="bg-slate-50 p-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Icon name="GraduationCap" size={20} className="text-accent-600" />
                      <div>
                        <Input
                          type="text"
                          placeholder="عنوان البرنامج"
                          value={program.title}
                          onChange={(e) => handleProgramChange(program.id, 'title', e.target.value)}
                          className="border-0 bg-transparent p-0 text-lg font-semibold focus:ring-0"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <select
                        value={program.status}
                        onChange={(e) => handleProgramChange(program.id, 'status', e.target.value)}
                        className="text-sm border-0 focus:ring-0 p-0 bg-transparent"
                      >
                        <option value="planned">مخطط</option>
                        <option value="in_progress">قيد التنفيذ</option>
                        <option value="completed">مكتمل</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                      {getStatusBadge(program.status)}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveProgram(program.id)}
                        iconName="Trash2"
                        className="text-error-600 hover:bg-error-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Program Details */}
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        وصف البرنامج
                      </label>
                      <textarea
                        rows={3}
                        placeholder="وصف موجز للبرنامج التدريبي..."
                        value={program.description}
                        onChange={(e) => handleProgramChange(program.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        أهداف البرنامج
                      </label>
                      <textarea
                        rows={3}
                        placeholder="أهداف البرنامج التدريبي..."
                        value={program.objectives}
                        onChange={(e) => handleProgramChange(program.id, 'objectives', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        الفئة المستهدفة
                      </label>
                      <Input
                        type="text"
                        placeholder="مثال: جميع المعلمين، الإداريين"
                        value={program.targetGroup}
                        onChange={(e) => handleProgramChange(program.id, 'targetGroup', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        مدة البرنامج
                      </label>
                      <Input
                        type="text"
                        placeholder="مثال: 3 أيام، 20 ساعة تدريبية"
                        value={program.duration}
                        onChange={(e) => handleProgramChange(program.id, 'duration', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        الجهة المقدمة
                      </label>
                      <Input
                        type="text"
                        placeholder="مثال: إدارة التدريب، جهة خارجية"
                        value={program.provider}
                        onChange={(e) => handleProgramChange(program.id, 'provider', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        الإطار الزمني
                      </label>
                      <Input
                        type="text"
                        placeholder="مثال: الفصل الدراسي الأول"
                        value={program.timeline}
                        onChange={(e) => handleProgramChange(program.id, 'timeline', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-text-muted">
            <Icon name="GraduationCap" size={48} className="mx-auto mb-4 opacity-50" />
            <p>لم يتم إضافة برامج تطوير مهني بعد</p>
            <p className="text-sm">انقر على "إضافة برنامج" للبدء</p>
          </div>
        )}
      </div>

      {/* نصائح للتطوير المهني */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
          <Icon name="Info" size={20} className="text-accent-600" />
          <h3 className="text-lg font-semibold text-text-primary">نصائح للتطوير المهني</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              1
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">تحديد الاحتياجات بدقة</h4>
              <p className="text-sm text-text-secondary">حدد احتياجات التطوير المهني بناءً على تقييم دقيق للأداء</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              2
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">تنويع أساليب التطوير</h4>
              <p className="text-sm text-text-secondary">استخدم أساليب متنوعة للتطوير المهني (ورش عمل، تدريب إلكتروني، تبادل زيارات)</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              3
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">قياس أثر التدريب</h4>
              <p className="text-sm text-text-secondary">قم بقياس أثر برامج التطوير المهني على أداء المعلمين والطلاب</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              4
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">التطوير المستمر</h4>
              <p className="text-sm text-text-secondary">اجعل التطوير المهني عملية مستمرة وليست مجرد أحداث متفرقة</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              5
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">مجتمعات التعلم المهنية</h4>
              <p className="text-sm text-text-secondary">شجع إنشاء مجتمعات التعلم المهنية لتبادل الخبرات بين المعلمين</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDevelopmentSection;