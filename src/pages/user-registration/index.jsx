import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import RegistrationHeader from './components/RegistrationHeader';
import ProgressIndicator from './components/ProgressIndicator';
import RegistrationForm from './components/RegistrationForm';
import SuccessMessage from './components/SuccessMessage';

const UserRegistration = () => {
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState(0);

  const handleRegistrationSuccess = () => {
    setRegistrationComplete(true);
  };

  const handleStepChange = (step, completed) => {
    setCurrentStep(step);
    setCompletedSteps(completed);
  };

  return (
    <>
      <Helmet>
        <title>إنشاء حساب جديد - SchoolPlan Pro</title>
        <meta name="description" content="انضم إلى منصة SchoolPlan Pro وابدأ في إنشاء خططك التشغيلية بسهولة" />
        <meta name="keywords" content="تسجيل, إنشاء حساب, مدرسة, تعليم, خطة تشغيلية" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50" dir="rtl">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <RegistrationHeader />

            {/* Main Content */}
            {!registrationComplete ? (
              <div className="space-y-8">
                {/* Progress Indicator */}
                <ProgressIndicator 
                  currentStep={currentStep}
                  totalSteps={4}
                  completedSteps={completedSteps}
                />

                {/* Registration Form */}
                <RegistrationForm 
                  onSuccess={handleRegistrationSuccess}
                  onStepChange={handleStepChange}
                />
              </div>
            ) : (
              /* Success Message */
              <SuccessMessage />
            )}
          </div>
        </div>

        {/* Background Decorations */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-32 w-64 h-64 bg-primary-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-secondary-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-accent-100 rounded-full opacity-30 blur-2xl"></div>
        </div>
      </div>
    </>
  );
};

export default UserRegistration;