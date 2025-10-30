import React from "react"; 

const FileViewer = ({ filePath, onClose }) => {
  if (!filePath) return null;

  const ext = filePath.split('.').pop().toLowerCase();
  const isImage = ["jpg", "jpeg", "png", "gif"].includes(ext);
  const isPDF = ext === "pdf";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-3xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 font-bold text-xl"
        >
          &times;
        </button>

        {isImage && <img src={`http://localhost:5000${filePath}`} alt="document" className="w-full h-auto" />}

        {isPDF && <iframe src={`http://localhost:5000${filePath}`} title="PDF Document" className="w-full h-[600px]"></iframe>}

        {!isImage && !isPDF && (
          <div className="text-center">
            <p>Cannot preview this file type.</p>
            <a
              href={`http://localhost:5000${filePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Download File
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileViewer;
