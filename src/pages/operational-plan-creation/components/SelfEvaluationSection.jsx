import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const SelfEvaluationSection = ({ planData, onPlanDataChange }) => {
  const [evaluationDomains, setEvaluationDomains] = useState(
    planData?.selfEvaluation?.domains || []
  );
  const [beneficiaries, setBeneficiaries] = useState(
    planData?.selfEvaluation?.beneficiaries || []
  );
  const [domainsNotes, setDomainsNotes] = useState(
    planData?.selfEvaluation?.domainsNotes || ''
  );

  const defaultDomains = [
    { id: 'domain-1', name: 'القيادة المدرسية', selected: false },
    { id: 'domain-2', name: 'عمليات التعليم والتعلم', selected: false },
    { id: 'domain-3', name: 'البيئة المدرسية', selected: false },
    { id: 'domain-4', name: 'التطوير المهني', selected: false },
    { id: 'domain-5', name: 'الشراكة المجتمعية', selected: false },
    { id: 'domain-6', name: 'التقويم والقياس', selected: false },
    { id: 'domain-7', name: 'الأنشطة الطلابية', selected: false },
    { id: 'domain-8', name: 'الإرشاد الطلابي', selected: false }
  ];

  const defaultBeneficiaries = [
    { id: 'ben-1', name: 'الطلاب', selected: false },
    { id: 'ben-2', name: 'المعلمون', selected: false },
    { id: 'ben-3', name: 'الإداريون', selected: false },
    { id: 'ben-4', name: 'أولياء الأمور', selected: false },
    { id: 'ben-5', name: 'المجتمع المحلي', selected: false }
  ];

  // إضافة المجالات والمستفيدين الافتراضيين إذا كانت القائمة فارغة
  React.useEffect(() => {
    if (evaluationDomains.length === 0) {
      setEvaluationDomains(defaultDomains);
    }
    if (beneficiaries.length === 0) {
      setBeneficiaries(defaultBeneficiaries);
    }
    if (evaluationDomains.length === 0 || beneficiaries.length === 0) {
      updatePlanData(
        evaluationDomains.length === 0 ? defaultDomains : evaluationDomains,
        beneficiaries.length === 0 ? defaultBeneficiaries : beneficiaries,
        domainsNotes
      );
    }
  }, []);

  const handleDomainToggle = (id) => {
    const updatedDomains = evaluationDomains.map(domain => 
      domain.id === id ? { ...domain, selected: !domain.selected } : domain
    );
    setEvaluationDomains(updatedDomains);
    updatePlanData(updatedDomains, beneficiaries, domainsNotes);
  };

  const handleBeneficiaryToggle = (id) => {
    const updatedBeneficiaries = beneficiaries.map(ben => 
      ben.id === id ? { ...ben, selected: !ben.selected } : ben
    );
    setBeneficiaries(updatedBeneficiaries);
    updatePlanData(evaluationDomains, updatedBeneficiaries, domainsNotes);
  };

  const handleAddDomain = () => {
    const domainName = prompt('أدخل اسم مجال التقويم الجديد:');
    if (!domainName || !domainName.trim()) return;
    
    const newDomain = {
      id: `domain-${Date.now()}`,
      name: domainName.trim(),
      selected: true
    };
    
    const updatedDomains = [...evaluationDomains, newDomain];
    setEvaluationDomains(updatedDomains);
    updatePlanData(updatedDomains, beneficiaries, domainsNotes);
  };

  const handleAddBeneficiary = () => {
    const beneficiaryName = prompt('أدخل اسم الفئة المستفيدة الجديدة:');
    if (!beneficiaryName || !beneficiaryName.trim()) return;
    
    const newBeneficiary = {
      id: `ben-${Date.now()}`,
      name: beneficiaryName.trim(),
      selected: true
    };
    
    const updatedBeneficiaries = [...beneficiaries, newBeneficiary];
    setBeneficiaries(updatedBeneficiaries);
    updatePlanData(evaluationDomains, updatedBeneficiaries, domainsNotes);
  };

  const handleDomainsNotesChange = (e) => {
    const newNotes = e.target.value;
    setDomainsNotes(newNotes);
    updatePlanData(evaluationDomains, beneficiaries, newNotes);
  };

  const updatePlanData = (domains, bens, notes) => {
    onPlanDataChange({
      ...planData,
      selfEvaluation: {
        domains,
        beneficiaries: bens,
        domainsNotes: notes
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
          <Icon name="ClipboardCheck" size={32} className="text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">مجالات التقويم الذاتي والمستفيدون</h2>
        <p className="text-text-secondary">تحديد مجالات التقويم الذاتي والفئات المستهدفة</p>
        
        {/* إرشادات */}
        <div className="mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200 max-w-md mx-auto">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-right rtl:text-left">
              <h3 className="text-sm font-semibold text-accent-800 mb-1">إرشادات</h3>
              <p className="text-xs text-accent-700 leading-relaxed">
                حدد مجالات التقويم الذاتي للمدرسة والفئات المستفيدة من الخطة التشغيلية
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* مجالات التقويم الذاتي */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="ClipboardCheck" size={20} className="text-primary-600" />
            <h3 className="text-lg font-semibold text-text-primary">مجالات التقويم الذاتي</h3>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddDomain}
            iconName="Plus"
            iconPosition="left"
          >
            إضافة مجال
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {evaluationDomains.map((domain) => (
            <div
              key={domain.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                domain.selected
                  ? 'border-primary-300 bg-primary-50 text-primary-800'
                  : 'border-slate-200 bg-white hover:border-primary-200 hover:bg-primary-25'
              }`}
              onClick={() => handleDomainToggle(domain.id)}
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  domain.selected
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-slate-300'
                }`}>
                  {domain.selected && (
                    <Icon name="Check" size={12} className="text-white" />
                  )}
                </div>
                <span className="text-sm font-medium">{domain.name}</span>
              </div>
            </div>
          ))}
        </div>

        {evaluationDomains.length === 0 && (
          <div className="text-center py-8 text-text-muted">
            <Icon name="ClipboardCheck" size={48} className="mx-auto mb-4 opacity-50" />
            <p>لم يتم إضافة مجالات للتقويم الذاتي بعد</p>
            <p className="text-sm">انقر على "إضافة مجال" للبدء</p>
          </div>
        )}

        {/* ملاحظات حول مجالات التقويم */}
        <div className="space-y-2 mt-6">
          <label className="block text-sm font-medium text-text-primary">
            ملاحظات حول مجالات التقويم الذاتي
          </label>
          <textarea
            rows={4}
            placeholder="أدخل ملاحظات أو تفاصيل إضافية حول مجالات التقويم الذاتي..."
            value={domainsNotes}
            onChange={handleDomainsNotesChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
          />
        </div>
      </div>

      {/* الفئات المستفيدة */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="Users" size={20} className="text-secondary-600" />
            <h3 className="text-lg font-semibold text-text-primary">الفئات المستفيدة</h3>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAddBeneficiary}
            iconName="Plus"
            iconPosition="left"
          >
            إضافة فئة
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {beneficiaries.map((ben) => (
            <div
              key={ben.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                ben.selected
                  ? 'border-secondary-300 bg-secondary-50 text-secondary-800'
                  : 'border-slate-200 bg-white hover:border-secondary-200 hover:bg-secondary-25'
              }`}
              onClick={() => handleBeneficiaryToggle(ben.id)}
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  ben.selected
                    ? 'border-secondary-500 bg-secondary-500'
                    : 'border-slate-300'
                }`}>
                  {ben.selected && (
                    <Icon name="Check" size={12} className="text-white" />
                  )}
                </div>
                <span className="text-sm font-medium">{ben.name}</span>
              </div>
            </div>
          ))}
        </div>

        {beneficiaries.length === 0 && (
          <div className="text-center py-8 text-text-muted">
            <Icon name="Users" size={48} className="mx-auto mb-4 opacity-50" />
            <p>لم يتم إضافة فئات مستفيدة بعد</p>
            <p className="text-sm">انقر على "إضافة فئة" للبدء</p>
          </div>
        )}
      </div>

      {/* ملخص التقويم الذاتي */}
      {(evaluationDomains.filter(d => d.selected).length > 0 || beneficiaries.filter(b => b.selected).length > 0) && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
            <Icon name="CheckSquare" size={20} className="text-success-600" />
            <h3 className="text-lg font-semibold text-text-primary">ملخص التقويم الذاتي</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {evaluationDomains.filter(d => d.selected).length > 0 && (
              <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                  <Icon name="ClipboardCheck" size={16} className="text-primary-600" />
                  <span className="text-sm font-medium text-primary-800">
                    مجالات التقويم المختارة ({evaluationDomains.filter(d => d.selected).length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {evaluationDomains.filter(d => d.selected).map((domain) => (
                    <span key={domain.id} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {domain.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {beneficiaries.filter(b => b.selected).length > 0 && (
              <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                  <Icon name="Users" size={16} className="text-secondary-600" />
                  <span className="text-sm font-medium text-secondary-800">
                    الفئات المستفيدة ({beneficiaries.filter(b => b.selected).length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {beneficiaries.filter(b => b.selected).map((ben) => (
                    <span key={ben.id} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                      {ben.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelfEvaluationSection;