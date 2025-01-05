const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../domain/user.entity');
const UserRepository = require('../domain/user.repository');
const EventPublisher = require('../infrastructure/event.publisher');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(username, email, password) {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use.');
    }

    const id = uuidv4();
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User(id, username, email, passwordHash);

    await this.userRepository.create(user);

    // Publish event to notification-service
    await this.eventPublisher.publish('user.registered', {
      id: user.id,
      email: user.email,
      username: user.username,
    });

    return { id, username, email };
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials.');
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      throw new Error('Invalid credentials.');
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token };
  }
}

module.exports = UserService;
