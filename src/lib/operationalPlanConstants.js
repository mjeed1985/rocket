// Constants for operational plan components

export const CORE_VALUES_LIST = [
  { name: 'الصدق', description: 'الالتزام بالصدق في القول والعمل' },
  { name: 'الأمانة', description: 'تحمل المسؤولية والوفاء بالالتزامات' },
  { name: 'العدالة', description: 'المساواة والإنصاف في التعامل' },
  { name: 'الاحترام', description: 'تقدير الآخرين واحترام الاختلاف' },
  { name: 'التعاون', description: 'العمل الجماعي وروح الفريق' },
  { name: 'الإبداع', description: 'التفكير الإبداعي والابتكار' },
  { name: 'التميز', description: 'السعي للجودة والتميز في الأداء' },
  { name: 'المسؤولية', description: 'تحمل المسؤولية الفردية والجماعية' },
  { name: 'الشفافية', description: 'الوضوح والصراحة في التعامل' },
  { name: 'التطوير المستمر', description: 'السعي للتحسين والتطوير المستمر' }
];

export const EVALUATION_MECHANISMS = `
سيتم تقييم الخطة التشغيلية من خلال آليات متعددة تشمل:
- التقييم الدوري الشهري لمؤشرات الأداء
- المراجعة الفصلية للأهداف والنتائج
- التقييم السنوي الشامل للخطة
- استطلاعات رأي المستفيدين
- تقارير الأداء التفصيلية
- اجتماعات المتابعة الدورية
`;

export const SUCCESS_INDICATORS_EXAMPLES = [
  'تحسن درجات الطلاب بنسبة 15%',
  'زيادة رضا أولياء الأمور إلى 90%',
  'تطوير 80% من المعلمين مهنياً',
  'تنفيذ 100% من الأنشطة المخططة',
  'تحقيق معايير الجودة المطلوبة'
];

export const MONITORING_SCHEDULE_EXAMPLES = `
الجدول الزمني للمتابعة والتقويم:
- مراجعة أسبوعية: متابعة التقدم اليومي والأنشطة
- تقييم شهري: مراجعة مؤشرات الأداء والإنجازات
- تقييم فصلي: تقييم شامل للأهداف والنتائج
- تقييم سنوي: مراجعة عامة وتطوير الخطة للعام القادم
- تقارير دورية: إعداد تقارير مفصلة كل شهرين
`;

export const EVALUATION_TOOLS_EXAMPLES = [
  'استبانات الرضا',
  'اختبارات الأداء',
  'ملاحظات الفصل',
  'مقابلات شخصية',
  'تحليل البيانات',
  'تقارير الإنجاز',
  'ملفات الأعمال',
  'التقييم الذاتي'
];

export const STRATEGIC_DOMAINS_OPTIONS = [
  {
    id: 'teaching-learning',
    label: 'التعليم والتعلم',
    description: 'تطوير عمليات التعليم والتعلم وتحسين جودة التحصيل الأكاديمي',
    objectives: [
      {
        id: 'tl-1',
        objective_title_id: 'curriculum-development',
        objective_title_label: 'تطوير المناهج',
        label: 'تحسين جودة المناهج الدراسية وطرق التدريس',
        required_resources: ['معلمين مؤهلين', 'مواد تعليمية', 'تقنيات حديثة', 'قاعات مجهزة']
      },
      {
        id: 'tl-2',
        objective_title_id: 'student-assessment',
        objective_title_label: 'تقييم الطلاب',
        label: 'تطوير أساليب التقييم والقياس',
        required_resources: ['أدوات تقييم', 'برامج تحليل', 'تدريب المعلمين', 'نظم معلومات']
      },
      {
        id: 'tl-3',
        objective_title_id: 'learning-support',
        objective_title_label: 'دعم التعلم',
        label: 'توفير الدعم الأكاديمي للطلاب',
        required_resources: ['معلمين متخصصين', 'برامج إثرائية', 'مواد تعليمية إضافية', 'وقت إضافي']
      }
    ]
  },
  {
    id: 'student-development',
    label: 'تنمية الطلاب',
    description: 'تطوير شخصية الطلاب ومهاراتهم الحياتية والاجتماعية',
    objectives: [
      {
        id: 'sd-1',
        objective_title_id: 'character-building',
        objective_title_label: 'بناء الشخصية',
        label: 'تنمية القيم والأخلاق الإسلامية',
        required_resources: ['برامج تربوية', 'أنشطة توعوية', 'مرشدين تربويين', 'مواد تثقيفية']
      },
      {
        id: 'sd-2',
        objective_title_id: 'life-skills',
        objective_title_label: 'المهارات الحياتية',
        label: 'تطوير المهارات الحياتية والاجتماعية',
        required_resources: ['ورش تدريبية', 'أنشطة تطبيقية', 'مدربين متخصصين', 'مساحات للأنشطة']
      },
      {
        id: 'sd-3',
        objective_title_id: 'extracurricular',
        objective_title_label: 'الأنشطة اللاصفية',
        label: 'تنويع الأنشطة اللاصفية والإثرائية',
        required_resources: ['مشرفين أنشطة', 'أدوات ومعدات', 'مساحات مناسبة', 'ميزانية للأنشطة']
      }
    ]
  },
  {
    id: 'school-environment',
    label: 'البيئة المدرسية',
    description: 'تطوير البيئة المدرسية الآمنة والمحفزة للتعلم',
    objectives: [
      {
        id: 'se-1',
        objective_title_id: 'safety-security',
        objective_title_label: 'الأمن والسلامة',
        label: 'ضمان بيئة آمنة وصحية للطلاب',
        required_resources: ['أنظمة أمان', 'معدات سلامة', 'تدريب على الطوارئ', 'صيانة دورية']
      },
      {
        id: 'se-2',
        objective_title_id: 'infrastructure',
        objective_title_label: 'البنية التحتية',
        label: 'تطوير المرافق والبنية التحتية',
        required_resources: ['ميزانية صيانة', 'مقاولين', 'مواد بناء', 'تصاميم هندسية']
      },
      {
        id: 'se-3',
        objective_title_id: 'technology',
        objective_title_label: 'التقنية',
        label: 'دمج التقنيات الحديثة في التعليم',
        required_resources: ['أجهزة حاسوب', 'شبكة إنترنت', 'برامج تعليمية', 'دعم فني']
      }
    ]
  },
  {
    id: 'community-partnership',
    label: 'الشراكة المجتمعية',
    description: 'بناء شراكات فعالة مع المجتمع المحلي وأولياء الأمور',
    objectives: [
      {
        id: 'cp-1',
        objective_title_id: 'parent-engagement',
        objective_title_label: 'إشراك أولياء الأمور',
        label: 'تفعيل دور أولياء الأمور في العملية التعليمية',
        required_resources: ['برامج توعية', 'اجتماعات دورية', 'وسائل تواصل', 'فعاليات مشتركة']
      },
      {
        id: 'cp-2',
        objective_title_id: 'community-service',
        objective_title_label: 'خدمة المجتمع',
        label: 'تقديم خدمات تعليمية للمجتمع المحلي',
        required_resources: ['برامج مجتمعية', 'متطوعين', 'مساحات للفعاليات', 'تنسيق مع الجهات']
      },
      {
        id: 'cp-3',
        objective_title_id: 'partnerships',
        objective_title_label: 'الشراكات',
        label: 'بناء شراكات مع المؤسسات المحلية',
        required_resources: ['اتفاقيات شراكة', 'تنسيق إداري', 'برامج مشتركة', 'موارد مشتركة']
      }
    ]
  },
  {
    id: 'leadership-management',
    label: 'القيادة والإدارة',
    description: 'تطوير القيادة التربوية وتحسين الإدارة المدرسية',
    objectives: [
      {
        id: 'lm-1',
        objective_title_id: 'leadership-development',
        objective_title_label: 'تطوير القيادة',
        label: 'تنمية المهارات القيادية للإدارة والمعلمين',
        required_resources: ['برامج تدريبية', 'مدربين متخصصين', 'ورش عمل', 'مواد تطويرية']
      },
      {
        id: 'lm-2',
        objective_title_id: 'administrative-efficiency',
        objective_title_label: 'الكفاءة الإدارية',
        label: 'تحسين العمليات الإدارية والتنظيمية',
        required_resources: ['أنظمة إدارية', 'تدريب إداري', 'تطوير إجراءات', 'تقنيات إدارية']
      },
      {
        id: 'lm-3',
        objective_title_id: 'strategic-planning',
        objective_title_label: 'التخطيط الاستراتيجي',
        label: 'تطوير التخطيط الاستراتيجي والتشغيلي',
        required_resources: ['خبراء تخطيط', 'أدوات تحليل', 'ورش تخطيط', 'نظم متابعة']
      }
    ]
  },
  {
    id: 'professional-development',
    label: 'التطوير المهني',
    description: 'تطوير قدرات ومهارات الكادر التعليمي والإداري',
    objectives: [
      {
        id: 'pd-1',
        objective_title_id: 'teacher-training',
        objective_title_label: 'تدريب المعلمين',
        label: 'تطوير مهارات التدريس والتقييم',
        required_resources: ['برامج تدريبية', 'مدربين معتمدين', 'مواد تدريبية', 'وقت للتدريب']
      },
      {
        id: 'pd-2',
        objective_title_id: 'continuous-learning',
        objective_title_label: 'التعلم المستمر',
        label: 'تشجيع ثقافة التعلم المستمر',
        required_resources: ['مكتبة مهنية', 'اشتراكات علمية', 'مؤتمرات', 'شبكات تعلم']
      },
      {
        id: 'pd-3',
        objective_title_id: 'performance-evaluation',
        objective_title_label: 'تقييم الأداء',
        label: 'تطوير نظم تقييم الأداء المهني',
        required_resources: ['معايير تقييم', 'أدوات قياس', 'تدريب على التقييم', 'نظم متابعة']
      }
    ]
  }
];