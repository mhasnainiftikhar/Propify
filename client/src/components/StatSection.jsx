import React from "react";
import {
    Building2,
    Users,
    CheckSquare,
    TrendingUp,
    Globe
} from "lucide-react";

const StatSection = () => {
    const stats = [
        {
            value: "2,500+",
            label: "Premium Listings",
            icon: Building2,
        },
        {
            value: "1,200+",
            label: "Verified Sellers",
            icon: Users,
        },
        {
            value: "99.9%",
            label: "Success Rate",
            icon: CheckSquare,
        },
        {
            value: "15+",
            label: "Global Markets",
            icon: Globe,
        }
    ];

    return (
        <section className="py-24 bg-[#f8faff]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center lg:items-start text-center lg:text-left group border-l-2 border-gray-100 pl-8">
                            <stat.icon size={20} className="text-gray-400 mb-6 group-hover:text-blue-600 transition-colors" />
                            <h4 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight">
                                {stat.value}
                            </h4>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatSection;
