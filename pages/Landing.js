function Landing({ setIsAuthenticated }) {
    try {
        const [showLogin, setShowLogin] = React.useState(false);
        const [showSignup, setShowSignup] = React.useState(false);

        const handleOpenLogin = () => {
            setShowSignup(false);
            setShowLogin(true);
        };

        const handleOpenSignup = () => {
            setShowLogin(false);
            setShowSignup(true);
        };

        React.useEffect(() => {
            // Listen for custom events from child components
            const handleOpenSignupEvent = () => handleOpenSignup();
            
            window.addEventListener('openSignupModal', handleOpenSignupEvent);
            
            return () => {
                window.removeEventListener('openSignupModal', handleOpenSignupEvent);
            };
        }, []);

        return (
            <div data-name="landing-container">
                <Header 
                    setShowLogin={handleOpenLogin} 
                    setShowSignup={handleOpenSignup}
                />
                
                <main>
                    <section id="home">
                        <Hero />
                    </section>
                    
                    <section id="features">
                        <Features />
                    </section>
                    
                    <section id="testimonials">
                        <Testimonials />
                    </section>
                    
                    <section id="pricing">
                        <Pricing setShowSignup={handleOpenSignup} />
                    </section>
                    
                    <section id="contact">
                        <Contact />
                    </section>
                </main>
                
                <Footer />

                {showLogin && (
                    <Modal onClose={() => setShowLogin(false)}>
                        <LoginForm 
                            setIsAuthenticated={setIsAuthenticated}
                            onClose={() => setShowLogin(false)}
                            openSignup={handleOpenSignup}
                        />
                    </Modal>
                )}

                {showSignup && (
                    <Modal onClose={() => setShowSignup(false)}>
                        <SignupForm 
                            setIsAuthenticated={setIsAuthenticated}
                            onClose={() => setShowSignup(false)}
                            openLogin={handleOpenLogin}
                        />
                    </Modal>
                )}

                <button
                    data-name="whatsapp-support"
                    onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                    className="fixed bottom-8 left-8 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 z-40"
                    aria-label="WhatsApp Support"
                >
                    <i className="fab fa-whatsapp text-2xl"></i>
                </button>
            </div>
        );
    } catch (error) {
        console.error('Landing page error:', error);
        reportError(error);
        return <div>Something went wrong</div>;
    }
}
