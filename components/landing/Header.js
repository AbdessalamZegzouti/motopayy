function Header({ setShowLogin, setShowSignup }) {
    try {
        const [isScrolled, setIsScrolled] = React.useState(false);
        const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

        React.useEffect(() => {
            const handleScroll = () => {
                if (window.scrollY > 10) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, []);

        const navLinks = [
            { name: 'الرئيسية', href: '#home' },
            { name: 'المميزات', href: '#features' },
            { name: 'الأسعار', href: '#pricing' },
            { name: 'تواصل معنا', href: '#contact' }
        ];

        return (
            <header 
                data-name="header" 
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img 
                                    src="https://via.placeholder.com/40?text=MP" 
                                    alt="Motopay" 
                                    className="h-10 w-10 rounded-lg"
                                />
                            </div>
                            <div className="mr-3">
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">موتوبي</span>
                                <span className="text-xs text-gray-500 block">نظام تذكير المدفوعات</span>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isScrolled
                                            ? 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                                            : 'text-gray-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                                    }`}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>

                        <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                            <button
                                onClick={() => setShowLogin(true)}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                    isScrolled
                                        ? 'text-gray-700 hover:text-blue-600'
                                        : 'text-gray-100 hover:text-white'
                                }`}
                            >
                                تسجيل الدخول
                            </button>
                            <button
                                onClick={() => setShowSignup(true)}
                                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                تجربة مجانية
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`p-2 rounded-md ${
                                    isScrolled
                                        ? 'text-gray-700 hover:bg-gray-100'
                                        : 'text-white hover:bg-white hover:bg-opacity-10'
                                }`}
                            >
                                <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden mt-4 pb-3 border-t border-gray-200">
                            <div className="pt-2 space-y-1">
                                {navLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <div className="pt-4 flex flex-col space-y-2">
                                    <button
                                        onClick={() => {
                                            setShowLogin(true);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        تسجيل الدخول
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowSignup(true);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        تجربة مجانية
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header error:', error);
        reportError(error);
        return <div>Something went wrong</div>;
    }
}
