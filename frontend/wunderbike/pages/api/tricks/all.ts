import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function shows(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {});

    console.error('accessToken');
    console.error(accessToken);

    const baseUrl = process.env.API_BASE_URL;

    console.error('baseUrl');
    console.error(baseUrl);

    const response = await fetch(baseUrl + '/api/tricks/all', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const shows = await response.json();
    res.status(response.status || 200).json(shows);

    // res.status(200).json({
    //   tricks: [
    //     { name: '360', description: 'that is a 360' },
    //     { name: '720', description: 'that is a 720' },
    //     { name: '1080', description: 'that is a 1080' },
    //   ],
    // });
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
});
