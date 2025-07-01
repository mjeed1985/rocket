import React, { useState, useRef } from 'react';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const LetterPreviewDialog = ({ isOpen, onOpenChange, imageDataUrl, letterData, letterType, pageTitle, onLinkGenerated }) => {
    const [isSharing, setIsSharing] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const previewRef = useRef(null);

    if (!isOpen) return null;

    const handleExport = () => {
        if (!imageDataUrl) {
            alert("لا توجد صورة للتصدير.");
            return;
        }
        
        setIsExporting(true);
        
        // Simulate PDF export
        setTimeout(() => {
            // Create a temporary link
            const link = document.createElement('a');
            link.href = imageDataUrl;
            link.download = `${letterType}_${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            setIsExporting(false);
            alert("تم التصدير بنجاح");
        }, 1500);
    };
    
    const handleShare = async () => {
        if (!imageDataUrl) {
            alert("لا توجد صورة للمشاركة.");
            return;
        }

        setIsSharing(true);
        
        // Simulate sharing process
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const mockShareToken = `share-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
            const mockLetterId = Date.now();
            const currentDate = new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
            const letterFinalName = `${pageTitle}: ${letterData.title} - ${currentDate}`;
            
            alert("تم إنشاء رابط المشاركة بنجاح!");
            onOpenChange(false);
            onLinkGenerated(mockLetterId, letterFinalName, mockShareToken);
        } catch (error) {
            console.error("Sharing error:", error);
            alert("فشلت عملية إنشاء رابط المشاركة. يرجى المحاولة مرة أخرى.");
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-text-primary">معاينة {pageTitle}</h3>
                            <p className="text-sm text-text-secondary">
                                تأكد من صحة البيانات قبل الحفظ أو المشاركة. للتصدير بجودة عالية، استخدم زر "تصدير PDF".
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            iconName="X"
                            onClick={() => onOpenChange(false)}
                            disabled={isSharing || isExporting}
                        />
                    </div>
                </div>
                
                <div className="flex-grow p-4 overflow-auto border-b border-slate-200 bg-slate-100">
                    <div ref={previewRef} className="w-[210mm] min-h-[297mm] mx-auto bg-white shadow-lg">
                        {imageDataUrl ? (
                            <img 
                                src={imageDataUrl} 
                                alt={`معاينة ${pageTitle}`} 
                                className="w-full h-full object-contain" 
                            />
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="p-4 flex flex-wrap justify-center sm:justify-end gap-3">
                    <Button 
                        variant="outline" 
                        onClick={() => onOpenChange(false)} 
                        disabled={isSharing || isExporting}
                    >
                        إغلاق
                    </Button>
                    
                    <Button 
                        variant="primary"
                        onClick={handleExport} 
                        disabled={isExporting || isSharing || !imageDataUrl}
                        iconName={isExporting ? "Loader2" : "Download"}
                        iconPosition="left"
                    >
                        {isExporting ? "جاري التصدير..." : "تصدير PDF"}
                    </Button>
                    
                    {(letterType === 'notifications' || letterType === 'bulletins') && (
                        <Button 
                            variant="success"
                            onClick={handleShare} 
                            disabled={isSharing || isExporting || !imageDataUrl}
                            iconName={isSharing ? "Loader2" : "Share2"}
                            iconPosition="left"
                        >
                            {isSharing ? "جاري المشاركة..." : "مشاركة وحفظ"}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LetterPreviewDialog;