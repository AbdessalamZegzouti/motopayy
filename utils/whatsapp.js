const WHATSAPP_CONNECTION_KEY = 'whatsapp_connection';

// Check if WhatsApp is connected
function isWhatsappConnected() {
    try {
        const connectionData = localStorage.getItem(WHATSAPP_CONNECTION_KEY);
        if (!connectionData) return false;
        
        const { connected, expiresAt } = JSON.parse(connectionData);
        const isExpired = new Date(expiresAt) < new Date();
        
        return connected && !isExpired;
    } catch (error) {
        console.error('Error checking WhatsApp connection:', error);
        return false;
    }
}

// Connect to WhatsApp
function connectWhatsapp(qrCodeCallback, successCallback, errorCallback) {
    try {
        // Simulate QR code generation
        setTimeout(() => {
            const mockQrCodeData = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=mockwhatsappconnection';
            qrCodeCallback(mockQrCodeData);
            
            // Simulate successful connection after 5 seconds
            setTimeout(() => {
                const connectionData = {
                    connected: true,
                    connectedAt: new Date().toISOString(),
                    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
                };
                
                localStorage.setItem(WHATSAPP_CONNECTION_KEY, JSON.stringify(connectionData));
                successCallback();
            }, 5000);
        }, 1000);
    } catch (error) {
        console.error('Error connecting to WhatsApp:', error);
        errorCallback(error);
    }
}

// Disconnect WhatsApp
function disconnectWhatsapp() {
    try {
        localStorage.removeItem(WHATSAPP_CONNECTION_KEY);
        return true;
    } catch (error) {
        console.error('Error disconnecting WhatsApp:', error);
        return false;
    }
}

// Send WhatsApp message (mock implementation)
async function sendWhatsappMessage(phone, message) {
    try {
        if (!isWhatsappConnected()) {
            throw new Error('WhatsApp is not connected');
        }
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate success with 90% probability
        const isSuccess = Math.random() < 0.9;
        
        if (!isSuccess) {
            throw new Error('Failed to send WhatsApp message');
        }
        
        return {
            success: true,
            messageId: `msg_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            sentAt: new Date().toISOString()
        };
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        throw error;
    }
}

// Get WhatsApp connection status
function getWhatsappStatus() {
    try {
        if (!isWhatsappConnected()) {
            return { connected: false };
        }
        
        const connectionData = JSON.parse(localStorage.getItem(WHATSAPP_CONNECTION_KEY));
        return {
            connected: true,
            connectedAt: connectionData.connectedAt,
            expiresAt: connectionData.expiresAt,
            daysRemaining: Math.ceil((new Date(connectionData.expiresAt) - new Date()) / (24 * 60 * 60 * 1000))
        };
    } catch (error) {
        console.error('Error getting WhatsApp status:', error);
        return { connected: false, error: error.message };
    }
}

// Send reminder to client
async function sendReminderToClient(client, templateName = 'default') {
    try {
        const templates = {
            default: `مرحباً ${client.name}، نود تذكيركم بأن موعد الدفع الشهري بقيمة ${client.amount} ريال سيكون في تاريخ ${client.dueDate}. شكراً لتعاونكم.`,
            followup: `مرحباً ${client.name}، نود تذكيركم بأن موعد الدفع الشهري بقيمة ${client.amount} ريال قد حان. نرجو منكم سرعة السداد. شكراً لتعاونكم.`,
            late: `مرحباً ${client.name}، نود إشعاركم بأن موعد الدفع الشهري بقيمة ${client.amount} ريال قد تأخر. نرجو منكم سرعة السداد. شكراً لتعاونكم.`
        };
        
        const message = templates[templateName] || templates.default;
        
        // Format phone number (remove leading 0 and add country code if needed)
        let formattedPhone = client.phone;
        if (formattedPhone.startsWith('0')) {
            formattedPhone = `966${formattedPhone.substring(1)}`;
        }
        
        return await sendWhatsappMessage(formattedPhone, message);
    } catch (error) {
        console.error('Error sending reminder to client:', error);
        throw error;
    }
}

// Send reminders to multiple clients
async function sendRemindersToClients(clients, templateName = 'default') {
    const results = {
        total: clients.length,
        success: 0,
        failed: 0,
        failures: []
    };
    
    for (const client of clients) {
        try {
            await sendReminderToClient(client, templateName);
            results.success++;
        } catch (error) {
            results.failed++;
            results.failures.push({
                client: client.id,
                error: error.message
            });
        }
    }
    
    return results;
}
