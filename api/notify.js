export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const { firstName, lastName, phone, email, address, serviceType, scheduledFor, message, type, estimate, photos, photosAttempted, photosFailed } = req.body;
  const esc = (v) => String(v || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const tel = String(phone || '').replace(/[^\d+]/g, '');
  const estimateRow = estimate ? `
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-weight:bold;color:#555;">💰 Online estimate</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;">${esc(estimate)}</td>
                </tr>` : '';

  // Only show photo links that point at our own Supabase storage
  const photoList = (Array.isArray(photos) ? photos : [])
    .filter((u) => typeof u === 'string' && /^https:\/\/[a-z0-9]+\.supabase\.co\/storage\/v1\/object\/public\//.test(u))
    .slice(0, 5);
  const failed = Number(photosFailed) || 0;
  const photoRow = (photoList.length || failed) ? `
                <tr>
                  <td colspan="2" style="padding:14px 0;border-bottom:1px solid #e8e8e8;">
                    <div style="font-weight:bold;color:#555;margin-bottom:8px;">📷 Photos (${photoList.length})</div>
                    ${photoList.map((u, i) => `
                      <a href="${esc(u)}" target="_blank" style="display:inline-block;margin:0 6px 6px 0;">
                        <img src="${esc(u)}" alt="Photo ${i + 1}" width="170" style="width:170px;height:130px;object-fit:cover;border-radius:8px;border:1px solid #ddd;display:block;">
                      </a>`).join('')}
                    ${photoList.length ? '<div style="font-size:12px;color:#999;">Tap a photo to open full size.</div>' : ''}
                    ${failed ? `<div style="font-size:13px;color:#b00020;margin-top:6px;">⚠️ ${failed} of ${Number(photosAttempted) || failed} photo(s) failed to upload. Ask the customer to text them.</div>` : ''}
                  </td>
                </tr>` : '';

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
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;">${esc(firstName)} ${esc(lastName)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-weight:bold;color:#555;">📞 Phone</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;"><a href="tel:${tel}" style="color:#2d7a3a;font-weight:bold;">${esc(phone)}</a></td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-weight:bold;color:#555;">📧 Email</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;">${esc(email || 'Not provided')}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-weight:bold;color:#555;">🏠 Type</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;">${esc(type || 'Not specified')}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-weight:bold;color:#555;">🚛 Service</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;">${esc(serviceType || 'Not specified')}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-weight:bold;color:#555;">📅 Scheduled</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;">${esc(scheduledFor || 'Flexible')}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;font-weight:bold;color:#555;">📍 Address</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e8e8e8;">${esc(address || 'Not provided')}</td>
                </tr>
                ${estimateRow}
                ${photoRow}
                <tr>
                  <td style="padding:10px 0;font-weight:bold;color:#555;">📝 Notes</td>
                  <td style="padding:10px 0;">${esc(message || 'None')}</td>
                </tr>
              </table>
              <div style="margin-top:24px;text-align:center;">
                <a href="tel:${tel}" style="background:#2d7a3a;color:#fff;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:bold;font-size:16px;">
                  📞 Call ${esc(firstName)} Now
                </a>
              </div>
              <p style="text-align:center;color:#999;font-size:12px;margin-top:20px;">
                Submitted on ${new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric',timeZone:'America/New_York'})} at ${new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',timeZone:'America/New_York'})}
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
