const db = require('../infrastructure/database');

class UserRepository {
  async create(user) {
    const query = `INSERT INTO users (id, username, email, password_hash) VALUES ($1, $2, $3, $4)`;
    await db.query(query, [user.id, user.username, user.email, user.passwordHash]);
  }

  async findByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  async findById(id) {
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = UserRepository;
