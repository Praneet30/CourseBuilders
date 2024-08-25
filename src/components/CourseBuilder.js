import React, { useState, useEffect, useRef } from "react";
import Module from "./Module";
import { FaPlus, FaLink, FaUpload, FaBook } from "react-icons/fa";
import Modal from "./Modal";
import LinkModal from "./LinkModal";
import Resource from "./Resource";
import emptyStateImage from "./img.png"; 

const CourseBuilder = () => {
  const [modules, setModules] = useState([]);
  const [resources, setResources] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const addModule = (moduleName) => {
    if (moduleName) {
      const newModule = { id: Date.now(), name: moduleName, resources: [] };
      setModules([...modules, newModule]);
      setDropdownOpen(false);
    }
  };

  const handleAddModuleClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (moduleName) => {
    addModule(moduleName);
    handleModalClose();
  };

  const addResource = (resource) => {
    setResources([...resources, { ...resource, moduleId: null }]);
    setDropdownOpen(false);
  };

  const addResourceToModule = (moduleId, resource) => {
    const updatedModules = modules.map((module) => {
      if (module.id === moduleId) {
        const existingResourceIndex = module.resources.findIndex(
          (r) => r.id === resource.id
        );
        if (existingResourceIndex !== -1) {
          const updatedResources = module.resources.map((r, index) =>
            index === existingResourceIndex ? resource : r
          );
          return { ...module, resources: updatedResources };
        } else {
          return { ...module, resources: [...module.resources, resource] };
        }
      }
      return module;
    });
    setModules(updatedModules);
  };

  const handleDrop = (resourceId, targetModuleId) => {
    let draggedResource = null;
    let isResourceInModule = false;

    const modulesWithoutDraggedResource = modules.map((module) => {
      const updatedResources = module.resources.filter((resource) => {
        if (resource.id === resourceId) {
          draggedResource = resource;
          isResourceInModule = true;
          return false;
        }
        return true;
      });
      return { ...module, resources: updatedResources };
    });

    if (!isResourceInModule) {
      const updatedResources = resources.filter((resource) => {
        if (resource.id === resourceId) {
          draggedResource = resource;
          return false;
        }
        return true;
      });
      setResources(updatedResources);
    }

    const updatedModules = modulesWithoutDraggedResource.map((module) => {
      if (module.id === targetModuleId && draggedResource) {
        return { ...module, resources: [...module.resources, draggedResource] };
      }
      return module;
    });

    setModules(updatedModules);

    if (!targetModuleId && draggedResource) {
      setResources([...resources, { ...draggedResource, moduleId: null }]);
    }
  };

  const deleteResource = (resourceId) => {
    setResources(resources.filter((resource) => resource.id !== resourceId));

    const updatedModules = modules.map((module) => {
      const updatedResources = module.resources.filter(
        (resource) => resource.id !== resourceId
      );
      return { ...module, resources: updatedResources };
    });
    setModules(updatedModules);
  };

  const renameModule = (moduleId, newName) => {
    const updatedModules = modules.map((module) =>
      module.id === moduleId ? { ...module, name: newName } : module
    );
    setModules(updatedModules);
  };

  const deleteModule = (moduleId) => {
    const updatedModules = modules.filter((module) => module.id !== moduleId);
    setModules(updatedModules);
  };

  const editResource = (updatedResource) => {
    setResources(
      resources.map((resource) =>
        resource.id === updatedResource.id ? updatedResource : resource
      )
    );

    const updatedModules = modules.map((module) => ({
      ...module,
      resources: module.resources.map((resource) =>
        resource.id === updatedResource.id ? updatedResource : resource
      ),
    }));
    setModules(updatedModules);
  };

  const handleAddLinkClick = () => {
    setIsLinkModalOpen(true);
  };

  const handleLinkModalClose = () => {
    setIsLinkModalOpen(false);
  };

  const handleLinkModalSubmit = (link) => {
    addResource(link);
    setIsLinkModalOpen(false);
  };

  const handleUploadFile = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        addResource({ id: Date.now(), type: "file", name: file.name });
      }
    };
    fileInput.click();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="course-builder">
      <h1>Course Builder</h1>

      <div
        className="add-button-wrapper"
        style={{ position: "absolute", top: "20px", right: "20px" }}
      >
        <button
          className="add-module-btn"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <FaPlus /> Add
        </button>
        {dropdownOpen && (
          <div className="dropdown-content" ref={dropdownRef}>
            <button onClick={handleAddModuleClick}>
              <FaBook /> Create Module
            </button>
            <button onClick={handleAddLinkClick}>
              <FaLink /> Add Link
            </button>
            <button onClick={handleUploadFile}>
              <FaUpload /> Upload File
            </button>
          </div>
        )}
      </div>

      {modules.length === 0 && resources.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <img
            src={emptyStateImage}
            alt="Empty state"
            style={{ maxWidth: "300px", marginBottom: "20px" }}
          />
          <p><b>Nothing added here yet</b></p>
          <p>Click on the [+] Add button to add items to this course</p>
        </div>
      ) : (
        <>
          {modules.map((module) => (
            <Module
              key={module.id}
              module={module}
              addResource={addResourceToModule}
              handleDrop={handleDrop}
              renameModule={renameModule}
              deleteModule={deleteModule}
              deleteResource={deleteResource}
              onEdit={editResource}
            />
          ))}

          <div className="resources">
            {resources.map((resource) => (
              <Resource
                key={resource.id}
                resource={resource}
                onDelete={() => deleteResource(resource.id)}
                handleDrop={handleDrop}
                onEdit={editResource}
              />
            ))}
          </div>
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />

      <LinkModal
        isOpen={isLinkModalOpen}
        onClose={handleLinkModalClose}
        onSubmit={handleLinkModalSubmit}
      />
    </div>
  );
};

export default CourseBuilder;
