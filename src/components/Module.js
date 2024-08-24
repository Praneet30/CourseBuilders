import React, { useState } from 'react';
import Resource from './Resource';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Module = ({ module, addResource, handleDrop, renameModule, deleteModule, deleteResource, onEdit }) => {
    const [isEditingModuleName, setIsEditingModuleName] = useState(false);
    const [moduleName, setModuleName] = useState(module.name);

    const handleModuleNameChange = () => {
        renameModule(module.id, moduleName);
        setIsEditingModuleName(false);
    };

    const handleCancelEditModuleName = () => {
        setModuleName(module.name);
        setIsEditingModuleName(false);
    };


    const onDrop = (e) => {
        const resourceId = e.dataTransfer.getData('resourceId');
        handleDrop(parseInt(resourceId, 10), module.id);
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className="module" onDrop={onDrop} onDragOver={onDragOver}>
            <div className="module-header">
                {isEditingModuleName ? (
                    <div>
                        <input
                            type="text"
                            value={moduleName}
                            onChange={(e) => setModuleName(e.target.value)}
                        />
                        <button onClick={handleModuleNameChange}>Save</button>
                        <button onClick={handleCancelEditModuleName}>Cancel</button>
                    </div>
                ) : (
                    <h2>{module.name}</h2>
                )}
                <div className="module-actions">
                    <FaEdit onClick={() => setIsEditingModuleName(true)} />
                    <FaTrash onClick={() => deleteModule(module.id)} />
                </div>
            </div>
            {module.resources.map((resource) => (
                <Resource
                    key={resource.id}
                    resource={resource}
                    onDelete={() => deleteResource(resource.id)}
                    onEdit={onEdit}
                />
            ))}
            {/* <AddResourceDropdown onAdd={(resource) => addResource(module.id, resource)} /> */}
        </div>
    );
};

export default Module;
