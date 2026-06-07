export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Vercel 환경 변수에서 스티비 설정값을 가져옵니다.
  // (Vercel 프로젝트 Settings > Environment Variables 에 등록해야 합니다)
  const STIBEE_API_KEY = process.env.STIBEE_API_KEY; 
  const STIBEE_LIST_ID = process.env.STIBEE_LIST_ID; 

  if (!STIBEE_API_KEY || !STIBEE_LIST_ID) {
    return res.status(500).json({ message: 'Stibee API configuration missing' });
  }

  try {
    const response = await fetch(`https://api.stibee.com/v1/lists/${STIBEE_LIST_ID}/subscribers`, {
      method: 'POST',
      headers: {
        'AccessToken': STIBEE_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventOccuredBy: 'SUBSCRIBER',
        confirmEmailYN: 'N', // Y로 하면 스티비에서 구독 확인 메일을 보냅니다. N은 즉시 추가.
        subscribers: [
          {
            email: email,
            name: name || '구독자',
          }
        ]
      })
    });

    if (response.ok) {
      return res.status(200).json({ success: true, message: 'Successfully subscribed' });
    } else {
      const errorData = await response.json();
      console.error('Stibee error:', errorData);
      return res.status(response.status).json({ success: false, message: 'Stibee API Error' });
    }
  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
