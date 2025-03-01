function Settings() {
    try {
        const [activeTab, setActiveTab] = React.useState('account');
        const [settings, setSettings] = React.useState({
            account: {
                companyName: 'وكالة الدراجات النارية',
                email: 'agency@example.com',
                phone: '0501234567',
                address: 'الرياض، المملكة العربية السعودية'
            },
            notifications: {
                enableEmailNotifications: true,
                enableSmsNotifications: false,
                reminderDays: [1, 3]
            },
            templates: {
                defaultTemplate: 'مرحباً {name}، نود تذكيركم بأن موعد الدفع الشهري بقيمة {amount} درهم سيكون في تاريخ {dueDate}. شكراً لتعاونكم.',
                followupTemplate: 'مرحباً {name}، نود تذكيركم بأن موعد الدفع الشهري بقيمة {amount} درهم قد حان. نرجو منكم سرعة السداد. شكراً لتعاونكم.',
                lateTemplate: 'مرحباً {name}، نود إشعاركم بأن موعد الدفع الشهري بقيمة {amount} درهم قد تأخر. نرجو منكم سرعة السداد. شكراً لتعاونكم.'
            },
            subscription: {
                currentPlan: 'starter',
                expiresAt: '2023-12-31'
            },
            whatsapp: {
                autoSend: true,
                sendTime: '09:00',
                enableFollowup: true,
                followupDays: 1
            }
        });
        const [isLoading, setIsLoading] = React.useState(false);
        const [successMessage, setSuccessMessage] = React.useState('');
        const [errorMessage, setErrorMessage] = React.useState('');

        React.useEffect(() => {
            fetchSettings();
        }, []);

        const fetchSettings = async () => {
            try {
                // In a real app, this would be an API call
                // const data = await getSettings();
                
                // For demo purposes, we'll use the initial state
                // This is where you would update the state with the fetched settings
            } catch (error) {
                console.error('Error fetching settings:', error);
                setErrorMessage('فشل في تحميل الإعدادات');
            }
        };

        const handleInputChange = (section, field, value) => {
            setSettings(prevSettings => ({
                ...prevSettings,
                [section]: {
                    ...prevSettings[section],
                    [field]: value
                }
            }));
        };

        const handleCheckboxChange = (section, field) => {
            setSettings(prevSettings => ({
                ...prevSettings,
                [section]: {
                    ...prevSettings[section],
                    [field]: !prevSettings[section][field]
                }
            }));
        };

        const handleReminderDaysChange = (day) => {
            const currentDays = [...settings.notifications.reminderDays];
            if (currentDays.includes(day)) {
                handleInputChange('notifications', 'reminderDays', currentDays.filter(d => d !== day));
            } else {
                handleInputChange('notifications', 'reminderDays', [...currentDays, day]);
            }
        };

        const handleSaveSettings = async (section) => {
            setIsLoading(true);
            setSuccessMessage('');
            setErrorMessage('');
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // In a real app, you would call an API here
                // await updateSettings(section, settings[section]);
                
                setSuccessMessage('تم حفظ الإعدادات بنجاح');
                setTimeout(() => setSuccessMessage(''), 3000);
            } catch (error) {
                console.error(`Error saving ${section} settings:`, error);
                setErrorMessage('حدث خطأ أثناء حفظ الإعدادات');
            } finally {
                setIsLoading(false);
            }
        };

        const renderAccountSettings = () => {
            return (
                <div data-name="account-settings" className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">اسم الشركة</label>
                        <Input 
                            value={settings.account.companyName}
                            onChange={(e) => handleInputChange('account', 'companyName', e.target.value)}
                            type="text"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                        <Input 
                            value={settings.account.email}
                            onChange={(e) => handleInputChange('account', 'email', e.target.value)}
                            type="email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                        <Input 
                            value={settings.account.phone}
                            onChange={(e) => handleInputChange('account', 'phone', e.target.value)}
                            type="tel"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                        <textarea
                            value={settings.account.address}
                            onChange={(e) => handleInputChange('account', 'address', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            rows="3"
                        />
                    </div>
                    <div>
                        <Button 
                            onClick={() => handleSaveSettings('account')}
                            loading={isLoading}
                        >
                            حفظ التغييرات
                        </Button>
                    </div>
                </div>
            );
        };

        const renderNotificationSettings = () => {
            return (
                <div data-name="notification-settings" className="space-y-6">
                    <div className="flex items-center">
                        <input
                            id="emailNotifications"
                            type="checkbox"
                            checked={settings.notifications.enableEmailNotifications}
                            onChange={() => handleCheckboxChange('notifications', 'enableEmailNotifications')}
                            className="h-4 w-4 text-blue-600"
                        />
                        <label htmlFor="emailNotifications" className="mr-2 block text-sm text-gray-700">
                            تفعيل إشعارات البريد الإلكتروني
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="smsNotifications"
                            type="checkbox"
                            checked={settings.notifications.enableSmsNotifications}
                            onChange={() => handleCheckboxChange('notifications', 'enableSmsNotifications')}
                            className="h-4 w-4 text-blue-600"
                        />
                        <label htmlFor="smsNotifications" className="mr-2 block text-sm text-gray-700">
                            تفعيل إشعارات الرسائل النصية
                        </label>
                    </div>
                    
                    <div>
                        <p className="block text-sm font-medium text-gray-700 mb-2">أيام التذكير قبل موعد الدفع</p>
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 5, 7].map((day) => (
                                <div 
                                    key={day}
                                    onClick={() => handleReminderDaysChange(day)}
                                    className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                                        settings.notifications.reminderDays.includes(day) 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {day} {day === 1 ? 'يوم' : 'أيام'}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="pt-4">
                        <Button 
                            onClick={() => handleSaveSettings('notifications')}
                            loading={isLoading}
                        >
                            حفظ التغييرات
                        </Button>
                    </div>
                </div>
            );
        };

        const renderTemplateSettings = () => {
            return (
                <div data-name="template-settings" className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">قالب التذكير الافتراضي</label>
                        <p className="text-xs text-gray-500 mb-2">يتم إرساله قبل موعد الدفع</p>
                        <textarea
                            value={settings.templates.defaultTemplate}
                            onChange={(e) => handleInputChange('templates', 'defaultTemplate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            rows="4"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">قالب المتابعة</label>
                        <p className="text-xs text-gray-500 mb-2">يتم إرساله في يوم الدفع</p>
                        <textarea
                            value={settings.templates.followupTemplate}
                            onChange={(e) => handleInputChange('templates', 'followupTemplate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            rows="4"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">قالب التأخير</label>
                        <p className="text-xs text-gray-500 mb-2">يتم إرساله بعد فوات موعد الدفع</p>
                        <textarea
                            value={settings.templates.lateTemplate}
                            onChange={(e) => handleInputChange('templates', 'lateTemplate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            rows="4"
                        />
                    </div>
                    
                    <div>
                        <p className="text-sm text-gray-600 mb-2">المتغيرات المتاحة:</p>
                        <div className="flex flex-wrap gap-2">
                            <div className="bg-gray-100 px-2 py-1 rounded text-xs">{'{name}'}</div>
                            <div className="bg-gray-100 px-2 py-1 rounded text-xs">{'{amount}'}</div>
                            <div className="bg-gray-100 px-2 py-1 rounded text-xs">{'{dueDate}'}</div>
                            <div className="bg-gray-100 px-2 py-1 rounded text-xs">{'{companyName}'}</div>
                        </div>
                    </div>
                    
                    <div className="pt-4">
                        <Button 
                            onClick={() => handleSaveSettings('templates')}
                            loading={isLoading}
                        >
                            حفظ التغييرات
                        </Button>
                    </div>
                </div>
            );
        };

        const renderWhatsappSettings = () => {
            return (
                <div data-name="whatsapp-settings" className="space-y-6">
                    <div className="flex items-center">
                        <input
                            id="autoSend"
                            type="checkbox"
                            checked={settings.whatsapp.autoSend}
                            onChange={() => handleCheckboxChange('whatsapp', 'autoSend')}
                            className="h-4 w-4 text-blue-600"
                        />
                        <label htmlFor="autoSend" className="mr-2 block text-sm text-gray-700">
                            إرسال تلقائي للرسائل
                        </label>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            وقت إرسال الرسائل التلقائية
                        </label>
                        <Input 
                            type="time"
                            value={settings.whatsapp.sendTime}
                            onChange={(e) => handleInputChange('whatsapp', 'sendTime', e.target.value)}
                        />
                    </div>
                    
                    <div className="flex items-center">
                        <input
                            id="enableFollowup"
                            type="checkbox"
                            checked={settings.whatsapp.enableFollowup}
                            onChange={() => handleCheckboxChange('whatsapp', 'enableFollowup')}
                            className="h-4 w-4 text-blue-600"
                        />
                        <label htmlFor="enableFollowup" className="mr-2 block text-sm text-gray-700">
                            تفعيل المتابعة التلقائية
                        </label>
                    </div>
                    
                    {settings.whatsapp.enableFollowup && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                عدد أيام المتابعة بعد تاريخ الاستحقاق
                            </label>
                            <select
                                value={settings.whatsapp.followupDays}
                                onChange={(e) => handleInputChange('whatsapp', 'followupDays', parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="1">يوم واحد</option>
                                <option value="2">يومان</option>
                                <option value="3">3 أيام</option>
                                <option value="5">5 أيام</option>
                                <option value="7">7 أيام</option>
                            </select>
                        </div>
                    )}
                    
                    <div className="pt-4">
                        <Button 
                            onClick={() => handleSaveSettings('whatsapp')}
                            loading={isLoading}
                        >
                            حفظ التغييرات
                        </Button>
                    </div>
                </div>
            );
        };

        const renderSubscriptionSettings = () => {
            const planDetails = {
                free: {
                    name: 'مجاني',
                    features: ['10 عملاء', '10 رسائل', 'تذكير تلقائي', 'لوحة تحكم بسيطة']
                },
                starter: {
                    name: 'أساسي',
                    features: ['100 عميل', 'رسائل غير محدودة', 'تذكير تلقائي', 'تقارير أساسية', 'دعم فني']
                },
                pro: {
                    name: 'احترافي',
                    features: ['عملاء غير محدودين', 'رسائل غير محدودة', 'تذكير تلقائي', 'تقارير متقدمة', 'دعم فني مميز', 'تخصيص كامل']
                }
            };
            
            const currentPlan = settings.subscription.currentPlan;
            
            return (
                <div data-name="subscription-settings" className="space-y-8">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-bold text-blue-700 mb-2">خطتك الحالية: {planDetails[currentPlan].name}</h3>
                        <p className="text-sm text-gray-700">
                            تنتهي في: {new Date(settings.subscription.expiresAt).toLocaleDateString('ar-MA')}
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(planDetails).map(([planId, plan]) => (
                            <div 
                                key={planId}
                                className={`border rounded-lg p-4 ${currentPlan === planId ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                            >
                                <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
                                <ul className="space-y-2 mb-4">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-sm">
                                            <i className="fas fa-check text-green-500 ml-2"></i>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                {currentPlan === planId ? (
                                    <div className="bg-blue-600 text-white text-center py-2 rounded-md">خطتك الحالية</div>
                                ) : (
                                    <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md">
                                        ترقية
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-bold mb-2">سجل الفواتير</h3>
                        <table className="w-full">
                            <thead>
                                <tr className="text-right text-gray-600 text-sm">
                                    <th className="pb-2">التاريخ</th>
                                    <th className="pb-2">الخطة</th>
                                    <th className="pb-2">المبلغ</th>
                                    <th className="pb-2">الحالة</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <tr>
                                    <td className="py-2">2023-06-01</td>
                                    <td className="py-2">أساسي</td>
                                    <td className="py-2">100 درهم</td>
                                    <td className="py-2">
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">مدفوع</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2">2023-05-01</td>
                                    <td className="py-2">أساسي</td>
                                    <td className="py-2">100 درهم</td>
                                    <td className="py-2">
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">مدفوع</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        };
        
        const renderSecuritySettings = () => {
            return (
                <div data-name="security-settings" className="space-y-6">
                    <div>
                        <h3 className="font-bold mb-4">تغيير كلمة المرور</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور الحالية</label>
                                <Input type="password" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور الجديدة</label>
                                <Input type="password" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">تأكيد كلمة المرور الجديدة</label>
                                <Input type="password" />
                            </div>
                            <Button>تغيير كلمة المرور</Button>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="font-bold mb-4">التحقق بخطوتين</h3>
                        <div className="flex items-center mb-4">
                            <input
                                id="twoFactor"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600"
                            />
                            <label htmlFor="twoFactor" className="mr-2 block text-sm text-gray-700">
                                تفعيل التحقق بخطوتين
                            </label>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            يضيف التحقق بخطوتين طبقة إضافية من الأمان لحسابك. عند تسجيل الدخول، ستحتاج إلى إدخال رمز تحقق يتم إرساله إلى هاتفك.
                        </p>
                        <Button variant="secondary">إعداد التحقق بخطوتين</Button>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="font-bold text-red-600 mb-4">حذف الحساب</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            سيؤدي حذف حسابك إلى إزالة جميع البيانات المرتبطة به. هذا الإجراء لا يمكن التراجع عنه.
                        </p>
                        <Button variant="danger">حذف الحساب</Button>
                    </div>
                </div>
            );
        };

        const renderActiveTabContent = () => {
            switch (activeTab) {
                case 'account':
                    return renderAccountSettings();
                case 'notifications':
                    return renderNotificationSettings();
                case 'templates':
                    return renderTemplateSettings();
                case 'whatsapp':
                    return renderWhatsappSettings();
                case 'subscription':
                    return renderSubscriptionSettings();
                case 'security':
                    return renderSecuritySettings();
                default:
                    return renderAccountSettings();
            }
        };

        return (
            <div data-name="settings-container">
                <h1 className="text-2xl font-bold mb-6">الإعدادات</h1>
                
                {successMessage && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                        {successMessage}
                    </div>
                )}
                
                {errorMessage && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {errorMessage}
                    </div>
                )}
                
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="flex flex-wrap border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('account')}
                            className={`tab ${activeTab === 'account' ? 'active' : ''}`}
                        >
                            <i className="fas fa-user ml-2"></i>
                            الحساب
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
                        >
                            <i className="fas fa-bell ml-2"></i>
                            الإشعارات
                        </button>
                        <button
                            onClick={() => setActiveTab('templates')}
                            className={`tab ${activeTab === 'templates' ? 'active' : ''}`}
                        >
                            <i className="fas fa-envelope ml-2"></i>
                            قوالب الرسائل
                        </button>
                        <button
                            onClick={() => setActiveTab('whatsapp')}
                            className={`tab ${activeTab === 'whatsapp' ? 'active' : ''}`}
                        >
                            <i className="fab fa-whatsapp ml-2"></i>
                            إعدادات واتساب
                        </button>
                        <button
                            onClick={() => setActiveTab('subscription')}
                            className={`tab ${activeTab === 'subscription' ? 'active' : ''}`}
                        >
                            <i className="fas fa-credit-card ml-2"></i>
                            الاشتراك
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`tab ${activeTab === 'security' ? 'active' : ''}`}
                        >
                            <i className="fas fa-lock ml-2"></i>
                            الأمان
                        </button>
                    </div>
                    
                    <div className="p-6">
                        {renderActiveTabContent()}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Settings component error:', error);
        reportError(error);
        return <div>Something went wrong</div>;
    }
}
