import React from 'react';

const LoginBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50"></div>
      
      {/* Geometric Patterns */}
      <div className="absolute inset-0 opacity-30">
        {/* Large Circle */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full blur-3xl opacity-20"></div>
        
        {/* Medium Circle */}
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-secondary-200 to-secondary-300 rounded-full blur-2xl opacity-25"></div>
        
        {/* Small Circles */}
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-accent-200 to-accent-300 rounded-full blur-xl opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-primary-300 to-secondary-300 rounded-full blur-lg opacity-25"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(37, 99, 235, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Educational Icons Pattern */}
      <div className="absolute inset-0 opacity-10">
        {/* Book Icons */}
        <div className="absolute top-1/4 left-1/6 transform rotate-12">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary-400">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        
        <div className="absolute top-2/3 right-1/6 transform -rotate-12">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-secondary-400">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>

        {/* Graduation Cap Icons */}
        <div className="absolute top-1/2 left-1/12 transform rotate-45">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent-400">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        
        <div className="absolute top-1/6 right-1/12 transform -rotate-45">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary-400">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="2"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-primary-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-secondary-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/5 w-1.5 h-1.5 bg-accent-300 rounded-full animate-pulse opacity-70" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/6 right-1/5 w-1 h-1 bg-primary-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '3s' }}></div>
      </div>
    </div>
  );
};

export default LoginBackground;