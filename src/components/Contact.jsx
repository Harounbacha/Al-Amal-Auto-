import React, { useState } from 'react';
import { Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useOnScreen } from '../hooks/useOnScreen';

const Contact = () => {
    const { t } = useLanguage();

    // State to manage form inputs
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });

    // State for form submission status
    const [status, setStatus] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        // Basic validation
        if (!formData.name || !formData.phone || !formData.email || !formData.message) {
            setStatus('Please fill in all fields.');
            return;
        }
    
        try {
            // Send form data to Formspree
            const response = await fetch('https://formspree.io/f/xvgyqnwb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                setStatus('Thank you! Your message has been sent.');
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    message: '',
                });
            } else {
                setStatus('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('Something went wrong. Please try again.');
        }
    };

    return (
        <section id="contact" className="py-32 bg-emerald-900 text-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-emerald-950 to-transparent"></div>
            
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
                {/* Text Content */}
                <div className="flex flex-col justify-center">
                    <span className="text-gold-400 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                        {t.contact.title}
                    </span>
                    <h3 className="text-4xl md:text-6xl font-serif mb-8 leading-tight text-white">
                        Your new car awaits
                    </h3>
                    <p className="text-emerald-100/70 text-lg mb-12 font-light leading-relaxed max-w-md">
                        {t.contact.subtitle}
                    </p>
                    
                    <div className="space-y-8">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400 bg-emerald-950/30">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gold-400/80 uppercase tracking-widest mb-1">{t.contact.call}</p>
                                <p className="text-2xl font-serif">+213 656536613</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 border border-gold-500/30 flex items-center justify-center shrink-0 text-gold-400 bg-emerald-950/30">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gold-400/80 uppercase tracking-widest mb-1">Showroom</p>
                                <p className="text-xl font-serif">{t.contact.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form
                    className="bg-white p-10 lg:p-12 shadow-2xl border-t-4 border-gold-500 relative text-emerald-950"
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-2">
                            <label className="text-[0.65rem] font-bold text-emerald-900 uppercase tracking-widest">{t.contact.name}</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-4 bg-stone-50 border-b-2 border-stone-200 focus:border-gold-500 outline-none transition-colors text-emerald-950 placeholder-stone-300"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[0.65rem] font-bold text-emerald-900 uppercase tracking-widest">{t.contact.phone}</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-4 bg-stone-50 border-b-2 border-stone-200 focus:border-gold-500 outline-none transition-colors text-emerald-950 placeholder-stone-300"
                            />
                        </div>
                    </div>
                    <div className="space-y-2 mb-8">
                        <label className="text-[0.65rem] font-bold text-emerald-900 uppercase tracking-widest">{t.contact.email}</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-4 bg-stone-50 border-b-2 border-stone-200 focus:border-gold-500 outline-none transition-colors text-emerald-950 placeholder-stone-300"
                        />
                    </div>
                    <div className="space-y-2 mb-10">
                        <label className="text-[0.65rem] font-bold text-emerald-900 uppercase tracking-widest">{t.contact.message}</label>
                        <textarea
                            rows="3"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-4 bg-stone-50 border-b-2 border-stone-200 focus:border-gold-500 outline-none transition-colors text-emerald-950 placeholder-stone-300"
                        ></textarea>
                    </div>
                    <button className="w-full py-5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-[0.25em] transition-all shadow-xl hover:shadow-2xl">
                        {t.contact.submit}
                    </button>
                    {status && <p className="mt-4 text-center text-sm text-emerald-900">{status}</p>}
                </form>
            </div>
        </section>
    );
};

export default Contact;