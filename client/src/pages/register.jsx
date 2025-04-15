import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      toast.error('Semua field harus diisi!');
      return;
    }

    if (!isValidEmail(email)) {
      toast.error('Format email tidak valid!');
      return;
    }

    if (password.length < 8) {
      toast.error('Password minimal 8 karakter!');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Konfirmasi password tidak cocok!');
      return;
    }

    try {
      const response = await axios.post(
        'https://apihabittracker.up.railway.app/api/profiles',
        {
          username: username,
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        toast.success('Registrasi berhasil!');
        setTimeout(() => navigate('/login'), 500);
      } else {
        toast.error('Registrasi gagal.');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat registrasi.');
      console.error('Error saat registrasi:', error); // Tambahkan ini untuk debugging
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[linear-gradient(to_bottom,_white_10%,_white_75%,_#4ade80_100%)] px-4 relative">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white/30 backdrop-blur-lg border border-white/40 p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300 text-gray-800">
        <h2 className="text-3xl font-extrabold text-center text-green-600 mb-8">Create an Account</h2>
        <form className="space-y-10" onSubmit={handleSubmit}>
          <div className="container">
            <input type="text" className={`input peer ${username ? 'not-empty' : ''}`} value={username} onChange={(e) => setUsername(e.target.value)} required placeholder=" " />
            <label className="label">Username</label>
          </div>

          <div className="container">
            <input type="email" className={`input peer ${email ? 'not-empty' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} required placeholder=" " />
            <label className="label">Email</label>
          </div>

          <div className="container">
            <input type="password" className={`input peer ${password ? 'not-empty' : ''}`} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder=" " />
            <label className="label">Password</label>
          </div>

          <div className="container">
            <input type="password" className={`input peer ${confirmPassword ? 'not-empty' : ''}`} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder=" " />
            <label className="label">Confirm Password</label>
          </div>

          <div className="w-full">
            <button type="submit" className="c-button c-button--gooey w-full">
              Register
              <div className="c-button__blobs">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-green-500 hover:underline">
            Login here
          </a>
        </p>
      </div>

      {/* SVG filter for gooey effect */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'block', height: 0, width: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Embedded styles */}
      <style>
        {`
          .container {
            display: flex;
            flex-direction: column;
            gap: 7px;
            position: relative;
            color: black;
            width: 100%;
          }

          .label {
            font-size: 15px;
            padding-left: 10px;
            position: absolute;
            top: 13px;
            transition: 0.3s;
            pointer-events: none;
            color: black;
          }

          .input {
            width: 100%;
            height: 45px;
            border: none;
            outline: none;
            padding: 0px 10px;
            border-radius: 6px;
            font-size: 15px;
            background-color: rgba(255, 255, 255, 0.5);
            color: black;
            box-shadow: 3px 3px 10px rgba(0,0,0,0.4),
                        -1px -1px 6px rgba(255, 255, 255, 0.3);
          }

          .input:focus {
            border: 2px solid transparent;
            box-shadow: 3px 3px 10px rgba(0,0,0,0.4),
                        -1px -1px 6px rgba(255, 255, 255, 0.3),
                        inset 3px 3px 10px rgba(0,0,0,0.4),
                        inset -1px -1px 6px rgba(255, 255, 255, 0.3);
          }

          .input.not-empty ~ .label,
          .input:focus ~ .label {
            transform: translateY(-35px);
            padding-left: 2px;
            font-size: 13px;
            font-weight: 600;
            color: #22c55e;
          }

          .c-button {
            color: #000;
            font-weight: 700;
            font-size: 15px;
            text-decoration: none;
            padding: 0.6em 1.4em;
            cursor: pointer;
            display: inline-block;
            vertical-align: middle;
            position: relative;
            z-index: 1;
            border: none;
            background: transparent;
          }

          .c-button--gooey {
            color: #22c55e;
            text-transform: uppercase;
            letter-spacing: 2px;
            border: 3px solid #22c55e;
            border-radius: 6px;
            position: relative;
            transition: all 700ms ease;
            overflow: hidden;
          }

          .c-button--gooey .c-button__blobs {
            height: 100%;
            filter: url(#goo);
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
            bottom: -3px;
            right: -1px;
            z-index: -1;
          }

          .c-button--gooey .c-button__blobs div {
            background-color: #22c55e;
            width: 34%;
            height: 100%;
            border-radius: 100%;
            position: absolute;
            transform: scale(1.4) translateY(125%) translateZ(0);
            transition: all 700ms ease;
          }

          .c-button--gooey .c-button__blobs div:nth-child(1) {
            left: -5%;
          }

          .c-button--gooey .c-button__blobs div:nth-child(2) {
            left: 30%;
            transition-delay: 60ms;
          }

          .c-button--gooey .c-button__blobs div:nth-child(3) {
            left: 66%;
            transition-delay: 25ms;
          }

          .c-button--gooey:hover {
            color: #fff;
          }

          .c-button--gooey:hover .c-button__blobs div {
            transform: scale(1.4) translateY(0) translateZ(0);
          }
        `}
      </style>
    </div>
  );
};

export default Register;
