function Sidebar({ activeTab, setActiveTab, userData, onLogout }) {
    try {
        const [isCollapsed, setIsCollapsed] = React.useState(false);
        
        const menuItems = [
            { id: 'clients', icon: 'fa-users', label: 'العملاء' },
            { id: 'whatsapp', icon: 'fa-whatsapp', label: 'اتصال واتساب' },
            { id: 'reports', icon: 'fa-chart-bar', label: 'التقارير' },
            { id: 'settings', icon: 'fa-cog', label: 'الإعدادات' }
        ];
        
        return (
            <div data-name="sidebar" className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
                <div className="p-4">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center">
                            {!isCollapsed && (
                                <div className="mr-2">
                                    <img 
                                        src="https://via.placeholder.com/40" 
                                        alt="Logo" 
                                        className="h-8 w-8 rounded-md"
                                    />
                                </div>
                            )}
                            {!isCollapsed && (
                                <span className="text-lg font-bold text-white">موتوبي</span>
                            )}
                        </div>
                        <button 
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="text-gray-400 hover:text-white"
                        >
                            <i className={`fas ${isCollapsed ? 'fa-angle-left' : 'fa-angle-right'}`}></i>
                        </button>
                    </div>
                    
                    {userData && !isCollapsed && (
                        <div className="mb-8 p-3 bg-gray-800 rounded-lg">
                            <p className="text-sm font-medium text-white">{userData.companyName}</p>
                            <p className="text-xs text-gray-400">{userData.email}</p>
                            <div className="mt-2 flex items-center text-xs text-blue-400">
                                <i className="fas fa-crown ml-1"></i>
                                <span>
                                    {userData.subscription?.plan === 'starter' ? 'خطة أساسية' : 'خطة مجانية'}
                                </span>
                            </div>
                        </div>
                    )}
                    
                    <nav className="space-y-1">
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`sidebar-link w-full ${activeTab === item.id ? 'active' : ''}`}
                            >
                                <i className={`fas ${item.icon} ${isCollapsed ? '' : 'ml-2'}`}></i>
                                {!isCollapsed && <span>{item.label}</span>}
                            </button>
                        ))}
                    </nav>
                </div>
                
                <div className="mt-auto p-4">
                    <button 
                        onClick={onLogout}
                        className="sidebar-link w-full text-red-300 hover:text-red-100"
                    >
                        <i className={`fas fa-sign-out-alt ${isCollapsed ? '' : 'ml-2'}`}></i>
                        {!isCollapsed && <span>تسجيل الخروج</span>}
                    </button>
                    
                    {!isCollapsed && (
                        <div className="mt-4 pt-4 border-t border-gray-700">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <i className="fas fa-headset text-gray-400"></i>
                                </div>
                                <div className="mr-3">
                                    <p className="text-xs text-gray-400">بحاجة إلى مساعدة؟</p>
                                    <a href="#" className="text-xs text-blue-400 hover:text-blue-300">
                                        تواصل مع الدعم
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Sidebar component error:', error);
        reportError(error);
        return <div>Something went wrong</div>;
    }
}
