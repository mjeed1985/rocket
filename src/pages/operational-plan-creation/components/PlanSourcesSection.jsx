import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const PlanSourcesSection = ({ planData, onPlanDataChange }) => {
  const [sourcesText, setSourcesText] = useState(
    planData?.planSources?.text || ''
  );
  
  const [selectedSources, setSelectedSources] = useState(
    planData?.planSources?.selectedSources || []
  );
  
  const [isGenerating, setIsGenerating] = useState(false);

  // قائمة المصادر الأساسية
  const sourcesOptions = [
    { 
      id: 'source-1', 
      name: 'قرار مجلس الوزراء ذي الرقم (308) بتاريخ 18/7/1437هـ بالموافقة على رؤية المملكة العربية السعودية 2030'
    },
    { 
      id: 'source-2', 
      name: 'قرار مجلس الوزراء ذي الرقم (362) بتاريخ 1/9/1437هـ بالموافقة على برنامج التحول الوطني المنبثق من الرؤية'
    },
    { 
      id: 'source-3', 
      name: 'الأهداف الاستراتيجية لوزارة التعليم - المشاريع الوزارية- الاستراتيجية الوطنية لتطوير التعليم العام'
    },
    { 
      id: 'source-4', 
      name: 'مؤشرات قياس الأداء + دليل مجتمعات التعلم المهنية'
    },
    { 
      id: 'source-5', 
      name: 'مبادرة وزارة التعليم في برنامج التحول الوطني'
    },
    { 
      id: 'source-6', 
      name: 'الاختبارات الوطنية والمنافسات (عالميًا، إقليميًا، محليًا)'
    },
    { 
      id: 'source-7', 
      name: 'الصلاحيات الممنوحة لمدير التعليم ومديري المدرسة'
    },
    { 
      id: 'source-8', 
      name: 'نتائج تقويم الخطط التشغيلية للشؤون التعليمية لتحليل تشخيص الواقع التعليمي للبيئة المدرسية (لجنة التميز المدرسي والتقويم الذاتي للمدرسة)'
    },
    { 
      id: 'source-9', 
      name: 'الدليل التنفيذي لخطة النشاط + دليل الأنشطة + دليل الشراكة المجتمعية والأسرة'
    },
    { 
      id: 'source-10', 
      name: 'لائحة تقويم الطالب - اللائحة التنظيمية للعمل التطوعي في مدارس التعليم العام'
    },
    { 
      id: 'source-11', 
      name: 'وثيقة الدعم المالي للمشاريع النوعية'
    },
    { 
      id: 'source-12', 
      name: 'دليل الإشراف الجديد لتمكين المدارس'
    },
    { 
      id: 'source-13', 
      name: 'إصدارات هيئة تقويم التعليم والتدريب'
    }
  ];

  const handleSourceToggle = (sourceId) => {
    const source = sourcesOptions.find(s => s.id === sourceId);
    if (!source) return;
    
    if (selectedSources.some(s => s.id === sourceId)) {
      setSelectedSources(selectedSources.filter(s => s.id !== sourceId));
    } else {
      setSelectedSources([...selectedSources, source]);
    }
    
    updatePlanData(sourcesText);
  };

  const handleSourcesTextChange = (e) => {
    const newText = e.target.value;
    setSourcesText(newText);
    updatePlanData(newText);
  };

  const updatePlanData = (text) => {
    onPlanDataChange({
      ...planData,
      planSources: {
        text,
        selectedSources
      }
    });
  };
  
  const handleGenerateAllSources = () => {
    setIsGenerating(true);
    
    // إضافة جميع المصادر
    setSelectedSources(sourcesOptions);
    
    // إضافة وصف تفصيلي للمصادر
    const generatedText = `تم الاعتماد في بناء الخطة التشغيلية على مجموعة من المصادر والمراجع الرسمية، أهمها:

1. رؤية المملكة 2030 كإطار عام للخطة التشغيلية، حيث تم الاستناد إلى قرار مجلس الوزراء ذي الرقم (308) بتاريخ 18/7/1437هـ.

2. برنامج التحول الوطني المنبثق من الرؤية، وفقاً لقرار مجلس الوزراء ذي الرقم (362) بتاريخ 1/9/1437هـ.

3. الأهداف الاستراتيجية لوزارة التعليم والمشاريع الوزارية والاستراتيجية الوطنية لتطوير التعليم العام.

4. مؤشرات قياس الأداء ودليل مجتمعات التعلم المهنية لتحديد معايير النجاح.

5. تم تحليل نتائج التقويم الذاتي للمدرسة لتحديد مجالات التحسين والتطوير.

6. الاستفادة من تقارير المشرفين التربويين لتحديد نقاط القوة والضعف.

7. تحليل نتائج الطلاب في الاختبارات الوطنية والمنافسات المحلية والإقليمية والعالمية.

8. الاستناد إلى الأدلة والوثائق الرسمية مثل الدليل التنفيذي لخطة النشاط ودليل الشراكة المجتمعية والأسرة.`;
    
    setSourcesText(generatedText);
    
    // تحديث بيانات الخطة
    onPlanDataChange({
      ...planData,
      planSources: {
        text: generatedText,
        selectedSources: sourcesOptions
      }
    });
    
    setTimeout(() => {
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon name="FileText" size={24} className="text-primary-600" />
            <div>
              <h2 className="text-xl font-bold text-text-primary">المصادر التي اعتمد عليها فريق إعداد الخطة وبناء الخطة</h2>
              <p className="text-text-secondary mt-1">قائمة بالوثائق والمراجع الأساسية التي استند إليها فريق العمل في تطوير هذه الخطة التشغيلية.</p>
            </div>
          </div>
        </div>
        
        {/* توليد قائمة المصادر الأساسية */}
        <Button
          variant="primary"
          size="lg"
          onClick={handleGenerateAllSources}
          disabled={isGenerating}
          loading={isGenerating}
          iconName={isGenerating ? "Loader2" : "Wand2"}
          className="w-full mb-6"
        >
          {isGenerating ? 'جاري توليد قائمة المصادر...' : 'توليد قائمة المصادر الأساسية'}
        </Button>
        
        {/* إرشادات */}
        <div className="bg-accent-50 rounded-lg p-4 border border-accent-200 mb-6">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-right rtl:text-left">
              <p className="text-sm text-accent-700">
                يمكنك إدخال المصادر هنا، أو استخدام زر التوليد التلقائي أعلاه...
              </p>
            </div>
          </div>
        </div>
        
        {/* قائمة المصادر */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
            <Icon name="BookOpen" size={20} className="text-primary-600" />
            <h3 className="text-lg font-semibold text-text-primary">مصادر بناء الخطة</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sourcesOptions.map((source) => (
              <div
                key={source.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 flex items-start ${
                  selectedSources.some(s => s.id === source.id)
                    ? 'border-primary-300 bg-primary-50 text-primary-800'
                    : 'border-slate-200 bg-white hover:border-primary-200 hover:bg-primary-25'
                }`}
                onClick={() => handleSourceToggle(source.id)}
              >
                <div className="flex-shrink-0 mt-1 ml-3 rtl:ml-0 rtl:mr-3">
                  <input
                    type="checkbox"
                    checked={selectedSources.some(s => s.id === source.id)}
                    onChange={() => {}}
                    className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                  />
                </div>
                <span className="text-sm">{source.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* وصف المصادر */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
            <Icon name="FileText" size={20} className="text-secondary-600" />
            <div>
              <h3 className="text-lg font-semibold text-text-primary">وصف مصادر بناء الخطة</h3>
              <p className="text-sm text-text-secondary">وصف تفصيلي للمصادر المستخدمة</p>
            </div>
          </div>

          <div className="space-y-2">
            <textarea
              rows={10}
              placeholder="اكتب وصفاً تفصيلياً للمصادر والمراجع التي تم الاعتماد عليها في بناء الخطة التشغيلية..."
              value={sourcesText}
              onChange={handleSourcesTextChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
            />
          </div>
        </div>
      </div>
      
      {/* ملخص المصادر المختارة */}
      {selectedSources.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
            <Icon name="CheckSquare" size={20} className="text-success-600" />
            <h3 className="text-lg font-semibold text-text-primary">المصادر المختارة</h3>
          </div>

          <div className="bg-success-50 rounded-lg p-4 border border-success-200">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
              <Icon name="CheckCircle" size={16} className="text-success-600" />
              <span className="text-sm font-medium text-success-800">
                تم اختيار {selectedSources.length} مصدر
              </span>
            </div>
            <div className="space-y-2 mt-3">
              {selectedSources.map((source) => (
                <div key={source.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Icon name="Check" size={14} className="text-success-600" />
                  <span className="text-sm text-success-700">{source.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanSourcesSection;