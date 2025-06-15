// Anda akan butuh bcryptjs untuk hashing password!
// Install dengan: npm install bcryptjs
import bcrypt from 'bcryptjs';

// Asumsikan Anda punya model User untuk berinteraksi dengan database
// import User from '../models/userModel.js'; 

// Fungsi untuk pendaftaran manual
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validasi input (pastikan email & password tidak kosong)
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password tidak boleh kosong' });
    }

    // 2. Cek apakah user sudah ada di database
    // const userExists = await User.findOne({ email });
    // if (userExists) {
    //   return res.status(400).json({ message: 'User dengan email ini sudah terdaftar' });
    // }

    // 3. HASH PASSWORD! Jangan pernah simpan password mentah.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Buat user baru di database
    // const newUser = await User.create({ email, password: hashedPassword });

    // 5. Kirim respon sukses (bisa juga langsung kirim token otentikasi)
    res.status(201).json({ 
        message: 'Registrasi berhasil!',
        // userId: newUser._id,
        // email: newUser.email,
    });

  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
  }
};


// Fungsi untuk pendaftaran via Google
export const loginWithGoogle = async (req, res) => {
  try {
    const { name, email, googleId } = req.body; // Data ini dikirim dari frontend

    // 1. Cek apakah user dengan googleId ini sudah ada
    // let user = await User.findOne({ googleId });

    // 2. Jika tidak ada, buat user baru
    // if (!user) {
    //   // Mungkin user mendaftar dengan email yang sama tapi manual? Bisa ditangani di sini.
    //   // Untuk simple, kita buat user baru
    //   user = await User.create({ name, email, googleId });
    // }
    
    // 3. Kirim respon sukses (dan token otentikasi)
     res.status(200).json({ 
        message: 'Login Google berhasil!',
        // userId: user._id,
        // email: user.email,
    });

  } catch (error) {
     res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
  }
};