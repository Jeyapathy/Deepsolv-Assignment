
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { URLInputForm } from './components/URLInputForm';
import { LoadingState } from './components/LoadingState';
import { ResultsDisplay } from './components/ResultsDisplay';
import { analyzeShopifyStore } from './services/geminiService';
import type { ShopifyStoreInsights } from './types';
import { Hero } from './components/Hero';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ShopifyStoreInsights | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleAnalyze = useCallback(async (storeUrl: string) => {
    if (!storeUrl) {
      setError('Please enter a valid Shopify store URL.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    
    try {
      const result = await analyzeShopifyStore(storeUrl);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Hero />
        <URLInputForm url={url} setUrl={setUrl} onAnalyze={handleAnalyze} isLoading={isLoading} />
        
        {isLoading && <LoadingState />}
        
        {error && (
          <div className="mt-8 max-w-4xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        
        {analysisResult && !isLoading && (
          <div className="mt-12 animate-fade-in">
            <ResultsDisplay data={analysisResult} />
          </div>
        )}
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Powered by Google Gemini. All data is fetched and analyzed in real-time.</p>
      </footer>
    </div>
  );
};

export default App;
