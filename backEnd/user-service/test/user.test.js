const UserService = require('../src/application/user.service');
const userService = new UserService();

test('should register a user successfully', async () => {
  const user = await userService.register('TestUser', 'test@example.com', 'password123');
  expect(user).toHaveProperty('id');
  expect(user.username).toBe('TestUser');
});
