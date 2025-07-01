import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserNavigation from 'components/ui/UserNavigation';
import SavedLettersList from './components/SavedLettersList';
import LetterPreview from './components/LetterPreview';
import AcknowledgementsDialog from './components/AcknowledgementsDialog';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import Icon from 'components/AppIcon';

const SavedLetters = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  
  const [savedLetters, setSavedLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [editingLetterName, setEditingLetterName] = useState('');
  const [isAcknowledgementsOpen, setIsAcknowledgementsOpen] = useState(false);
  const [selectedLetterId, setSelectedLetterId] = useState(null);
  const [selectedLetterTitle, setSelectedLetterTitle] = useState('');
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [shareLink, setShareLink] = useState('');
  
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
  
  const pageTitle = getPageTitle();
  
  // Load saved letters from localStorage
  useEffect(() => {
    const storageKey = `schoolplan_${type}`;
    const letters = JSON.parse(localStorage.getItem(storageKey) || '[]');
    // Sort by savedAt date, newest first
    letters.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
    setSavedLetters(letters);
  }, [type]);
  
  // Handle letter loading
  const handleLoadLetter = (letter) => {
    setSelectedLetter(letter);
    setEditingLetterName(letter.name);
  };
  
  // Handle letter deletion
  const handleDeleteLetter = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا النموذج؟')) {
      const storageKey = `schoolplan_${type}`;
      const letters = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const updatedLetters = letters.filter(letter => letter.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(updatedLetters));
      setSavedLetters(updatedLetters);
      
      // If the deleted letter is currently selected, clear selection
      if (selectedLetter && selectedLetter.id === id) {
        setSelectedLetter(null);
        setEditingLetterName('');
      }
    }
  };
  
  // Handle viewing acknowledgements
  const handleViewAcknowledgements = (letterId) => {
    setSelectedLetterId(letterId);
    const letter = savedLetters.find(l => l.db_id === letterId);
    setSelectedLetterTitle(letter?.name || '');
    setIsAcknowledgementsOpen(true);
  };
  
  // Handle sharing letter
  const handleShareLetter = (letter) => {
    if (letter.shareToken) {
      // Generate a mock share link
      const baseUrl = window.location.origin;
      const shareLink = `${baseUrl}/shared/${letter.shareToken}`;
      setShareLink(shareLink);
      setIsShareDialogOpen(true);
    } else {
      alert('لا يوجد رابط مشاركة لهذا النموذج. يرجى إنشاء رابط مشاركة أولاً.');
    }
  };
  
  // Handle copying share link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        alert('تم نسخ الرابط بنجاح!');
      })
      .catch(err => {
        console.error('Failed to copy link:', err);
        alert('فشل نسخ الرابط. يرجى المحاولة مرة أخرى.');
      });
  };
  
  // Handle letter editing
  const handleEditContent = () => {
    if (selectedLetter) {
      navigate(`/administrative-notifications/${type}/edit/${selectedLetter.id}`);
    }
  };
  
  // Handle letter saving
  const handleSaveLetter = () => {
    if (!selectedLetter) return;
    
    try {
      const storageKey = `schoolplan_${type}`;
      const letters = JSON.parse(localStorage.getItem(storageKey) || '[]');
      
      // Find and update the letter
      const updatedLetters = letters.map(letter => {
        if (letter.id === selectedLetter.id) {
          return {
            ...letter,
            name: editingLetterName || letter.name
          };
        }
        return letter;
      });
      
      localStorage.setItem(storageKey, JSON.stringify(updatedLetters));
      setSavedLetters(updatedLetters);
      
      // Update selected letter
      setSelectedLetter({
        ...selectedLetter,
        name: editingLetterName || selectedLetter.name
      });
      
      alert(`تم تحديث ${pageTitle.slice(0, -1)} بنجاح!`);
      
    } catch (error) {
      console.error('Error updating letter:', error);
      alert('حدث خطأ أثناء تحديث الخطاب. يرجى المحاولة مرة أخرى.');
    }
  };
  
  // Handle letter printing
  const handlePrintLetter = () => {
    window.print();
  };
  
  // Handle creating new letter
  const handleNewLetter = () => {
    navigate(`/administrative-notifications/${type}/create`);
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
                  {pageTitle} المحفوظة
                </h1>
              </div>
              
              <Button
                variant="primary"
                size="md"
                iconName="Plus"
                iconPosition="left"
                onClick={handleNewLetter}
              >
                إنشاء {pageTitle.slice(0, -1)} جديد
              </Button>
            </div>
          </div>

          {/* Main Content */}
          {selectedLetter ? (
            <div className="mb-8">
              <LetterPreview
                generatedLetter={selectedLetter}
                editingLetterName={editingLetterName}
                setEditingLetterName={setEditingLetterName}
                pageTitle={pageTitle}
                letterImage={null}
                onEditContent={handleEditContent}
                onSaveLetter={handleSaveLetter}
                onPrintLetter={handlePrintLetter}
                onNewLetter={handleNewLetter}
              />
              
              <div className="mt-6 flex justify-center">
                <Button
                  variant="outline"
                  size="md"
                  iconName="ArrowLeft"
                  onClick={() => setSelectedLetter(null)}
                >
                  العودة إلى القائمة
                </Button>
              </div>
            </div>
          ) : (
            <SavedLettersList
              savedLetters={savedLetters}
              pageTitle={pageTitle}
              onLoadLetter={handleLoadLetter}
              onDeleteLetter={handleDeleteLetter}
              onViewAcknowledgements={handleViewAcknowledgements}
              onShareLetter={handleShareLetter}
              type={type}
            />
          )}
        </div>
      </main>
      
      {/* Acknowledgements Dialog */}
      <AcknowledgementsDialog
        isOpen={isAcknowledgementsOpen}
        onOpenChange={setIsAcknowledgementsOpen}
        letterId={selectedLetterId}
        letterTitle={selectedLetterTitle}
      />
      
      {/* Share Dialog */}
      {isShareDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">مشاركة الرابط</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setIsShareDialogOpen(false)}
              />
            </div>
            
            <p className="text-text-secondary mb-4">
              يمكنك مشاركة هذا الرابط مع المعلمين للاطلاع على {pageTitle.slice(0, -1)}.
            </p>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
              <Input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1"
              />
              <Button
                variant="primary"
                size="md"
                iconName="Copy"
                onClick={handleCopyLink}
              >
                نسخ
              </Button>
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsShareDialogOpen(false)}
              >
                إغلاق
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedLetters;