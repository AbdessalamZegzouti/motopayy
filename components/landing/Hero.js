function Hero() {
    try {
        const [showSignupModal, setShowSignupModal] = React.useState(false);
        const [showVideoModal, setShowVideoModal] = React.useState(false);

        const handleSignupClick = () => {
            // Dispatch a custom event that will be caught by the Landing component
            const event = new CustomEvent('openSignupModal');
            window.dispatchEvent(event);
        };

        return (
            <div data-name="hero-section" className="hero-section">
                <div className="hero-overlay"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="hero-content text-center text-white">
                        <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl hero-title mb-6 animate-fadeIn">
                            <span className="block">نظام تذكير تلقائي</span>
                            <span className="block text-blue-400">بالمدفوعات عبر واتساب</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl hero-subtitle mb-10 animate-slideInFromBottom">
                            ساعد عملائك على الالتزام بمواعيد الدفع الشهرية من خلال تذكيرات تلقائية عبر واتساب. زيادة معدلات التحصيل وتحسين التدفق النقدي لوكالتك.
                        </p>
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 animate-slideInFromBottom" style={{animationDelay: '0.3s'}}>
                            <div className="rounded-md shadow mb-4 sm:mb-0 sm:ml-3">
                                <button 
                                    data-name="hero-cta"
                                    onClick={handleSignupClick}
                                    className="hero-cta w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient md:py-4 md:text-lg md:px-10 glow-on-hover"
                                >
                                    ابدأ التجربة المجانية
                                    <i className="fas fa-arrow-left mr-2"></i>
                                </button>
                            </div>
                            <div className="rounded-md">
                                <button 
                                    data-name="hero-secondary"
                                    onClick={() => setShowVideoModal(true)}
                                    className="w-full flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:bg-opacity-10 md:py-4 md:text-lg md:px-10 transition-all"
                                >
                                    <i className="fas fa-play ml-2"></i>
                                    شاهد العرض التوضيحي
                                </button>
                            </div>
                        </div>
                        <div className="mt-10 animate-fadeIn" style={{animationDelay: '0.6s'}}>
                            <div className="flex justify-center space-x-8 space-x-reverse">
                                <div className="text-center">
                                    <p className="text-3xl font-bold">+500</p>
                                    <p className="text-sm text-blue-200">وكالة</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold">98%</p>
                                    <p className="text-sm text-blue-200">معدل رضا العملاء</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-3xl font-bold">+40%</p>
                                    <p className="text-sm text-blue-200">تحسين في التحصيل</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-shape">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#ffffff" fillOpacity="1" d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,160C672,139,768,117,864,128C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>

                {showVideoModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                        <div className="bg-white rounded-lg p-4 max-w-3xl w-full">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">العرض التوضيحي</h3>
                                <button 
                                    onClick={() => setShowVideoModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <div className="aspect-w-16 aspect-h-9">
                                <div className="w-full h-0 pb-[56.25%] relative">
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                        <p className="text-gray-500">فيديو العرض التوضيحي سيكون متاحًا قريبًا</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Hero section error:', error);
        reportError(error);
        return <div>Something went wrong</div>;
    }
}
