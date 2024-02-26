import app from '../src/server';

describe('Tweet Creation', () => {
  it('should create a new tweet', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA4OTQzODI4fQ.fhrdwB14IQrSmdsq_dQ9gyZaobDn1oVH4O0HSbADaUQ';
    const response = await app.inject({
      method: 'POST',
      url: '/tweets',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      payload: {
        content: 'This is a test tweet',
      },
    });

    expect(response.statusCode).toEqual(200);
    const tweet = JSON.parse(response.body);
    expect(tweet).toHaveProperty('id');
    expect(tweet.content).toEqual('This is a test tweet');
  });
});
