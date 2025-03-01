function Features() {
    try {
        const features = [
            {
                icon: "fa-bell",
                title: "تذكير تلقائي",
                description: "إرسال رسائل تذكير تلقائية لعملائك قبل موعد الدفع بالأيام التي تحددها، مما يزيد من معدلات الالتزام بالسداد."
            },
            {
                icon: "fa-whatsapp",
                title: "واتساب ويب",
                description: "لا حاجة لـ API أو تكاليف إضافية - استخدم حساب واتساب الخاص بك مباشرة وأرسل الرسائل بسهولة وفعالية."
            },
            {
                icon: "fa-users",
                title: "إدارة العملاء",
                description: "أضف وعدل وتتبع عملائك بسهولة، مع إمكانية استيراد قاعدة بيانات العملاء من ملفات إكسل."
            },
            {
                icon: "fa-chart-line",
                title: "تقارير وتحليلات",
                description: "تتبع المدفوعات ومعدلات النجاح والإيرادات من خلال لوحة تحكم متكاملة تعرض البيانات بشكل مرئي."
            },
            {
                icon: "fa-file-invoice-dollar",
                title: "متابعة المدفوعات",
                description: "تتبع حالة الدفع لكل عميل، مع إمكانية تحديث الحالة تلقائيًا أو يدويًا وإرسال رسائل متابعة."
            },
            {
                icon: "fa-cog",
                title: "قابلية التخصيص",
                description: "خصص قوالب الرسائل وأوقات الإرسال وإعدادات النظام بما يتناسب مع احتياجات وكالتك."
            }
        ];

        return (
            <div data-name="features-section" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center animate-fadeIn">
                        <h2 className="text-3xl font-bold text-gray-900 section-heading">مميزات النظام</h2>
                        <p className="mt-4 text-lg text-gray-600 section-subheading">كل ما تحتاجه لإدارة مدفوعات عملائك بكفاءة وتحسين معدلات التحصيل</p>
                    </div>

                    <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <div 
                                key={index}
                                data-name={`feature-card-${index}`}
                                className="feature-card p-8 animate-slideInFromBottom hover-float"
                                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                            >
                                <div className="feature-icon-container">
                                    <i className={`fas ${feature.icon} feature-icon`}></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Features section error:', error);
        reportError(error);
        return <div>Something went wrong</div>;
    }
}
