import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const AcknowledgementsDialog = ({ isOpen, onOpenChange, letterId, letterTitle }) => {
    const [acknowledgements, setAcknowledgements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && letterId) {
            const fetchAcknowledgements = async () => {
                setLoading(true);
                try {
                    // Simulate API call with mock data
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Mock data
                    const mockAcknowledgements = [
                        {
                            id: 1,
                            employee_name: 'أحمد محمد العلي',
                            employee_phone: '0501234567',
                            acknowledged_at: new Date().toISOString()
                        },
                        {
                            id: 2,
                            employee_name: 'محمد عبدالله الخالد',
                            employee_phone: '0509876543',
                            acknowledged_at: new Date(Date.now() - 3600000).toISOString()
                        },
                        {
                            id: 3,
                            employee_name: 'خالد سعد الغامدي',
                            employee_phone: '0551234567',
                            acknowledged_at: new Date(Date.now() - 7200000).toISOString()
                        }
                    ];
                    
                    setAcknowledgements(mockAcknowledgements);
                } catch (error) {
                    console.error('Error fetching acknowledgements:', error);
                    alert("لم نتمكن من جلب قائمة المطلعين.");
                } finally {
                    setLoading(false);
                }
            };
            fetchAcknowledgements();
        }
    }, [isOpen, letterId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <Icon name="Users" size={24} className="text-primary-600" />
                            <div>
                                <h3 className="text-lg font-semibold text-text-primary">قائمة المطلعين على التبليغ</h3>
                                <p className="text-sm text-text-secondary">{letterTitle}</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            iconName="X"
                            onClick={() => onOpenChange(false)}
                        />
                    </div>
                </div>
                
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                        </div>
                    ) : acknowledgements.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                            اسم الموظف
                                        </th>
                                        <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                            رقم الجوال
                                        </th>
                                        <th className="px-6 py-3 text-right rtl:text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                                            تاريخ الاطلاع
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {acknowledgements.map((ack) => (
                                        <tr key={ack.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                                                {ack.employee_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                                {ack.employee_phone}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                                {new Date(ack.acknowledged_at).toLocaleString('ar-SA')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-40 text-center text-text-muted">
                            <Icon name="FileX" size={48} className="mb-4 opacity-50" />
                            <p className="font-semibold">لم يطلع أحد على هذا التبليغ بعد.</p>
                        </div>
                    )}
                </div>
                
                <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
                    <Button
                        variant="primary"
                        onClick={() => onOpenChange(false)}
                    >
                        إغلاق
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AcknowledgementsDialog;