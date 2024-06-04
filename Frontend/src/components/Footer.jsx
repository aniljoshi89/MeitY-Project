import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto px-4">
                {/* Key Programmer Section */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">Key Programmers</h3>
                    <div className="flex flex-wrap justify-center items-center space-x-4">
                        <div className="text-center">
                            <img
                                src="https://via.placeholder.com/100"
                                alt="Programmer 1"
                                className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
                            />
                            <p className="text-lg font-semibold">Programmer 1</p>
                        </div>
                        <div className="text-center">
                            <img
                                src="https://via.placeholder.com/100"
                                alt="Programmer 2"
                                className="w-24 h-24 object-cover rounded-full mx-auto mb-2"
                            />
                            <p className="text-lg font-semibold">Programmer 2</p>
                        </div>
                        {/* Add more programmers as needed */}
                    </div>
                </div>

                {/* Main Footer Sections */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">About This Website</h3>
                        <p>This is a government website providing educational resources and course information. Our mission is to support learning and development for all citizens.</p>
                    </div>

                    {/* Contact & Technical Support Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Technical Support & Contact</h3>
                        <p>Email: support@education.gov</p>
                        <p>Phone: 123-456-7890</p>
                    </div>

                    {/* Privacy Policy Section */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Privacy Policy</h3>
                        <p>We value your privacy. Read our privacy policy to learn more about how we handle your data.</p>
                        <a href="/privacy-policy" className="text-blue-400">Read Privacy Policy</a>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="mt-8 text-center">
                    <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                    <div className="flex justify-center space-x-4">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://via.placeholder.com/32x32?text=F" alt="Facebook" className="w-8 h-8" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://via.placeholder.com/32x32?text=I" alt="Instagram" className="w-8 h-8" />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://via.placeholder.com/32x32?text=L" alt="LinkedIn" className="w-8 h-8" />
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://via.placeholder.com/32x32?text=Y" alt="YouTube" className="w-8 h-8" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
