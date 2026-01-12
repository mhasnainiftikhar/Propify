import React from "react";
import { MessageSquare } from "lucide-react";

const Messages = () => {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
                <p className="text-gray-600 mt-1">Connect with potential buyers</p>
            </div>

            {/* Coming Soon Placeholder */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare size={32} className="text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Messaging System
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                    Chat with potential buyers and manage all your property inquiries in one place. Coming soon!
                </p>
            </div>
        </div>
    );
};

export default Messages;
