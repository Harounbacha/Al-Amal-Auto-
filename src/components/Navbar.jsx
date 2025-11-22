import React, { useState } from 'react';
import { Crown, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext'; // Import the logic
import { useScroll } from '../hooks/useScroll';           // Import the logic

const Navbar = () => {
    // 1. Get Logic from Hooks
    const { lang, setLang, t } = useLanguage();
    // Check if the user has scrolled past 20 pixels
    const isScrolled = useScroll(20); 
    
    // 2. Local UI state (for the mobile menu)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Dynamic classes for the navigation bar background and shadow
    const navClasses = `fixed w-full z-[100] transition-all duration-500 ${
        // If scrolled: use a solid, slightly blurred background
        isScrolled 
            ? 'bg-emerald-950/95 backdrop-blur-md shadow-xl py-3 border-b border-gold-500/20' 
            // If at the top: be transparent and subtle
            : 'bg-transparent py-6'
    }`;
    
    const navLinks = [
        { href: '#home', text: t.nav.home },
        { href: '#about', text: t.nav.about },
        { href: '#inventory', text: t.nav.inventory },
        { href: '#contact', text: t.nav.contact },
    ];

    return (
        // The z-[100] ensures the navbar is always on top of everything
        <nav className={navClasses} dir={t.dir}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                
                {/* Logo & Brand Name */}
                <a href="#home" className="flex items-center gap-2 group cursor-pointer z-[101] relative">
                    <div className="p-2 border border-gold-500/50 bg-emerald-900/30 backdrop-blur group-hover:bg-gold-500 transition-colors duration-500">
                        <Crown className="w-6 h-6 text-gold-400 group-hover:text-emerald-950 transition-colors" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold tracking-widest text-white leading-none font-serif">
                            DZ<span className="text-gold-400">AUTO</span>
                        </span>
                    </div>
                </a>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a 
                            key={link.href}
                            href={link.href}
                            className="text-white/80 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors"
                        >
                            {link.text}
                        </a>
                    ))}
                    <a href="#contact" className="ml-4 px-6 py-2 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold uppercase tracking-[0.15em] text-xs transition-all shadow-lg hover:shadow-xl">
                        {t.nav.quote}
                    </a>
                </div>

                {/* Language Switcher & Mobile Menu Button */}
                <div className="flex items-center gap-4">
                    {/* Language Switcher */}
                    <div className="hidden md:flex items-center border-l border-white/10 px-4 gap-3 rtl:border-l-0 rtl:border-r rtl:border-white/10">
                        {['en', 'fr', 'ar'].map((l) => (
                            <button 
                                key={l}
                                onClick={() => setLang(l)}
                                className={`text-[10px] font-bold uppercase transition-colors ${lang === l ? 'text-gold-400' : 'text-emerald-400 hover:text-white'}`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button (Hamburger) */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden text-white z-[101]"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isMobileMenuOpen && (
                <div 
                    className="lg:hidden absolute top-0 left-0 w-full h-screen bg-emerald-950/95 backdrop-blur-lg pt-24 z-[99]"
                    dir={t.dir}
                >
                    <div className="flex flex-col items-center gap-6">
                        {navLinks.map((link) => (
                            <a 
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-white hover:text-gold-400 text-xl font-serif transition-colors py-2"
                            >
                                {link.text}
                            </a>
                        ))}
                        <a href="#contact" className="mt-4 px-10 py-3 bg-gold-500 hover:bg-gold-400 text-emerald-950 font-bold uppercase tracking-[0.15em] text-sm transition-all shadow-lg">
                            {t.nav.quote}
                        </a>
                        
                        {/* Mobile Language Switcher */}
                        <div className="flex items-center mt-6 border-t border-white/10 pt-6 gap-6">
                            {['en', 'fr', 'ar'].map((l) => (
                                <button 
                                    key={l}
                                    onClick={() => setLang(l)}
                                    className={`text-sm font-bold uppercase transition-colors ${lang === l ? 'text-gold-400' : 'text-emerald-400 hover:text-white'}`}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;