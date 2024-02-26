import app from '../src/server';

describe('Public Feed', () => {
  it('should fetch public feed', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/public-feed',
    });

    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.json())).toBe(true);
  });
});
