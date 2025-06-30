import React, { useCallback } from 'react';
import Icon from 'components/AppIcon';
import { STRATEGIC_DOMAINS_OPTIONS } from '../../lib/operationalPlanConstants';
import DomainSelection from '../strategic-goals/DomainSelection';
import DomainObjectivesCard from '../strategic-goals/DomainObjectivesCard';

const GoalsSection = ({ strategicGoals, onChange }) => {
    const handleAddDomain = useCallback((domainId) => {
        if (!strategicGoals.some(d => d.domain_id === domainId)) {
            const domainInfo = STRATEGIC_DOMAINS_OPTIONS.find(d => d.id === domainId);
            if (domainInfo) {
                const newDomainGoal = {
                    domain_id: domainId,
                    domain_name: domainInfo.label, 
                    objectives: domainInfo.objectives.map(obj => ({
                        id: obj.id,
                        objective_title_id: obj.objective_title_id,
                        objective_title_label: obj.objective_title_label,
                        domain_objective_id: obj.id,
                        domain_objective_label: obj.label,
                        selected: false,
                        kpis: [],
                        required_resources: obj.required_resources.map(res => ({ name: res, selected: false })),
                        isCustomResources: false,
                        customResources: ""
                    }))
                };
                onChange([...strategicGoals, newDomainGoal]);
            }
        }
    }, [strategicGoals, onChange]);

    const handleRemoveDomain = useCallback((domainId) => {
        onChange(strategicGoals.filter(d => d.domain_id !== domainId));
    }, [strategicGoals, onChange]);
    
    const handleObjectivesChange = useCallback((domainId, updatedObjectives) => {
        const newStrategicGoals = strategicGoals.map(domainGoal => {
            if (domainGoal.domain_id === domainId) {
                return { ...domainGoal, objectives: updatedObjectives };
            }
            return domainGoal;
        });
        onChange(newStrategicGoals);
    }, [strategicGoals, onChange]);

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg">
                        <Icon name="Target" size={20} className="text-primary-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-text-primary">اختيار المجالات الاستراتيجية</h3>
                        <p className="text-sm text-text-secondary">
                            اختر المجالات التي ستركز عليها خطتك التشغيلية. يمكنك إضافة أو إزالة المجالات حسب الحاجة.
                        </p>
                    </div>
                </div>
                
                <DomainSelection
                    domains={STRATEGIC_DOMAINS_OPTIONS}
                    selectedDomains={strategicGoals.map(d => d.domain_id)}
                    onAddDomain={handleAddDomain}
                    onRemoveDomain={handleRemoveDomain}
                />
            </div>

            <div className="space-y-6">
                {strategicGoals.map((domainGoal) => {
                    const domainInfo = STRATEGIC_DOMAINS_OPTIONS.find(d => d.id === domainGoal.domain_id);
                    if (!domainInfo) return null;

                    return (
                        <div
                            key={domainGoal.domain_id}
                            className="animate-fade-in"
                        >
                            <DomainObjectivesCard
                                domainInfo={domainInfo}
                                objectivesData={domainGoal.objectives || []}
                                onObjectivesChange={(updatedObjectives) => handleObjectivesChange(domainGoal.domain_id, updatedObjectives)}
                                onRemoveDomain={() => handleRemoveDomain(domainGoal.domain_id)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GoalsSection;