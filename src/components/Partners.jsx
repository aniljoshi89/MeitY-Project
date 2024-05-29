import React from 'react';

const partners = [
    {
        name: "Partner 1",
        image: "https://via.placeholder.com/150x150?text=Partner+1"
    },
    {
        name: "Partner 2",
        image: "https://via.placeholder.com/150x150?text=Partner+2"
    },
    {
        name: "Partner 3",
        image: "https://via.placeholder.com/150x150?text=Partner+3"
    },
    {
        name: "Partner 4",
        image: "https://via.placeholder.com/150x150?text=Partner+4"
    }
];

const Partners = () => {
    return (
        <div className="bg-gray-100 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Our Partners</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-screen-xl mx-auto px-4">
                {partners.map((partner, index) => (
                    <div key={index} className="text-center">
                        <img
                            src={partner.image}
                            alt={partner.name}
                            className="w-24 h-24 object-cover rounded-full mx-auto"
                        />
                        <p className="mt-2 text-lg font-semibold">{partner.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Partners;
