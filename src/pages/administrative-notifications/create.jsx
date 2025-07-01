import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserNavigation from 'components/ui/UserNavigation';
import LetterForm from './components/LetterForm';
import LetterPreview from './components/LetterPreview';
import LetterPreviewDialog from './components/LetterPreviewDialog';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const CreateLetter = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const letterPreviewRef = useRef(null);
  
  const [step, setStep] = useState('form'); // form, preview
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCreatingPreview, setIsCreatingPreview] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [letterImage, setLetterImage] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [editingLetterName, setEditingLetterName] = useState('');
  
  const [letterData, setLetterData] = useState({
    title: '',
    recipient: '',
    customContent: '',
    gender: 'boys',
    template: {
      header: getTemplateHeader(),
      greeting: 'السلام عليكم ورحمة الله وبركاته،،،',
      closing: 'وتفضلوا بقبول فائق الاحترام والتقدير،،،',
      signature: 'مدير المدرسة'
    }
  });
  
  const [generatedLetter, setGeneratedLetter] = useState(null);
  
  // Get page title based on type
  const getPageTitle = () => {
    switch(type) {
      case 'notifications':
        return 'التبليغات الإدارية';
      case 'bulletins':
        return 'النشرات الداخلية';
      case 'external-letters':
        return 'الخطابات الخارجية';
      default:
        return 'المراسلات';
    }
  };
  
  function getTemplateHeader() {
    switch(type) {
      case 'notifications':
        return 'التبليغات الإدارية';
      case 'bulletins':
        return 'النشرات الداخلية';
      case 'external-letters':
        return 'الخطابات الخارجية';
      default:
        return 'المراسلات الإدارية';
    }
  }
  
  const pageTitle = getPageTitle();
  
  // Handle content generation
  const handleGenerateContent = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI content generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let generatedContent = '';
      
      if (type === 'notifications') {
        generatedContent = `نحيط علمكم بأنه سيتم عقد ${letterData.title} يوم الأربعاء الموافق 15/12/1445هـ في تمام الساعة العاشرة صباحاً بقاعة الاجتماعات بالمدرسة.

نأمل من الجميع الالتزام بالحضور في الموعد المحدد، والاستعداد لمناقشة جدول الأعمال المرفق.

كما نود التنبيه على ضرورة إحضار جميع التقارير المطلوبة سابقاً، وإعداد ملخص عن أهم الإنجازات والتحديات خلال الفترة الماضية.

شاكرين لكم تعاونكم واهتمامكم.`;
      } else if (type === 'bulletins') {
        generatedContent = `يسر إدارة المدرسة أن تعلن عن ${letterData.title} للعام الدراسي الحالي 1445/1446هـ.

تتضمن النشرة المعلومات التالية:
1. جدول الاختبارات النهائية للفصل الدراسي الأول
2. مواعيد تسليم الدرجات والتقارير النهائية
3. خطة الأنشطة اللاصفية للفصل الدراسي الثاني
4. إرشادات وتوجيهات عامة للمعلمين

نرجو من جميع المعلمين الاطلاع على محتوى النشرة والالتزام بالتوجيهات الواردة فيها، وفي حال وجود أي استفسار يرجى التواصل مع وكيل المدرسة.`;
      } else {
        generatedContent = `إشارة إلى الموضوع أعلاه بشأن ${letterData.title}، وبناءً على التعاميم الواردة من وزارة التعليم بهذا الخصوص.

نفيدكم بأن إدارة المدرسة قد قامت بتنفيذ جميع الإجراءات اللازمة وفق التوجيهات الواردة، وتم إعداد التقارير المطلوبة حسب النماذج المعتمدة.

نأمل منكم الاطلاع والإفادة بما يلزم حيال ذلك، مع العلم أننا على استعداد تام لتقديم أي معلومات إضافية أو إيضاحات مطلوبة.`;
      }
      
      setLetterData(prev => ({
        ...prev,
        customContent: generatedContent
      }));
      
    } catch (error) {
      console.error('Error generating content:', error);
      alert('حدث خطأ أثناء توليد المحتوى. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Handle final letter creation
  const handleCreateFinalLetter = async () => {
    setIsCreatingPreview(true);
    
    try {
      // Prepare letter data
      const currentDate = new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
      
      const finalLetter = {
        ...letterData,
        schoolName: 'مدرسة الأمل الابتدائية',
        date: currentDate,
        content: letterData.customContent,
        createdAt: new Date().toISOString(),
        name: `${letterData.title} - ${currentDate}`
      };
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setGeneratedLetter(finalLetter);
      setStep('preview');
      
      // Simulate image generation delay
      setTimeout(() => {
        if (letterPreviewRef.current) {
          // In a real implementation, we would use html2canvas or similar
          // For now, we'll just simulate with a placeholder image
          setImageDataUrl('https://via.placeholder.com/595x842?text=Generated+Letter');
          setIsPreviewDialogOpen(true);
        }
      }, 1000);
      
    } catch (error) {
      console.error('Error creating letter:', error);
      alert('حدث خطأ أثناء إنشاء المعاينة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsCreatingPreview(false);
    }
  };
  
  // Handle letter editing
  const handleEditContent = () => {
    setStep('form');
  };
  
  // Handle letter saving
  const handleSaveLetter = () => {
    if (!generatedLetter) return;
    
    try {
      const letterName = editingLetterName || generatedLetter.name;
      
      // Get existing letters from localStorage
      const storageKey = `schoolplan_${type}`;
      const existingLetters = JSON.parse(localStorage.getItem(storageKey) || '[]');
      
      // Add new letter
      const newLetter = {
        id: Date.now(),
        name: letterName,
        ...generatedLetter,
        savedAt: new Date().toISOString()
      };
      
      existingLetters.push(newLetter);
      
      // Save back to localStorage
      localStorage.setItem(storageKey, JSON.stringify(existingLetters));
      
      alert(`تم حفظ ${pageTitle.slice(0, -1)} بنجاح!`);
      
      // Navigate to saved letters
      navigate(`/administrative-notifications/${type}/saved`);
      
    } catch (error) {
      console.error('Error saving letter:', error);
      alert('حدث خطأ أثناء حفظ الخطاب. يرجى المحاولة مرة أخرى.');
    }
  };
  
  // Handle letter printing
  const handlePrintLetter = () => {
    window.print();
  };
  
  // Handle creating new letter
  const handleNewLetter = () => {
    setLetterData({
      title: '',
      recipient: '',
      customContent: '',
      gender: 'boys',
      template: {
        header: getTemplateHeader(),
        greeting: 'السلام عليكم ورحمة الله وبركاته،،،',
        closing: 'وتفضلوا بقبول فائق الاحترام والتقدير،،،',
        signature: 'مدير المدرسة'
      }
    });
    setGeneratedLetter(null);
    setEditingLetterName('');
    setStep('form');
  };
  
  // Handle link generation
  const handleLinkGenerated = (letterId, letterName, shareToken) => {
    // In a real implementation, we would save this to the database
    // For now, we'll just show an alert
    alert(`تم إنشاء رابط المشاركة بنجاح! يمكن مشاركة الرابط مع المعلمين.`);
    
    // Get existing letters from localStorage
    const storageKey = `schoolplan_${type}`;
    const existingLetters = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    // Add new letter with db_id
    const newLetter = {
      id: Date.now(),
      db_id: letterId,
      name: letterName,
      ...generatedLetter,
      savedAt: new Date().toISOString(),
      shareToken: shareToken
    };
    
    existingLetters.push(newLetter);
    
    // Save back to localStorage
    localStorage.setItem(storageKey, JSON.stringify(existingLetters));
    
    // Navigate to saved letters
    navigate(`/administrative-notifications/${type}/saved`);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <UserNavigation />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ChevronRight"
                  onClick={() => navigate('/administrative-notifications')}
                  className="text-text-secondary hover:text-text-primary"
                />
                <h1 className="text-2xl font-bold text-text-primary">
                  إنشاء {pageTitle.slice(0, -1)} جديد
                </h1>
              </div>
              
              {step === 'preview' && (
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPreviewDialogOpen(true)}
                    iconName="ExternalLink"
                    iconPosition="left"
                  >
                    فتح المعاينة
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-8">
            {step === 'form' ? (
              <LetterForm
                letterData={letterData}
                setLetterData={setLetterData}
                type={type}
                pageTitle={pageTitle}
                isGenerating={isGenerating}
                onGenerateContent={handleGenerateContent}
                onCreateFinalLetter={handleCreateFinalLetter}
                isCreatingPreview={isCreatingPreview}
                isApiKeyLoading={false}
                isModelReady={true}
              />
            ) : (
              <LetterPreview
                generatedLetter={generatedLetter}
                editingLetterName={editingLetterName}
                setEditingLetterName={setEditingLetterName}
                pageTitle={pageTitle}
                letterImage={letterImage}
                letterPreviewRef={letterPreviewRef}
                onEditContent={handleEditContent}
                onSaveLetter={handleSaveLetter}
                onPrintLetter={handlePrintLetter}
                onNewLetter={handleNewLetter}
              />
            )}
          </div>
          
          {/* Template Upload Section */}
          {step === 'preview' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-card-1 p-6 max-w-3xl mx-auto">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                <Icon name="Image" size={20} className="text-primary-600" />
                <h3 className="text-lg font-semibold text-text-primary">قالب {pageTitle.slice(0, -1)} الرسمي</h3>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-text-secondary">
                  يمكنك رفع صورة القالب الرسمي للمدرسة لاستخدامه كخلفية للخطاب.
                </p>
                
                <div>
                  <input
                    type="file"
                    id="template-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setLetterImage(event.target?.result?.toString() || null);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Upload"
                    iconPosition="left"
                    onClick={() => document.getElementById('template-upload')?.click()}
                  >
                    رفع القالب الرسمي
                  </Button>
                </div>
              </div>
              
              {letterImage && (
                <div className="mt-4 flex justify-between items-center p-2 bg-slate-50 rounded-md">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="w-16 h-16 bg-white border border-slate-200 rounded-md overflow-hidden">
                      <img src={letterImage} alt="Template Preview" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">تم رفع القالب بنجاح</p>
                      <p className="text-xs text-text-muted">سيظهر كخلفية للخطاب</p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    className="text-error-600 hover:text-error-700 hover:bg-error-50"
                    onClick={() => setLetterImage(null)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      {/* Preview Dialog */}
      <LetterPreviewDialog
        isOpen={isPreviewDialogOpen}
        onOpenChange={setIsPreviewDialogOpen}
        imageDataUrl={imageDataUrl}
        letterData={generatedLetter}
        letterType={type}
        pageTitle={pageTitle}
        onLinkGenerated={handleLinkGenerated}
      />
    </div>
  );
};

export default CreateLetter;