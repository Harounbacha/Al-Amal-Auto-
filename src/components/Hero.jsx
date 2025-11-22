import React, { useState, useEffect, useRef, useMemo } from 'react';
import '@google/model-viewer';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();
    const modelRef = useRef(null);
    const [modelSrc, setModelSrc] = useState(null);
    const [modelError, setModelError] = useState(false);

    useEffect(() => {
        // Step 1: Set the model source path
        setModelSrc("/kia_sportage.glb");

        // Step 2: Handle file loading errors
        const viewer = modelRef.current;
        if (viewer) {
            const handleError = () => {
                console.error("3D model failed to load. Displaying fallback image.");
                setModelError(true);
            };
            viewer.addEventListener('error', handleError);
            return () => viewer.removeEventListener('error', handleError);
        }
    }, []);

    // -----------------------------------------------------------------
    // CRITICAL PERFORMANCE STEP: useMemo
    // This prevents the heavy <model-viewer> component from being re-rendered 
    // every time the parent (Hero) receives a non-related prop change (e.g., language change).
    // -----------------------------------------------------------------
    const MemoizedModelViewer = useMemo(() => {
        if (modelError || !modelSrc) {
            // Fallback: Display a static image if the model fails or is not yet set
            return (
                <div className="absolute inset-0 bg-[url('/hero_fallback.jpg')] bg-cover bg-center opacity-40"></div>
            );
        }

        return (
            <model-viewer
                ref={modelRef}
                src={modelSrc}
                alt="Luxury Vehicle Showroom"
                
                // === BEST PERFORMANCE SETTINGS ===
                loading="lazy"                  // 📉 **CRITICAL:** Defer loading to improve initial page speed.
                poster="/kia_sportage_poster.jpg" // 🖼️ **CRITICAL:** Shows a 2D image while the 3D file downloads.
                shadow-intensity="0.5"          // 📉 **CRITICAL:** Reduced shadow quality dramatically lowers GPU load.
                disable-tap                     // Removes unnecessary click listeners.
                
                // === AESTHETIC / BEHAVIORAL SETTINGS ===
                interaction-prompt="none"
                camera-controls="false"
                disable-zoom
                disable-pan
                auto-rotate
                auto-rotate-delay="0"
                rotation-per-second="8deg" 
                exposure="1.2"                  // Brightness
                environment-image="neutral"     // Simple lighting setup is faster
                camera-orbit="45deg 80deg 110%"
                field-of-view="30deg"
                style={{width: '100%', height: '100%'}}
            />
        );
    }, [modelSrc, modelError]); // Only re-run this memo if the source path or error state changes.

    return (
        <section id="home" className="relative h-screen w-full bg-emerald-950 overflow-hidden flex items-center justify-center">

            {/* ----------------------------------------------------- */}
            {/* 1. 3D Model Layer (Z-index 10) */}
            {/* ----------------------------------------------------- */}
            <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
                {MemoizedModelViewer}
            </div>

            {/* ----------------------------------------------------- */}
            {/* 2. Content & Overlay Wrapper (Z-index 20) - Sits on top */}
            {/* ----------------------------------------------------- */}
            <div className="absolute inset-0 z-20">
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-emerald-900/20 pointer-events-none"></div>
                
                {/* Text Content */}
                <div className="container mx-auto px-6 h-full flex items-center justify-center pt-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-3 px-5 py-2 border border-gold-500/30 bg-emerald-950/50 backdrop-blur-md text-gold-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-8 fade-in-up">
                            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse"></span>
                            {t.hero.badge}
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-white mb-8 leading-tight tracking-tight fade-in-up delay-100 drop-shadow-2xl">
                            {t.hero.title}
                        </h1>
                        <p className="text-lg md:text-xl text-emerald-100/90 max-w-2xl mx-auto font-light leading-relaxed mb-10 fade-in-up delay-200 drop-shadow-lg">
                            {t.hero.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center fade-in-up delay-300 pointer-events-auto">
                            <a href="#inventory" className="px-10 py-4 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold uppercase tracking-[0.15em] text-xs transition-all shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] hover:-translate-y-1">
                                {t.hero.cta_explore}
                            </a>
                            <a href="#about" className="px-10 py-4 border border-white/30 hover:bg-white/10 hover:border-white text-white font-bold uppercase tracking-[0.15em] text-xs transition-all backdrop-blur-sm">
                                {t.hero.cta_how}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;