import React from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const SavedLettersList = ({ savedLetters, pageTitle, onLoadLetter, onDeleteLetter, onViewAcknowledgements, onShareLetter, type }) => {
  if (!savedLetters || savedLetters.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-card-1 p-6 max-w-3xl mx-auto mt-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-text-primary mb-2">النماذج المحفوظة من {pageTitle}</h3>
          <div className="flex flex-col items-center justify-center py-8">
            <Icon name="FileText" size={48} className="text-text-muted mb-4" />
            <p className="text-text-secondary">لا توجد نماذج محفوظة حالياً.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-card-1 p-6 max-w-3xl mx-auto mt-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary text-center">النماذج المحفوظة من {pageTitle}</h3>
      </div>
      
      <ul className="space-y-3">
        {savedLetters.map(letter => (
          <li key={letter.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-md shadow-sm">
            <span className="font-medium text-text-primary">{letter.name}</span>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => onLoadLetter(letter)} 
                iconName="Eye"
                className="flex items-center space-x-1 rtl:space-x-reverse"
              >
                <span>عرض</span>
              </Button>
              
              {(type === 'notifications' || type === 'bulletins') && letter.db_id && (
                <>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onShareLetter(letter)} 
                    iconName="Share2"
                    className="flex items-center space-x-1 rtl:space-x-reverse text-success-600 hover:text-success-700 hover:bg-success-50"
                  >
                    <span>مشاركة</span>
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onViewAcknowledgements(letter.db_id)} 
                    iconName="Users"
                    className="flex items-center space-x-1 rtl:space-x-reverse text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                  >
                    <span>المطلعون</span>
                  </Button>
                </>
              )}
              
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => onDeleteLetter(letter.id)} 
                iconName="Trash2"
                className="flex items-center space-x-1 rtl:space-x-reverse text-error-600 hover:text-error-700 hover:bg-error-50"
              >
                <span>حذف</span>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedLettersList;