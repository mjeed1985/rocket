import React, { useCallback } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import { 
    EVALUATION_MECHANISMS,
    MONITORING_SCHEDULE_EXAMPLES,
    EVALUATION_TOOLS_EXAMPLES,
} from '../../lib/operationalPlanConstants';

const CheckboxGroup = ({ title, options, selected, onChange }) => {
    const handleCheckChange = useCallback((checked, optionValue) => {
        const newSelected = checked
            ? [...selected, optionValue]
            : selected.filter(item => item !== optionValue);
        onChange(newSelected);
    }, [selected, onChange]);

    return (
        <div>
            <label className="block text-sm font-medium text-text-primary mb-3">{title}</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {options.map(option => (
                    <div key={option} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <input
                            type="checkbox"
                            id={option}
                            checked={selected.includes(option)}
                            onChange={(e) => handleCheckChange(e.target.checked, option)}
                            className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                        />
                        <label htmlFor={option} className="text-sm cursor-pointer">{option}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CustomItemsList = ({ title, items, onItemsChange, placeholder }) => {
    const handleItemChange = useCallback((index, value) => {
        const newItems = [...items];
        newItems[index] = value;
        onItemsChange(newItems);
    }, [items, onItemsChange]);

    const addItem = useCallback(() => {
        onItemsChange([...items, '']);
    }, [items, onItemsChange]);

    const removeItem = useCallback((index) => {
        onItemsChange(items.filter((_, i) => i !== index));
    }, [items, onItemsChange]);

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-text-primary">{title}</label>
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <Input
                        value={item}
                        onChange={e => handleItemChange(index, e.target.value)}
                        placeholder={`${placeholder} #${index + 1}`}
                        className="flex-1"
                    />
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeItem(index)}
                        iconName="Trash2"
                        className="text-error-600 hover:bg-error-50"
                    />
                </div>
            ))}
            <Button 
                variant="outline" 
                onClick={addItem}
                iconName="Plus"
                iconPosition="left"
                className="w-full"
            >
                إضافة
            </Button>
        </div>
    );
};

const EvaluationSection = ({ evaluationMonitoring, onChange }) => {
    const handleChange = useCallback((field, value) => {
        onChange({ ...evaluationMonitoring, [field]: value });
    }, [evaluationMonitoring, onChange]);

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg">
                        <Icon name="CheckSquare" size={20} className="text-primary-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-text-primary">آليات التقييم</h3>
                        <p className="text-sm text-text-secondary">صف آليات التقييم والمتابعة للخطة</p>
                    </div>
                </div>
                
                <textarea
                    value={evaluationMonitoring?.evaluation_mechanisms || ''}
                    onChange={e => handleChange('evaluation_mechanisms', e.target.value)}
                    placeholder={`مثال: ${EVALUATION_MECHANISMS}`}
                    rows={6}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                    <div className="flex items-center justify-center w-10 h-10 bg-secondary-100 rounded-lg">
                        <Icon name="BarChart3" size={20} className="text-secondary-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-text-primary">مؤشرات النجاح وأدوات التقييم</h3>
                    </div>
                </div>
                
                <div className="space-y-6">
                    <CustomItemsList
                        title="مؤشرات النجاح (مخصصة)"
                        items={evaluationMonitoring?.success_indicators || []}
                        onItemsChange={items => handleChange('success_indicators', items)}
                        placeholder="أدخل مؤشر نجاح"
                    />
                    <CheckboxGroup
                        title="أدوات التقييم المقترحة"
                        options={EVALUATION_TOOLS_EXAMPLES}
                        selected={evaluationMonitoring?.evaluation_tools || []}
                        onChange={items => handleChange('evaluation_tools', items)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                    <div className="flex items-center justify-center w-10 h-10 bg-accent-100 rounded-lg">
                        <Icon name="Calendar" size={20} className="text-accent-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-text-primary">الجدول الزمني للمتابعة</h3>
                        <p className="text-sm text-text-secondary">صف الجدول الزمني للمتابعة والتقويم</p>
                    </div>
                </div>
                
                <textarea
                    value={evaluationMonitoring?.monitoring_schedule || ''}
                    onChange={e => handleChange('monitoring_schedule', e.target.value)}
                    placeholder={`مثال: ${MONITORING_SCHEDULE_EXAMPLES}`}
                    rows={6}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                />
            </div>
        </div>
    );
};

export default EvaluationSection;