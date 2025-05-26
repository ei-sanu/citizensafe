import React from 'react';

const EmergencyContacts: React.FC = () => {
    const contacts = [
        { name: 'Police', number: '100' },
        { name: 'Ambulance', number: '108' },
        { name: 'Women Helpline', number: '1091' },
        { name: 'Fire', number: '101' },
        { name: 'National Emergency Number', number: '112' },
    ];

    const handleCall = (number: string) => {
        window.location.href = `tel:${number}`;
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Emergency Contacts</h1>

            <div className="cyber-panel">
                <h2 className="cyber-panel-title">Important Numbers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {contacts.map((contact) => (
                        <div
                            key={contact.name}
                            className="p-4 border border-cyber-blue-500 rounded-md hover:bg-cyber-dark cursor-pointer"
                            onClick={() => handleCall(contact.number)}
                        >
                            <h3 className="font-bold text-lg">{contact.name}</h3>
                            <p className="text-cyber-blue-500">{contact.number}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmergencyContacts;
