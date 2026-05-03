export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.HUBSPOT_TOKEN;
  const { contactData, dealData } = req.body;

  try {
    // Create contact
    const contactRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties: contactData }),
    });

    const contact = await contactRes.json();
    const contactId = contact.id;

    // Create deal
    if (contactId) {
      await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: dealData,
          associations: [{
            to: { id: contactId },
            types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }]
          }]
        }),
      });
    }

    return res.status(200).json({ success: true, contactId });
  } catch (err) {
    console.error('HubSpot error:', err);
    return res.status(500).json({ error: 'Failed' });
  }
}
