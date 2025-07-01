import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import aiGenerationService from '../../../services/aiGenerationService';

const LearningOutcomesSection = ({ planData, onPlanDataChange }) => {
  const [activeTab, setActiveTab] = useState('academic'); // academic, personal
  const [academicDomain, setAcademicDomain] = useState('reading');
  const [personalDomain, setPersonalDomain] = useState('islamic-values');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isGeneratingActivity, setIsGeneratingActivity] = useState(false);
  const [generatedActivity, setGeneratedActivity] = useState('');
  const [isGeneratingRecommendation, setIsGeneratingRecommendation] = useState(false);
  const [generatedRecommendation, setGeneratedRecommendation] = useState('');
  
  // حالة الأنشطة المحددة
  const [selectedActivities, setSelectedActivities] = useState({
    academic: {
      reading: [],
      math: [],
      science: []
    },
    personal: {
      'islamic-values': [],
      'self-attitude': [],
      'health-practices': [],
      'community-activities': [],
      'discipline': [],
      'self-learning': [],
      'cultural-diversity': []
    }
  });
  
  // حالة تقييم الأنشطة
  const [activityEvaluations, setActivityEvaluations] = useState({});
  
  // بيانات المجالات الأكاديمية
  const academicDomains = [
    { id: 'reading', name: 'القراءة' },
    { id: 'math', name: 'الرياضيات' },
    { id: 'science', name: 'العلوم' }
  ];
  
  // بيانات مجالات التطور الشخصي
  const personalDomains = [
    { id: 'islamic-values', name: 'الاعتزاز بالقيم الإسلامية والهوية الوطنية' },
    { id: 'self-attitude', name: 'إظهار اتجاهات إيجابية نحو الذات' },
    { id: 'health-practices', name: 'الالتزام بالممارسات الصحية السليمة' },
    { id: 'community-activities', name: 'المشاركة في الأنشطة المجتمعية والتطوعية' },
    { id: 'discipline', name: 'الالتزام بقواعد السلوك والانضباط المدرسي' },
    { id: 'self-learning', name: 'القدرة على البحث والتعلم الذاتي' },
    { id: 'cultural-diversity', name: 'الاعتزاز بالثقافة واحترام التنوع الثقافي' }
  ];
  
  // بيانات المؤشرات والأهداف والمبادرات والأنشطة
  const domainData = {
    academic: {
      reading: {
        indicators: [
          'يحقق المتعلمون نتائج متقدمة في مجال القراءة وفقاً للاختبارات الوطنية.',
          'يحقق المتعلمون تقدماً في مجال القراءة قياساً على مستوى أداء المدرسة السابق في الاختبارات الوطنية.'
        ],
        goals: [
          'أن يحقق المتعلمون نتائج متقدمة في مجال القراءة في الاختبارات الوطنية.',
          'أن يشارك المتعلمون في المسابقات الوطنية ويكتشفوا قدراتهم ومواهبهم.',
          'أن يعالج المتعلمون أخطاءهم وتعثرهم في الاختبار السابق.'
        ],
        initiatives: [
          'مبادرة (حافز): وتهدف إلى منح حوافز لمعلمي اللغة العربية في حال حصل المتعلمون على نتائج متقدمة في مجال القراءة في الاختبارات الوطنية.'
        ],
        activities: [
          'تشكيل فريق معلمي اللغة العربية.',
          'اختيار نصوص قرائية تتلاءم مع الفئة العمرية للمتعلمين وتدريبهم على تطبيق مهارات القراءة.',
          'تنفيذ اختبارات تجريبية للمتعلمين بعد الاطلاع على نماذج اختبارات سابقة ومحاكاتها.',
          'تنفيذ مسابقات دورية في مجال القراءة.',
          'الاستفادة من إذاعة الطابور الصباحي لتقديم نماذج متميزة.',
          'المشاركة في الاختبارات الوطنية (نافس).',
          'المشاركة في مسابقة (إثراء القراءة).',
          'المشاركة في مسابقة (تحدي القراءة العربي).',
          'تكثيف تدريب المتعلمين بشكل أوسع في جميع مجالات القراءة.',
          'الاستعانة بالمنصات التعليمية التي تنمي المهارات القرائية.'
        ],
        needs: [
          'وضع خطة لتدريب المتعلمين وجدولة المسابقات.',
          'تقرير أداء المدرسة في الاختبارات السابقة.',
          'الاستعانة بمدربين ذوي خبرة في مجال تجويد وتمكين المهارات القرائية.'
        ]
      },
      math: {
        indicators: [
          'يحقق المتعلمون نتائج متقدمة في مجال الرياضيات وفقاً للاختبارات الوطنية.',
          'يحقق المتعلمون تقدماً في مجال الرياضيات قياساً على مستوى أداء المدرسة السابق في الاختبارات الوطنية.'
        ],
        goals: [
          'أن يحقق المتعلمون نتائج متقدمة في مجال الرياضيات في الاختبارات الوطنية.',
          'أن يشارك المتعلمون في المسابقات الرياضية ويكتشفوا قدراتهم ومواهبهم.',
          'أن يعالج المتعلمون أخطاءهم وتعثرهم في الاختبار السابق.'
        ],
        initiatives: [
          'مبادرة (عالم الرياضيات): وتهدف إلى تنمية مهارات التفكير الرياضي لدى المتعلمين من خلال أنشطة تفاعلية.'
        ],
        activities: [
          'تشكيل فريق معلمي الرياضيات.',
          'تنفيذ ورش عمل لتنمية مهارات حل المشكلات الرياضية.',
          'إقامة معرض للوسائل التعليمية في مادة الرياضيات.',
          'تنفيذ مسابقات دورية في مجال الرياضيات.',
          'تطبيق استراتيجيات تعليمية حديثة في تدريس الرياضيات.',
          'المشاركة في الأولمبياد الوطني للرياضيات.',
          'إنشاء نادي الرياضيات المدرسي.',
          'تنفيذ برنامج علاجي للطلاب المتعثرين في الرياضيات.'
        ],
        needs: [
          'وسائل تعليمية وتقنيات حديثة لتدريس الرياضيات.',
          'تقرير أداء المدرسة في الاختبارات السابقة.',
          'برامج تدريبية لمعلمي الرياضيات.'
        ]
      },
      science: {
        indicators: [
          'يحقق المتعلمون نتائج متقدمة في مجال العلوم وفقاً للاختبارات الوطنية.',
          'يحقق المتعلمون تقدماً في مجال العلوم قياساً على مستوى أداء المدرسة السابق في الاختبارات الوطنية.'
        ],
        goals: [
          'أن يحقق المتعلمون نتائج متقدمة في مجال العلوم في الاختبارات الوطنية.',
          'أن يشارك المتعلمون في المسابقات العلمية ويكتشفوا قدراتهم ومواهبهم.',
          'أن يعالج المتعلمون أخطاءهم وتعثرهم في الاختبار السابق.'
        ],
        initiatives: [
          'مبادرة (العالم الصغير): وتهدف إلى تنمية المهارات العلمية والبحثية لدى المتعلمين من خلال التجارب العملية.'
        ],
        activities: [
          'تشكيل فريق معلمي العلوم.',
          'تفعيل المختبر المدرسي وإجراء التجارب العلمية.',
          'تنظيم زيارات علمية للمراكز البحثية والعلمية.',
          'إقامة معرض علمي سنوي.',
          'تنفيذ مسابقات دورية في مجال العلوم.',
          'المشاركة في الأولمبياد الوطني للعلوم.',
          'إنشاء نادي العلوم المدرسي.',
          'تنفيذ مشاريع بحثية علمية بسيطة.'
        ],
        needs: [
          'تجهيز المختبر المدرسي بالأدوات والمواد اللازمة.',
          'تقرير أداء المدرسة في الاختبارات السابقة.',
          'برامج تدريبية لمعلمي العلوم.'
        ]
      }
    },
    personal: {
      'islamic-values': {
        indicators: [
          'يظهر المتعلمون الاعتزاز بالقيم الإسلامية والهوية الوطنية.'
        ],
        goals: [
          'أن يلتزم المتعلمون بالقيم الإسلامية والهوية الوطنية.',
          'أن ينشر المتعلمون القيم الإسلامية والهوية الوطنية في المجتمع المحلي.'
        ],
        initiatives: [
          'مبادرة (التزام): إنشاء منصة إلكترونية تظهر مدى التزام المتعلمين بالقيم.',
          'مبادرة (اعتزاز): تخصيص جزء من الحصة الأولى للحديث عن أهمية الاعتزاز بالقيم والهوية.'
        ],
        activities: [
          'تضمين النشاط الطلابي برامج ترسخ القيم الإسلامية وتعزز الهوية الوطنية.',
          'تنفيذ مسابقة حول إنجازات الوطن وأبنائه عالميًا.',
          'تنفيذ مسابقة حول التراث الوطني وتاريخ المملكة.',
          'تعويد المتعلمين على إفشاء السلام وآداب الاستئذان.',
          'الالتزام بالتحدث باللغة الفصحى قدر الإمكان.',
          'الالتزام بالزي السعودي طيلة تواجدهم بالمدرسة.'
        ]
      },
      'self-attitude': {
        indicators: [
          'يظهر المتعلمون اتجاهات إيجابية نحو الذات.'
        ],
        goals: [
          'أن يطور المتعلمون مفهوماً إيجابياً عن ذواتهم.',
          'أن يظهر المتعلمون ثقة بالنفس في المواقف المختلفة.'
        ],
        initiatives: [
          'مبادرة (أنا إيجابي): تعزيز الجوانب الإيجابية في شخصية المتعلم.'
        ],
        activities: [
          'تنفيذ برنامج تدريبي لتنمية مهارات الثقة بالنفس.',
          'إقامة ورش عمل حول تقدير الذات.',
          'تنظيم لقاءات مع شخصيات ناجحة لعرض تجاربهم.',
          'تكليف المتعلمين بمهام قيادية في الأنشطة المدرسية.',
          'تنفيذ مسابقة "قصة نجاحي" لعرض إنجازات المتعلمين.'
        ]
      },
      'health-practices': {
        indicators: [
          'يلتزم المتعلمون بالممارسات الصحية السليمة.'
        ],
        goals: [
          'أن يمارس المتعلمون العادات الصحية السليمة.',
          'أن ينشر المتعلمون الوعي الصحي في المجتمع المدرسي.'
        ],
        initiatives: [
          'مبادرة (صحتي): تعزيز الوعي الصحي لدى المتعلمين.'
        ],
        activities: [
          'تنفيذ برنامج توعوي عن التغذية السليمة.',
          'إقامة يوم رياضي أسبوعي.',
          'تنظيم حملات توعوية عن النظافة الشخصية.',
          'إقامة معرض صحي سنوي.',
          'تفعيل دور المقصف المدرسي في تقديم وجبات صحية.'
        ]
      },
      'community-activities': {
        indicators: [
          'يشارك المتعلمون في الأنشطة المجتمعية والتطوعية.'
        ],
        goals: [
          'أن يشارك المتعلمون في الأعمال التطوعية.',
          'أن يساهم المتعلمون في خدمة المجتمع المحلي.'
        ],
        initiatives: [
          'مبادرة (بصمتي): تفعيل دور المتعلمين في خدمة المجتمع.'
        ],
        activities: [
          'تنظيم زيارات للمستشفيات ودور الرعاية.',
          'المشاركة في حملات التشجير وتنظيف البيئة.',
          'تنفيذ مشاريع خدمية للحي المجاور للمدرسة.',
          'إقامة معرض للأعمال التطوعية.',
          'تكوين فريق تطوعي مدرسي.'
        ]
      },
      'discipline': {
        indicators: [
          'يلتزم المتعلمون بقواعد السلوك والانضباط المدرسي.'
        ],
        goals: [
          'أن يلتزم المتعلمون بقواعد السلوك المدرسي.',
          'أن يحترم المتعلمون الأنظمة والقوانين المدرسية.'
        ],
        initiatives: [
          'مبادرة (انضباط): تعزيز الانضباط الذاتي لدى المتعلمين.'
        ],
        activities: [
          'إعداد ميثاق سلوكي للفصول الدراسية.',
          'تنفيذ برنامج "الطالب المثالي" شهرياً.',
          'تفعيل دور المرشد الطلابي في متابعة سلوك المتعلمين.',
          'إشراك أولياء الأمور في متابعة سلوك أبنائهم.',
          'تنفيذ ورش عمل عن أهمية الانضباط في الحياة.'
        ]
      },
      'self-learning': {
        indicators: [
          'يظهر المتعلمون قدرة على البحث والتعلم الذاتي.'
        ],
        goals: [
          'أن يكتسب المتعلمون مهارات البحث العلمي.',
          'أن يمارس المتعلمون التعلم الذاتي.'
        ],
        initiatives: [
          'مبادرة (باحث): تنمية مهارات البحث العلمي لدى المتعلمين.'
        ],
        activities: [
          'تدريب المتعلمين على استخدام مصادر المعلومات المختلفة.',
          'تكليف المتعلمين بمشاريع بحثية بسيطة.',
          'تفعيل دور المكتبة المدرسية.',
          'تنظيم مسابقة للبحوث العلمية.',
          'إنشاء نادي للباحثين الصغار.'
        ]
      },
      'cultural-diversity': {
        indicators: [
          'يظهر المتعلمون اعتزازاً بالثقافة واحتراماً للتنوع الثقافي.'
        ],
        goals: [
          'أن يعتز المتعلمون بثقافتهم الوطنية.',
          'أن يحترم المتعلمون التنوع الثقافي.'
        ],
        initiatives: [
          'مبادرة (ثقافتي): تعزيز الهوية الثقافية لدى المتعلمين.'
        ],
        activities: [
          'تنظيم معرض للتراث الوطني.',
          'إقامة أسبوع ثقافي يعرض ثقافات متنوعة.',
          'تنفيذ مسابقة في الشعر والأدب.',
          'تنظيم رحلات للمتاحف والمعالم الثقافية.',
          'دعوة شخصيات ثقافية للحديث مع المتعلمين.'
        ]
      }
    }
  };
  
  // حالات تقييم الأنشطة
  const implementationStatuses = [
    { id: 'not-started', name: 'لم يبدأ' },
    { id: 'in-progress', name: 'قيد التنفيذ' },
    { id: 'completed', name: 'مُنجَز' }
  ];
  
  const achievementLevels = [
    { id: 'low', name: 'منخفض' },
    { id: 'medium', name: 'متوسط' },
    { id: 'high', name: 'مرتفع' }
  ];
  
  const goalAchievementStatuses = [
    { id: 'achieved', name: 'متحقق' },
    { id: 'not-achieved', name: 'غير متحقق' }
  ];
  
  // الحصول على بيانات المجال الحالي
  const getCurrentDomainData = () => {
    if (activeTab === 'academic') {
      return domainData.academic[academicDomain];
    } else {
      return domainData.personal[personalDomain];
    }
  };
  
  // تحديث الأنشطة المحددة
  const handleActivityToggle = (activity) => {
    if (activeTab === 'academic') {
      const currentActivities = [...selectedActivities.academic[academicDomain]];
      const activityIndex = currentActivities.indexOf(activity);
      
      if (activityIndex === -1) {
        currentActivities.push(activity);
      } else {
        currentActivities.splice(activityIndex, 1);
      }
      
      setSelectedActivities({
        ...selectedActivities,
        academic: {
          ...selectedActivities.academic,
          [academicDomain]: currentActivities
        }
      });
    } else {
      const currentActivities = [...selectedActivities.personal[personalDomain]];
      const activityIndex = currentActivities.indexOf(activity);
      
      if (activityIndex === -1) {
        currentActivities.push(activity);
      } else {
        currentActivities.splice(activityIndex, 1);
      }
      
      setSelectedActivities({
        ...selectedActivities,
        personal: {
          ...selectedActivities.personal,
          [personalDomain]: currentActivities
        }
      });
    }
  };
  
  // تحديث تقييم النشاط
  const handleActivityEvaluation = (activity, field, value) => {
    setActivityEvaluations({
      ...activityEvaluations,
      [activity]: {
        ...activityEvaluations[activity],
        [field]: value
      }
    });
  };
  
  // توليد نشاط إبداعي باستخدام الذكاء الاصطناعي
  const handleGenerateCreativeActivity = async () => {
    setIsGeneratingActivity(true);
    
    try {
      const domain = activeTab === 'academic' ? academicDomain : personalDomain;
      const domainName = activeTab === 'academic' 
        ? academicDomains.find(d => d.id === academicDomain)?.name 
        : personalDomains.find(d => d.id === personalDomain)?.name;
      
      const prompt = `اقترح نشاطاً إبداعياً ومبتكراً لتحسين نواتج التعلم في مجال "${domainName}" للطلاب. 
      يجب أن يكون النشاط:
      - عملي وقابل للتنفيذ في المدرسة
      - يراعي الفروق الفردية بين الطلاب
      - يوظف التقنية الحديثة
      - يعزز مهارات التفكير العليا
      - يشجع على التعلم النشط والتفاعلي
      
      قدم وصفاً تفصيلياً للنشاط في فقرة واحدة (100-150 كلمة).`;
      
      const activity = await aiGenerationService.generateContent(prompt, { temperature: 0.8 });
      setGeneratedActivity(activity);
      
      // إضافة النشاط المولد إلى قائمة الأنشطة المحددة
      if (activeTab === 'academic') {
        setSelectedActivities({
          ...selectedActivities,
          academic: {
            ...selectedActivities.academic,
            [academicDomain]: [...selectedActivities.academic[academicDomain], activity]
          }
        });
      } else {
        setSelectedActivities({
          ...selectedActivities,
          personal: {
            ...selectedActivities.personal,
            [personalDomain]: [...selectedActivities.personal[personalDomain], activity]
          }
        });
      }
      
    } catch (error) {
      console.error('Error generating creative activity:', error);
      alert('حدث خطأ أثناء توليد النشاط الإبداعي. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsGeneratingActivity(false);
    }
  };
  
  // توليد توصيات ذكية باستخدام الذكاء الاصطناعي
  const handleGenerateRecommendations = async () => {
    setIsGeneratingRecommendation(true);
    
    try {
      // تحليل الأنشطة ذات الإنجاز المنخفض أو غير المتحققة
      const lowPerformanceActivities = Object.entries(activityEvaluations)
        .filter(([_, evaluation]) => 
          evaluation.achievementLevel === 'low' || 
          evaluation.goalAchievement === 'not-achieved'
        )
        .map(([activity]) => activity);
      
      if (lowPerformanceActivities.length === 0) {
        setGeneratedRecommendation('لم يتم تحديد أي أنشطة ذات أداء منخفض أو أهداف غير متحققة. يرجى تقييم الأنشطة أولاً.');
        return;
      }
      
      const activitiesText = lowPerformanceActivities.join('\n- ');
      
      const prompt = `أنت مستشار تعليمي متخصص في تحسين نواتج التعلم. 
      قدم توصيات عملية ومبتكرة لتحسين الأنشطة التالية التي تواجه تحديات في التنفيذ أو تحقيق أهدافها:
      
      - ${activitiesText}
      
      لكل نشاط، قدم:
      1. تحليل موجز للتحديات المحتملة
      2. توصيات محددة وعملية للتحسين
      3. أفكار مبتكرة لزيادة فعالية النشاط
      
      قدم إجابتك في فقرات منظمة ومرقمة، مع التركيز على الحلول العملية والقابلة للتطبيق.`;
      
      const recommendations = await aiGenerationService.generateContent(prompt, { temperature: 0.7 });
      setGeneratedRecommendation(recommendations);
      
    } catch (error) {
      console.error('Error generating recommendations:', error);
      setGeneratedRecommendation('حدث خطأ أثناء توليد التوصيات. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsGeneratingRecommendation(false);
    }
  };
  
  // حفظ التقييم
  const handleSaveEvaluation = () => {
    if (!selectedActivity) {
      alert('يرجى اختيار نشاط للتقييم');
      return;
    }
    
    const evaluation = activityEvaluations[selectedActivity] || {};
    
    if (!evaluation.implementationStatus || !evaluation.achievementLevel || !evaluation.goalAchievement) {
      alert('يرجى إكمال جميع حقول التقييم');
      return;
    }
    
    alert('تم حفظ التقييم بنجاح');
    
    // تحديث بيانات الخطة
    const updatedPlanData = {
      ...planData,
      learningOutcomes: {
        ...planData?.learningOutcomes,
        evaluations: {
          ...planData?.learningOutcomes?.evaluations,
          [selectedActivity]: evaluation
        }
      }
    };
    
    onPlanDataChange(updatedPlanData);
  };
  
  // تحديث بيانات الخطة عند تغيير الأنشطة المحددة
  React.useEffect(() => {
    const updatedPlanData = {
      ...planData,
      learningOutcomes: {
        ...planData?.learningOutcomes,
        selectedActivities
      }
    };
    
    onPlanDataChange(updatedPlanData);
  }, [selectedActivities]);
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
          <Icon name="GraduationCap" size={32} className="text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">خطة تحسين نواتج التعلم</h2>
        <p className="text-text-secondary">تطوير وتحسين نواتج التعلم الأكاديمية والشخصية</p>
        
        {/* إرشادات */}
        <div className="mt-4 p-4 bg-accent-50 rounded-lg border border-accent-200 max-w-md mx-auto">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
            <div className="text-right rtl:text-left">
              <h3 className="text-sm font-semibold text-accent-800 mb-1">إرشادات</h3>
              <p className="text-xs text-accent-700 leading-relaxed">
                حدد المجالات الأكاديمية والشخصية التي تريد تحسينها، واختر الأنشطة المناسبة لكل مجال، ثم قم بتقييم الأنشطة وتوليد التوصيات الذكية.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-3 px-4 text-center rounded-lg transition-all duration-200 ${
              activeTab === 'academic' 
                ? 'bg-primary-100 text-primary-800 font-semibold' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            onClick={() => setActiveTab('academic')}
          >
            التحصيل التعليمي
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center rounded-lg transition-all duration-200 ${
              activeTab === 'personal' 
                ? 'bg-secondary-100 text-secondary-800 font-semibold' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            onClick={() => setActiveTab('personal')}
          >
            التطور الشخصي والصحي والاجتماعي
          </button>
        </div>

        {/* Domain Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-2">
            {activeTab === 'academic' ? 'حدد المجال الأكاديمي:' : 'حدد مجال التطور:'}
          </label>
          <select
            value={activeTab === 'academic' ? academicDomain : personalDomain}
            onChange={(e) => activeTab === 'academic' ? setAcademicDomain(e.target.value) : setPersonalDomain(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
          >
            {activeTab === 'academic' ? (
              academicDomains.map(domain => (
                <option key={domain.id} value={domain.id}>{domain.name}</option>
              ))
            ) : (
              personalDomains.map(domain => (
                <option key={domain.id} value={domain.id}>{domain.name}</option>
              ))
            )}
          </select>
        </div>

        {/* Domain Details */}
        <div className="space-y-6">
          {/* Indicators */}
          <div className="space-y-2">
            <h3 className="text-md font-semibold text-text-primary">المؤشر:</h3>
            <ul className="space-y-2">
              {getCurrentDomainData().indicators.map((indicator, index) => (
                <li key={index} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {indicator}
                </li>
              ))}
            </ul>
          </div>

          {/* Goals */}
          <div className="space-y-2">
            <h3 className="text-md font-semibold text-text-primary">أهداف تحسين المؤشر:</h3>
            <ul className="space-y-2">
              {getCurrentDomainData().goals.map((goal, index) => (
                <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                  <input
                    type="checkbox"
                    id={`goal-${index}`}
                    className="mt-1"
                  />
                  <label htmlFor={`goal-${index}`} className="text-text-secondary">{goal}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* Initiatives */}
          <div className="space-y-2">
            <h3 className="text-md font-semibold text-text-primary">المبادرات الرئيسية:</h3>
            <ul className="space-y-2">
              {getCurrentDomainData().initiatives.map((initiative, index) => (
                <li key={index} className="bg-primary-50 p-3 rounded-lg border border-primary-200 text-primary-800">
                  {initiative}
                </li>
              ))}
            </ul>
          </div>

          {/* Activities */}
          <div className="space-y-2">
            <h3 className="text-md font-semibold text-text-primary">الأنشطة وأساليب التنفيذ:</h3>
            <ul className="space-y-2">
              {getCurrentDomainData().activities.map((activity, index) => (
                <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                  <input
                    type="checkbox"
                    id={`activity-${index}`}
                    checked={activeTab === 'academic' 
                      ? selectedActivities.academic[academicDomain].includes(activity)
                      : selectedActivities.personal[personalDomain].includes(activity)
                    }
                    onChange={() => handleActivityToggle(activity)}
                    className="mt-1"
                  />
                  <label htmlFor={`activity-${index}`} className="text-text-secondary">{activity}</label>
                </li>
              ))}
              
              {/* Generated Activity */}
              {generatedActivity && (
                <li className="flex items-start space-x-2 rtl:space-x-reverse">
                  <input
                    type="checkbox"
                    id="activity-generated"
                    checked={activeTab === 'academic' 
                      ? selectedActivities.academic[academicDomain].includes(generatedActivity)
                      : selectedActivities.personal[personalDomain].includes(generatedActivity)
                    }
                    onChange={() => handleActivityToggle(generatedActivity)}
                    className="mt-1"
                  />
                  <label htmlFor="activity-generated" className="text-text-secondary bg-accent-50 p-2 rounded-lg border border-accent-200">
                    {generatedActivity}
                  </label>
                </li>
              )}
            </ul>
            
            {/* Generate Creative Activity Button */}
            <Button
              variant="outline"
              onClick={handleGenerateCreativeActivity}
              disabled={isGeneratingActivity}
              loading={isGeneratingActivity}
              iconName={isGeneratingActivity ? "Loader2" : "Wand2"}
              className="mt-2 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
            >
              💡 اقترح نشاطاً إبداعياً (AI)
            </Button>
          </div>

          {/* Needs */}
          <div className="space-y-2">
            <h3 className="text-md font-semibold text-text-primary">الاحتياجات:</h3>
            <ul className="space-y-2">
              {getCurrentDomainData().needs.map((need, index) => (
                <li key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                  <input
                    type="checkbox"
                    id={`need-${index}`}
                    className="mt-1"
                  />
                  <label htmlFor={`need-${index}`} className="text-text-secondary">{need}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Evaluation and Recommendations */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">قياس النواتج والتوصيات الذكية</h3>
        
        {/* Activity Evaluation */}
        <div className="space-y-4 mb-6">
          <h4 className="text-md font-medium text-text-primary">قياس نواتج المبادرات والأنشطة:</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                النشاط المُراد قياسه:
              </label>
              <select
                value={selectedActivity || ''}
                onChange={(e) => setSelectedActivity(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
              >
                <option value="">اختر النشاط</option>
                {Object.entries(selectedActivities).flatMap(([tabKey, domains]) => 
                  Object.entries(domains).flatMap(([domainKey, activities]) => 
                    activities.map(activity => (
                      <option key={`${tabKey}-${domainKey}-${activity}`} value={activity}>
                        {activity}
                      </option>
                    ))
                  )
                )}
              </select>
            </div>
            
            {selectedActivity && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    حالة التنفيذ:
                  </label>
                  <select
                    value={activityEvaluations[selectedActivity]?.implementationStatus || ''}
                    onChange={(e) => handleActivityEvaluation(selectedActivity, 'implementationStatus', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
                  >
                    <option value="">اختر الحالة</option>
                    {implementationStatuses.map(status => (
                      <option key={status.id} value={status.id}>{status.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    درجة الإنجاز:
                  </label>
                  <select
                    value={activityEvaluations[selectedActivity]?.achievementLevel || ''}
                    onChange={(e) => handleActivityEvaluation(selectedActivity, 'achievementLevel', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
                  >
                    <option value="">اختر المستوى</option>
                    {achievementLevels.map(level => (
                      <option key={level.id} value={level.id}>{level.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    تحقق الهدف:
                  </label>
                  <select
                    value={activityEvaluations[selectedActivity]?.goalAchievement || ''}
                    onChange={(e) => handleActivityEvaluation(selectedActivity, 'goalAchievement', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white"
                  >
                    <option value="">اختر الحالة</option>
                    {goalAchievementStatuses.map(status => (
                      <option key={status.id} value={status.id}>{status.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            
            {selectedActivity && (
              <Button
                variant="primary"
                onClick={handleSaveEvaluation}
                className="mt-2"
              >
                حفظ التقييم
              </Button>
            )}
          </div>
        </div>
        
        {/* Recommendations */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-text-primary">التوصيات والمقترحات العلاجية:</h4>
          
          <div className="space-y-4">
            {/* Performance Analysis */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h5 className="text-sm font-medium text-text-primary mb-2">تحليل الأداء الحالي:</h5>
              <p className="text-sm text-text-secondary">
                {Object.entries(activityEvaluations).filter(([_, evaluation]) => 
                  evaluation.achievementLevel === 'low' || 
                  evaluation.goalAchievement === 'not-achieved'
                ).length > 0 ? (
                  `يوجد ${Object.entries(activityEvaluations).filter(([_, evaluation]) => 
                    evaluation.achievementLevel === 'low' || 
                    evaluation.goalAchievement === 'not-achieved'
                  ).length} نشاط بحاجة إلى تحسين وتطوير.`
                ) : (
                  'لم يتم تقييم أي أنشطة بعد أو لا توجد أنشطة ذات أداء منخفض.'
                )}
              </p>
            </div>
            
            {/* Generate Recommendations Button */}
            <Button
              variant="success"
              onClick={handleGenerateRecommendations}
              disabled={isGeneratingRecommendation || Object.keys(activityEvaluations).length === 0}
              loading={isGeneratingRecommendation}
              iconName={isGeneratingRecommendation ? "Loader2" : "Wand2"}
              className="w-full bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
            >
              💡 توليد توصيات ذكية الآن (AI)
            </Button>
            
            {/* Recommendations Box */}
            {generatedRecommendation && (
              <div className="bg-success-50 p-4 rounded-lg border border-success-200">
                <h5 className="text-sm font-medium text-success-800 mb-2">التوصيات المقترحة:</h5>
                <div className="text-sm text-success-700 whitespace-pre-line">
                  {generatedRecommendation}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningOutcomesSection;