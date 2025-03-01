function Testimonials() {
    try {
        const testimonials = [
            {
                text: "نظام موتوبي ساعدنا في زيادة معدل تحصيل الدفعات الشهرية بنسبة 45%. الآن لدينا تدفق نقدي أفضل ويمكننا التركيز على تنمية أعمالنا.",
                name: "محمد العتيبي",
                role: "مدير وكالة دراجات نارية",
                avatar: "https://randomuser.me/api/portraits/men/1.jpg"
            },
            {
                text: "التذكير التلقائي عبر واتساب كان له تأثير كبير على التزام العملاء بمواعيد الدفع. واجهة النظام سهلة الاستخدام والدعم الفني ممتاز.",
                name: "سارة الشمري",
                role: "مديرة العمليات",
                avatar: "https://randomuser.me/api/portraits/women/2.jpg"
            },
            {
                text: "بعد استخدام موتوبي، انخفضت نسبة التأخر في السداد من 30% إلى أقل من 10%. أنصح به بشدة لجميع وكالات الدراجات النارية.",
                name: "خالد القحطاني",
                role: "مالك وكالة",
                avatar: "https://randomuser.me/api/portraits/men/3.jpg"
            }
        ];

        const handleSignupClick = () => {
            // Dispatch a custom event that will be caught by the Landing component
            const event = new CustomEvent('openSignupModal');
            window.dispatchEvent(event);
        };

        return (
            <section data-name="testimonials-section" className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-fadeIn">
                        <h2 className="text-3xl font-bold text-gray-900 section-heading">آراء عملائنا</h2>
                        <p className="mt-4 text-lg text-gray-600 section-subheading">اكتشف كيف ساعد موتوبي الوكالات في تحسين معدلات التحصيل وزيادة التدفق النقدي</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={index} 
                                className="testimonial-card animate-slideInFromBottom"
                                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                            >
                                <div className="testimonial-quote">"</div>
                                <p className="testimonial-text">{testimonial.text}</p>
                                <div className="testimonial-author">
                                    <img 
                                        src={testimonial.avatar} 
                                        alt={testimonial.name} 
                                        className="testimonial-avatar"
                                    />
                                    <div className="testimonial-info">
                                        <h4>{testimonial.name}</h4>
                                        <p>{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center animate-fadeIn" style={{animationDelay: '0.6s'}}>
                        <div className="inline-flex items-center bg-blue-50 rounded-full px-6 py-3">
                            <div className="flex -space-x-2 space-x-reverse mr-3">
                                <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                                <img src="https://randomuser.me/api/portraits/women/5.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                                <img src="https://randomuser.me/api/portraits/men/6.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                            </div>
                            <span className="text-blue-800 font-medium">انضم إلى أكثر من 500 وكالة تستخدم موتوبي</span>
                        </div>
                    </div>

                    <div className="mt-20">
                        <div className="bg-blue-600 rounded-2xl overflow-hidden shadow-xl">
                            <div className="px-6 py-12 md:p-12 text-center md:text-right">
                                <div className="md:flex items-center justify-between">
                                    <div className="md:w-2/3">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                            جاهز لتحسين معدلات التحصيل لديك؟
                                        </h3>
                                        <p className="text-blue-100 mb-8 md:mb-0 max-w-2xl">
                                            ابدأ الآن واستمتع بتجربة مجانية لمدة 14 يومًا. لا يلزم بطاقة ائتمان، إلغاء في أي وقت.
                                        </p>
                                    </div>
                                    <div className="md:w-1/3 md:text-center">
                                        <button 
                                            onClick={handleSignupClick}
                                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                        >
                                            ابدأ التجربة المجانية
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-24">
                        <div className="text-center mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">شركاؤنا</h3>
                            <p className="text-gray-600">نفتخر بالعمل مع أفضل الوكالات والشركات في المملكة</p>
                        </div>

                        <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
                            <div className="w-32">
                                <img src="https://via.placeholder.com/128x64?text=LOGO" alt="Partner Logo" className="w-full h-auto grayscale hover:grayscale-0 transition-all" />
                            </div>
                            <div className="w-32">
                                <img src="https://via.placeholder.com/128x64?text=LOGO" alt="Partner Logo" className="w-full h-auto grayscale hover:grayscale-0 transition-all" />
                            </div>
                            <div className="w-32">
                                <img src="https://via.placeholder.com/128x64?text=LOGO" alt="Partner Logo" className="w-full h-auto grayscale hover:grayscale-0 transition-all" />
                            </div>
                            <div className="w-32">
                                <img src="https://via.placeholder.com/128x64?text=LOGO" alt="Partner Logo" className="w-full h-auto grayscale hover:grayscale-0 transition-all" />
                            </div>
                            <div className="w-32">
                                <img src="https://via.placeholder.com/128x64?text=LOGO" alt="Partner Logo" className="w-full h-auto grayscale hover:grayscale-0 transition-all" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.error('Testimonials section error:', error);
        reportError(error);
        return <div>Something went wrong</div>;
    }
}
