export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Vercel 환경 변수에서 MailerLite 설정값을 가져옵니다.
  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY; 
  const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID; // 자동화 메일을 보낼 그룹(List) ID

  if (!MAILERLITE_API_KEY) {
    return res.status(500).json({ message: 'API configuration missing' });
  }

  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        fields: {
          name: name || '구독자'
        },
        groups: MAILERLITE_GROUP_ID ? [MAILERLITE_GROUP_ID] : [] // 특정 그룹에 추가
      })
    });

    if (response.ok) {
      return res.status(200).json({ success: true, message: 'Successfully subscribed' });
    } else {
      const errorData = await response.json();
      console.error('MailerLite error:', errorData);
      return res.status(response.status).json({ success: false, message: 'API Error' });
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
