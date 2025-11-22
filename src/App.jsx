import React, { lazy, Suspense } from 'react';
import { LanguageProvider } from './context/LanguageContext';

// 1. Eagerly Load the essential components (Navbar & Hero)
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// 2. Use Lazy Loading for the rest (improves initial load speed)
const Features = lazy(() => import('./components/Features'));
const Inventory = lazy(() => import('./components/Inventory'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Simple loading fallback (for when the bundle is downloading)
const LoadingFallback = () => <div className="text-center py-40 text-white bg-emerald-950">Loading Content...</div>;


const App = () => {
    return (
        <LanguageProvider>
            <div className="antialiased selection:bg-gold-500 selection:text-white">
                <Navbar />
                <Hero />
                
                {/* Wrap the heavy content in Suspense */}
                <Suspense fallback={<LoadingFallback />}>
                    <Features />
                    <Inventory />
                    <Contact />
                    <Footer />
                </Suspense>
            </div>
        </LanguageProvider>
    );
};

export default App;