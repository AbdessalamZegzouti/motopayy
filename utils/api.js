async function fetchWithAuth(url, options = {}) {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No authentication token found');
        }
        
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        
        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
            }
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.reload();
                throw new Error('Session expired. Please login again.');
            }
            
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'API request failed');
        }
        
        return await response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}

// User related API calls
async function getUserData() {
    // In a real app, you would call an API
    // return await fetchWithAuth('https://api.example.com/user');
    
    // For demo purposes, use mock data
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        return JSON.parse(storedUserData);
    }
    
    // Default mock data
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

async function updateUserProfile(profileData) {
    // In a real app, you would call an API
    // return await fetchWithAuth('https://api.example.com/user/profile', {
    //     method: 'PUT',
    //     body: JSON.stringify(profileData)
    // });
    
    // For demo purposes
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const updatedUserData = {
        ...userData,
        ...profileData
    };
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    return updatedUserData;
}

// Client related API calls
async function getClients(page = 1, limit = 10, filters = {}) {
    // In a real app, you would call an API
    // const queryParams = new URLSearchParams({
    //     page,
    //     limit,
    //     ...filters
    // });
    // return await fetchWithAuth(`https://api.example.com/clients?${queryParams}`);
    
    // For demo purposes, use mock data
    return {
        data: getMockClients(),
        pagination: {
            page,
            limit,
            total: 25,
            totalPages: 3
        }
    };
}

async function getClientById(clientId) {
    // In a real app, you would call an API
    // return await fetchWithAuth(`https://api.example.com/clients/${clientId}`);
    
    // For demo purposes
    const mockClients = getMockClients();
    const client = mockClients.find(c => c.id === clientId);
    
    if (!client) {
        throw new Error('Client not found');
    }
    
    return client;
}

async function createClient(clientData) {
    // In a real app, you would call an API
    // return await fetchWithAuth('https://api.example.com/clients', {
    //     method: 'POST',
    //     body: JSON.stringify(clientData)
    // });
    
    // For demo purposes
    const newClient = {
        ...clientData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        paidAmount: 0,
        remainingAmount: parseFloat(clientData.amount)
    };
    
    return newClient;
}

async function updateClient(clientId, clientData) {
    // In a real app, you would call an API
    // return await fetchWithAuth(`https://api.example.com/clients/${clientId}`, {
    //     method: 'PUT',
    //     body: JSON.stringify(clientData)
    // });
    
    // For demo purposes
    const mockClients = getMockClients();
    const clientIndex = mockClients.findIndex(c => c.id === clientId);
    
    if (clientIndex === -1) {
        throw new Error('Client not found');
    }
    
    const updatedClient = {
        ...mockClients[clientIndex],
        ...clientData,
        updatedAt: new Date().toISOString()
    };
    
    return updatedClient;
}

async function deleteClient(clientId) {
    // In a real app, you would call an API
    // return await fetchWithAuth(`https://api.example.com/clients/${clientId}`, {
    //     method: 'DELETE'
    // });
    
    // For demo purposes
    return { success: true };
}

// Payment related API calls
async function addPayment(clientId, paymentData) {
    // In a real app, you would call an API
    // return await fetchWithAuth(`https://api.example.com/clients/${clientId}/payments`, {
    //     method: 'POST',
    //     body: JSON.stringify(paymentData)
    // });
    
    // For demo purposes
    const payment = {
        id: Date.now(),
        clientId,
        amount: parseFloat(paymentData.amount),
        date: paymentData.date || new Date().toISOString(),
        note: paymentData.note || '',
        createdAt: new Date().toISOString()
    };
    
    return payment;
}

async function getPaymentHistory(clientId) {
    // In a real app, you would call an API
    // return await fetchWithAuth(`https://api.example.com/clients/${clientId}/payments`);
    
    // For demo purposes
    return [
        {
            id: 1001,
            clientId: clientId,
            amount: 1000,
            date: '2023-06-01',
            note: 'دفعة أولى',
            createdAt: '2023-06-01T10:00:00Z'
        },
        {
            id: 1002,
            clientId: clientId,
            amount: 1000,
            date: '2023-07-01',
            note: 'دفعة ثانية',
            createdAt: '2023-07-01T10:00:00Z'
        }
    ];
}

// Reports related API calls
async function getPaymentReports(dateRange = 'month') {
    // In a real app, you would call an API
    // return await fetchWithAuth(`https://api.example.com/reports/payments?range=${dateRange}`);
    
    // For demo purposes
    return {
        totalPayments: 45000,
        paidPayments: 32500,
        pendingPayments: 12500,
        paymentRate: 72.22,
        monthlyStats: [
            { month: 'يناير', total: 15000, paid: 12000, pending: 3000 },
            { month: 'فبراير', total: 15000, paid: 10500, pending: 4500 },
            { month: 'مارس', total: 15000, paid: 10000, pending: 5000 }
        ]
    };
}

async function getMessageReports(dateRange = 'month') {
    // In a real app, you would call an API
    // return await fetchWithAuth(`https://api.example.com/reports/messages?range=${dateRange}`);
    
    // For demo purposes
    return {
        totalMessages: 120,
        deliveredMessages: 115,
        readMessages: 98,
        responseRate: 45,
        monthlyStats: [
            { month: 'يناير', sent: 40, delivered: 38, read: 32 },
            { month: 'فبراير', sent: 40, delivered: 39, read: 34 },
            { month: 'مارس', sent: 40, delivered: 38, read: 32 }
        ]
    };
}

// Settings related API calls
async function getSettings() {
    // In a real app, you would call an API
    // return await fetchWithAuth('https://api.example.com/settings');
    
    // For demo purposes
    return {
        notifications: {
            enableEmailNotifications: true,
            enableSmsNotifications: false,
            reminderDays: [1, 3]
        },
        templates: {
            defaultTemplate: 'مرحباً {name}، نود تذكيركم بأن موعد الدفع الشهري بقيمة {amount} درهم سيكون في تاريخ {dueDate}. شكراً لتعاونكم.',
            followupTemplate: 'مرحباً {name}، نود تذكيركم بأن موعد الدفع الشهري بقيمة {amount} درهم قد حان. نرجو منكم سرعة السداد. شكراً لتعاونكم.',
            lateTemplate: 'مرحباً {name}، نود إشعاركم بأن موعد الدفع الشهري بقيمة {amount} درهم قد تأخر. نرجو منكم سرعة السداد. شكراً لتعاونكم.'
        },
        whatsapp: {
            autoSend: true,
            sendTime: '09:00'
        }
    };
}

async function updateSettings(settingsData) {
    // In a real app, you would call an API
    // return await fetchWithAuth('https://api.example.com/settings', {
    //     method: 'PUT',
    //     body: JSON.stringify(settingsData)
    // });
    
    // For demo purposes
    return {
        ...settingsData,
        updatedAt: new Date().toISOString()
    };
}

// Mock data functions
function getMockClients() {
    return [
        {
            id: 1,
            name: 'أحمد محمد',
            phone: '0501234567',
            amount: 5000,
            paidAmount: 2000,
            remainingAmount: 3000,
            dueDate: '2023-07-15',
            status: 'unpaid',
            createdAt: '2023-06-01T10:00:00Z'
        },
        {
            id: 2,
            name: 'فاطمة علي',
            phone: '0502345678',
            amount: 3500,
            paidAmount: 3500,
            remainingAmount: 0,
            dueDate: '2023-07-10',
            status: 'paid',
            createdAt: '2023-06-02T11:00:00Z'
        },
        {
            id: 3,
            name: 'محمد عبدالله',
            phone: '0503456789',
            amount: 7000,
            paidAmount: 2000,
            remainingAmount: 5000,
            dueDate: '2023-07-20',
            status: 'unpaid',
            createdAt: '2023-06-03T09:00:00Z'
        },
        {
            id: 4,
            name: 'نورة سعيد',
            phone: '0504567890',
            amount: 4500,
            paidAmount: 0,
            remainingAmount: 4500,
            dueDate: '2023-07-25',
            status: 'unpaid',
            createdAt: '2023-06-04T14:00:00Z'
        },
        {
            id: 5,
            name: 'خالد عمر',
            phone: '0505678901',
            amount: 6000,
            paidAmount: 6000,
            remainingAmount: 0,
            dueDate: '2023-07-05',
            status: 'paid',
            createdAt: '2023-06-05T16:00:00Z'
        }
    ];
}

// Helper functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('ar-MA', {
        style: 'currency',
        currency: 'MAD',
        minimumFractionDigits: 2
    }).format(amount);
}

function parseDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-MA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Export for use in other modules
// These exports are automatically handled by the system
