import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('en');

    // Logic: Update HTML dir/lang attributes when state changes
    useEffect(() => {
        const t = translations[lang];
        document.documentElement.dir = t.dir;
        document.documentElement.lang = lang;
    }, [lang]);

    const value = {
        lang,
        setLang,
        t: translations[lang], // We expose the current translation object directly
        dir: translations[lang].dir
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom hook for easy access in components
export const useLanguage = () => useContext(LanguageContext);