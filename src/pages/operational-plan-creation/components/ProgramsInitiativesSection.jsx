import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import aiGenerationService from '../../../services/aiGenerationService';

const ProgramsInitiativesSection = ({ planData, onPlanDataChange }) => {
  const [programs, setPrograms] = useState(
    planData?.programsInitiatives?.list || []
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddProgram = () => {
    const newProgram = {
      id: Date.now(),
      name: '',
      description: '',
      objectives: '',
      targetGroups: '',
      timeline: '',
      responsibleParty: '',
      resources: '',
      evaluationMethod: '',
      status: 'planned'
    };
    
    const updatedPrograms = [...programs, newProgram];
    setPrograms(updatedPrograms);
    updatePlanData(updatedPrograms);
  };

  const handleRemoveProgram = (id) => {
    const updatedPrograms = programs.filter(program => program.id !== id);
    setPrograms(updatedPrograms);
    updatePlanData(updatedPrograms);
  };

  const handleProgramChange = (id, field, value) => {
    const updatedPrograms = programs.map(program => 
      program.id === id ? { ...program, [field]: value } : program
    );
    setPrograms(updatedPrograms);
    updatePlanData(updatedPrograms);
  };

  const updatePlanData = (programsList) => {
    onPlanDataChange({
      ...planData,
      programsInitiatives: {
        list: programsList
      }
    });
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

  // توليد البرامج والمبادرات باستخدام الذكاء الاصطناعي
  const handleGeneratePrograms = async () => {
    setIsGenerating(true);
    
    try {
      // الحصول على الأهداف الاستراتيجية من بيانات الخطة
      const strategicGoals = planData?.strategicGoals || [];
      
      // توليد البرامج والمبادرات
      const generatedPrograms = await aiGenerationService.generatePrograms(strategicGoals);
      
      // تحويل البيانات المولدة إلى التنسيق المطلوب
      const formattedPrograms = generatedPrograms.map((program, index) => ({
        id: Date.now() + index,
        name: program.name,
        description: program.description,
        objectives: program.objectives,
        targetGroups: program.targetGroups,
        timeline: program.timeline,
        responsibleParty: 'وكيل المدرسة للشؤون التعليمية',
        resources: program.resources,
        evaluationMethod: 'استبانات قياس الأثر ومؤشرات الأداء',
        status: 'planned'
      }));
      
      setPrograms(formattedPrograms);
      updatePlanData(formattedPrograms);
      
      alert('تم توليد البرامج والمبادرات بنجاح!');
    } catch (error) {
      console.error('Error generating programs:', error);
      alert('حدث خطأ أثناء توليد البرامج والمبادرات. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
          <Icon name="Lightbulb" size={32} className="text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">البرامج والمبادرات التنفيذية</h2>
        <p className="text-text-secondary">تحديد برامج ومبادرات تنفيذ الخطة</p>
        
        {/* إرشادات */}
        <div className="mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200 max-w-md mx-auto">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-right rtl:text-left">
              <h3 className="text-sm font-semibold text-accent-800 mb-1">إرشادات</h3>
              <p className="text-xs text-accent-700 leading-relaxed">
                أضف البرامج والمبادرات التي ستنفذها المدرسة لتحقيق أهداف الخطة التشغيلية
              </p>
            </div>
          </div>
        </div>
        
        {/* زر توليد البرامج والمبادرات */}
        <div className="mt-6">
          <Button
            variant="primary"
            size="lg"
            onClick={handleGeneratePrograms}
            disabled={isGenerating}
            loading={isGenerating}
            iconName={isGenerating ? "Loader2" : "Wand2"}
            className="mx-auto"
          >
            {isGenerating ? 'جاري توليد البرامج والمبادرات...' : 'توليد البرامج والمبادرات (بالذكاء الاصطناعي)'}
          </Button>
          <p className="text-xs text-text-muted text-center mt-2">
            يتم توليد البرامج والمبادرات باستخدام الذكاء الاصطناعي بناءً على الأهداف الاستراتيجية
          </p>
        </div>
      </div>

      {/* إضافة برنامج جديد */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-primary-600" />
            <h3 className="text-lg font-semibold text-text-primary">البرامج والمبادرات</h3>
          </div>
          <Button
            variant="primary"
            onClick={handleAddProgram}
            iconName="Plus"
            iconPosition="left"
          >
            إضافة برنامج جديد
          </Button>
        </div>

        {programs.length > 0 ? (
          <div className="space-y-6">
            {programs.map((program) => (
              <div key={program.id} className="border border-slate-200 rounded-lg overflow-hidden">
                {/* Program Header */}
                <div className="bg-slate-50 p-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Icon name="Lightbulb" size={20} className="text-primary-600" />
                      <div>
                        <Input
                          type="text"
                          placeholder="اسم البرنامج/المبادرة"
                          value={program.name}
                          onChange={(e) => handleProgramChange(program.id, 'name', e.target.value)}
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
                        وصف البرنامج/المبادرة
                      </label>
                      <textarea
                        rows={3}
                        placeholder="وصف موجز للبرنامج أو المبادرة..."
                        value={program.description}
                        onChange={(e) => handleProgramChange(program.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        أهداف البرنامج/المبادرة
                      </label>
                      <textarea
                        rows={3}
                        placeholder="أهداف البرنامج أو المبادرة..."
                        value={program.objectives}
                        onChange={(e) => handleProgramChange(program.id, 'objectives', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        الفئات المستهدفة
                      </label>
                      <Input
                        type="text"
                        placeholder="مثال: الطلاب، المعلمون، أولياء الأمور"
                        value={program.targetGroups}
                        onChange={(e) => handleProgramChange(program.id, 'targetGroups', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        الإطار الزمني
                      </label>
                      <Input
                        type="text"
                        placeholder="مثال: الفصل الدراسي الأول، شهر محرم"
                        value={program.timeline}
                        onChange={(e) => handleProgramChange(program.id, 'timeline', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        الجهة المسؤولة
                      </label>
                      <Input
                        type="text"
                        placeholder="مثال: وكيل شؤون الطلاب، رائد النشاط"
                        value={program.responsibleParty}
                        onChange={(e) => handleProgramChange(program.id, 'responsibleParty', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        الموارد المطلوبة
                      </label>
                      <Input
                        type="text"
                        placeholder="مثال: ميزانية، مواد، تجهيزات"
                        value={program.resources}
                        onChange={(e) => handleProgramChange(program.id, 'resources', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-text-primary">
                        طريقة التقييم
                      </label>
                      <textarea
                        rows={2}
                        placeholder="كيف سيتم تقييم نجاح البرنامج أو المبادرة..."
                        value={program.evaluationMethod}
                        onChange={(e) => handleProgramChange(program.id, 'evaluationMethod', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-text-muted">
            <Icon name="Lightbulb" size={48} className="mx-auto mb-4 opacity-50" />
            <p>لم يتم إضافة برامج أو مبادرات بعد</p>
            <p className="text-sm">انقر على "إضافة برنامج جديد" للبدء</p>
          </div>
        )}
      </div>

      {/* نصائح لإعداد البرامج والمبادرات */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
          <Icon name="Info" size={20} className="text-accent-600" />
          <h3 className="text-lg font-semibold text-text-primary">نصائح لإعداد البرامج والمبادرات</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              1
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">ربط البرامج بالأهداف</h4>
              <p className="text-sm text-text-secondary">تأكد من ربط كل برنامج أو مبادرة بهدف استراتيجي أو تشغيلي محدد</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              2
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">تحديد مؤشرات النجاح</h4>
              <p className="text-sm text-text-secondary">حدد مؤشرات واضحة وقابلة للقياس لتقييم نجاح كل برنامج</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              3
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">تحديد المسؤوليات بوضوح</h4>
              <p className="text-sm text-text-secondary">حدد الجهة المسؤولة عن تنفيذ كل برنامج بشكل واضح ودقيق</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              4
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">وضع إطار زمني واقعي</h4>
              <p className="text-sm text-text-secondary">تأكد من أن الإطار الزمني للتنفيذ واقعي وقابل للتحقيق</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              5
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">تقدير الموارد بدقة</h4>
              <p className="text-sm text-text-secondary">قدر الموارد المطلوبة (بشرية، مالية، تقنية) بدقة لضمان نجاح التنفيذ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsInitiativesSection;