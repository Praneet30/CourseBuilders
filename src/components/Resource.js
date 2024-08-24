import React, { useState } from 'react';
import { FaLink, FaFileAlt, FaEdit, FaTrash, FaSave,FaTimes } from 'react-icons/fa';

const Resource = ({ resource, onDelete, handleDrop, onEdit }) => {
    const onDragStart = (e) => {
        e.dataTransfer.setData('resourceId', resource.id);
    };

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(resource.name);
    const [url, setUrl] = useState(resource.type === 'link' ? resource.url : '');

    const handleEdit = () => {
        if (isEditing) {
            if (resource.type === 'link') {
                if (url) {
                    onEdit({ ...resource, name, url });
                }
            } else {
                onEdit({ ...resource, name });
            }
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    };

    const handleCancel = () => {
        setName(resource.name);
        setUrl(resource.type === 'link' ? resource.url : '');
        setIsEditing(false);
    };


    return (
        <div className="resource" draggable onDragStart={onDragStart}>
           {resource.type === 'link' ? <FaLink /> : <FaFileAlt />}
            <div className="resource-details">
                {isEditing ? (
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {resource.type === 'link' && (
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        )}
                    </div>
                ) : (
                    <div>
                        {resource.type === 'link' ? (
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                {resource.name}
                            </a>
                        ) : (
                            <span>{resource.name}</span>
                        )}
                    </div>
                )}
            </div>
            <div className="resource-actions">
                {isEditing ? (
                    <>
                        <FaSave onClick={handleEdit} />
                        <FaTimes onClick={handleCancel} />
                    </>
                ) : (
                    <>
                        <FaEdit onClick={() => setIsEditing(true)} />
                        <FaTrash onClick={onDelete} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Resource;