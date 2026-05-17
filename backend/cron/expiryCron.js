const cron = require('node-cron');
const Property = require('../models/Property'); // ⚠️ Apne hisaab se path check kar lena ('../' ya './')

const startExpiryCron = () => {
    // 🚀 Har minute check karne wala logic: '* * * * *'
    cron.schedule('* * * * *', async () => {
        try {
            const now = new Date();
            
            // Wo ads dhoondo jo LIVE hain aur expiry time nikal gaya hai
            const result = await Property.updateMany(
                { 
                    status: 'live', 
                    expiry_at: { $lt: now } 
                },
                { 
                    $set: { status: 'expired' } 
                }
            );

            if (result.modifiedCount > 0) {
                console.log(`🕒 [CRON] ${result.modifiedCount} ads automatically EXPIRED.`);
            }
        } catch (error) {
            console.error("❌ Cron Job Error:", error);
        }
    });

    console.log("⏱️ Expiry Cron Job Initialized (Running in background...)");
};

module.exports = startExpiryCron; // 👈 Isko export kar diya