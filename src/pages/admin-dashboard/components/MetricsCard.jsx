import React from 'react';
import Icon from 'components/AppIcon';

const MetricsCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
    secondary: 'bg-secondary-50 text-secondary-600'
  };

  const trendColors = {
    up: 'text-success-600',
    down: 'text-error-600',
    neutral: 'text-text-muted'
  };

  return (
    <div className="bg-surface rounded-lg border border-slate-200 p-6 shadow-card-1 hover:shadow-card-2 transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <p className="text-3xl font-bold text-text-primary mb-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-text-muted">{subtitle}</p>
          )}
          {trend && trendValue && (
            <div className="flex items-center mt-2">
              <Icon 
                name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
                size={16} 
                className={`ml-1 rtl:ml-0 rtl:mr-1 ${trendColors[trend]}`}
              />
              <span className={`text-sm font-medium ${trendColors[trend]}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${colorClasses[color]}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;