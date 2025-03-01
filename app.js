function App() {
    try {
        const [isAuthenticated, setIsAuthenticated] = React.useState(false);
        const [isLoading, setIsLoading] = React.useState(true);
        const [error, setError] = React.useState(null);

        React.useEffect(() => {
            const checkAuth = async () => {
                try {
                    setIsLoading(true);
                    const token = localStorage.getItem('token');
                    
                    if (token) {
                        // Check if user data exists
                        const userData = localStorage.getItem('userData');
                        
                        if (userData) {
                            setIsAuthenticated(true);
                        } else {
                            // If token exists but no user data, try to fetch it
                            try {
                                const userData = await getUserData();
                                localStorage.setItem('userData', JSON.stringify(userData));
                                setIsAuthenticated(true);
                            } catch (e) {
                                console.error("Failed to fetch user data:", e);
                                // If we can't get user data, clear token and require login again
                                localStorage.removeItem('token');
                                setIsAuthenticated(false);
                            }
                        }
                    } else {
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error("Authentication check error:", error);
                    setError("حدث خطأ أثناء التحقق من تسجيل الدخول");
                } finally {
                    setIsLoading(false);
                }
            };

            checkAuth();
        }, []);

        if (isLoading) {
            return (
                <div data-name="loading" className="flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            );
        }

        if (error) {
            return (
                <div data-name="error" className="flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                        <p>{error}</p>
                        <button 
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
                            onClick={() => window.location.reload()}
                        >
                            إعادة المحاولة
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div data-name="app-container" className="min-h-screen bg-gray-50">
                {isAuthenticated ? (
                    <Dashboard setIsAuthenticated={setIsAuthenticated} />
                ) : (
                    <Landing setIsAuthenticated={setIsAuthenticated} />
                )}
            </div>
        );
    } catch (error) {
        console.error('App error:', error);
        reportError(error);
        return <div>Something went wrong</div>;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
