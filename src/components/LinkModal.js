import React, { useState, useEffect } from 'react';

const LinkModal = ({ isOpen, onClose, onSubmit }) => {
    const [linkName, setLinkName] = useState('');
    const [linkURL, setLinkURL] = useState('');

    // Reset the linkName and linkURL whenever the modal is opened
    useEffect(() => {
        if (isOpen) {
            setLinkName('');
            setLinkURL('');
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (linkName && linkURL) {
            onSubmit({ id: Date.now(), type: 'link', name: linkName, url: linkURL });
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                width: '300px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative'
            }}>
                <h2 style={{
                    fontSize: '18px',
                    marginBottom: '20px',
                    fontWeight: 'bold'
                }}>Add New Link</h2>

                <button 
                    onClick={onClose} 
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'red',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        padding: '5px'
                    }}
                >
                    &times;
                </button>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '5px',
                        textAlign: 'left',
                        fontWeight: '500'
                    }}>Name:</label>
                    <input
                        type="text"
                        value={linkName}
                        onChange={(e) => setLinkName(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '5px',
                        textAlign: 'left',
                        fontWeight: '500'
                    }}>URL:</label>
                    <input
                        type="text"
                        value={linkURL}
                        onChange={(e) => setLinkURL(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={handleSubmit} style={{
                        padding: '10px 20px',
                        backgroundColor: '#d9534f',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        flex: 1,
                        marginRight: '10px'
                    }}>Add Link</button>
                    <button onClick={onClose} style={{
                        padding: '10px 20px',
                        backgroundColor: '#ccc',
                        color: '#333',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        flex: 1
                    }}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default LinkModal;
