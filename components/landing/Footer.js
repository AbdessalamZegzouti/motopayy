function Footer() {
    try {
        const currentYear = new Date().getFullYear();
        
        return (
            <footer data-name="footer" className="bg-gray-900 text-white pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center mb-4">
                                <img 
                                    src="https://via.placeholder.com/40?text=MP" 
                                    alt="Motopay" 
                                    className="h-10 w-10 rounded-lg"
                                />
                                <span className="mr-3 text-xl font-bold text-white">موتوبي</span>
                            </div>
                            <p className="text-gray-400 mb-6">
                                نظام تذكير تلقائي بالمدفوعات عبر واتساب للوكالات. زيادة معدلات التحصيل وتحسين التدفق النقدي لوكالتك.
                            </p>
                            <div className="flex space-x-4 space-x-reverse">
                                <a href="#" className="footer-social-link" aria-label="Facebook">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="footer-social-link" aria-label="Twitter">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="footer-social-link" aria-label="Instagram">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" className="footer-social-link" aria-label="LinkedIn">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
                            <ul className="space-y-2">
                                <li><a href="#home" className="footer-link">الرئيسية</a></li>
                                <li><a href="#features" className="footer-link">المميزات</a></li>
                                <li><a href="#pricing" className="footer-link">الأسعار</a></li>
                                <li><a href="#contact" className="footer-link">تواصل معنا</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-4">الدعم</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="footer-link">مركز المساعدة</a></li>
                                <li><a href="#" className="footer-link">الأسئلة الشائعة</a></li>
                                <li><a href="#" className="footer-link">سياسة الخصوصية</a></li>
                                <li><a href="#" className="footer-link">شروط الاستخدام</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <i className="fas fa-map-marker-alt mt-1 ml-2 text-blue-400"></i>
                                    <span className="text-gray-400">الرياض، المملكة العربية السعودية</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-phone mt-1 ml-2 text-blue-400"></i>
                                    <span className="text-gray-400">+966 12 345 6789</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fas fa-envelope mt-1 ml-2 text-blue-400"></i>
                                    <span className="text-gray-400">info@motopay.com</span>
                                </li>
                                <li className="flex items-start">
                                    <i className="fab fa-whatsapp mt-1 ml-2 text-blue-400"></i>
                                    <span className="text-gray-400">+966 12 345 6789</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
                        <p>© {currentYear} موتوبي. جميع الحقوق محفوظة.</p>
                        <div className="mt-2 flex justify-center space-x-4 space-x-reverse">
                            <a href="#" className="hover:text-blue-400 transition-colors">سياسة الخصوصية</a>
                            <span className="text-gray-600">|</span>
                            <a href="#" className="hover:text-blue-400 transition-colors">شروط الاستخدام</a>
                        </div>
                    </div>
                </div>
            </footer>
        );
    } catch (error) {
        console.error('Footer error:', error);
        reportError(error);
        return <div>Something went wrong</div>;
    }
}
