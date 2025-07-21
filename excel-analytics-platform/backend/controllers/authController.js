const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust path if needed

const loginUser = async (req, res) => {
  console.log('🔐 Login request body:', req.body);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log('👤 User found:', user);

    if (!user) return res.status(400).json({ msg: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('✅ Password match:', isMatch);

    if (!isMatch) return res.status(400).json({ msg: 'Invalid email or password' });

    // ✅ FIXED: Include user name in the token
    const token = jwt.sign(
      { id: user._id, name: user.name }, // ✅ Now includes name
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    // ✅ Optionally also return user info in the response body
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { loginUser };


