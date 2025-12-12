'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';

// User type is provided by the shared auth library when needed

// StoredUser is handled in the auth library; no local definition needed here

export default function Auth() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(true);
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Sign Up form state
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Sign In form state
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Handle Sign Up (uses centralized hook)
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!signUpData.fullName.trim()) {
      setError('Full name is required');
      setLoading(false);
      return;
    }
    if (!signUpData.email.includes('@')) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }
    if (signUpData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const created = await auth.signUp({ fullName: signUpData.fullName, email: signUpData.email, password: signUpData.password });
      if (!created) {
        setError(auth.error || 'Signup failed');
        setLoading(false);
        return;
      }
      // success
      setLoading(false);
      router.push('/home');
    } catch (err) {
      setError((err as Error)?.message || 'Signup failed');
      setLoading(false);
    }
  };

  // Handle Sign In (uses centralized hook)
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!signInData.email.includes('@')) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }
    if (!signInData.password) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    try {
      const signed = await auth.signIn(signInData.email, signInData.password);
      if (!signed) {
        setError(auth.error || 'Invalid email or password');
        setLoading(false);
        return;
      }
      setLoading(false);
      router.push('/home');
    } catch (err) {
      setError((err as Error)?.message || 'Sign in failed');
      setLoading(false);
    }
  };

  // Update sign up form
  const handleSignUpChange = (field: keyof typeof signUpData, value: string) => {
    setSignUpData(prev => ({ ...prev, [field]: value }));
  };

  // Update sign in form
  const handleSignInChange = (field: keyof typeof signInData, value: string) => {
    setSignInData(prev => ({ ...prev, [field]: value }));
  };

  if (isSignUp) {
    return (
      <>
        <span className="text-black font-bold text-xl mt-4">Sign Up With Email</span>
        <span className="mb-4 text-black/50">Create your account to kickstart your career</span>
        <form onSubmit={handleSignUp} className="flex flex-col mb-4 gap-5">
          <input
            type="text"
            placeholder="Full Name"
            value={signUpData.fullName}
            onChange={(e) => handleSignUpChange('fullName', e.target.value)}
            className="focus:border-black placeholder-shown:font-sm outline-none text-black border-1 border-black/40 rounded p-3 w-100"
          />
          <input
            type="email"
            placeholder="Email"
            value={signUpData.email}
            onChange={(e) => handleSignUpChange('email', e.target.value)}
            className="focus:border-black placeholder-shown:font-sm outline-none text-black border-1 border-black/40 rounded p-3 w-100"
          />
          <input
            type="password"
            placeholder="Password"
            value={signUpData.password}
            onChange={(e) => handleSignUpChange('password', e.target.value)}
            className="focus:border-black placeholder-shown:font-sm outline-none text-black border-1 border-black/40 rounded p-3 w-100"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={signUpData.confirmPassword}
            onChange={(e) => handleSignUpChange('confirmPassword', e.target.value)}
            className="focus:border-black placeholder-shown:font-sm outline-none text-black border-1 border-black/40 rounded p-3 w-100"
          />

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white gap-3 w-100 justify-center flex flex-row stroke-black p-3 rounded hover:bg-black/80 disabled:opacity-50"
          >
            <span className="font-bold text-md">
              {loading ? 'Creating Account...' : 'Continue'}
            </span>
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-black/50 text-sm">Already have an account? </span>
          <button
            onClick={() => {
              setIsSignUp(false);
              setError('');
              setSignInData({ email: '', password: '' });
            }}
            className="text-black font-bold text-sm hover:underline"
          >
            Sign In
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <span className="text-black font-bold text-xl mt-4">Sign In</span>
      <span className="mb-4 text-black/50">Welcome back! Sign in to your account</span>
      <form onSubmit={handleSignIn} className="flex flex-col mb-4 gap-5">
        <input
          type="email"
          placeholder="Email"
          value={signInData.email}
          onChange={(e) => handleSignInChange('email', e.target.value)}
          className="focus:border-black placeholder-shown:font-sm outline-none text-black border-1 border-black/40 rounded p-3 w-100"
        />
        <input
          type="password"
          placeholder="Password"
          value={signInData.password}
          onChange={(e) => handleSignInChange('password', e.target.value)}
          className="focus:border-black placeholder-shown:font-sm outline-none text-black border-1 border-black/40 rounded p-3 w-100"
        />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white gap-3 w-100 justify-center flex flex-row stroke-black p-3 rounded hover:bg-black/80 disabled:opacity-50"
        >
          <span className="font-bold text-md">
            {loading ? 'Signing In...' : 'Sign In'}
          </span>
        </button>
      </form>

      <div className="text-center mt-6">
        <span className="text-black/50 text-sm">Don&apos;t have an account? </span>
        <button
          onClick={() => {
            setIsSignUp(true);
            setError('');
            setSignUpData({ fullName: '', email: '', password: '', confirmPassword: '' });
          }}
          className="text-black font-bold text-sm hover:underline"
        >
          Sign Up
        </button>
      </div>
    </>
  );
}
