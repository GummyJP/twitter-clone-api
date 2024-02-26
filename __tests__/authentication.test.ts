import app from '../src/server';

describe('Authentication', () => {
  it('should sign up a new user', async () => {
    delay();
    const response = await app.inject({
      method: 'POST',
      url: '/signup',
      payload: { username: 'testuser', email: 'test@example.com', password: 'testpassword' }
    });

    expect(response.statusCode).toEqual(200);
    expect(response.json()).toHaveProperty('token');
  });

  it('should log in an existing user', async () => {
    delay();
    const response = await app.inject({
      method: 'POST',
      url: '/login',
      payload: { email: 'test@example.com', password: 'testpassword' }
    });

    expect(response.statusCode).toEqual(200);
    expect(response.json()).toHaveProperty('token');
  });
});

function wait(ms: number): Promise<void> {
  return new Promise(resolve => {
      setTimeout(resolve, ms);
  });
}

async function delay() {
  await wait(1000);
}