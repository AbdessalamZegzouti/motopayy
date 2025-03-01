function SignupForm({ setIsAuthenticated, onClose, openLogin }) {
    try {
        const [formData, setFormData] = React.useState({
            companyName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: ''
        });
        const [errors, setErrors] = React.useState({});
        const [isSubmitting, setIsSubmitting] = React.useState(false);
        const [generalError, setGeneralError] = React.useState('');

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
            
            // Clear field-specific error when user starts typing again
            if (errors[name]) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: ''
                }));
            }
        };

        const validateForm = () => {
            const newErrors = {};
            
            // Validate company name
            if (!formData.companyName.trim()) {
                newErrors.companyName = 'اسم الشركة مطلوب';
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formData.email.trim()) {
                newErrors.email = 'البريد الإلكتروني مطلوب';
            } else if (!emailRegex.test(formData.email)) {
                newErrors.email = 'البريد الإلكتروني غير صالح';
            }
            
            // Validate phone
            if (!formData.phone.trim()) {
                newErrors.phone = 'رقم الهاتف مطلوب';
            } else if (!/^[0-9+\s]+$/.test(formData.phone)) {
                newErrors.phone = 'رقم الهاتف يجب أن يحتوي على أرقام فقط';
            }
            
            // Validate password
            if (!formData.password) {
                newErrors.password = 'كلمة المرور مطلوبة';
            } else if (formData.password.length < 8) {
                newErrors.password = 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل';
            }
            
            // Validate confirm password
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
            }
            
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setGeneralError('');
            
            if (!validateForm()) {
                return;
            }
            
            setIsSubmitting(true);
            
            try {
                // For demo purposes, simulate API call with a delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // In a real app, you would call an API here
                // const response = await fetch('https://api.example.com/signup', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(formData),
                // });
                
                // if (!response.ok) {
                //     throw new Error('Failed to create account');
                // }
                
                // const data = await response.json();
                
                // Mock user data for demo purposes
                const userData = {
                    id: Math.floor(Math.random() * 10000),
                    companyName: formData.companyName,
                    email: formData.email,
                    phone: formData.phone,
                    subscription: {
                        plan: 'starter',
                        expiresAt: '2023-12-31'
                    }
                };
                
                // Store both token and user data in localStorage
                localStorage.setItem('token', 'mock_token_' + Math.random().toString(36).substring(2));
                localStorage.setItem('userData', JSON.stringify(userData));
                
                setIsAuthenticated(true);
                onClose();
            } catch (error) {
                console.error('Signup error:', error);
                setGeneralError('حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.');
            } finally {
                setIsSubmitting(false);
            }
        };

        return (
            <div data-name="signup-form" className="p-6">
                <h2 className="text-2xl font-bold text-center mb-6">إنشاء حساب جديد</h2>
                
                {generalError && (
                    <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
                        {generalError}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            اسم الشركة <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            required
                        />
                        {errors.companyName && (
                            <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
                        )}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            البريد الإلكتروني <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            required
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            رقم الهاتف <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            placeholder="05xxxxxxxx"
                            required
                        />
                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                        )}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            كلمة المرور <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            required
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            تأكيد كلمة المرور <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            required
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                        )}
                    </div>
                    
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    جاري إنشاء الحساب...
                                </>
                            ) : "إنشاء حساب"}
                        </button>
                    </div>
                    
                    <div className="text-center text-sm text-gray-600">
                        بالنقر على "إنشاء حساب"، أنت توافق على 
                        <a href="#" className="text-blue-600 hover:underline mr-1">شروط الاستخدام</a>
                        و
                        <a href="#" className="text-blue-600 hover:underline mr-1">سياسة الخصوصية</a>
                    </div>
                </form>
                
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        لديك حساب بالفعل؟ 
                        <button 
                            onClick={() => {
                                onClose();
                                openLogin && openLogin();
                            }}
                            className="text-blue-600 hover:underline mr-1"
                        >
                            تسجيل الدخول
                        </button>
                    </p>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Signup form error:', error);
        reportError(error);
        return <div>Something went wrong</div>;
    }
}
