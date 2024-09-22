import React, { useState, useEffect } from 'react';
import { Download, Send, Loader2, Sun, Moon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './components/ui/card';

const NeuroCraftImageForge = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(true); // Default dark mode
  const [showMessage, setShowMessage] = useState(false); // State for sign-in message

  const generateImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: prompt }),
      });
      if (!response.ok) throw new Error('Failed to generate image');
      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (image) {
      const link = document.createElement('a');
      link.href = image;
      link.download = 'neurocraft_image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.className = darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900';
  }, [darkMode]);

  const handleSignInClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000); // Hide the message after 2 seconds
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} p-4 sm:p-8 flex flex-col`}>
      
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4">
        <div className="text-xl sm:text-2xl font-bold text-cyan-400">Verbicon</div>
        <div className="flex space-x-2 sm:space-x-4">
          <Button onClick={handleSignInClick} className="bg-cyan-600 hover:bg-cyan-700 text-xs sm:text-base">
            Sign In
          </Button>
          <Button onClick={toggleDarkMode} className="bg-cyan-600 hover:bg-cyan-700 text-xs sm:text-base">
            {darkMode ? <Sun className="mr-1 sm:mr-2 h-4 w-4" /> : <Moon className="mr-1 sm:mr-2 h-4 w-4" />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </div>
      </nav>

      {/* Funny Sign In Message */}
      {showMessage && (
        <div className="text-center text-lg text-red-500 font-bold mb-4">
          No, Just Kidding!😂
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <Card className={`w-full max-w-lg sm:max-w-xl md:max-w-2xl ${darkMode ? 'bg-gray-800 border-cyan-500' : 'bg-white border-cyan-500'} border-2`}>
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-cyan-400">
            Verbicon: AI Image Forge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input
                type="text"
                placeholder="Enter your image prompt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className={`flex-grow ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900'} border-cyan-500`}
              />
              <Button onClick={generateImage} disabled={loading} className="bg-cyan-600 hover:bg-cyan-700 w-full sm:w-auto">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Generate
              </Button>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {image && (
              <div className="mt-4 relative group">
                <img src={image} alt="Generated" className="w-full rounded-lg shadow-lg" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button onClick={downloadImage} className="bg-cyan-600 hover:bg-cyan-700">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="text-center text-gray-400">
            <a href="https://huggingface.co/black-forest-labs/FLUX.1-dev" target="_blank" rel="noopener noreferrer" className="text-gray-400">
              Powered by FLUX.1-dev model
            </a>
          </CardFooter>
        </Card>
      </div>

      {/* Footer */}
      <footer className="text-center py-4">
        <p>&copy; {new Date().getFullYear()} Verbicon. All Rights Reserved.</p>
        <p>Developed using FLUX.1-dev model for AI image generation. Explore the future of creativity!</p>
      </footer>
    </div>
  );
};

export default NeuroCraftImageForge;
