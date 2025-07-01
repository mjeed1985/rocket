import React from 'react';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Icon from 'components/AppIcon';

const LetterPreview = ({ 
  generatedLetter, editingLetterName, setEditingLetterName, pageTitle, letterImage, letterPreviewRef, 
  onEditContent, onSaveLetter, onPrintLetter, onNewLetter, isForImageGeneration = false 
}) => {
  if (!generatedLetter) return null;

  const safePageTitle = typeof pageTitle === 'string' ? pageTitle : 'النموذج';
  const titleSlice = safePageTitle.slice(0, -1);

  const letterContent = (
    <div 
      ref={letterPreviewRef} 
      className="bg-white p-8 md:p-12 rounded-lg shadow-lg max-w-4xl mx-auto"
      style={{
        backgroundImage: letterImage ? `url(${letterImage})` : 'none',
        backgroundSize: '100% 100%', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'relative',
        minHeight: '297mm',
        width: '210mm',
        boxSizing: 'border-box',
        border: letterImage ? 'none' : '2px dashed #ccc'
      }}
    >
      {!letterImage && !isForImageGeneration && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-text-muted">
          <Icon name="Image" size={48} className="mb-4 opacity-50" />
          <p className="font-bold text-lg">لم يتم رفع القالب الرسمي</p>
          <p>يرجى رفع القالب من زر "رفع القالب الرسمي" ليظهر كخلفية للخطاب.</p>
        </div>
      )}
      <div style={{ paddingTop: '100px', paddingBottom: '50px', paddingRight: '50px', paddingLeft: '50px' }} className="text-right">
        {!letterImage && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{generatedLetter.schoolName}</h1>
            <h2 className="text-2xl mb-4">{generatedLetter.template?.header || 'التبليغات الإدارية'}</h2>
          </div>
        )}
        <div className="text-right mb-6">
          <p>التاريخ: {generatedLetter.date}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-bold text-center mb-6">
            الموضوع: {generatedLetter.title}
          </h3>
        </div>
        <div className="mb-8">
          <p className="text-lg mb-4">{generatedLetter.template?.greeting || 'السلام عليكم ورحمة الله وبركاته،،،'}</p>
          <p className="leading-loose text-justify whitespace-pre-line">
            {generatedLetter.content}
          </p>
        </div>
        <div className="mt-10">
          <p className="text-lg mb-4">{generatedLetter.template?.closing || 'وتفضلوا بقبول فائق الاحترام والتقدير،،،'}</p>
          <div className="text-center mt-12">
            <p className="font-bold">{generatedLetter.template?.signature || 'مدير المدرسة'}</p>
            {!letterImage && <div className="mt-6 border-t border-gray-400 w-60 mx-auto"></div>}
          </div>
        </div>
        {!letterImage && (
          <div className="mt-16 text-center">
            <p className="text-sm text-text-muted">
              {generatedLetter.schoolName} - {new Date(generatedLetter.createdAt || Date.now()).getFullYear()}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  if (isForImageGeneration) {
    return letterContent;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 shadow-card-1 p-6">
        <div className="mb-4">
          <Input 
            type="text"
            value={editingLetterName || generatedLetter.name || ''}
            onChange={(e) => setEditingLetterName(e.target.value)}
            className="text-xl font-bold text-center border-b-2 border-slate-300 focus:border-primary-500 outline-none"
            placeholder={`اسم ${titleSlice}`}
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="outline"
            size="md"
            onClick={onEditContent}
            iconName="Edit"
            iconPosition="left"
          >
            تعديل المحتوى
          </Button>
          
          <Button
            variant="primary"
            size="md"
            onClick={onSaveLetter}
            iconName="Save"
            iconPosition="left"
          >
            حفظ {titleSlice}
          </Button>
          
          <Button
            variant="outline"
            size="md"
            onClick={onPrintLetter}
            iconName="Download"
            iconPosition="left"
          >
            طباعة/تصدير PDF
          </Button>
          
          <Button
            variant="outline"
            size="md"
            onClick={onNewLetter}
            iconName="Plus"
            iconPosition="left"
          >
            إنشاء {titleSlice} جديد
          </Button>
        </div>
      </div>
      
      {letterContent}
    </div>
  );
};

export default LetterPreview;