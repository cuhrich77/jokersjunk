export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const { firstName, lastName, phone, email, address, serviceType, scheduledFor, message, type } = req.body;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Jokers Junk Removal <onboarding@resend.dev>',
        to: ['cuhrich77@gmail.com'],
        subject: '🚛 New Booking — Jokers Junk Removal!',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
            <div style="background:#2d7a3a;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:24px;">🚛 New Booking Received!</h1>
              <p style="color:#f0f9f2;margin:8px 0 0;">Jokers Junk Removal</p>
            </div>
            <div style="background:#f9f9f9;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e8e8e8;">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-weight:bold;color:#555;width:140px;">👤 Name</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;">${firstName} ${lastName || ''}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-weight:bold;color:#555;">📞 Phone</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;"><a href="tel:${phone}" style="color:#2d7a3a;font-weight:bold;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-weight:bold;color:#555;">📧 Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;">${email || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-weight:bold;color:#555;">🏠 Type</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;">${type || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-weight:bold;color:#555;">🚛 Service</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;">${serviceType || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-weight:bold;color:#555;">📅 Scheduled</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;">${scheduledFor || 'Flexible'}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-weight:bold;color:#555;">📍 Address</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;">${address || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-weight:bold;color:#555;">📝 Notes</td>
                  <td style="padding:10px 0;">${message || 'None'}</td>
                </tr>
              </table>
              <div style="margin-top:24px;text-align:center;">
                <a href="tel:${phone}" style="background:#2d7a3a;color:#fff;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:bold;font-size:16px;">
                  📞 Call ${firstName} Now
                </a>
              </div>
              <p style="text-align:center;color:#999;font-size:12px;margin-top:20px;">
                Submitted on ${new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})} at ${new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}
              </p>
            </div>
          </div>
        `,
      }),
    });

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
