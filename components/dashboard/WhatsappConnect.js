function WhatsappConnect() {
    try {
        const [status, setStatus] = React.useState({ connected: false });
        const [qrCode, setQrCode] = React.useState(null);
        const [isConnecting, setIsConnecting] = React.useState(false);
        const [error, setError] = React.useState(null);
        
        React.useEffect(() => {
            checkConnectionStatus();
        }, []);
        
        const checkConnectionStatus = () => {
            try {
                const whatsappStatus = getWhatsappStatus();
                setStatus(whatsappStatus);
            } catch (error) {
                console.error('Error checking WhatsApp status:', error);
                setError('فشل في التحقق من حالة الاتصال');
            }
        };
        
        const handleConnect = () => {
            setIsConnecting(true);
            setError(null);
            
            connectWhatsapp(
                // QR code callback
                (qrCodeData) => {
                    setQrCode(qrCodeData);
                },
                // Success callback
                () => {
                    setIsConnecting(false);
                    setQrCode(null);
                    checkConnectionStatus();
                },
                // Error callback
                (err) => {
                    setIsConnecting(false);
                    setQrCode(null);
                    setError('فشل في الاتصال بواتساب: ' + err.message);
                }
            );
        };
        
        const handleDisconnect = () => {
            try {
                disconnectWhatsapp();
                checkConnectionStatus();
            } catch (error) {
                console.error('Error disconnecting WhatsApp:', error);
                setError('فشل في قطع الاتصال بواتساب');
            }
        };
        
        return (
            <div data-name="whatsapp-connect-container">
                <h1 className="text-2xl font-bold mb-6">اتصال واتساب</h1>
                
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}
                
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">حالة الاتصال</h2>
                        {status.connected ? (
                            <div className="whatsapp-connected">
                                <i className="fas fa-check-circle ml-2"></i>
                                متصل
                            </div>
                        ) : (
                            <div className="whatsapp-disconnected">
                                <i className="fas fa-times-circle ml-2"></i>
                                غير متصل
                            </div>
                        )}
                    </div>
                    
                    {status.connected ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-green-50 rounded-md">
                                <p className="text-green-800 mb-2">
                                    <i className="fas fa-check-circle ml-2"></i>
                                    واتساب متصل بنجاح
                                </p>
                                <p className="text-sm text-green-700">
                                    تم الاتصال في: {new Date(status.connectedAt).toLocaleString()}
                                </p>
                                <p className="text-sm text-green-700">
                                    ينتهي في: {new Date(status.expiresAt).toLocaleString()} ({status.daysRemaining} يوم متبقي)
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="font-bold mb-2">ملاحظات هامة:</h3>
                                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                                    <li>يجب أن يظل جهازك متصلاً بالإنترنت لإرسال الرسائل</li>
                                    <li>تجنب تسجيل الخروج من واتساب ويب على جهازك</li>
                                    <li>قد تحتاج إلى إعادة الاتصال كل 30 يوم</li>
                                </ul>
                            </div>
                            
                            <div className="pt-4">
                                <Button 
                                    onClick={handleDisconnect} 
                                    variant="danger"
                                >
                                    <i className="fas fa-unlink ml-2"></i>
                                    قطع الاتصال
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {qrCode ? (
                                <div className="whatsapp-qr-container">
                                    <h3 className="text-lg font-medium mb-4">امسح رمز QR من خلال واتساب</h3>
                                    <img src={qrCode} alt="WhatsApp QR Code" className="mb-4" />
                                    <p className="text-sm text-gray-600 max-w-md text-center">
                                        افتح واتساب على هاتفك، انتقل إلى الإعدادات، ثم الأجهزة المرتبطة، ثم ربط جهاز، ثم امسح رمز QR
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div className="p-4 bg-blue-50 rounded-md w-full mb-6">
                                        <h3 className="font-bold mb-2">كيفية الاتصال:</h3>
                                        <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                            <li>انقر على زر "اتصال واتساب" أدناه</li>
                                            <li>سيظهر رمز QR للمسح</li>
                                            <li>افتح واتساب على هاتفك</li>
                                            <li>انتقل إلى الإعدادات > الأجهزة المرتبطة > ربط جهاز</li>
                                            <li>امسح رمز QR الظاهر على الشاشة</li>
                                        </ol>
                                    </div>
                                    
                                    <Button
                                        onClick={handleConnect}
                                        loading={isConnecting}
                                    >
                                        <i className="fab fa-whatsapp ml-2"></i>
                                        اتصال واتساب
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                <div className="bg-white rounded-lg shadow p-6 mt-6">
                    <h2 className="text-xl font-bold mb-4">اختبار الاتصال</h2>
                    
                    <div className="space-y-4">
                        <p className="text-gray-600">
                            يمكنك إرسال رسالة اختبارية للتأكد من عمل الاتصال بشكل صحيح
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    رقم الهاتف
                                </label>
                                <Input
                                    placeholder="مثال: 966501234567"
                                    type="tel"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    الرسالة
                                </label>
                                <Input
                                    placeholder="رسالة اختبارية"
                                />
                            </div>
                        </div>
                        
                        <Button
                            disabled={!status.connected}
                            onClick={() => alert('تم إرسال الرسالة الاختبارية')}
                        >
                            <i className="fas fa-paper-plane ml-2"></i>
                            إرسال رسالة اختبارية
                        </Button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('WhatsApp connect component error:', error);
        reportError(error);
        return <div>Something went wrong</div>;
    }
}
