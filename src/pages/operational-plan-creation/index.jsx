import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanningHeader from './components/PlanningHeader';
import StepsSidebar from './components/StepsSidebar';
import StepContent from './components/StepContent';
import ProgressTracker from './components/ProgressTracker';

const OperationalPlanCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [planData, setPlanData] = useState({});
  const [lastSaved, setLastSaved] = useState('منذ دقيقتين');

  // Mock data for 20 planning steps
  const planningSteps = [
    {
      id: 1,
      title: "معلومات المدرسة الأساسية",
      description: "بيانات المدرسة والإدارة",
      icon: "School",
      fields: [
        {
          name: "schoolName",
          label: "اسم المدرسة",
          type: "text",
          required: true,
          placeholder: "أدخل اسم المدرسة"
        },
        {
          name: "principalName",
          label: "اسم مدير المدرسة",
          type: "text",
          required: true,
          placeholder: "أدخل اسم المدير"
        },
        {
          name: "schoolLevel",
          label: "المرحلة التعليمية",
          type: "select",
          required: true,
          options: [
            { value: "elementary", label: "ابتدائية" },
            { value: "middle", label: "متوسطة" },
            { value: "high", label: "ثانوية" }
          ]
        }
      ],
      instructions: "ابدأ بإدخال المعلومات الأساسية للمدرسة التي ستساعد في تخصيص الخطة التشغيلية."
    },
    {
      id: 2,
      title: "رؤية ورسالة المدرسة",
      description: "تحديد الرؤية والرسالة والقيم",
      icon: "Eye",
      fields: [
        {
          name: "vision",
          label: "رؤية المدرسة",
          type: "textarea",
          required: true,
          placeholder: "اكتب رؤية المدرسة...",
          rows: 3
        },
        {
          name: "mission",
          label: "رسالة المدرسة",
          type: "textarea",
          required: true,
          placeholder: "اكتب رسالة المدرسة...",
          rows: 3
        },
        {
          name: "values",
          label: "قيم المدرسة",
          type: "textarea",
          required: true,
          placeholder: "اكتب قيم المدرسة...",
          rows: 4
        }
      ],
      instructions: "حدد الرؤية والرسالة والقيم التي توجه عمل المدرسة وتشكل هويتها التعليمية."
    },
    {
      id: 3,
      title: "تحليل البيئة الداخلية",
      description: "نقاط القوة والضعف",
      icon: "Search",
      fields: [
        {
          name: "strengths",
          label: "نقاط القوة",
          type: "textarea",
          required: true,
          placeholder: "اذكر نقاط القوة في المدرسة...",
          rows: 4
        },
        {
          name: "weaknesses",
          label: "نقاط الضعف",
          type: "textarea",
          required: true,
          placeholder: "اذكر نقاط الضعف التي تحتاج تحسين...",
          rows: 4
        }
      ],
      instructions: "قم بتحليل البيئة الداخلية للمدرسة لتحديد نقاط القوة التي يمكن الاستفادة منها ونقاط الضعف التي تحتاج معالجة."
    },
    {
      id: 4,
      title: "تحليل البيئة الخارجية",
      description: "الفرص والتهديدات",
      icon: "Globe",
      fields: [
        {
          name: "opportunities",
          label: "الفرص المتاحة",
          type: "textarea",
          required: true,
          placeholder: "اذكر الفرص المتاحة للمدرسة...",
          rows: 4
        },
        {
          name: "threats",
          label: "التهديدات والتحديات",
          type: "textarea",
          required: true,
          placeholder: "اذكر التهديدات والتحديات الخارجية...",
          rows: 4
        }
      ],
      instructions: "حلل البيئة الخارجية لتحديد الفرص التي يمكن استغلالها والتهديدات التي يجب التعامل معها."
    },
    {
      id: 5,
      title: "الأهداف الاستراتيجية",
      description: "الأهداف طويلة المدى",
      icon: "Target",
      fields: [
        {
          name: "strategicGoal1",
          label: "الهدف الاستراتيجي الأول",
          type: "textarea",
          required: true,
          placeholder: "اكتب الهدف الاستراتيجي الأول...",
          rows: 3
        },
        {
          name: "strategicGoal2",
          label: "الهدف الاستراتيجي الثاني",
          type: "textarea",
          required: true,
          placeholder: "اكتب الهدف الاستراتيجي الثاني...",
          rows: 3
        },
        {
          name: "strategicGoal3",
          label: "الهدف الاستراتيجي الثالث",
          type: "textarea",
          required: false,
          placeholder: "اكتب الهدف الاستراتيجي الثالث (اختياري)...",
          rows: 3
        }
      ],
      instructions: "حدد الأهداف الاستراتيجية طويلة المدى التي تسعى المدرسة لتحقيقها خلال السنوات القادمة."
    },
    {
      id: 6,
      title: "الأهداف التشغيلية",
      description: "الأهداف قصيرة المدى",
      icon: "CheckSquare",
      instructions: "حدد الأهداف التشغيلية قصيرة المدى التي ستساهم في تحقيق الأهداف الاستراتيجية."
    },
    {
      id: 7,
      title: "المبادرات والبرامج",
      description: "البرامج التطويرية والمبادرات",
      icon: "Lightbulb",
      instructions: "اقترح المبادرات والبرامج التي ستنفذها المدرسة لتحقيق أهدافها."
    },
    {
      id: 8,
      title: "الموارد البشرية",
      description: "احتياجات الكادر التعليمي والإداري",
      icon: "Users",
      instructions: "حدد احتياجات المدرسة من الموارد البشرية والتطوير المهني."
    },
    {
      id: 9,
      title: "الموارد المالية",
      description: "الميزانية والتمويل المطلوب",
      icon: "DollarSign",
      instructions: "ضع تقديراً للموارد المالية المطلوبة لتنفيذ الخطة التشغيلية."
    },
    {
      id: 10,
      title: "الموارد التقنية",
      description: "التجهيزات والأدوات التقنية",
      icon: "Monitor",
      instructions: "حدد احتياجات المدرسة من التجهيزات والأدوات التقنية."
    },
    {
      id: 11,
      title: "الجدول الزمني العام",
      description: "التوقيتات الرئيسية للتنفيذ",
      icon: "Calendar",
      instructions: "ضع جدولاً زمنياً عاماً لتنفيذ مكونات الخطة التشغيلية."
    },
    {
      id: 12,
      title: "مؤشرات الأداء الرئيسية",
      description: "معايير قياس النجاح",
      icon: "BarChart3",
      instructions: "حدد مؤشرات الأداء الرئيسية التي ستستخدم لقياس نجاح تنفيذ الخطة."
    },
    {
      id: 13,
      title: "خطة إدارة المخاطر",
      description: "تحديد وإدارة المخاطر المحتملة",
      icon: "AlertTriangle",
      instructions: "حدد المخاطر المحتملة وضع خططاً للتعامل معها."
    },
    {
      id: 14,
      title: "خطة التواصل",
      description: "استراتيجية التواصل مع المجتمع",
      icon: "MessageCircle",
      instructions: "ضع خطة للتواصل مع أولياء الأمور والمجتمع المحلي."
    },
    {
      id: 15,
      title: "خطة التطوير المهني",
      description: "برامج تطوير المعلمين والموظفين",
      icon: "GraduationCap",
      instructions: "حدد برامج التطوير المهني المطلوبة للكادر التعليمي والإداري."
    },
    {
      id: 16,
      title: "خطة الأنشطة اللاصفية",
      description: "الأنشطة الطلابية والبرامج الإثرائية",
      icon: "Activity",
      instructions: "خطط للأنشطة اللاصفية والبرامج الإثرائية للطلاب."
    },
    {
      id: 17,
      title: "خطة الصيانة والتطوير",
      description: "صيانة المرافق والتطوير العمراني",
      icon: "Wrench",
      instructions: "ضع خطة لصيانة المرافق المدرسية والتطوير العمراني المطلوب."
    },
    {
      id: 18,
      title: "نظام المتابعة والتقييم",
      description: "آليات المراقبة والتقييم المستمر",
      icon: "Eye",
      instructions: "ضع نظاماً للمتابعة والتقييم المستمر لتنفيذ الخطة."
    },
    {
      id: 19,
      title: "التقرير النهائي",
      description: "ملخص شامل للخطة التشغيلية",
      icon: "FileText",
      instructions: "راجع جميع مكونات الخطة وأعد تقريراً نهائياً شاملاً."
    },
    {
      id: 20,
      title: "الموافقة والاعتماد",
      description: "الحصول على الموافقات النهائية",
      icon: "CheckCircle",
      instructions: "احصل على الموافقات النهائية من الجهات المختصة لاعتماد الخطة."
    }
  ];

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      setLastSaved('الآن');
      setTimeout(() => setLastSaved('منذ دقيقة'), 60000);
    }, 120000); // Auto-save every 2 minutes

    return () => clearInterval(autoSaveInterval);
  }, []);

  const handleStepClick = (stepNumber) => {
    // Allow navigation to completed steps or the next step
    if (completedSteps.includes(stepNumber) || stepNumber <= Math.max(...completedSteps, 0) + 1) {
      setCurrentStep(stepNumber);
    }
  };

  const handleNextStep = (stepData) => {
    // Save step data
    setPlanData(prev => ({
      ...prev,
      [`step${currentStep}`]: stepData
    }));

    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }

    // Move to next step
    if (currentStep < planningSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Plan completed
      handlePlanCompletion();
    }

    setLastSaved('الآن');
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    console.log('Saving plan data:', planData);
    setLastSaved('الآن');
    // Here you would typically save to backend
  };

  const handlePreview = () => {
    console.log('Opening preview modal');
    // Here you would open a preview modal or navigate to preview page
  };

  const handleExit = () => {
    const confirmExit = window.confirm('هل أنت متأكد من الخروج؟ سيتم حفظ التقدم تلقائياً.');
    if (confirmExit) {
      navigate('/user-dashboard');
    }
  };

  const handlePlanCompletion = () => {
    console.log('Plan completed!', planData);
    // Here you would typically submit the completed plan
    navigate('/user-dashboard', { 
      state: { message: 'تم إنشاء الخطة التشغيلية بنجاح!' }
    });
  };

  const currentStepData = planningSteps[currentStep - 1];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <PlanningHeader
        planTitle="خطة تشغيلية جديدة - العام الدراسي 2024/2025"
        lastSaved={lastSaved}
        onSave={handleSave}
        onPreview={handlePreview}
        onExit={handleExit}
      />

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Main Content Area */}
        <main className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16 rtl:ml-0 rtl:mr-16' : 'ml-80 rtl:ml-0 rtl:mr-80'
        }`}>
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Progress Tracker */}
            <ProgressTracker
              currentStep={currentStep}
              totalSteps={planningSteps.length}
              completedSteps={completedSteps.length}
            />

            {/* Step Content */}
            <StepContent
              step={currentStepData}
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
              isFirstStep={currentStep === 1}
              isLastStep={currentStep === planningSteps.length}
            />
          </div>
        </main>

        {/* Sidebar */}
        <StepsSidebar
          steps={planningSteps}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={handleStepClick}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>
    </div>
  );
};

export default OperationalPlanCreation;