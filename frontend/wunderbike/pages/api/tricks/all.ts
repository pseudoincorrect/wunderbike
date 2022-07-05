import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function shows(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {});
    const baseUrl = process.env.API_BASE_URL;

    const response = await fetch(baseUrl + '/api/tricks/all', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const shows = await response.json();
    res.status(response.status || 200).json(shows);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
});
