function LoginForm({ setIsAuthenticated, onClose, openSignup }) {
    try {
        const [formData, setFormData] = React.useState({
            email: '',
            password: ''
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
            
            // Clear general error when user changes any field
            if (generalError) {
                setGeneralError('');
            }
        };

        const validateForm = () => {
            const newErrors = {};
            
            // Validate email
            if (!formData.email.trim()) {
                newErrors.email = 'البريد الإلكتروني مطلوب';
            }
            
            // Validate password
            if (!formData.password) {
                newErrors.password = 'كلمة المرور مطلوبة';
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
                
                // For demo purposes - accept any valid-looking email/password combination
                // In a real app, this would be an actual authentication API call
                if (formData.email.includes('@') && formData.password.length >= 4) {
                    // Generate mock user data based on the email
                    const userData = {
                        id: Math.floor(Math.random() * 10000),
                        companyName: formData.email.split('@')[0] + ' وكالة',
                        email: formData.email,
                        phone: '05' + Math.floor(10000000 + Math.random() * 90000000),
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
                } else {
                    setGeneralError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
                }
            } catch (error) {
                console.error('Login error:', error);
                setGeneralError('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.');
            } finally {
                setIsSubmitting(false);
            }
        };

        return (
            <div data-name="login-form" className="p-6">
                <h2 className="text-2xl font-bold text-center mb-6">تسجيل الدخول</h2>
                
                {generalError && (
                    <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
                        {generalError}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                كلمة المرور <span className="text-red-500">*</span>
                            </label>
                            <a href="#" className="text-sm text-blue-600 hover:underline">نسيت كلمة المرور؟</a>
                        </div>
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
                    
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-700">
                            تذكرني
                        </label>
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
                                    جاري تسجيل الدخول...
                                </>
                            ) : "تسجيل الدخول"}
                        </button>
                    </div>
                </form>
                
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        ليس لديك حساب؟ 
                        <button 
                            onClick={() => {
                                onClose();
                                openSignup && openSignup();
                            }}
                            className="text-blue-600 hover:underline mr-1"
                        >
                            إنشاء حساب جديد
                        </button>
                    </p>
                </div>
                
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">أو تسجيل الدخول باستخدام</span>
                        </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <i className="fab fa-google text-red-600 ml-2"></i>
                            Google
                        </button>
                        <button
                            type="button"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <i className="fab fa-apple text-gray-800 ml-2"></i>
                            Apple
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Login form error:', error);
        reportError(error);
        return <div>Something went wrong</div>;
    }
}
