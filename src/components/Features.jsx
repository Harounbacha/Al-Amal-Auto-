import React from 'react';
import { Globe, ShieldCheck, Ship, FileCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useOnScreen } from '../hooks/useOnScreen';

const Reveal = ({ children, delay = 0 }) => {
    const [ref, isVisible] = useOnScreen({ rootMargin: "-50px" });
    return (
        <div ref={ref} className={`transition-all duration-1000 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

const Features = () => {
    const { t } = useLanguage();
    const getIcon = (i) => [Globe, ShieldCheck, Ship, FileCheck][i];

    return (
        <section id="about" className="py-32 bg-stone-50 relative">
            <div className="container mx-auto px-6">
                <Reveal>
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-gold-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">~ {t.nav.about} ~</span>
                        <h2 className="text-4xl lg:text-5xl font-serif text-emerald-950 mb-6">{t.features.title}</h2>
                        <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
                        <p className="text-xl text-stone-600 font-light leading-relaxed">{t.features.desc}</p>
                    </div>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[0, 1, 2, 3].map((idx) => {
                        const Icon = getIcon(idx);
                        return (
                            <Reveal key={idx} delay={idx * 100}>
                                <div className="p-10 bg-white border border-stone-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden h-full">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                    <div className="mb-8 text-emerald-900 group-hover:text-gold-600 transition-colors">
                                        <Icon className="w-10 h-10" />
                                    </div>
                                    <h4 className="text-lg font-bold text-emerald-950 mb-4 uppercase tracking-widest">{t.features[`f${idx+1}_t`]}</h4>
                                    <p className="text-stone-500 text-sm leading-relaxed font-light">{t.features[`f${idx+1}_d`]}</p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;