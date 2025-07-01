// خدمة توليد المحتوى باستخدام الذكاء الاصطناعي
class AIGenerationService {
  constructor() {
    this.apiKey = 'AIzaSyBXwjPJpm27xQ-MNHNFQSAdiJBx1TrDEp0';
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent';
  }

  // توليد محتوى باستخدام الذكاء الاصطناعي
  async generateContent(prompt, options = {}) {
    try {
      const url = `${this.baseUrl}?key=${this.apiKey}`;
      
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: options.temperature || 0.7,
          topK: options.topK || 40,
          topP: options.topP || 0.95,
          maxOutputTokens: options.maxOutputTokens || 1024,
          stopSequences: options.stopSequences || []
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`فشل في توليد المحتوى: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates.length > 0 && 
          data.candidates[0].content && 
          data.candidates[0].content.parts && 
          data.candidates[0].content.parts.length > 0) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('لم يتم العثور على محتوى في الاستجابة');
      }
    } catch (error) {
      console.error('خطأ في توليد المحتوى:', error);
      throw error;
    }
  }

  // توليد محتوى للخطابات الإدارية
  async generateLetterContent(letterType, title, recipient = '', gender = 'male') {
    let prompt = '';
    
    switch (letterType) {
      case 'notifications':
        prompt = `أنت مساعد متخصص في كتابة التبليغات الإدارية المدرسية باللغة العربية الفصحى. 
        اكتب تبليغ إداري بعنوان "${title}" موجه ${gender === 'male' ? 'للمعلمين' : 'للمعلمات'}.
        يجب أن يكون التبليغ رسمي ومختصر ويحتوي على:
        - تحية افتتاحية مناسبة
        - موضوع التبليغ بوضوح
        - التفاصيل المهمة
        - الإجراءات المطلوبة
        - تاريخ التنفيذ أو الموعد النهائي (استخدم تاريخ هجري مناسب)
        - عبارة ختامية مناسبة
        
        اكتب النص مباشرة بدون عناوين فرعية أو ترقيم.`;
        break;
        
      case 'bulletins':
        prompt = `أنت مساعد متخصص في كتابة النشرات الداخلية المدرسية باللغة العربية الفصحى.
        اكتب نشرة داخلية بعنوان "${title}" موجهة ${gender === 'male' ? 'للمعلمين' : 'للمعلمات'}.
        يجب أن تكون النشرة واضحة ومنظمة وتحتوي على:
        - تحية افتتاحية مناسبة
        - موضوع النشرة بوضوح
        - المعلومات الرئيسية
        - التوجيهات والإرشادات
        - المواعيد المهمة (استخدم تاريخ هجري مناسب)
        - عبارة ختامية مناسبة
        
        اكتب النص بأسلوب مهني ومباشر.`;
        break;
        
      case 'external-letters':
        prompt = `أنت مساعد متخصص في كتابة الخطابات الرسمية المدرسية باللغة العربية الفصحى.
        اكتب خطاب رسمي بعنوان "${title}" موجه إلى "${recipient}".
        يجب أن يكون الخطاب رسمي ومحترف ويحتوي على:
        - ترويسة مناسبة
        - رقم وتاريخ الخطاب (استخدم تاريخ هجري مناسب)
        - عنوان الموضوع
        - تحية افتتاحية رسمية
        - نص الخطاب بوضوح
        - الطلب أو الغرض من الخطاب
        - عبارة ختامية رسمية
        - توقيع مناسب (مدير المدرسة أو من ينوب عنه)
        
        اكتب النص بأسلوب رسمي ومهني.`;
        break;
        
      default:
        prompt = `اكتب محتوى رسمي بعنوان "${title}" باللغة العربية الفصحى.`;
    }
    
    return this.generateContent(prompt, { temperature: 0.7 });
  }

  // توليد محتوى للتحليل الرباعي SWOT
  async generateSwotAnalysis(schoolType, schoolLevel) {
    const prompt = `أنت مستشار تعليمي متخصص في التخطيط الاستراتيجي للمدارس في المملكة العربية السعودية.
    قم بإنشاء تحليل رباعي (SWOT) لمدرسة ${schoolType} في المرحلة ${schoolLevel}.
    
    قدم:
    1. 5 نقاط قوة واقعية (Strengths)
    2. 5 نقاط ضعف محتملة (Weaknesses)
    3. 5 فرص متاحة (Opportunities)
    4. 5 تهديدات محتملة (Threats)
    
    اجعل التحليل واقعي ومناسب للسياق التعليمي السعودي. قدم النتائج بتنسيق JSON كالتالي:
    {
      "strengths": ["نقطة قوة 1", "نقطة قوة 2", ...],
      "weaknesses": ["نقطة ضعف 1", "نقطة ضعف 2", ...],
      "opportunities": ["فرصة 1", "فرصة 2", ...],
      "threats": ["تهديد 1", "تهديد 2", ...]
    }`;
    
    const result = await this.generateContent(prompt, { temperature: 0.7 });
    try {
      return JSON.parse(result);
    } catch (error) {
      console.error('خطأ في تحليل نتيجة SWOT:', error);
      
      // إرجاع بيانات افتراضية في حالة فشل التحليل
      return {
        strengths: [
          "كادر تعليمي مؤهل ومتخصص",
          "بنية تحتية جيدة ومرافق مناسبة",
          "نظام إداري منظم وفعال",
          "برامج أنشطة طلابية متنوعة",
          "تطبيق التقنيات الحديثة في التعليم"
        ],
        weaknesses: [
          "ضعف مشاركة أولياء الأمور",
          "قلة الموارد المالية المخصصة للأنشطة",
          "ضعف برامج التطوير المهني للمعلمين",
          "كثافة الطلاب في بعض الفصول",
          "قصور في تطبيق استراتيجيات التعلم النشط"
        ],
        opportunities: [
          "الدعم المقدم من وزارة التعليم",
          "الشراكات المجتمعية المتاحة",
          "التوجه نحو التحول الرقمي في التعليم",
          "برامج التطوير المهني المتاحة للمعلمين",
          "المسابقات والفعاليات التعليمية المحلية والدولية"
        ],
        threats: [
          "المنافسة من المدارس الأخرى",
          "التغيرات المستمرة في المناهج والسياسات التعليمية",
          "تأثيرات وسائل التواصل الاجتماعي السلبية",
          "ضعف الدافعية لدى بعض الطلاب",
          "التحديات الاقتصادية وتأثيرها على الموارد"
        ]
      };
    }
  }

  // توليد رؤية ورسالة المدرسة
  async generateVisionMission(schoolName, schoolLevel, schoolType) {
    const prompt = `أنت مستشار تعليمي متخصص في صياغة الرؤية والرسالة للمؤسسات التعليمية في المملكة العربية السعودية.
    قم بإنشاء رؤية ورسالة لمدرسة "${schoolName}" وهي مدرسة ${schoolType} في المرحلة ${schoolLevel}.
    
    الرؤية يجب أن تكون:
    - موجزة (جملة واحدة لا تزيد عن 20 كلمة)
    - طموحة ومستقبلية
    - ملهمة وواضحة
    
    الرسالة يجب أن تكون:
    - مختصرة (فقرة واحدة لا تزيد عن 50 كلمة)
    - واقعية وعملية
    - تعكس قيم المدرسة وأهدافها
    
    قدم النتائج بتنسيق JSON كالتالي:
    {
      "vision": "نص الرؤية هنا",
      "mission": "نص الرسالة هنا"
    }`;
    
    const result = await this.generateContent(prompt, { temperature: 0.7 });
    try {
      return JSON.parse(result);
    } catch (error) {
      console.error('خطأ في تحليل نتيجة الرؤية والرسالة:', error);
      
      // إرجاع بيانات افتراضية في حالة فشل التحليل
      return {
        vision: "بيئة تعليمية متميزة تسهم في بناء جيل واعٍ ومبدع قادر على المنافسة محلياً وعالمياً.",
        mission: "تقديم تعليم متميز في بيئة تربوية آمنة ومحفزة، تنمي مهارات الطلاب وتعزز قيمهم الإسلامية، وتؤهلهم للمنافسة العالمية من خلال كوادر مؤهلة وشراكة مجتمعية فاعلة."
      };
    }
  }

  // توليد ميثاق أخلاقي للمدرسة
  async generateEthicsCharter() {
    const prompt = `أنت مستشار تعليمي متخصص في إعداد المواثيق الأخلاقية للمؤسسات التعليمية في المملكة العربية السعودية.
    قم بإنشاء ميثاق أخلاقي للمدرسة يتضمن:
    
    - مقدمة عن أهمية الأخلاق في البيئة التعليمية
    - القيم الأساسية التي يجب أن يلتزم بها جميع منسوبي المدرسة
    - المبادئ الأخلاقية للمعلمين والإداريين
    - الالتزامات الأخلاقية تجاه الطلاب
    - الالتزامات الأخلاقية تجاه أولياء الأمور والمجتمع
    - خاتمة مناسبة
    
    اجعل الميثاق شاملاً ومختصراً في نفس الوقت، ومناسباً للسياق التعليمي السعودي ومستوحى من القيم الإسلامية.`;
    
    return this.generateContent(prompt, { temperature: 0.7 });
  }

  // توليد أهداف استراتيجية للمدرسة
  async generateStrategicGoals(schoolLevel) {
    const prompt = `أنت مستشار تعليمي متخصص في التخطيط الاستراتيجي للمدارس في المملكة العربية السعودية.
    قم بإنشاء 5 أهداف استراتيجية لمدرسة في المرحلة ${schoolLevel}.
    
    الأهداف يجب أن تكون:
    - محددة وقابلة للقياس
    - واقعية وقابلة للتحقيق
    - مرتبطة بتحسين جودة التعليم والتعلم
    - متوافقة مع رؤية المملكة 2030 وأهداف وزارة التعليم
    
    لكل هدف، قدم:
    1. عنوان الهدف
    2. وصف مختصر
    3. 3 مؤشرات أداء رئيسية (KPIs) لقياس تحقق الهدف
    
    قدم النتائج بتنسيق JSON كالتالي:
    [
      {
        "title": "عنوان الهدف الأول",
        "description": "وصف الهدف الأول",
        "kpis": ["مؤشر 1", "مؤشر 2", "مؤشر 3"]
      },
      ...
    ]`;
    
    const result = await this.generateContent(prompt, { temperature: 0.7 });
    try {
      return JSON.parse(result);
    } catch (error) {
      console.error('خطأ في تحليل نتيجة الأهداف الاستراتيجية:', error);
      
      // إرجاع بيانات افتراضية في حالة فشل التحليل
      return [
        {
          title: "تحسين مستوى التحصيل الدراسي",
          description: "رفع مستوى التحصيل الدراسي للطلاب في جميع المواد الدراسية",
          kpis: ["زيادة نسبة النجاح بمقدار 10%", "تحسين متوسط درجات الطلاب بنسبة 15%", "خفض نسبة الرسوب بمقدار 5%"]
        },
        {
          title: "تطوير مهارات القرن الـ21",
          description: "تنمية مهارات التفكير النقدي والإبداعي والتواصل والتعاون لدى الطلاب",
          kpis: ["مشاركة 80% من الطلاب في مشاريع تعاونية", "تنفيذ 20 نشاط لتنمية مهارات التفكير", "تحسن أداء الطلاب في مهارات التواصل بنسبة 25%"]
        }
      ];
    }
  }

  // توليد برامج ومبادرات تنفيذية
  async generatePrograms(strategicGoals) {
    // تحويل الأهداف الاستراتيجية إلى نص
    let goalsText = '';
    if (Array.isArray(strategicGoals) && strategicGoals.length > 0) {
      goalsText = strategicGoals.map((goal, index) => 
        `${index + 1}. ${goal.domain_name || 'مجال'}: ${goal.objectives?.filter(o => o.selected).map(o => o.domain_objective_label).join(', ') || 'تحسين جودة التعليم'}`
      ).join('\n');
    } else {
      goalsText = 'تحسين جودة التعليم والتعلم وتطوير مهارات الطلاب وتعزيز البيئة المدرسية';
    }

    const prompt = `أنت مستشار تعليمي متخصص في تصميم البرامج والمبادرات التنفيذية للمدارس في المملكة العربية السعودية.
    
    بناءً على الأهداف الاستراتيجية التالية:
    ${goalsText}
    
    قم بإنشاء 5 برامج/مبادرات تنفيذية مبتكرة وعملية.
    
    لكل برنامج/مبادرة، قدم:
    1. اسم البرنامج (عنوان جذاب ومختصر)
    2. وصف موجز (2-3 جمل)
    3. الأهداف (2-3 أهداف محددة)
    4. الفئات المستهدفة (من سيستفيد من البرنامج)
    5. الإطار الزمني المقترح للتنفيذ
    6. الموارد المطلوبة (بشرية، مادية، تقنية)
    
    قدم النتائج بتنسيق JSON كالتالي:
    [
      {
        "name": "اسم البرنامج",
        "description": "وصف البرنامج",
        "objectives": "أهداف البرنامج",
        "targetGroups": "الفئات المستهدفة",
        "timeline": "الإطار الزمني",
        "resources": "الموارد المطلوبة"
      },
      ...
    ]`;
    
    const result = await this.generateContent(prompt, { temperature: 0.8 });
    try {
      return JSON.parse(result);
    } catch (error) {
      console.error('خطأ في تحليل نتيجة البرامج والمبادرات:', error);
      
      // إرجاع بيانات افتراضية في حالة فشل التحليل
      return [
        {
          name: "رحلة التميز الأكاديمي",
          description: "برنامج شامل لتحسين التحصيل الدراسي من خلال أساليب تعليمية مبتكرة وتحفيزية",
          objectives: "رفع مستوى التحصيل الدراسي، تنمية مهارات التعلم الذاتي، تعزيز الدافعية للتعلم",
          targetGroups: "جميع الطلاب مع تركيز خاص على ذوي التحصيل المنخفض",
          timeline: "على مدار العام الدراسي",
          resources: "معلمون متخصصون، مواد تعليمية إثرائية، تقنيات تعليمية حديثة"
        },
        {
          name: "مهارات المستقبل",
          description: "مبادرة لتطوير مهارات القرن الـ21 لدى الطلاب من خلال ورش عمل وأنشطة تطبيقية",
          objectives: "تنمية مهارات التفكير النقدي والإبداعي، تعزيز مهارات التواصل والعمل الجماعي",
          targetGroups: "طلاب المرحلة المتوسطة والثانوية",
          timeline: "فصل دراسي كامل",
          resources: "مدربون متخصصون، أدوات ومواد تدريبية، قاعات مجهزة"
        }
      ];
    }
  }

  // توليد تحليل للمجالات المدرسية
  async generateDomainAnalysis(domains) {
    const domainsText = domains.map(domain => domain.name).join('، ');
    
    const prompt = `أنت مستشار تعليمي متخصص في تحليل المجالات المدرسية في المملكة العربية السعودية.
    
    قم بإنشاء تحليل مختصر للمجالات المدرسية التالية:
    ${domainsText}
    
    لكل مجال، قدم:
    - تحليل موجز (2-3 جمل) يصف الوضع الحالي والتحديات والفرص
    
    قدم النتائج بتنسيق JSON كالتالي:
    {
      "اسم المجال الأول": "تحليل المجال الأول",
      "اسم المجال الثاني": "تحليل المجال الثاني",
      ...
    }`;
    
    const result = await this.generateContent(prompt, { temperature: 0.7 });
    try {
      return JSON.parse(result);
    } catch (error) {
      console.error('خطأ في تحليل نتيجة تحليل المجالات:', error);
      
      // إرجاع بيانات افتراضية في حالة فشل التحليل
      const fallbackAnalysis = {};
      domains.forEach(domain => {
        fallbackAnalysis[domain.name] = `${domain.name} يحتاج إلى تطوير مستمر من خلال تحديد نقاط القوة والضعف وفرص التحسين. يمكن تعزيز هذا المجال من خلال برامج تطويرية مستهدفة ومتابعة مستمرة للأداء.`;
      });
      
      return fallbackAnalysis;
    }
  }
}

// إنشاء مثيل واحد من الخدمة
const aiGenerationService = new AIGenerationService();

export default aiGenerationService;