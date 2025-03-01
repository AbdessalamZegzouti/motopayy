// Check if user is authenticated
function isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
}

// Login user
async function login(email, password) {
    try {
        // For demo purposes, simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes - accept any valid-looking email/password combination
        if (email.includes('@') && password.length >= 4) {
            // Generate mock user data based on the email
            const userData = {
                id: Math.floor(Math.random() * 10000),
                companyName: email.split('@')[0] + ' وكالة',
                email: email,
                phone: '05' + Math.floor(10000000 + Math.random() * 90000000),
                subscription: {
                    plan: 'starter',
                    expiresAt: '2023-12-31'
                }
            };
            
            const token = 'mock_token_' + Math.random().toString(36).substring(2);
            localStorage.setItem('token', token);
            localStorage.setItem('userData', JSON.stringify(userData));
            
            return { token, user: userData };
        } else {
            throw new Error('بريد إلكتروني أو كلمة مرور غير صحيحة');
        }
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Register user
async function register(userData) {
    try {
        // For demo purposes, simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newUser = {
            id: Math.floor(Math.random() * 10000),
            companyName: userData.companyName,
            email: userData.email,
            phone: userData.phone,
            subscription: {
                plan: 'starter',
                expiresAt: '2023-12-31'
            }
        };
        
        const token = 'mock_token_' + Math.random().toString(36).substring(2);
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(newUser));
        
        return { token, user: newUser };
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

// Logout user
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
}

// Reset password
async function resetPassword(email) {
    try {
        // For demo purposes, simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return { success: true, message: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني' };
    } catch (error) {
        console.error('Reset password error:', error);
        throw error;
    }
}

// Get user data
async function getUserData() {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');
        
        // Try to get user data from localStorage first
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            return JSON.parse(storedUserData);
        }
        
        // If not in localStorage, return mock data
        return getMockUserData();
    } catch (error) {
        console.error('Get user data error:', error);
        throw error;
    }
}

// Mock user data for development
function getMockUserData() {
    return {
        id: 1,
        companyName: 'وكالة الدراجات النارية',
        email: 'agency@example.com',
        phone: '0501234567',
        subscription: {
            plan: 'starter',
            expiresAt: '2023-12-31'
        }
    };
}
