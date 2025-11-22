import React from 'react';
import { Fuel, Gauge, Settings2, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cars } from '../data/inventoryData'; // Separated Data
import { useOnScreen } from '../hooks/useOnScreen';

// Helper for reveal animation
const Reveal = ({ children, delay = 0 }) => {
    const [ref, isVisible] = useOnScreen({ rootMargin: "-50px" });
    const baseStyle = "transition-all duration-1000 ease-out transform";
    return (
        <div ref={ref} className={`${baseStyle} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

const CarCard = ({ car, t }) => (
    <div className="bg-white group cursor-pointer hover:-translate-y-1 transition-all duration-500 shadow-lg hover:shadow-2xl border border-stone-100">
        <div className="relative h-80 overflow-hidden bg-stone-200">
            <img src={car.img} alt={car.model} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
            <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-transparent transition-colors duration-500"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-gold-400 text-[10px] font-bold uppercase tracking-widest mb-1">{car.brand}</div>
                <h3 className="text-2xl font-serif text-white">{car.model}</h3>
            </div>
            <div className="absolute top-4 right-4 bg-gold-500 text-emerald-950 px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                {t.inventory.status_avail}
            </div>
        </div>
        <div className="p-8">
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-stone-100">
                 <p className="text-2xl font-serif text-emerald-900">{car.price}</p>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div className="flex items-center gap-3 text-stone-500"><Fuel className="w-4 h-4 text-gold-600" /> {car.fuel}</div>
                <div className="flex items-center gap-3 text-stone-500"><Gauge className="w-4 h-4 text-gold-600" /> {car.mileage}</div>
                <div className="flex items-center gap-3 text-stone-500"><Settings2 className="w-4 h-4 text-gold-600" /> {car.trans}</div>
                <div className="flex items-center gap-3 text-stone-500"><MapPin className="w-4 h-4 text-gold-600" /> {car.location}</div>
            </div>
        </div>
    </div>
);

const Inventory = () => {
    const { t } = useLanguage();
    return (
        <section id="inventory" className="py-32 bg-stone-50 border-t border-stone-200">
            <div className="container mx-auto px-6">
                <Reveal>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <h2 className="text-4xl font-serif text-emerald-950 mb-3">{t.inventory.title}</h2>
                            <p className="text-stone-500 font-light text-lg">{t.inventory.subtitle}</p>
                        </div>
                        <button className="px-6 py-3 border border-emerald-900 text-emerald-900 hover:bg-emerald-900 hover:text-white transition-all text-xs font-bold uppercase tracking-widest">
                            {t.inventory.btn}
                        </button>
                    </div>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {cars.map((car, idx) => (
                        <Reveal key={idx} delay={idx * 150}>
                            <CarCard car={car} t={t} />
                        </Reveal>
                    ))}
                </div>
            </div>
            
        </section>
    );
};

export default Inventory;