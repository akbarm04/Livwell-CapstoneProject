import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email && !password) {
      toast.error('Semua field harus diisi!');
      return;
    }

    if (!email) {
      toast.error('Email tidak boleh kosong!');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Email harus mengandung "@"');
      return;
    }

    if (!password) {
      toast.error('Password tidak boleh kosong!');
      return;
    }

    if (password.length < 8) {
      toast.error('Password minimal 8 karakter!');
      return;
    }

    toast.success('Login berhasil!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-lime-200 to-green-400 px-4 relative">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white/30 backdrop-blur-lg border border-white/40 p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 text-gray-800">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">Welcome Back</h2>
        <form className="space-y-10" onSubmit={handleSubmit}>
          <div className="container">
            <input
              type="text"
              placeholder=" "
              className="input peer"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="label">Email</label>
          </div>

          <div className="container">
            <input
              type="password"
              placeholder=" "
              className="input peer"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="label">Password</label>
          </div>

          <div className="w-full">
            <button type="submit" className="c-button c-button--gooey w-full">
              Login
              <div className="c-button__blobs">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-700 mt-6">
          Don’t have an account?{' '}
          <a href="/register" className="text-green-600 hover:underline">Sign up</a>
        </p>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-700 hover:text-green-700 underline"
          >
            ← Back to Landing Page
          </button>
        </div>
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

      {/* Embedded style */}
      <style>
        {`
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

          .input:not(:placeholder-shown) ~ .label,
          .input:focus ~ .label {
            transform: translateY(-35px);
            padding-left: 2px;
            font-size: 13px;
            font-weight: 600;
            color: #22c55e;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
