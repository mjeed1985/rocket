import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanningHeader from './components/PlanningHeader';
import StepsSidebar from './components/StepsSidebar';
import ProgressTracker from './components/ProgressTracker';
import BasicInfoSection from './components/BasicInfoSection';
import PlanningCommitteeSection from './components/PlanningCommitteeSection';
import ExcellenceCommitteeSection from './components/ExcellenceCommitteeSection';
import EducationStrategicGoalsSection from './components/EducationStrategicGoalsSection';
import SchoolStaffSection from './components/SchoolStaffSection';
import PlanSourcesSection from './components/PlanSourcesSection';
import SchoolAspectsSection from './components/SchoolAspectsSection';
import SchoolAspectsPrioritySection from './components/SchoolAspectsPrioritySection';
import SelfEvaluationSection from './components/SelfEvaluationSection';
import SwotAnalysisSection from './components/SwotAnalysisSection';
import EthicsSection from './components/EthicsSection';
import GoalsSection from './components/GoalsSection';
import ProgramsInitiativesSection from './components/ProgramsInitiativesSection';
import ClassVisitPlanSection from './components/ClassVisitPlanSection';
import ProgramTimelineSection from './components/ProgramTimelineSection';
import DigitalTransformationSection from './components/DigitalTransformationSection';
import PlanMonitoringSection from './components/PlanMonitoringSection';
import RiskManagementSection from './components/RiskManagementSection';
import CommunityPartnershipsSection from './components/CommunityPartnershipsSection';
import StaffDevelopmentSection from './components/StaffDevelopmentSection';
import EvaluationSection from './components/EvaluationSection';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const OperationalPlanCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([1]); // Mark first step as completed by default
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [planData, setPlanData] = useState({});
  const [lastSaved, setLastSaved] = useState('منذ دقيقتين');

  // أقسام الخطة التشغيلية الجديدة
  const planningSteps = [
    {
      id: 1,
      title: "معلومات المدرسة الأساسية",
      description: "بيانات المدرسة والإدارة",
      icon: "School",
      component: BasicInfoSection
    },
    {
      id: 2,
      title: "تكوين لجنة إعداد الخطة التشغيلية",
      description: "تشكيل وتحديد مهام لجنة الإعداد",
      icon: "Users",
      component: PlanningCommitteeSection
    },
    {
      id: 3,
      title: "لجنة التميز المدرسي",
      description: "تشكيل وتحديد مهام لجنة التميز",
      icon: "Award",
      component: ExcellenceCommitteeSection
    },
    {
      id: 4,
      title: "الاهداف الاستراتيجية للتعليم",
      description: "تحديد الأهداف العامة والخاصة",
      icon: "Target",
      component: EducationStrategicGoalsSection
    },
    {
      id: 5,
      title: "منسوبي المدرسة",
      description: "بيانات الكادر التعليمي والإداري",
      icon: "Users",
      component: SchoolStaffSection
    },
    {
      id: 6,
      title: "مصادر بناء الخطة التشغيلية",
      description: "المراجع والمصادر المستخدمة",
      icon: "BookOpen",
      component: PlanSourcesSection
    },
    {
      id: 7,
      title: "الجوانب المدرسية العامة وترتيبها",
      description: "أولويات التطوير والتحسين",
      icon: "ListOrdered",
      component: SchoolAspectsSection
    },
    {
      id: 8,
      title: "الجوانب المدرسية العامة وترتيبها من قبل لجنة التميز والجودة",
      description: "أولويات التطوير والتحسين",
      icon: "ListOrdered",
      component: SchoolAspectsPrioritySection
    },
    {
      id: 9,
      title: "مجالات التقويم الذاتي والمستفيدون",
      description: "تحديد مجالات التقويم والفئات المستهدفة",
      icon: "ClipboardCheck",
      component: SelfEvaluationSection
    },
    {
      id: 10,
      title: "التحليل الرباعي (SWOT)",
      description: "تحليل نقاط القوة والضعف والفرص والتهديدات",
      icon: "PieChart",
      component: SwotAnalysisSection
    },
    {
      id: 11,
      title: "الميثاق الأخلاقي والقيم الأساسية",
      description: "تحديد الميثاق الأخلاقي والقيم",
      icon: "Shield",
      component: EthicsSection
    },
    {
      id: 12,
      title: "الأهداف الاستراتيجية والتفصيلية للمدرسة",
      description: "تحديد الأهداف الاستراتيجية والتفصيلية",
      icon: "Target",
      component: GoalsSection
    },
    {
      id: 13,
      title: "البرامج والمبادرات التنفيذية",
      description: "تحديد برامج ومبادرات تنفيذ الخطة",
      icon: "Lightbulb",
      component: ProgramsInitiativesSection
    },
    {
      id: 14,
      title: "خطة زيارات المدير للمعلمين",
      description: "جدول زيارات المدير للفصول",
      icon: "Calendar",
      component: ClassVisitPlanSection
    },
    {
      id: 15,
      title: "نموذج الكشف الزمني لتحديد موعد تنفيذ البرامج",
      description: "تحديد الإطار الزمني لتنفيذ البرامج",
      icon: "Calendar",
      component: ProgramTimelineSection
    },
    {
      id: 16,
      title: "استراتيجية التحول الرقمي في التعليم",
      description: "خطة التحول الرقمي والتقنية",
      icon: "Monitor",
      component: DigitalTransformationSection
    },
    {
      id: 17,
      title: "متابعة تنفيذ الخطة من قبل الإدارة المدرسية",
      description: "آليات المتابعة والإشراف",
      icon: "Eye",
      component: PlanMonitoringSection
    },
    {
      id: 18,
      title: "إدارة المخاطر والتحديات المتوقعة",
      description: "تحديد وإدارة المخاطر المحتملة",
      icon: "AlertTriangle",
      component: RiskManagementSection
    },
    {
      id: 19,
      title: "الشراكات المجتمعية والمؤسسية",
      description: "بناء شراكات مع المجتمع والمؤسسات",
      icon: "Handshake",
      component: CommunityPartnershipsSection
    },
    {
      id: 20,
      title: "تنمية الكادر التعليمي والإداري",
      description: "خطة تطوير قدرات الكادر",
      icon: "GraduationCap",
      component: StaffDevelopmentSection
    },
    {
      id: 21,
      title: "التقويم والمتابعة والجدول الزمني",
      description: "آليات التقويم والمتابعة",
      icon: "BarChart3",
      component: EvaluationSection
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
    // Allow navigation to any step without restrictions
    setCurrentStep(stepNumber);
    
    // Mark the step as visited if not already completed
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps(prev => [...prev, stepNumber]);
    }
  };

  const handlePlanDataChange = (newData) => {
    setPlanData(prev => ({
      ...prev,
      ...newData
    }));
    setLastSaved('الآن');
    
    // Mark current step as completed if not already
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
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
    
    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }
    
    // Show success message
    alert('تم حفظ الخطة بنجاح');
  };

  const handlePreview = () => {
    console.log('Opening preview modal');
    // Here you would open a preview modal or navigate to preview page
    alert('سيتم فتح معاينة الخطة قريباً');
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
  const StepComponent = currentStepData.component;

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
            {StepComponent ? (
              <div className="bg-white rounded-lg border border-slate-200 shadow-card-1 p-6">
                <div className="flex items-start space-x-4 rtl:space-x-reverse mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-primary">
                    <Icon name={currentStepData.icon} size={24} color="white" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-text-primary mb-2">
                      {currentStepData.title}
                    </h1>
                    <p className="text-text-secondary leading-relaxed">
                      {currentStepData.description}
                    </p>
                  </div>
                </div>
                
                <StepComponent 
                  planData={planData} 
                  onPlanDataChange={handlePlanDataChange}
                  onChange={handlePlanDataChange}
                  strategicGoals={planData.strategicGoals || []}
                  ethicsCharter={planData.ethicsCharter || {}}
                  evaluationMonitoring={planData.evaluationMonitoring || {}}
                />
                
                {/* Navigation Footer */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      {currentStep > 1 && (
                        <Button
                          variant="ghost"
                          iconName="ChevronRight"
                          iconPosition="right"
                          onClick={handlePreviousStep}
                        >
                          الخطوة السابقة
                        </Button>
                      )}
                    </div>

                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Button
                        variant="secondary"
                        iconName="Save"
                        iconPosition="left"
                        onClick={handleSave}
                      >
                        حفظ كمسودة
                      </Button>
                      
                      <Button
                        variant="primary"
                        iconName={currentStep === planningSteps.length ? "CheckCircle" : "ChevronLeft"}
                        iconPosition="left"
                        onClick={() => handleNextStep(planData)}
                      >
                        {currentStep === planningSteps.length ? "إنهاء الخطة" : "الخطوة التالية"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-slate-200 shadow-card-1 p-6 text-center">
                <Icon name="AlertOctagon" size={48} className="mx-auto mb-4 text-warning-500" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  المكون غير متوفر
                </h3>
                <p className="text-text-secondary">
                  عذراً، المكون المطلوب لهذه الخطوة غير متوفر حالياً
                </p>
              </div>
            )}
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