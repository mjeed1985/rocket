import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const PlanMonitoringSection = ({ planData, onPlanDataChange }) => {
  const [monitoringPlan, setMonitoringPlan] = useState({
    methodology: planData?.planMonitoring?.methodology || '',
    responsibilities: planData?.planMonitoring?.responsibilities || '',
    schedule: planData?.planMonitoring?.schedule || '',
    tools: planData?.planMonitoring?.tools || [],
    reports: planData?.planMonitoring?.reports || []
  });

  const handleTextChange = (field, value) => {
    const updatedPlan = { ...monitoringPlan, [field]: value };
    setMonitoringPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const handleAddTool = () => {
    const newTool = {
      id: Date.now(),
      name: '',
      description: '',
      frequency: ''
    };
    
    const updatedTools = [...monitoringPlan.tools, newTool];
    const updatedPlan = { ...monitoringPlan, tools: updatedTools };
    setMonitoringPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const handleRemoveTool = (id) => {
    const updatedTools = monitoringPlan.tools.filter(tool => tool.id !== id);
    const updatedPlan = { ...monitoringPlan, tools: updatedTools };
    setMonitoringPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const handleToolChange = (id, field, value) => {
    const updatedTools = monitoringPlan.tools.map(tool => 
      tool.id === id ? { ...tool, [field]: value } : tool
    );
    const updatedPlan = { ...monitoringPlan, tools: updatedTools };
    setMonitoringPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const handleAddReport = () => {
    const newReport = {
      id: Date.now(),
      title: '',
      description: '',
      frequency: '',
      audience: ''
    };
    
    const updatedReports = [...monitoringPlan.reports, newReport];
    const updatedPlan = { ...monitoringPlan, reports: updatedReports };
    setMonitoringPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const handleRemoveReport = (id) => {
    const updatedReports = monitoringPlan.reports.filter(report => report.id !== id);
    const updatedPlan = { ...monitoringPlan, reports: updatedReports };
    setMonitoringPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const handleReportChange = (id, field, value) => {
    const updatedReports = monitoringPlan.reports.map(report => 
      report.id === id ? { ...report, [field]: value } : report
    );
    const updatedPlan = { ...monitoringPlan, reports: updatedReports };
    setMonitoringPlan(updatedPlan);
    updatePlanData(updatedPlan);
  };

  const updatePlanData = (plan) => {
    onPlanDataChange({
      ...planData,
      planMonitoring: plan
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
          <Icon name="Eye" size={32} className="text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">متابعة تنفيذ الخطة من قبل الإدارة المدرسية</h2>
        <p className="text-text-secondary">آليات المتابعة والإشراف على تنفيذ الخطة</p>
        
        {/* إرشادات */}
        <div className="mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200 max-w-md mx-auto">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-right rtl:text-left">
              <h3 className="text-sm font-semibold text-accent-800 mb-1">إرشادات</h3>
              <p className="text-xs text-accent-700 leading-relaxed">
                حدد آليات متابعة تنفيذ الخطة التشغيلية من قبل الإدارة المدرسية
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* منهجية المتابعة */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
          <Icon name="Eye" size={20} className="text-primary-600" />
          <h3 className="text-lg font-semibold text-text-primary">منهجية المتابعة</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              آلية متابعة تنفيذ الخطة
            </label>
            <textarea
              rows={4}
              placeholder="أدخل آلية متابعة تنفيذ الخطة التشغيلية..."
              value={monitoringPlan.methodology}
              onChange={(e) => handleTextChange('methodology', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              المسؤوليات والأدوار
            </label>
            <textarea
              rows={4}
              placeholder="حدد مسؤوليات وأدوار فريق متابعة تنفيذ الخطة..."
              value={monitoringPlan.responsibilities}
              onChange={(e) => handleTextChange('responsibilities', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              الجدول الزمني للمتابعة
            </label>
            <textarea
              rows={4}
              placeholder="حدد الجدول الزمني لمتابعة تنفيذ الخطة..."
              value={monitoringPlan.schedule}
              onChange={(e) => handleTextChange('schedule', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
            />
          </div>
        </div>
      </div>

      {/* أدوات المتابعة */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="Tool" size={20} className="text-secondary-600" />
            <h3 className="text-lg font-semibold text-text-primary">أدوات المتابعة</h3>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAddTool}
            iconName="Plus"
            iconPosition="left"
          >
            إضافة أداة
          </Button>
        </div>

        {monitoringPlan.tools.length > 0 ? (
          <div className="space-y-4">
            {monitoringPlan.tools.map((tool) => (
              <div key={tool.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-medium text-text-primary">
                    {tool.name || 'أداة متابعة جديدة'}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveTool(tool.id)}
                    iconName="Trash2"
                    className="text-error-600 hover:bg-error-50"
                  >
                    حذف
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      اسم الأداة <span className="text-error-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="أدخل اسم أداة المتابعة"
                      value={tool.name}
                      onChange={(e) => handleToolChange(tool.id, 'name', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      وصف الأداة
                    </label>
                    <Input
                      type="text"
                      placeholder="أدخل وصف الأداة"
                      value={tool.description}
                      onChange={(e) => handleToolChange(tool.id, 'description', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      تكرار الاستخدام
                    </label>
                    <select
                      value={tool.frequency}
                      onChange={(e) => handleToolChange(tool.id, 'frequency', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
                    >
                      <option value="">اختر تكرار الاستخدام</option>
                      <option value="يومي">يومي</option>
                      <option value="أسبوعي">أسبوعي</option>
                      <option value="شهري">شهري</option>
                      <option value="فصلي">فصلي</option>
                      <option value="سنوي">سنوي</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-text-muted">
            <Icon name="Tool" size={48} className="mx-auto mb-4 opacity-50" />
            <p>لم يتم إضافة أدوات متابعة بعد</p>
            <p className="text-sm">انقر على "إضافة أداة" للبدء</p>
          </div>
        )}
      </div>

      {/* التقارير الدورية */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="FileText" size={20} className="text-accent-600" />
            <h3 className="text-lg font-semibold text-text-primary">التقارير الدورية</h3>
          </div>
          <Button
            variant="accent"
            size="sm"
            onClick={handleAddReport}
            iconName="Plus"
            iconPosition="left"
          >
            إضافة تقرير
          </Button>
        </div>

        {monitoringPlan.reports.length > 0 ? (
          <div className="space-y-4">
            {monitoringPlan.reports.map((report) => (
              <div key={report.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-medium text-text-primary">
                    {report.title || 'تقرير جديد'}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveReport(report.id)}
                    iconName="Trash2"
                    className="text-error-600 hover:bg-error-50"
                  >
                    حذف
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      عنوان التقرير <span className="text-error-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="أدخل عنوان التقرير"
                      value={report.title}
                      onChange={(e) => handleReportChange(report.id, 'title', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      تكرار التقرير
                    </label>
                    <select
                      value={report.frequency}
                      onChange={(e) => handleReportChange(report.id, 'frequency', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
                    >
                      <option value="">اختر تكرار التقرير</option>
                      <option value="أسبوعي">أسبوعي</option>
                      <option value="شهري">شهري</option>
                      <option value="فصلي">فصلي</option>
                      <option value="سنوي">سنوي</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      الجهة المستهدفة
                    </label>
                    <Input
                      type="text"
                      placeholder="مثال: إدارة التعليم، قائد المدرسة"
                      value={report.audience}
                      onChange={(e) => handleReportChange(report.id, 'audience', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      وصف التقرير
                    </label>
                    <Input
                      type="text"
                      placeholder="أدخل وصف موجز للتقرير"
                      value={report.description}
                      onChange={(e) => handleReportChange(report.id, 'description', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-text-muted">
            <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-50" />
            <p>لم يتم إضافة تقارير دورية بعد</p>
            <p className="text-sm">انقر على "إضافة تقرير" للبدء</p>
          </div>
        )}
      </div>

      {/* نصائح للمتابعة الفعالة */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
          <Icon name="Info" size={20} className="text-accent-600" />
          <h3 className="text-lg font-semibold text-text-primary">نصائح للمتابعة الفعالة</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              1
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">المتابعة المستمرة</h4>
              <p className="text-sm text-text-secondary">تابع تنفيذ الخطة بشكل مستمر وليس فقط في نهاية الفترة</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              2
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">التوثيق الدقيق</h4>
              <p className="text-sm text-text-secondary">وثق جميع الملاحظات والتوصيات بشكل دقيق ومنظم</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              3
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">التغذية الراجعة</h4>
              <p className="text-sm text-text-secondary">قدم تغذية راجعة فورية وبناءة للمسؤولين عن التنفيذ</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              4
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">المرونة في التعديل</h4>
              <p className="text-sm text-text-secondary">كن مرناً في تعديل الخطة بناءً على نتائج المتابعة</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              5
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">الشفافية والمشاركة</h4>
              <p className="text-sm text-text-secondary">شارك نتائج المتابعة مع جميع المعنيين بشفافية</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanMonitoringSection;