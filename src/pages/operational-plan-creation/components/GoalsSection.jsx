import React, { useCallback, useState } from 'react';
import Icon from 'components/AppIcon';
import { STRATEGIC_DOMAINS_OPTIONS } from 'lib/operationalPlanConstants';
import DomainSelection from '../strategic-goals/DomainSelection';
import DomainObjectivesCard from '../strategic-goals/DomainObjectivesCard';
import Button from 'components/ui/Button';
import aiGenerationService from '../../../services/aiGenerationService';

const GoalsSection = ({ strategicGoals, onChange }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    
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

    // توليد الأهداف الاستراتيجية باستخدام الذكاء الاصطناعي
    const handleGenerateGoals = async () => {
        setIsGenerating(true);
        
        try {
            // إضافة المجالات الاستراتيجية الرئيسية إذا لم تكن موجودة
            const mainDomains = ['teaching-learning', 'student-development', 'school-environment'];
            
            for (const domainId of mainDomains) {
                if (!strategicGoals.some(d => d.domain_id === domainId)) {
                    handleAddDomain(domainId);
                }
            }
            
            // الحصول على مستوى المدرسة من بيانات الخطة
            const schoolLevel = 'ابتدائية'; // يمكن استبدالها بالقيمة الفعلية من planData
            
            // توليد الأهداف الاستراتيجية
            const generatedGoals = await aiGenerationService.generateStrategicGoals(schoolLevel);
            
            // تحديث الأهداف الموجودة بالأهداف المولدة
            const updatedGoals = strategicGoals.map(domainGoal => {
                // اختيار هدف واحد على الأقل من كل مجال
                const objectives = domainGoal.objectives.map((obj, index) => {
                    // تحديد الهدف الأول في كل مجال
                    if (index === 0) {
                        // إضافة مؤشرات الأداء المولدة
                        const kpis = generatedGoals[0]?.kpis || ['تحسين مستوى الطلاب بنسبة 10%', 'زيادة رضا أولياء الأمور بنسبة 15%'];
                        
                        return {
                            ...obj,
                            selected: true,
                            kpis: kpis
                        };
                    }
                    return obj;
                });
                
                return { ...domainGoal, objectives };
            });
            
            onChange(updatedGoals);
            
            alert('تم توليد الأهداف الاستراتيجية بنجاح!');
        } catch (error) {
            console.error('Error generating strategic goals:', error);
            alert('حدث خطأ أثناء توليد الأهداف الاستراتيجية. يرجى المحاولة مرة أخرى.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
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
                    
                    {/* زر توليد الأهداف الاستراتيجية */}
                    <Button
                        variant="primary"
                        onClick={handleGenerateGoals}
                        disabled={isGenerating}
                        loading={isGenerating}
                        iconName={isGenerating ? "Loader2" : "Wand2"}
                    >
                        {isGenerating ? 'جاري التوليد...' : 'توليد الأهداف'}
                    </Button>
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