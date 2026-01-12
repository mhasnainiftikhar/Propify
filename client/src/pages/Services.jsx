import React from "react";
import {
    Home,
    Key,
    ShieldCheck,
    Banknote,
    BarChart3,
    FileText,
    ArrowRight,
    HeadphonesIcon,
    Search,
    CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
    const mainServices = [
        {
            title: "Property Buying",
            desc: "Expert guidance to find and secure your dream home with personalized search and negotiation support.",
            icon: Home,
            color: "blue"
        },
        {
            title: "Property Selling",
            desc: "Maximize your property's value with professional marketing, staging advice, and premium listing placement.",
            icon: Key,
            color: "indigo"
        },
        {
            title: "Rental Management",
            desc: "Worry-free rental services for landlords, including tenant screening, maintenance, and rent collection.",
            icon: ShieldCheck,
            color: "emerald"
        },
        {
            title: "Property Valuation",
            desc: "Accurate, data-driven property valuations and market analysis for informed financial decisions.",
            icon: BarChart3,
            color: "amber"
        },
        {
            title: "Financial Advisory",
            desc: "Tailored mortgage advice and financial consulting to help you navigate the complexities of property investment.",
            icon: Banknote,
            color: "rose"
        },
        {
            title: "Legal Assistance",
            desc: "Full support for property documentation, title searches, and legal compliance during transactions.",
            icon: FileText,
            color: "cyan"
        }
    ];

    return (
        <main className="min-h-screen bg-[#f8faff] pt-24 pb-20">
            {/* Header Section */}
            <section className="bg-gradient-to-br from-blue-50/50 via-white to-transparent py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-blue-600 font-black text-sm uppercase tracking-[0.2em] mb-4 block underline decoration-4 underline-offset-8">Our Services</span>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                        Comprehensive Real Estate <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Solutions for You</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        From discovery to delivery, we provide end-to-end services tailored to meet your unique property needs.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
                    {mainServices.map((service, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-[2.5rem] bg-white border border-gray-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 relative flex flex-col items-start"
                        >
                            <div className={`p-5 rounded-2xl mb-8 transition-transform group-hover:scale-110 group-hover:rotate-6 bg-${service.color}-50 text-${service.color}-600`}>
                                <service.icon size={36} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed mb-8 flex-1">
                                {service.desc}
                            </p>
                            <button className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-blue-600 hover:gap-3 transition-all">
                                Learn More
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-gray-900 text-white rounded-[3rem] mx-4 lg:mx-8 px-8 overflow-hidden relative">
                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                            Why Clients Trust <br />
                            Propify Experts
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 rounded-xl text-blue-400">
                                    <ShieldCheck size={28} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-1">Safety & Trust</h4>
                                    <p className="text-gray-400">Every agent is vetted and every listing is verified by our specialist team.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 rounded-xl text-indigo-400">
                                    <HeadphonesIcon size={28} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-1">24/7 Premium Support</h4>
                                    <p className="text-gray-400">Personal property consultants are available around the clock for your needs.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 rounded-xl text-emerald-400">
                                    <Search size={28} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-1">Advanced Technology</h4>
                                    <p className="text-gray-400">Leverage our AI-driven market insights to make smarter investment decisions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square bg-blue-600/20 rounded-full flex items-center justify-center border border-white/10 animate-pulse">
                            <div className="aspect-square w-3/4 bg-blue-600/40 rounded-full flex items-center justify-center border border-white/20">
                                <div className="aspect-square w-1/2 bg-blue-600/60 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.5)]">
                                    <CheckCircle2 size={64} className="text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            </section>

            {/* Need Something Custom? */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="bg-blue-50 p-12 md:p-20 rounded-[3rem] border border-blue-100 flex flex-col items-center">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Need a custom solution?</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mb-12">
                        Tell us about your unique real estate goals, and we'll create a custom roadmap just for you.
                    </p>
                    <Link
                        to="/search"
                        className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-200"
                    >
                        Schedule Free Consultation
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default Services;
