import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    
    return (
        <footer className="bg-emerald-950 text-emerald-100/40 py-20 border-t border-white/5 font-light">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                
                {/* Brand & Tagline */}
                <div className="text-center md:text-left rtl:text-right">
                    <h2 className="text-3xl font-serif font-bold text-white tracking-wide mb-2">
                    Groupe<span className="text-gold-500"> Al Amal Auto</span>
                    </h2>
                    <p className="text-xs uppercase tracking-widest opacity-50">{t.footer.desc}</p>
                </div>

                {/* Social Links */}
                <div className="flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                    <a href="https://www.facebook.com/BOUZID.RENOVATION" className="hover:text-gold-400 transition-colors">Facebook</a>
                    <a href="#" className="hover:text-gold-400 transition-colors">Instagram</a>
                    <a href="#" className="hover:text-gold-400 transition-colors">Legal</a>
                </div>

                {/* Copyright */}
                <p className="text-[10px] uppercase tracking-widest opacity-20">
                    © 2025 Groupe Al Amal Auto. {t.footer.rights}
                </p>
            </div>
        </footer>
    );
};

export default Footer;