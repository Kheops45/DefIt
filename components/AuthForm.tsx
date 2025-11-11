import React, { useState } from 'react';
import { GoogleIcon } from './Icons';

interface AuthFormProps {
  onGoogleSignIn: () => Promise<void>;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onGoogleSignIn }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
        await onGoogleSignIn();
    } catch (error) {
        console.error("Google Sign-In failed", error);
        alert("La connexion a échoué. Veuillez réessayer.");
        setIsLoading(false);
    }
    // loading state is handled by App re-render on successful login
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white">DefIT</h1>
          <p className="mt-2 text-indigo-200">Connectez-vous pour commencer votre aventure de codage</p>
        </div>
        <div className="pt-4">
            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-800 bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition duration-300 transform hover:scale-105 disabled:opacity-75 disabled:scale-100"
            >
              {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion en cours...
                </>
              ) : (
                <>
                    <GoogleIcon className="w-5 h-5" />
                    Se connecter avec Google
                </>
              )}
            </button>
        </div>
      </div>
    </div>
  );
};
