function Reports() {
    try {
        const [dateRange, setDateRange] = React.useState('month');
        const [reportType, setReportType] = React.useState('messages');
        const [isLoading, setIsLoading] = React.useState(false);
        const [reportData, setReportData] = React.useState(null);
        const [error, setError] = React.useState(null);

        React.useEffect(() => {
            fetchReportData();
        }, [dateRange, reportType]);

        const fetchReportData = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                // In a real app, this would be an API call
                // const data = await getReports(reportType, startDate, endDate);
                
                // For demo purposes, we'll use mock data
                await new Promise(resolve => setTimeout(resolve, 800));
                
                const mockData = getMockReports();
                setReportData(mockData);
            } catch (error) {
                console.error('Error fetching report data:', error);
                setError('فشل في تحميل بيانات التقارير');
            } finally {
                setIsLoading(false);
            }
        };

        const renderMessagesReport = () => {
            if (!reportData) return null;
            
            return (
                <div data-name="messages-report" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <p className="text-sm text-gray-500">الرسائل المرسلة</p>
                            <p className="text-2xl font-bold">{reportData.messagesSent}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <p className="text-sm text-gray-500">الرسائل المستلمة</p>
                            <p className="text-2xl font-bold">{reportData.messagesDelivered}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <p className="text-sm text-gray-500">الرسائل المقروءة</p>
                            <p className="text-2xl font-bold">{reportData.messagesRead}</p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="font-bold mb-4">إحصائيات الرسائل الشهرية</h3>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-right py-2">الشهر</th>
                                    <th className="text-right py-2">مرسلة</th>
                                    <th className="text-right py-2">مستلمة</th>
                                    <th className="text-right py-2">مقروءة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.monthlyStats.map((month, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                        <td className="py-2">{month.month}</td>
                                        <td className="py-2">{month.sent}</td>
                                        <td className="py-2">{month.delivered}</td>
                                        <td className="py-2">{month.read}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        };

        const renderPaymentsReport = () => {
            if (!reportData) return null;
            
            return (
                <div data-name="payments-report" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <p className="text-sm text-gray-500">المدفوعات الناجحة</p>
                            <p className="text-2xl font-bold">{reportData.paymentSuccess}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <p className="text-sm text-gray-500">المدفوعات المعلقة</p>
                            <p className="text-2xl font-bold">{reportData.paymentPending}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <p className="text-sm text-gray-500">إجمالي الإيرادات</p>
                            <p className="text-2xl font-bold">{reportData.totalRevenue} درهم</p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="font-bold mb-4">إحصائيات المدفوعات الشهرية</h3>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-right py-2">الشهر</th>
                                    <th className="text-right py-2">الرسائل المرسلة</th>
                                    <th className="text-right py-2">المدفوعات الناجحة</th>
                                    <th className="text-right py-2">نسبة النجاح</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.monthlyStats.map((month, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                        <td className="py-2">{month.month}</td>
                                        <td className="py-2">{month.sent}</td>
                                        <td className="py-2">{month.paid}</td>
                                        <td className="py-2">{Math.round((month.paid / month.sent) * 100)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        };

        return (
            <div data-name="reports-container">
                <h1 className="text-2xl font-bold mb-6">التقارير والإحصائيات</h1>
                
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}
                
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="flex space-x-2 space-x-reverse mb-2 sm:mb-0">
                            <button
                                onClick={() => setReportType('messages')}
                                className={`px-4 py-2 rounded-md ${
                                    reportType === 'messages'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                تقارير الرسائل
                            </button>
                            <button
                                onClick={() => setReportType('payments')}
                                className={`px-4 py-2 rounded-md ${
                                    reportType === 'payments'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                تقارير المدفوعات
                            </button>
                        </div>
                        
                        <div>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2"
                            >
                                <option value="week">آخر أسبوع</option>
                                <option value="month">آخر شهر</option>
                                <option value="quarter">آخر 3 أشهر</option>
                                <option value="year">آخر سنة</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    reportType === 'messages' ? renderMessagesReport() : renderPaymentsReport()
                )}
                
                <div className="mt-6 text-left">
                    <Button
                        onClick={() => {
                            alert('تم تنزيل التقرير');
                        }}
                    >
                        <i className="fas fa-download ml-2"></i>
                        تنزيل التقرير
                    </Button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Reports component error:', error);
        reportError(error);
        return <div>Something went wrong</div>;
    }
}

// Mock data helper function
function getMockReports() {
    return {
        messagesSent: 120,
        messagesDelivered: 115,
        messagesRead: 98,
        paymentSuccess: 85,
        paymentPending: 35,
        totalRevenue: 425000,
        monthlyStats: [
            { month: 'يناير', sent: 40, delivered: 38, read: 32, paid: 28 },
            { month: 'فبراير', sent: 40, delivered: 39, read: 34, paid: 30 },
            { month: 'مارس', sent: 40, delivered: 38, read: 32, paid: 27 }
        ]
    };
}
