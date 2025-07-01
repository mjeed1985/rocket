import React, { useState } from 'react';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Icon from 'components/AppIcon';

const LetterForm = ({ letterData, setLetterData, type, pageTitle, isGenerating, onGenerateContent, onCreateFinalLetter, isCreatingPreview }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(letterData.customContent);

  const handleContentEdit = () => {
    setIsEditing(true);
    setEditedContent(letterData.customContent);
  };

  const saveContentEdit = () => {
    setLetterData(prev => ({ ...prev, customContent: editedContent }));
    setIsEditing(false);
  };

  const getBoysButtonClass = () => {
    return letterData.gender === 'boys' 
      ? "bg-success-100 hover:bg-success-200 text-success-700 border-success-300 shadow-md" 
      : "border-slate-300 hover:bg-slate-50";
  };

  const getGirlsButtonClass = () => {
    return letterData.gender === 'girls' 
      ? "bg-secondary-100 hover:bg-secondary-200 text-secondary-700 border-secondary-300 shadow-md" 
      : "border-slate-300 hover:bg-slate-50";
  };
  
  const isCreateButtonDisabled = !letterData.customContent.trim() || !letterData.title.trim() || (type === 'external-letters' && !letterData.recipient.trim()) || isCreatingPreview;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card-2 p-6 max-w-3xl mx-auto">
      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg">
          <Icon name={type === 'notifications' ? 'MessageSquare' : type === 'bulletins' ? 'Newspaper' : 'Mail'} size={20} className="text-primary-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">إعداد {pageTitle.slice(0, -1)} جديد</h3>
          <p className="text-sm text-text-secondary">أدخل المعلومات المطلوبة لإنشاء {pageTitle.slice(0, -1)}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            عنوان {pageTitle.slice(0, -1)} <span className="text-error-500">*</span>
          </label>
          <Input 
            type="text"
            placeholder={`أدخل عنوان ${pageTitle.slice(0, -1)}`}
            value={letterData.title}
            onChange={(e) => setLetterData({...letterData, title: e.target.value})}
          />
        </div>
        
        {type === 'external-letters' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              الخطاب موجّه إلى من؟ <span className="text-error-500">*</span>
            </label>
            <Input 
              type="text"
              placeholder="مثال: وزارة التعليم، إدارة التعليم بمنطقة..."
              value={letterData.recipient}
              onChange={(e) => setLetterData({...letterData, recipient: e.target.value})}
            />
          </div>
        )}

        {(type === 'bulletins' || type === 'notifications') && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              موجه إلى:
            </label>
            <div className="flex gap-4 mt-2">
              <Button 
                variant="outline"
                onClick={() => setLetterData({...letterData, gender: 'boys'})}
                className={`flex-1 flex items-center space-x-2 rtl:space-x-reverse ${getBoysButtonClass()}`}
              >
                <Icon name="Users" size={16} />
                <span>بنين (معلمين)</span>
              </Button>
              <Button 
                variant="outline"
                onClick={() => setLetterData({...letterData, gender: 'girls'})}
                className={`flex-1 flex items-center space-x-2 rtl:space-x-reverse ${getGirlsButtonClass()}`}
              >
                <Icon name="UserCheck" size={16} />
                <span>بنات (معلمات)</span>
              </Button>
            </div>
          </div>
        )}

        <div>
          <Button 
            variant="primary"
            size="lg"
            onClick={onGenerateContent}
            disabled={isGenerating || !letterData.title.trim() || (type === 'external-letters' && !letterData.recipient.trim())}
            iconName={isGenerating ? "Loader2" : "Wand2"}
            className="w-full"
          >
            {isGenerating ? 'جاري توليد النص...' : `توليد محتوى ${pageTitle.slice(0,-1)} (بالذكاء الاصطناعي)`}
          </Button>
          <p className="text-xs text-text-muted text-center mt-2">
            يتم توليد المحتوى باستخدام الذكاء الاصطناعي بناءً على المعلومات المدخلة
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            محتوى {pageTitle.slice(0, -1)} <span className="text-error-500">*</span>
          </label>
          {isEditing ? (
            <>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={10}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none text-right"
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button onClick={() => setIsEditing(false)} variant="ghost">إلغاء</Button>
                <Button onClick={saveContentEdit} variant="primary">حفظ التعديلات</Button>
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <div className="bg-slate-50 p-4 rounded-md text-right min-h-[200px] border border-slate-200">
                  {letterData.customContent ? (
                    <div className="whitespace-pre-line">{letterData.customContent}</div>
                  ) : (
                    <div className="text-text-muted text-center flex flex-col items-center justify-center h-full">
                      <Icon name="FileText" size={48} className="mb-2 opacity-50" />
                      <p>لم يتم إنشاء محتوى بعد</p>
                      <p className="text-sm">استخدم زر توليد المحتوى أعلاه</p>
                    </div>
                  )}
                </div>
                {letterData.customContent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleContentEdit}
                    iconName="Edit"
                    className="absolute top-2 left-2"
                  >
                    تعديل المحتوى
                  </Button>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center">
          <Button 
            variant="secondary"
            size="lg"
            onClick={onCreateFinalLetter}
            disabled={isCreateButtonDisabled}
            iconName={isCreatingPreview ? "Loader2" : "Eye"}
            iconPosition="left"
          >
            {isCreatingPreview ? `جاري إنشاء المعاينة...` : `معاينة وإنشاء ${pageTitle.slice(0,-1)}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LetterForm;