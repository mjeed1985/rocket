import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const PlanningHeader = ({ planTitle, lastSaved, onSave, onPreview, onExit }) => {
  return (
    <header className="bg-white border-b border-slate-200 shadow-card-1 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Link to="/user-dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-primary">
                <Icon name="GraduationCap" size={20} color="white" strokeWidth={2} />
              </div>
              <span className="hidden sm:block text-lg font-bold text-primary-800 font-heading">خطتك التشغيلية الذكية

              </span>
            </Link>
            
            <div className="hidden md:block h-6 w-px bg-slate-300"></div>
            
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-text-primary">
                {planTitle || "خطة تشغيلية جديدة"}
              </h1>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Icon name="Clock" size={14} className="text-text-muted" />
                <span className="text-sm text-text-secondary">
                  آخر حفظ: {lastSaved || "منذ دقيقتين"}
                </span>
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* Auto-save Indicator */}
            <div className="hidden sm:flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 bg-success-50 rounded-full">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-success-700 font-medium">حفظ تلقائي</span>
            </div>

            {/* Action Buttons */}
            <Button
              variant="ghost"
              size="sm"
              iconName="Save"
              onClick={onSave}
              className="hidden sm:flex">

              حفظ
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              iconName="Eye"
              onClick={onPreview}
              className="hidden md:flex">

              معاينة
            </Button>

            {/* Mobile Menu */}
            <div className="sm:hidden">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreVertical"
                onClick={() => {
                  // Mobile menu logic
                  console.log('Mobile menu');
                }} />

            </div>

            {/* Exit Button */}
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onExit}
              className="text-text-muted hover:text-error-600 hover:bg-error-50" />

          </div>
        </div>
      </div>
    </header>);

};

export default PlanningHeader;