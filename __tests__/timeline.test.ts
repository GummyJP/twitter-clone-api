import app from '../src/server';

describe('Timeline', () => {
  it('should fetch user timeline', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA4OTQzODI4fQ.fhrdwB14IQrSmdsq_dQ9gyZaobDn1oVH4O0HSbADaUQ';
    const response = await app.inject({
      method: 'GET',
      url: '/timeline',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.json())).toBe(true);
  });
});
