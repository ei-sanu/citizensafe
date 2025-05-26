import React from 'react';

const SafetyProtocols: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Safety Protocols</h1>

            <div className="space-y-6">
                <section className="cyber-panel">
                    <h2 className="cyber-panel-title">General Safety Guidelines</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Stay aware of your surroundings at all times</li>
                        <li>Keep your phone charged and within reach</li>
                        <li>Share your location with trusted contacts</li>
                        <li>Avoid walking alone in poorly lit areas</li>
                        <li>Trust your instincts - if something feels wrong, leave the area</li>
                    </ul>
                </section>

                <section className="cyber-panel">
                    <h2 className="cyber-panel-title">Emergency Response Steps</h2>
                    <ol className="list-decimal pl-6 space-y-2">
                        <li>Stay calm and assess the situation</li>
                        <li>Move to a safe location if possible</li>
                        <li>Use the emergency buttons to contact help</li>
                        <li>Share your location with emergency contacts</li>
                        <li>Wait in a well-lit, populated area if possible</li>
                    </ol>
                </section>
            </div>
        </div>
    );
};

export default SafetyProtocols;
