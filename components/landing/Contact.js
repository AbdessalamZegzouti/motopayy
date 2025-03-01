function Contact() {
    try {
        const [formData, setFormData] = React.useState({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
        const [isSubmitting, setIsSubmitting] = React.useState(false);
        const [submitSuccess, setSubmitSuccess] = React.useState(false);
        const [submitError, setSubmitError] = React.useState('');

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            setSubmitError('');
            setSubmitSuccess(false);

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // In a real app, you would call an API here
                // await submitContactForm(formData);
                
                setSubmitSuccess(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            } catch (error) {
                console.error('Contact form submission error:', error);
                setSubmitError('حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.');
            } finally {
                setIsSubmitting(false);
            }
        };

        return (
            <section id="contact" data-name="contact-section" className="py-20 bg-gradient-to-b from-white to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fadeIn">
                        <h2 className="text-3xl font-bold text-gray-900 section-heading">تواصل معنا</h2>
                        <p className="mt-4 text-lg text-gray-600 section-subheading">نحن هنا للإجابة على استفساراتك ومساعدتك في كل ما تحتاج</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 animate-slideInFromLeft">
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">أرسل لنا رسالة</h3>
                                
                                {submitSuccess && (
                                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <i className="fas fa-check-circle text-green-500"></i>
                                            </div>
                                            <div className="mr-3">
                                                <p className="text-sm text-green-700">
                                                    تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {submitError && (
                                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <i className="fas fa-exclamation-circle text-red-500"></i>
                                            </div>
                                            <div className="mr-3">
                                                <p className="text-sm text-red-700">{submitError}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="أدخل اسمك الكامل"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="example@email.com"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="05xxxxxxxx"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">الرسالة</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="4"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="اكتب رسالتك هنا..."
                                        ></textarea>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 ease-in-out flex justify-center items-center"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    جاري الإرسال...
                                                </>
                                            ) : "إرسال الرسالة"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="space-y-10 animate-slideInFromRight">
                            <div className="text-center lg:text-right">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">معلومات التواصل</h3>
                                <p className="text-gray-600 mb-8">
                                    يمكنك التواصل معنا مباشرة عبر أي من وسائل التواصل التالية. فريقنا جاهز للرد على استفساراتك وتقديم الدعم اللازم.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="contact-info-card">
                                    <div className="contact-info-icon">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-1">العنوان</h4>
                                    <p className="text-gray-600">الرياض، المملكة العربية السعودية</p>
                                </div>

                                <div className="contact-info-card">
                                    <div className="contact-info-icon">
                                        <i className="fas fa-phone-alt"></i>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-1">الهاتف</h4>
                                    <p className="text-gray-600">+966 12 345 6789</p>
                                </div>

                                <div className="contact-info-card">
                                    <div className="contact-info-icon">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-1">البريد الإلكتروني</h4>
                                    <p className="text-gray-600">info@motopay.com</p>
                                </div>

                                <div className="contact-info-card">
                                    <div className="contact-info-icon">
                                        <i className="fab fa-whatsapp"></i>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-1">واتساب</h4>
                                    <p className="text-gray-600">+966 12 345 6789</p>
                                </div>
                            </div>

                            <div className="bg-white shadow-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">ساعات العمل</h4>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex justify-between">
                                        <span>الأحد - الخميس:</span>
                                        <span>9:00 ص - 5:00 م</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>الجمعة:</span>
                                        <span>مغلق</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>السبت:</span>
                                        <span>10:00 ص - 2:00 م</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error('Contact section error:', error);
        reportError(error);
        return <div>Something went wrong</div>;
    }
}
