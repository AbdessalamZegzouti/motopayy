function Pricing({ setShowSignup }) {
    try {
        const plans = [
            {
                name: "مجاني",
                price: "0",
                features: [
                    "10 عملاء",
                    "10 رسائل",
                    "تذكير تلقائي",
                    "لوحة تحكم بسيطة"
                ],
                popular: false
            },
            {
                name: "أساسي",
                price: "10",
                features: [
                    "100 عميل",
                    "رسائل غير محدودة",
                    "تذكير تلقائي",
                    "تقارير أساسية",
                    "دعم فني"
                ],
                popular: true
            },
            {
                name: "احترافي",
                price: "30",
                features: [
                    "عملاء غير محدودين",
                    "رسائل غير محدودة",
                    "تذكير تلقائي",
                    "تقارير متقدمة",
                    "دعم فني مميز",
                    "تخصيص كامل"
                ],
                popular: false
            }
        ];

        const handleSignupClick = () => {
            // Dispatch a custom event that will be caught by the Landing component
            const event = new CustomEvent('openSignupModal');
            window.dispatchEvent(event);
        };

        return (
            <div data-name="pricing-section" className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center animate-fadeIn">
                        <h2 className="text-3xl font-bold text-gray-900 section-heading">خطط الأسعار</h2>
                        <p className="mt-4 text-lg text-gray-600 section-subheading">اختر الخطة المناسبة لحجم أعمالك</p>
                    </div>

                    <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {plans.map((plan, index) => (
                            <div 
                                key={index}
                                data-name={`pricing-card-${index}`}
                                className={`${plan.popular ? 'pricing-popular' : ''} pricing-card animate-slideInFromBottom`}
                                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                            >
                                {plan.popular && (
                                    <div className="pricing-popular-badge">الأكثر شيوعاً</div>
                                )}
                                <div className={`pricing-header ${plan.popular ? 'bg-blue-600 text-white' : 'bg-blue-50 text-gray-900'}`}>
                                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                                    <div className="mt-4 flex items-baseline">
                                        <span className="text-4xl font-bold">${plan.price}</span>
                                        <span className="mr-2 opacity-80">/شهرياً</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <ul className="mt-6 space-y-4">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center">
                                                <i className="fas fa-check text-green-500 ml-2"></i>
                                                <span className="text-gray-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8">
                                        <button
                                            onClick={handleSignupClick}
                                            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                                                plan.popular 
                                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' 
                                                    : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                                            }`}
                                        >
                                            {plan.price === "0" ? "ابدأ مجاناً" : "اشترك الآن"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center animate-fadeIn" style={{animationDelay: '0.6s'}}>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            جميع الخطط تشمل تجربة مجانية لمدة 14 يوم. لا يلزم بطاقة ائتمان. يمكنك إلغاء اشتراكك في أي وقت.
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Pricing section error:', error);
        reportError(error);
        return <div>Something went wrong</div>;
    }
}
