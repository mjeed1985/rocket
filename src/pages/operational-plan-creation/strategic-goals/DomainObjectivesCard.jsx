import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const DomainObjectivesCard = ({ domainInfo, objectivesData, onObjectivesChange, onRemoveDomain }) => {
  const [expandedObjective, setExpandedObjective] = useState(null);

  const handleObjectiveToggle = (objectiveId) => {
    const updatedObjectives = objectivesData.map(obj => 
      obj.id === objectiveId 
        ? { ...obj, selected: !obj.selected }
        : obj
    );
    onObjectivesChange(updatedObjectives);
  };

  const handleKPIChange = (objectiveId, kpiIndex, value) => {
    const updatedObjectives = objectivesData.map(obj => {
      if (obj.id === objectiveId) {
        const updatedKPIs = [...(obj.kpis || [])];
        updatedKPIs[kpiIndex] = value;
        return { ...obj, kpis: updatedKPIs };
      }
      return obj;
    });
    onObjectivesChange(updatedObjectives);
  };

  const addKPI = (objectiveId) => {
    const updatedObjectives = objectivesData.map(obj => {
      if (obj.id === objectiveId) {
        return { ...obj, kpis: [...(obj.kpis || []), ''] };
      }
      return obj;
    });
    onObjectivesChange(updatedObjectives);
  };

  const removeKPI = (objectiveId, kpiIndex) => {
    const updatedObjectives = objectivesData.map(obj => {
      if (obj.id === objectiveId) {
        const updatedKPIs = obj.kpis.filter((_, index) => index !== kpiIndex);
        return { ...obj, kpis: updatedKPIs };
      }
      return obj;
    });
    onObjectivesChange(updatedObjectives);
  };

  const handleResourceToggle = (objectiveId, resourceIndex) => {
    const updatedObjectives = objectivesData.map(obj => {
      if (obj.id === objectiveId) {
        const updatedResources = obj.required_resources.map((resource, index) => 
          index === resourceIndex 
            ? { ...resource, selected: !resource.selected }
            : resource
        );
        return { ...obj, required_resources: updatedResources };
      }
      return obj;
    });
    onObjectivesChange(updatedObjectives);
  };

  const selectedObjectives = objectivesData.filter(obj => obj.selected);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">{domainInfo.label}</h3>
              <p className="text-primary-100 text-sm">{domainInfo.description}</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemoveDomain}
            iconName="X"
            className="text-white hover:bg-white hover:bg-opacity-20"
          />
        </div>
        
        {selectedObjectives.length > 0 && (
          <div className="mt-4 flex items-center space-x-2 rtl:space-x-reverse">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm">
              تم اختيار {selectedObjectives.length} من {objectivesData.length} أهداف
            </span>
          </div>
        )}
      </div>

      {/* Objectives List */}
      <div className="p-6 space-y-4">
        {objectivesData.map((objective) => (
          <div
            key={objective.id}
            className={`border-2 rounded-lg transition-all duration-200 ${
              objective.selected 
                ? 'border-primary-300 bg-primary-50' 
                : 'border-slate-200 bg-white'
            }`}
          >
            {/* Objective Header */}
            <div 
              className="p-4 cursor-pointer"
              onClick={() => handleObjectiveToggle(objective.id)}
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  objective.selected 
                    ? 'border-primary-500 bg-primary-500' 
                    : 'border-slate-300'
                }`}>
                  {objective.selected && (
                    <Icon name="Check" size={12} className="text-white" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className={`text-sm font-semibold ${
                    objective.selected ? 'text-primary-800' : 'text-text-primary'
                  }`}>
                    {objective.domain_objective_label}
                  </h4>
                  {objective.objective_title_label && (
                    <p className={`text-xs mt-1 ${
                      objective.selected ? 'text-primary-600' : 'text-text-secondary'
                    }`}>
                      {objective.objective_title_label}
                    </p>
                  )}
                </div>
                
                {objective.selected && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedObjective(
                        expandedObjective === objective.id ? null : objective.id
                      );
                    }}
                    iconName={expandedObjective === objective.id ? "ChevronUp" : "ChevronDown"}
                    className="text-primary-600"
                  />
                )}
              </div>
            </div>

            {/* Expanded Details */}
            {objective.selected && expandedObjective === objective.id && (
              <div className="border-t border-primary-200 p-4 space-y-4">
                {/* KPIs Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-sm font-medium text-text-primary">مؤشرات الأداء الرئيسية</h5>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addKPI(objective.id)}
                      iconName="Plus"
                      className="text-xs"
                    >
                      إضافة مؤشر
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {(objective.kpis || []).map((kpi, index) => (
                      <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Input
                          type="text"
                          placeholder={`مؤشر الأداء ${index + 1}`}
                          value={kpi}
                          onChange={(e) => handleKPIChange(objective.id, index, e.target.value)}
                          className="flex-1 text-sm"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeKPI(objective.id, index)}
                          iconName="Trash2"
                          className="text-error-600 hover:bg-error-50"
                        />
                      </div>
                    ))}
                    
                    {(!objective.kpis || objective.kpis.length === 0) && (
                      <p className="text-xs text-text-muted italic">
                        لم يتم إضافة مؤشرات أداء بعد
                      </p>
                    )}
                  </div>
                </div>

                {/* Resources Section */}
                <div>
                  <h5 className="text-sm font-medium text-text-primary mb-3">الموارد المطلوبة</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {objective.required_resources.map((resource, index) => (
                      <div
                        key={index}
                        onClick={() => handleResourceToggle(objective.id, index)}
                        className={`p-2 rounded border cursor-pointer transition-all duration-200 ${
                          resource.selected 
                            ? 'border-success-300 bg-success-50 text-success-800' 
                            : 'border-slate-200 hover:border-success-200'
                        }`}
                      >
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <div className={`w-3 h-3 rounded border flex items-center justify-center ${
                            resource.selected 
                              ? 'border-success-500 bg-success-500' 
                              : 'border-slate-300'
                          }`}>
                            {resource.selected && (
                              <Icon name="Check" size={8} className="text-white" />
                            )}
                          </div>
                          <span className="text-xs">{resource.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DomainObjectivesCard;