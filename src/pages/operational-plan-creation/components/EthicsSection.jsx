import React, { useState, useCallback } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import { CORE_VALUES_LIST } from '../../../lib/operationalPlanConstants';

const EthicsSection = ({ ethicsCharter, onChange }) => {
    const [customValues, setCustomValues] = useState(
        ethicsCharter?.core_values?.filter(v => v.isCustom) || []
    );

    const handleCharterChange = (e) => {
        onChange({ ...ethicsCharter, charter_text: e.target.value });
    };

    const handlePredefinedValueChange = useCallback((checked, valueName) => {
        const currentValues = ethicsCharter?.core_values || [];
        let newValues;
        if (checked) {
            const predefinedValue = CORE_VALUES_LIST.find(v => v.name === valueName);
            newValues = [...currentValues, { ...predefinedValue, isCustom: false }];
        } else {
            newValues = currentValues.filter(v => v.name !== valueName);
        }
        onChange({ ...ethicsCharter, core_values: newValues });
    }, [ethicsCharter, onChange]);
    
    const handleCustomValueChange = (index, field, value) => {
        const updatedCustomValues = [...customValues];
        updatedCustomValues[index][field] = value;
        setCustomValues(updatedCustomValues);
        
        const nonCustomValues = ethicsCharter?.core_values?.filter(v => !v.isCustom) || [];
        onChange({ ...ethicsCharter, core_values: [...nonCustomValues, ...updatedCustomValues] });
    };

    const addCustomValue = () => {
        const newCustomValue = { name: '', description: '', isCustom: true };
        const updatedCustomValues = [...customValues, newCustomValue];
        setCustomValues(updatedCustomValues);

        const nonCustomValues = ethicsCharter?.core_values?.filter(v => !v.isCustom) || [];
        onChange({ ...ethicsCharter, core_values: [...nonCustomValues, ...updatedCustomValues] });
    };

    const removeCustomValue = (index) => {
        const updatedCustomValues = customValues.filter((_, i) => i !== index);
        setCustomValues(updatedCustomValues);

        const nonCustomValues = ethicsCharter?.core_values?.filter(v => !v.isCustom) || [];
        onChange({ ...ethicsCharter, core_values: [...nonCustomValues, ...updatedCustomValues] });
    };

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg">
                        <Icon name="Shield" size={20} className="text-primary-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-text-primary">ميثاق الأخلاقيات المهنية</h3>
                        <p className="text-sm text-text-secondary">حدد نص الميثاق الذي سيتم اعتماده في الخطة التشغيلية</p>
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">نص الميثاق</label>
                    <textarea
                        value={ethicsCharter?.charter_text || ''}
                        onChange={handleCharterChange}
                        placeholder="أدخل نص الميثاق الأخلاقي هنا..."
                        rows={10}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                    <div className="flex items-center justify-center w-10 h-10 bg-secondary-100 rounded-lg">
                        <Icon name="Heart" size={20} className="text-secondary-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-text-primary">القيم الأساسية</h3>
                        <p className="text-sm text-text-secondary">اختر القيم التي تمثل المدرسة أو أضف قيماً مخصصة</p>
                    </div>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-text-primary mb-3">القيم المقترحة</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {CORE_VALUES_LIST.map(value => (
                                <div key={value.name} className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <input
                                        type="checkbox"
                                        id={`value-${value.name}`}
                                        checked={ethicsCharter?.core_values?.some(v => v.name === value.name && !v.isCustom) || false}
                                        onChange={(e) => handlePredefinedValueChange(e.target.checked, value.name)}
                                        className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
                                    />
                                    <label htmlFor={`value-${value.name}`} className="text-sm cursor-pointer">{value.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-text-primary">قيم مخصصة</label>
                        {customValues.map((value, index) => (
                            <div key={index} className="flex items-end gap-4 p-4 border border-slate-200 rounded-md">
                                <div className="flex-grow space-y-2">
                                    <label className="block text-xs font-medium text-text-secondary">اسم القيمة</label>
                                    <Input
                                        value={value.name}
                                        onChange={(e) => handleCustomValueChange(index, 'name', e.target.value)}
                                        placeholder="مثل: الشفافية"
                                    />
                                </div>
                                <div className="flex-grow space-y-2">
                                    <label className="block text-xs font-medium text-text-secondary">وصف القيمة</label>
                                    <Input
                                        value={value.description}
                                        onChange={(e) => handleCustomValueChange(index, 'description', e.target.value)}
                                        placeholder="وصف مختصر للقيمة"
                                    />
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeCustomValue(index)}
                                    iconName="Trash2"
                                    className="text-error-600 hover:bg-error-50"
                                />
                            </div>
                        ))}
                        <Button
                            variant="outline"
                            onClick={addCustomValue}
                            iconName="Plus"
                            iconPosition="left"
                            className="w-full"
                        >
                            إضافة قيمة مخصصة
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EthicsSection;