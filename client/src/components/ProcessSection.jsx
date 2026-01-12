import React from "react";
import {
    Search,
    MapPin,
    ShieldCheck,
    Key,
    ArrowRight,
    UserCheck,
    Zap,
    CheckCircle2
} from "lucide-react";

const ProcessSection = () => {
    const steps = [
        {
            title: "Discover Your Match",
            desc: "Browse our elite collection of verified properties using advanced filters tailored to your lifestyle.",
            icon: Search,
            color: "blue"
        },
        {
            title: "Connect with Experts",
            desc: "Every seller on Propify is vetted. Reach out directly to trusted agents who prioritize your security.",
            icon: UserCheck,
            color: "indigo"
        },
        {
            title: "Seamless Acquisition",
            desc: "From legal vetting to final keys, our platform ensures a transparent and streamlined transaction.",
            icon: Zap,
            color: "emerald"
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <span className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4 block underline decoration-gray-200 underline-offset-8">Propify Method</span>
                    <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">Refining the Property Journey</h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-sm font-medium leading-relaxed">
                        We have simplified every interaction to ensure safety, speed, and discretion.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 group bg-white p-8">
                            <div className="flex flex-col items-center text-center">
                                <div className={`w-20 h-20 rounded-3xl mb-8 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-xl shadow-${step.color}-100 bg-${step.color}-600 text-white relative`}>
                                    <step.icon size={36} />
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border-4 border-gray-50 flex items-center justify-center text-gray-900 font-black text-xs">
                                        0{index + 1}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4">{step.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-medium mb-6">
                                    {step.desc}
                                </p>
                                <div className="flex items-center gap-2 text-blue-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span>Learn More</span>
                                    <ArrowRight size={18} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-gray-900 rounded-[3rem] p-8 md:p-12 overflow-hidden relative group">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-left">
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 italic">"Propify changed my life."</h3>
                            <p className="text-blue-400 font-bold">Verified Buyer Review</p>
                        </div>
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-14 h-14 rounded-full border-4 border-gray-900 bg-gray-800 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <div className="text-right">
                            <div className="flex gap-1 text-amber-400 mb-2 justify-end">
                                {[1, 2, 3, 4, 5].map(s => <CheckCircle2 key={s} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-white/60 font-medium">Join 50k+ Happy Users</p>
                        </div>
                    </div>
                    {/* Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl group-hover:bg-blue-600/20 transition-colors"></div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
