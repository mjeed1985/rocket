import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { motion } from 'framer-motion';

const SchoolAspectsPrioritySection = ({ planData, onPlanDataChange }) => {
  // المجالات التعليمية الرئيسية
  const initialDomains = [
    { id: 'leadership', name: 'القيادة والإدارة المدرسية', description: 'فعالية القيادة والإدارة المدرسية' },
    { id: 'teaching', name: 'التعليم والتعلم', description: 'جودة عمليات التعليم والتعلم' },
    { id: 'environment', name: 'البيئة المدرسية', description: 'جودة البيئة المدرسية وملاءمتها للتعلم' },
    { id: 'community', name: 'الشراكة الأسرية والمجتمعية', description: 'التواصل والتعاون مع المجتمع المحلي' },
    { id: 'achievement', name: 'التحصيل الدراسي', description: 'مستوى تحصيل الطلاب الأكاديمي' },
    { id: 'behavior', name: 'الإتجاهات والسلوك', description: 'سلوكيات الطلاب واتجاهاتهم الإيجابية' },
    { id: 'health', name: 'الصحة واللياقة العامة', description: 'الصحة البدنية والنفسية للطلاب' }
  ];

  // حالة المجالات المرتبة
  const [rankedDomains, setRankedDomains] = useState(
    planData?.schoolAspectsPriority?.rankedDomains || []
  );
  
  // حالة المجالات المتاحة للسحب
  const [availableDomains, setAvailableDomains] = useState([]);
  
  // حالة المجال الذي يتم سحبه حالياً
  const [draggedDomain, setDraggedDomain] = useState(null);
  
  // حالة عرض تفاصيل المجالات
  const [showDetails, setShowDetails] = useState(false);
  
  // تهيئة المجالات المتاحة عند بدء التحميل
  useEffect(() => {
    // إذا كانت قائمة المجالات المرتبة فارغة، نضيف جميع المجالات إلى القائمة المتاحة
    if (rankedDomains.length === 0) {
      setAvailableDomains(initialDomains);
    } else {
      // تحديث المجالات المتاحة
      const availableDomainsList = initialDomains.filter(
        domain => !rankedDomains.some(rankedDomain => rankedDomain.id === domain.id)
      );
      setAvailableDomains(availableDomainsList);
    }
  }, []);

  // تحديث بيانات الخطة
  const updatePlanData = (domains) => {
    onPlanDataChange({
      ...planData,
      schoolAspectsPriority: {
        ...planData?.schoolAspectsPriority,
        rankedDomains: domains
      }
    });
  };

  // الحصول على لون الخلفية بناءً على الترتيب
  const getBackgroundColor = (index) => {
    switch (index) {
      case 0: return 'bg-red-100 border-red-300';
      case 1: return 'bg-red-50 border-red-200';
      case 2: return 'bg-orange-100 border-orange-300';
      case 3: return 'bg-yellow-100 border-yellow-300';
      case 4: return 'bg-yellow-50 border-yellow-200';
      case 5: return 'bg-green-100 border-green-300';
      case 6: return 'bg-green-50 border-green-200';
      default: return 'bg-slate-100 border-slate-300';
    }
  };

  // الحصول على لون النص بناءً على الترتيب
  const getTextColor = (index) => {
    switch (index) {
      case 0: return 'text-red-800';
      case 1: return 'text-red-700';
      case 2: return 'text-orange-800';
      case 3: return 'text-yellow-800';
      case 4: return 'text-yellow-700';
      case 5: return 'text-green-800';
      case 6: return 'text-green-700';
      default: return 'text-slate-800';
    }
  };

  // الحصول على لون الرقم بناءً على الترتيب
  const getNumberColor = (index) => {
    switch (index) {
      case 0: return 'bg-red-500 text-white';
      case 1: return 'bg-red-400 text-white';
      case 2: return 'bg-orange-500 text-white';
      case 3: return 'bg-yellow-500 text-white';
      case 4: return 'bg-yellow-400 text-white';
      case 5: return 'bg-green-500 text-white';
      case 6: return 'bg-green-400 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  // تحريك المجال لأعلى
  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newRankedDomains = [...rankedDomains];
    [newRankedDomains[index], newRankedDomains[index - 1]] = [newRankedDomains[index - 1], newRankedDomains[index]];
    setRankedDomains(newRankedDomains);
    updatePlanData(newRankedDomains);
  };

  // تحريك المجال لأسفل
  const handleMoveDown = (index) => {
    if (index === rankedDomains.length - 1) return;
    const newRankedDomains = [...rankedDomains];
    [newRankedDomains[index], newRankedDomains[index + 1]] = [newRankedDomains[index + 1], newRankedDomains[index]];
    setRankedDomains(newRankedDomains);
    updatePlanData(newRankedDomains);
  };

  // حذف المجال من القائمة المرتبة
  const handleRemoveDomain = (id) => {
    const domainToRemove = rankedDomains.find(domain => domain.id === id);
    const newRankedDomains = rankedDomains.filter(domain => domain.id !== id);
    
    setRankedDomains(newRankedDomains);
    setAvailableDomains([...availableDomains, domainToRemove]);
    updatePlanData(newRankedDomains);
  };

  // إضافة مجال جديد
  const handleAddDomain = () => {
    const domainName = prompt('أدخل اسم المجال الجديد:');
    if (!domainName || !domainName.trim()) return;
    
    const domainDescription = prompt('أدخل وصف المجال:');
    
    const newDomain = {
      id: `custom-${Date.now()}`,
      name: domainName.trim(),
      description: domainDescription ? domainDescription.trim() : '',
      isCustom: true
    };
    
    const newRankedDomains = [...rankedDomains, newDomain];
    setRankedDomains(newRankedDomains);
    updatePlanData(newRankedDomains);
  };

  // بدء عملية السحب
  const handleDragStart = (e, domain) => {
    e.dataTransfer.setData('domain', JSON.stringify(domain));
    setDraggedDomain(domain);
  };

  // السماح بالإفلات
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // إفلات المجال في المنطقة المستهدفة
  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const domain = JSON.parse(e.dataTransfer.getData('domain'));
      
      // إذا كان المجال موجوداً بالفعل في القائمة المرتبة، نتجاهل العملية
      if (rankedDomains.some(d => d.id === domain.id)) {
        return;
      }
      
      // إضافة المجال إلى القائمة المرتبة
      const newRankedDomains = [...rankedDomains, domain];
      setRankedDomains(newRankedDomains);
      
      // إزالة المجال من القائمة المتاحة
      const newAvailableDomains = availableDomains.filter(d => d.id !== domain.id);
      setAvailableDomains(newAvailableDomains);
      
      // تحديث بيانات الخطة
      updatePlanData(newRankedDomains);
    } catch (error) {
      console.error('Error parsing dragged domain:', error);
    }
  };

  // توليد تلقائي لتحليل المجالات
  const generateDomainAnalysis = () => {
    const analysis = {
      'القيادة والإدارة المدرسية': 'فعالية القيادة والإدارة المدرسية',
      'التعليم والتعلم': 'جودة عمليات التعليم والتعلم',
      'البيئة المدرسية': 'جودة البيئة المدرسية وملاءمتها للتعلم',
      'الشراكة الأسرية والمجتمعية': 'التواصل والتعاون مع المجتمع المحلي',
      'التحصيل الدراسي': 'مستوى تحصيل الطلاب الأكاديمي',
      'الإتجاهات والسلوك': 'سلوكيات الطلاب واتجاهاتهم الإيجابية',
      'الصحة واللياقة العامة': 'الصحة البدنية والنفسية للطلاب'
    };

    setShowDetails(true);
    
    return analysis;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
          <Icon name="ListOrdered" size={32} className="text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">الجوانب المدرسية العامة وترتيبها من قبل لجنة التميز والجودة</h2>
        <p className="text-text-secondary">أولويات التطوير والتحسين</p>
        
        {/* إرشادات */}
        <div className="mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200 max-w-md mx-auto">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-right rtl:text-left">
              <h3 className="text-sm font-semibold text-accent-800 mb-1">إرشادات</h3>
              <p className="text-xs text-accent-700 leading-relaxed">
                رتب المجالات المدرسية حسب أولوية التطوير والتحسين. يمكنك سحب وإفلات المجالات أو استخدام أزرار الترتيب.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* قسم المجالات المتاحة */}
        <div className="md:col-span-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-semibold text-text-primary">المجالات المتاحة</h3>
              <Icon name="DragVertical" size={18} className="text-text-muted" />
            </div>
            
            <div className="space-y-3">
              {availableDomains.map((domain) => (
                <motion.div
                  key={domain.id}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-move shadow-sm hover:shadow-md transition-all duration-200"
                  draggable
                  onDragStart={(e) => handleDragStart(e, domain)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h4 className="text-sm font-medium text-text-primary">{domain.name}</h4>
                  <p className="text-xs text-text-secondary mt-1">{domain.description}</p>
                </motion.div>
              ))}
              
              {availableDomains.length === 0 && (
                <div className="text-center py-6 text-text-muted">
                  <Icon name="Check" size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">تم استخدام جميع المجالات</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* قسم ترتيب المجالات */}
        <div className="md:col-span-8">
          <div className="bg-black bg-opacity-90 rounded-xl border border-slate-700 p-4 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Icon name="ListOrdered" size={20} className="text-blue-400" />
                <h3 className="text-lg font-semibold text-white">المجالات الأولى بالترتيب تنازلي</h3>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddDomain}
                iconName="Plus"
                iconPosition="left"
                className="bg-blue-600 hover:bg-blue-700"
              >
                إضافة جانب جديد
              </Button>
            </div>

            {/* منطقة السحب والإفلات */}
            <div 
              className="space-y-3 min-h-[400px] p-4 rounded-lg border-2 border-dashed border-slate-600 bg-black bg-opacity-50"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {rankedDomains.map((domain, index) => (
                <motion.div
                  key={domain.id}
                  className={`p-4 rounded-lg border-2 shadow-md transition-all duration-300 ${getBackgroundColor(index)}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  layout
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getNumberColor(index)} font-bold text-lg`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className={`text-lg font-bold ${getTextColor(index)}`}>{domain.name}</h4>
                        <p className="text-sm text-slate-600">{domain.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMoveUp(index)}
                        iconName="ChevronUp"
                        className="text-slate-600 hover:bg-slate-200"
                        disabled={index === 0}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMoveDown(index)}
                        iconName="ChevronDown"
                        className="text-slate-600 hover:bg-slate-200"
                        disabled={index === rankedDomains.length - 1}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDomain(domain.id)}
                        iconName="Trash2"
                        className="text-error-600 hover:bg-error-50"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}

              {rankedDomains.length === 0 && (
                <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                  <Icon name="MoveVertical" size={48} className="mb-4 opacity-50" />
                  <p>اسحب وأفلت المجالات هنا لترتيبها حسب الأولوية</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* الجوانب المدرسية حسب المجالات */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="FileText" size={20} className="text-primary-600" />
            <h3 className="text-lg font-semibold text-text-primary">الجوانب المدرسية حسب المجالات</h3>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={generateDomainAnalysis}
            iconName="Wand2"
            iconPosition="left"
          >
            توليد تلقائي
          </Button>
        </div>

        {showDetails && (
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-text-primary">ملخص الجوانب المدرسية حسب المجالات وترتيبها</h4>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-right rtl:text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                      المجال
                    </th>
                    <th className="px-6 py-3 text-right rtl:text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                      التحليل
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {rankedDomains.map((domain, index) => (
                    <tr key={domain.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 w-8 h-8 ${getNumberColor(index)} rounded-full flex items-center justify-center font-bold`}>
                            {index + 1}
                          </div>
                          <div className="mr-3 rtl:mr-0 rtl:ml-3">
                            <div className="text-sm font-medium text-text-primary">{domain.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-text-secondary">
                          {generateDomainAnalysis()[domain.name] || 
                           'يحتاج هذا المجال إلى تحليل وتقييم شامل لتحديد نقاط القوة والضعف وفرص التحسين.'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!showDetails && (
          <div className="text-center py-8 text-text-muted">
            <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-50" />
            <p>اضغط على "توليد تلقائي" لإنشاء تحليل للمجالات المدرسية</p>
          </div>
        )}
      </div>

      {/* ملخص الترتيب */}
      {rankedDomains.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
            <Icon name="CheckSquare" size={20} className="text-success-600" />
            <h3 className="text-lg font-semibold text-text-primary">ملخص ترتيب المجالات</h3>
          </div>

          <div className="bg-success-50 rounded-lg p-4 border border-success-200">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
              <Icon name="CheckCircle" size={16} className="text-success-600" />
              <span className="text-sm font-medium text-success-800">
                تم ترتيب {rankedDomains.length} مجال حسب الأولوية
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {rankedDomains.map((domain, index) => (
                <span key={domain.id} className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getBackgroundColor(index)} ${getTextColor(index)}`}>
                  {index + 1}. {domain.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolAspectsPrioritySection;