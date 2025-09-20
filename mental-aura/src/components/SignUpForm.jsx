// 1. IMPORT useNavigate instead of Navigate
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  // 2. INITIALIZE the useNavigate hook
  const navigate = useNavigate();

  // State to hold all form data in a single object
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    username: '',
    musicGenres: [],
    gameTypes: [],
    timezone: '',
    consent: false,
  });

  // State for password validation feedback
  const [passwordError, setPasswordError] = useState('');

  // Auto-detect and set the user's timezone on initial render
  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setFormData(prev => ({ ...prev, timezone: userTimezone }));
  }, []);

  // Generic handler to update form data state
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handler for password input to perform live validation
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setFormData(prev => ({ ...prev, password: newPassword }));

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    } else if (!/\d/.test(newPassword) || !/[a-zA-Z]/.test(newPassword)) {
      setPasswordError('Password must contain both letters and numbers.');
    } else {
      setPasswordError('');
    }
  };
  
  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordError) {
      alert("Please fix the errors before submitting.");
      return;
    }
    if (!formData.consent) {
      alert("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }
    // On successful submission, log the data
    console.log('Form Submitted:', formData);
    alert('Account created successfully!');
    
    // 3. USE the navigate function to redirect to the dashboard
    navigate('/DashboardPage'); 
    
    // Here you would typically send the formData to your backend API
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-lg p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="mt-2 text-sm text-gray-400">Join us and personalize your experience.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* --- REQUIRED FIELDS --- */}
          <h2 className="text-lg font-semibold border-b border-gray-600 pb-2">Account Details</h2>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address <span className="text-red-500">*</span></label>
            <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-gray-300">Password <span className="text-red-500">*</span></label>
            <input id="password" name="password" type="password" required value={formData.password} onChange={handlePasswordChange} className={`w-full px-3 py-2 mt-1 bg-gray-700 border rounded-md focus:outline-none focus:ring-orange-500 ${passwordError ? 'border-red-500 focus:border-red-500' : 'border-gray-600 focus:border-orange-500'}`} placeholder="Min. 8 characters with letters & numbers" />
            {passwordError && <p className="mt-1 text-xs text-red-400">{passwordError}</p>}
          </div>

          {/* --- OPTIONAL FIELDS --- */}
          <h2 className="text-lg font-semibold border-b border-gray-600 pb-2 pt-4">Personalization (Optional)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">Full Name</label>
              <input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleChange} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" placeholder="e.g., Tina Smith"/>
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
              <input id="username" name="username" type="text" value={formData.username} onChange={handleChange} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" placeholder="e.g., tinamusiclover"/>
            </div>
          </div>
          <div>
            <label htmlFor="musicGenres" className="block text-sm font-medium text-gray-300">Preferred Music Genre(s)</label>
            <input id="musicGenres" name="musicGenres" type="text" value={formData.musicGenres} onChange={handleChange} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" placeholder="Pop, Jazz, Classical..."/>
          </div>
          <div>
            <label htmlFor="gameTypes" className="block text-sm font-medium text-gray-300">Favorite Game Types</label>
            <input id="gameTypes" name="gameTypes" type="text" value={formData.gameTypes} onChange={handleChange} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" placeholder="Puzzle, Strategy, Adventure..."/>
          </div>
          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-300">Timezone</label>
            <input id="timezone" name="timezone" type="text" value={formData.timezone} onChange={handleChange} className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
          </div>

          {/* --- CONSENT --- */}
          <div className="pt-4">
            <div className="flex items-start">
              <input id="consent" name="consent" type="checkbox" required checked={formData.consent} onChange={handleChange} className="h-4 w-4 mt-1 text-orange-600 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"/>
              <div className="ml-3 text-sm">
                <label htmlFor="consent" className="font-medium text-gray-300">I agree to the <a href="#" className="text-orange-400 hover:underline">Terms of Service</a> and <a href="#" className="text-orange-400 hover:underline">Privacy Policy</a>. <span className="text-red-500">*</span></label>
              </div>
            </div>
          </div>
          
          {/* --- SUBMIT BUTTON --- */}
          <div>
            <button

  
            type="submit" className="w-full mt-4 px-4 py-2 font-medium text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-md shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-gray-800">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;