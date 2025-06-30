import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const CommunityPartnershipsSection = ({ planData, onPlanDataChange }) => {
  const [partnerships, setPartnerships] = useState(
    planData?.communityPartnerships?.list || []
  );

  const handleAddPartnership = () => {
    const newPartnership = {
      id: Date.now(),
      partnerName: '',
      partnerType: '',
      description: '',
      objectives: '',
      activities: '',
      timeline: '',
      responsibleParty: '',
      status: 'planned'
    };
    
    const updatedPartnerships = [...partnerships, newPartnership];
    setPartnerships(updatedPartnerships);
    updatePlanData(updatedPartnerships);
  };

  const handleRemovePartnership = (id) => {
    const updatedPartnerships = partnerships.filter(partnership => partnership.id !== id);
    setPartnerships(updatedPartnerships);
    updatePlanData(updatedPartnerships);
  };

  const handlePartnershipChange = (id, field, value) => {
    const updatedPartnerships = partnerships.map(partnership => 
      partnership.id === id ? { ...partnership, [field]: value } : partnership
    );
    setPartnerships(updatedPartnerships);
    updatePlanData(updatedPartnerships);
  };

  const updatePlanData = (partnershipsList) => {
    onPlanDataChange({
      ...planData,
      communityPartnerships: {
        list: partnershipsList
      }
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'planned': { bg: 'bg-primary-100', text: 'text-primary-800', label: 'مخطط' },
      'in_progress': { bg: 'bg-warning-100', text: 'text-warning-800', label: 'قيد التنفيذ' },
      'active': { bg: 'bg-success-100', text: 'text-success-800', label: 'نشط' },
      'completed': { bg: 'bg-secondary-100', text: 'text-secondary-800', label: 'مكتمل' },
      'cancelled': { bg: 'bg-error-100', text: 'text-error-800', label: 'ملغي' }
    };
    
    const config = statusConfig[status] || statusConfig.planned;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const partnerTypeOptions = [
    { value: '', label: 'اختر نوع الشريك' },
    { value: 'حكومي', label: 'جهة حكومية' },
    { value: 'خاص', label: 'قطاع خاص' },
    { value: 'غير ربحي', label: 'منظمة غير ربحية' },
    { value: 'تعليمي', label: 'مؤسسة تعليمية' },
    { value: 'مجتمعي', label: 'مجتمع محلي' },
    { value: 'أخرى', label: 'أخرى' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
          <Icon name="Handshake" size={32} className="text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">الشراكات المجتمعية والمؤسسية</h2>
        <p className="text-text-secondary">بناء شراكات مع المجتمع والمؤسسات</p>
        
        {/* إرشادات */}
        <div className="mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200 max-w-md mx-auto">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-right rtl:text-left">
              <h3 className="text-sm font-semibold text-accent-800 mb-1">إرشادات</h3>
              <p className="text-xs text-accent-700 leading-relaxed">
                حدد الشراكات المجتمعية والمؤسسية التي ستساهم في تحقيق أهداف الخطة التشغيلية
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* قائمة الشراكات */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="Handshake" size={20} className="text-primary-600" />
            <h3 className="text-lg font-semibold text-text-primary">الشراكات المجتمعية والمؤسسية</h3>
          </div>
          <Button
            variant="primary"
            onClick={handleAddPartnership}
            iconName="Plus"
            iconPosition="left"
          >
            إضافة شراكة
          </Button>
        </div>

        {partnerships.length > 0 ? (
          <div className="space-y-6">
            {partnerships.map((partnership) => (
              <div key={partnership.id} className="border border-slate-200 rounded-lg overflow-hidden">
                {/* Partnership Header */}
                <div className="bg-slate-50 p-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Icon name="Handshake" size={20} className="text-primary-600" />
                      <div>
                        <Input
                          type="text"
                          placeholder="اسم الشريك"
                          value={partnership.partnerName}
                          onChange={(e) => handlePartnershipChange(partnership.id, 'partnerName', e.target.value)}
                          className="border-0 bg-transparent p-0 text-lg font-semibold focus:ring-0"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <select
                        value={partnership.status}
                        onChange={(e) => handlePartnershipChange(partnership.id, 'status', e.target.value)}
                        className="text-sm border-0 focus:ring-0 p-0 bg-transparent"
                      >
                        <option value="planned">مخطط</option>
                        <option value="in_progress">قيد التنفيذ</option>
                        <option value="active">نشط</option>
                        <option value="completed">مكتمل</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                      {getStatusBadge(partnership.status)}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemovePartnership(partnership.id)}
                        iconName="Trash2"
                        className="text-error-600 hover:bg-error-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Partnership Details */}
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        نوع الشريك
                      </label>
                      <select
                        value={partnership.partnerType}
                        onChange={(e) => handlePartnershipChange(partnership.id, 'partnerType', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
                      >
                        {partnerTypeOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        وصف الشراكة
                      </label>
                      <Input
                        type="text"
                        placeholder="وصف موجز للشراكة"
                        value={partnership.description}
                        onChange={(e) => handlePartnershipChange(partnership.id, 'description', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        أهداف الشراكة
                      </label>
                      <textarea
                        rows={3}
                        placeholder="أهداف الشراكة..."
                        value={partnership.objectives}
                        onChange={(e) => handlePartnershipChange(partnership.id, 'objectives', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        الأنشطة والفعاليات
                      </label>
                      <textarea
                        rows={3}
                        placeholder="الأنشطة والفعاليات المشتركة..."
                        value={partnership.activities}
                        onChange={(e) => handlePartnershipChange(partnership.id, 'activities', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        الإطار الزمني
                      </label>
                      <Input
                        type="text"
                        placeholder="مثال: العام الدراسي 2024-2025"
                        value={partnership.timeline}
                        onChange={(e) => handlePartnershipChange(partnership.id, 'timeline', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-text-primary">
                        المسؤول عن التنفيذ
                      </label>
                      <Input
                        type="text"
                        placeholder="المسؤول عن متابعة الشراكة"
                        value={partnership.responsibleParty}
                        onChange={(e) => handlePartnershipChange(partnership.id, 'responsibleParty', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-text-muted">
            <Icon name="Handshake" size={48} className="mx-auto mb-4 opacity-50" />
            <p>لم يتم إضافة شراكات بعد</p>
            <p className="text-sm">انقر على "إضافة شراكة" للبدء</p>
          </div>
        )}
      </div>

      {/* أفكار للشراكات المجتمعية */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
          <Icon name="Lightbulb" size={20} className="text-accent-600" />
          <h3 className="text-lg font-semibold text-text-primary">أفكار للشراكات المجتمعية</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
            <h4 className="text-md font-medium text-primary-800 mb-3">شراكات مع القطاع الحكومي</h4>
            <ul className="space-y-2 text-sm text-primary-700">
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <Icon name="Check" size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                <span>شراكة مع البلدية لتحسين البيئة المحيطة بالمدرسة</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <Icon name="Check" size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                <span>شراكة مع مراكز الرعاية الصحية للتوعية الصحية</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <Icon name="Check" size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                <span>شراكة مع الدفاع المدني للتوعية بالسلامة</span>
              </li>
            </ul>
          </div>

          <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
            <h4 className="text-md font-medium text-secondary-800 mb-3">شراكات مع القطاع الخاص</h4>
            <ul className="space-y-2 text-sm text-secondary-700">
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <Icon name="Check" size={16} className="text-secondary-600 mt-0.5 flex-shrink-0" />
                <span>شراكة مع الشركات المحلية لدعم الأنشطة الطلابية</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <Icon name="Check" size={16} className="text-secondary-600 mt-0.5 flex-shrink-0" />
                <span>شراكة مع البنوك للتوعية المالية</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <Icon name="Check" size={16} className="text-secondary-600 mt-0.5 flex-shrink-0" />
                <span>شراكة مع شركات التقنية لدعم التحول الرقمي</span>
              </li>
            </ul>
          </div>

          <div className="bg-success-50 rounded-lg p-4 border border-success-200">
            <h4 className="text-md font-medium text-success-800 mb-3">شراكات مع المؤسسات التعليمية</h4>
            <ul className="space-y-2 text-sm text-success-700">
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <Icon name="Check" size={16} className="text-success-600 mt-0.5 flex-shrink-0" />
                <span>شراكة مع الجامعات لتقديم برامج إثرائية</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <Icon name="Check" size={16} className="text-success-600 mt-0.5 flex-shrink-0" />
                <span>شراكة مع المدارس المتميزة لتبادل الخبرات</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <Icon name="Check" size={16} className="text-success-600 mt-0.5 flex-shrink-0" />
                <span>شراكة مع مراكز التدريب لتطوير الكادر التعليمي</span>
              </li>
            </ul>
          </div>

          <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
            <h4 className="text-md font-medium text-accent-800 mb-3">شراكات مع المجتمع المحلي</h4>
            <ul className="space-y-2 text-sm text-accent-700">
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <Icon name="Check" size={16} className="text-accent-600 mt-0.5 flex-shrink-0" />
                <span>شراكة مع أولياء الأمور لدعم العملية التعليمية</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <Icon name="Check" size={16} className="text-accent-600 mt-0.5 flex-shrink-0" />
                <span>شراكة مع المساجد للتوعية الدينية والأخلاقية</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <Icon name="Check" size={16} className="text-accent-600 mt-0.5 flex-shrink-0" />
                <span>شراكة مع المراكز الثقافية لتنمية المواهب</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPartnershipsSection;