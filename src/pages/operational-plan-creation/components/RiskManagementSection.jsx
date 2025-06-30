import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const RiskManagementSection = ({ planData, onPlanDataChange }) => {
  const [risks, setRisks] = useState(
    planData?.riskManagement?.risks || []
  );

  const handleAddRisk = () => {
    const newRisk = {
      id: Date.now(),
      description: '',
      impact: 'medium',
      probability: 'medium',
      mitigationStrategy: '',
      responsibleParty: '',
      status: 'identified'
    };
    
    const updatedRisks = [...risks, newRisk];
    setRisks(updatedRisks);
    updatePlanData(updatedRisks);
  };

  const handleRemoveRisk = (id) => {
    const updatedRisks = risks.filter(risk => risk.id !== id);
    setRisks(updatedRisks);
    updatePlanData(updatedRisks);
  };

  const handleRiskChange = (id, field, value) => {
    const updatedRisks = risks.map(risk => 
      risk.id === id ? { ...risk, [field]: value } : risk
    );
    setRisks(updatedRisks);
    updatePlanData(updatedRisks);
  };

  const updatePlanData = (risksList) => {
    onPlanDataChange({
      ...planData,
      riskManagement: {
        risks: risksList
      }
    });
  };

  const getImpactColor = (impact) => {
    const colors = {
      high: 'bg-error-100 text-error-800 border-error-200',
      medium: 'bg-warning-100 text-warning-800 border-warning-200',
      low: 'bg-success-100 text-success-800 border-success-200'
    };
    return colors[impact] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  const getProbabilityColor = (probability) => {
    const colors = {
      high: 'bg-error-100 text-error-800 border-error-200',
      medium: 'bg-warning-100 text-warning-800 border-warning-200',
      low: 'bg-success-100 text-success-800 border-success-200'
    };
    return colors[probability] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'identified': { bg: 'bg-primary-100', text: 'text-primary-800', label: 'تم تحديده' },
      'mitigated': { bg: 'bg-success-100', text: 'text-success-800', label: 'تم التخفيف' },
      'active': { bg: 'bg-warning-100', text: 'text-warning-800', label: 'نشط' },
      'resolved': { bg: 'bg-secondary-100', text: 'text-secondary-800', label: 'تم حله' }
    };
    
    const config = statusConfig[status] || statusConfig.identified;
    
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
          <Icon name="AlertTriangle" size={32} className="text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">إدارة المخاطر والتحديات المتوقعة</h2>
        <p className="text-text-secondary">تحديد وإدارة المخاطر المحتملة</p>
        
        {/* إرشادات */}
        <div className="mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200 max-w-md mx-auto">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-right rtl:text-left">
              <h3 className="text-sm font-semibold text-accent-800 mb-1">إرشادات</h3>
              <p className="text-xs text-accent-700 leading-relaxed">
                حدد المخاطر والتحديات المحتملة التي قد تواجه تنفيذ الخطة، وضع استراتيجيات للتعامل معها
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* قائمة المخاطر */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="AlertTriangle" size={20} className="text-primary-600" />
            <h3 className="text-lg font-semibold text-text-primary">المخاطر والتحديات المتوقعة</h3>
          </div>
          <Button
            variant="primary"
            onClick={handleAddRisk}
            iconName="Plus"
            iconPosition="left"
          >
            إضافة مخاطرة
          </Button>
        </div>

        {risks.length > 0 ? (
          <div className="space-y-6">
            {risks.map((risk) => (
              <div key={risk.id} className="border border-slate-200 rounded-lg overflow-hidden">
                {/* Risk Header */}
                <div className="bg-slate-50 p-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Icon name="AlertTriangle" size={20} className="text-warning-600" />
                      <div>
                        <Input
                          type="text"
                          placeholder="وصف المخاطرة"
                          value={risk.description}
                          onChange={(e) => handleRiskChange(risk.id, 'description', e.target.value)}
                          className="border-0 bg-transparent p-0 text-lg font-semibold focus:ring-0"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <select
                        value={risk.status}
                        onChange={(e) => handleRiskChange(risk.id, 'status', e.target.value)}
                        className="text-sm border-0 focus:ring-0 p-0 bg-transparent"
                      >
                        <option value="identified">تم تحديده</option>
                        <option value="mitigated">تم التخفيف</option>
                        <option value="active">نشط</option>
                        <option value="resolved">تم حله</option>
                      </select>
                      {getStatusBadge(risk.status)}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveRisk(risk.id)}
                        iconName="Trash2"
                        className="text-error-600 hover:bg-error-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Risk Details */}
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        مستوى التأثير
                      </label>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <select
                          value={risk.impact}
                          onChange={(e) => handleRiskChange(risk.id, 'impact', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
                        >
                          <option value="high">عالي</option>
                          <option value="medium">متوسط</option>
                          <option value="low">منخفض</option>
                        </select>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(risk.impact)}`}>
                          {risk.impact === 'high' ? 'عالي' : risk.impact === 'medium' ? 'متوسط' : 'منخفض'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        احتمالية الحدوث
                      </label>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <select
                          value={risk.probability}
                          onChange={(e) => handleRiskChange(risk.id, 'probability', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
                        >
                          <option value="high">عالية</option>
                          <option value="medium">متوسطة</option>
                          <option value="low">منخفضة</option>
                        </select>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProbabilityColor(risk.probability)}`}>
                          {risk.probability === 'high' ? 'عالية' : risk.probability === 'medium' ? 'متوسطة' : 'منخفضة'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        استراتيجية التخفيف
                      </label>
                      <textarea
                        rows={3}
                        placeholder="أدخل استراتيجية التخفيف من المخاطرة..."
                        value={risk.mitigationStrategy}
                        onChange={(e) => handleRiskChange(risk.id, 'mitigationStrategy', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        الجهة المسؤولة
                      </label>
                      <Input
                        type="text"
                        placeholder="أدخل الجهة المسؤولة عن إدارة المخاطرة"
                        value={risk.responsibleParty}
                        onChange={(e) => handleRiskChange(risk.id, 'responsibleParty', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-text-muted">
            <Icon name="AlertTriangle" size={48} className="mx-auto mb-4 opacity-50" />
            <p>لم يتم إضافة مخاطر أو تحديات بعد</p>
            <p className="text-sm">انقر على "إضافة مخاطرة" للبدء</p>
          </div>
        )}
      </div>

      {/* نصائح لإدارة المخاطر */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
          <Icon name="Info" size={20} className="text-accent-600" />
          <h3 className="text-lg font-semibold text-text-primary">نصائح لإدارة المخاطر</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              1
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">التحديد المبكر</h4>
              <p className="text-sm text-text-secondary">حدد المخاطر المحتملة في مرحلة مبكرة من تنفيذ الخطة</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              2
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">تحليل الأثر</h4>
              <p className="text-sm text-text-secondary">حلل أثر كل مخاطرة على أهداف الخطة التشغيلية</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              3
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">خطط بديلة</h4>
              <p className="text-sm text-text-secondary">ضع خططاً بديلة للتعامل مع المخاطر عالية التأثير</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              4
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">المراجعة المستمرة</h4>
              <p className="text-sm text-text-secondary">راجع سجل المخاطر بشكل دوري وحدثه حسب المستجدات</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-100 text-accent-700 font-bold text-xs mt-0.5">
              5
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-primary">التواصل الفعال</h4>
              <p className="text-sm text-text-secondary">تواصل مع جميع المعنيين حول المخاطر المحتملة وخطط التخفيف</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskManagementSection;