import mongoConfig from './mongo.config';

describe('Mongo config', () => {
  beforeEach(async () => {
    jest.resetModules();
    process.env = {
      MONGO_URL: 'http://localhost:2000',
    };
  });

  it('Should correctly parse input', () => {
    const config = mongoConfig();
    expect(config.url).toBe('http://localhost:2000');
  });
});
