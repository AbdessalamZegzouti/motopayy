function Dashboard({ setIsAuthenticated }) {
    try {
        const [activeTab, setActiveTab] = React.useState('clients');
        const [isLoading, setIsLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
        const [userData, setUserData] = React.useState(null);
        const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

        React.useEffect(() => {
            const fetchUserData = async () => {
                try {
                    // First try to get user data from localStorage
                    const storedUserData = localStorage.getItem('userData');
                    if (storedUserData) {
                        setUserData(JSON.parse(storedUserData));
                    } else {
                        // If not in localStorage, fetch it
                        const data = await getUserData();
                        // Store it for future use
                        localStorage.setItem('userData', JSON.stringify(data));
                        setUserData(data);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setError('فشل في تحميل بيانات المستخدم');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchUserData();
        }, []);

        const handleLogout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            setIsAuthenticated(false);
        };

        const renderContent = () => {
            switch (activeTab) {
                case 'clients':
                    return <ClientList />;
                case 'whatsapp':
                    return <WhatsappConnect />;
                case 'reports':
                    return <Reports />;
                case 'settings':
                    return <Settings />;
                default:
                    return <ClientList />;
            }
        };

        if (isLoading) {
            return (
                <div data-name="loading" className="flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            );
        }

        if (error) {
            return (
                <div data-name="error" className="flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md mx-auto text-center">
                        <p className="text-lg font-bold mb-2">خطأ</p>
                        <p className="mb-4">{error}</p>
                        <div className="flex justify-center space-x-2 space-x-reverse">
                            <button 
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                إعادة المحاولة
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                            >
                                تسجيل الخروج
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div data-name="dashboard-container" className="dashboard-layout">
                {/* Mobile sidebar toggle */}
                <div className="lg:hidden fixed top-4 right-4 z-20">
                    <button 
                        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                        className="p-2 bg-gray-800 text-white rounded-md"
                    >
                        <i className={`fas ${isMobileSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
                
                {/* Sidebar */}
                <div className={`sidebar ${isMobileSidebarOpen ? 'block' : 'hidden'} lg:block fixed lg:static top-0 right-0 h-full z-10`}>
                    <Sidebar 
                        activeTab={activeTab} 
                        setActiveTab={(tab) => {
                            setActiveTab(tab);
                            setIsMobileSidebarOpen(false);
                        }}
                        userData={userData}
                        onLogout={handleLogout}
                    />
                </div>
                
                {/* Main Content */}
                <div className="content-area">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <header className="bg-white shadow-sm rounded-lg mb-6">
                            <div className="px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        {activeTab === 'clients' && 'إدارة العملاء'}
                                        {activeTab === 'whatsapp' && 'اتصال واتساب'}
                                        {activeTab === 'reports' && 'التقارير والإحصائيات'}
                                        {activeTab === 'settings' && 'الإعدادات'}
                                    </h1>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {userData && `مرحباً، ${userData.companyName}`}
                                    </p>
                                </div>
                                
                                <div className="flex items-center space-x-4 space-x-reverse">
                                    {/* Whatsapp connection status */}
                                    {isWhatsappConnected() ? (
                                        <div className="hidden sm:flex items-center bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                                            <i className="fas fa-check-circle ml-1"></i>
                                            واتساب متصل
                                        </div>
                                    ) : (
                                        <div className="hidden sm:flex items-center bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                                            <i className="fas fa-times-circle ml-1"></i>
                                            واتساب غير متصل
                                        </div>
                                    )}
                                    
                                    {/* Subscription badge */}
                                    <div className="hidden sm:flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                        <i className="fas fa-crown ml-1"></i>
                                        {userData?.subscription?.plan === 'starter' ? 'خطة أساسية' : 'خطة مجانية'}
                                    </div>
                                    
                                    {/* User dropdown */}
                                    <div className="relative">
                                        <button className="flex items-center text-gray-700 hover:text-gray-900">
                                            <img 
                                                src="https://via.placeholder.com/40" 
                                                alt="User profile" 
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <i className="fas fa-chevron-down ml-1 text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </header>
                        
                        {/* Dashboard Content */}
                        <main>
                            {renderContent()}
                        </main>
                    </div>
                </div>
                
                {/* Mobile sidebar overlay */}
                {isMobileSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-0"
                        onClick={() => setIsMobileSidebarOpen(false)}
                    ></div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Dashboard error:', error);
        reportError(error);
        return (
            <div data-name="error-fallback" className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
                            <i className="fas fa-exclamation-triangle text-xl"></i>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">حدث خطأ غير متوقع</h2>
                        <p className="text-gray-600 mb-6">نعتذر عن هذا الخطأ. يرجى تحديث الصفحة أو تسجيل الخروج وإعادة المحاولة.</p>
                        <div className="flex justify-center space-x-2 space-x-reverse">
                            <button 
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                تحديث الصفحة
                            </button>
                            <button 
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('userData');
                                    window.location.reload();
                                }}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                            >
                                تسجيل الخروج
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
