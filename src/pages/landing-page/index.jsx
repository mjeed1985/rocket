import React from 'react';
import PublicHeader from 'components/ui/PublicHeader';
import HeroSection from './components/HeroSection';
import StatisticsSection from './components/StatisticsSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import FooterSection from './components/FooterSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <PublicHeader />
      
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Statistics Section */}
        <StatisticsSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* CTA Section */}
        <CTASection />
      </main>
      
      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default LandingPage;