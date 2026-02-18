import { useState, useRef } from 'react';

const AvatarFileUpload = ({setPhoto} : any) => {
  const [preview, setPreview] = useState<any>(null);
  const fileInputRef = useRef<any>(null);

  // Gestion du changement de fichier
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }

    setPhoto(file);
  };

  // Déclencher le clic sur l'input caché
  const handleTriggerClick = () => {
    fileInputRef.current.click();
  };

  // Supprimer l'image
  const handleClear = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-5">
      {/* Input caché pour le fonctionnement React */}
      <input
        type="file"
        className="hidden"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {/* Zone de prévisualisation */}
      <div className="group cursor-pointer" onClick={handleTriggerClick}>
        {preview ? (
          <div className="size-20">
            <img 
              className="w-full h-full object-cover rounded-full" 
              src={preview} 
              alt="Preview" 
            />
          </div>
        ) : (
          <span className="flex shrink-0 justify-center items-center size-20 bg-layer border-2 border-dotted border-line-3 text-muted-foreground rounded-full hover:bg-layer-hover transition">
            <svg className="shrink-0 size-7" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/>
              <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
            </svg>
          </span>
        )}
      </div>

      {/* Boutons d'actions */}
      <div className="grow">
        <div className="flex items-center gap-x-2">
          {/* <button 
            type="button" 
            onClick={handleTriggerClick}
            className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-none disabled:opacity-50"
          >
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" x2="12" y1="3" y2="15"></line>
            </svg>
            Upload photo
          </button> */}

          {preview && (
            <button 
              type="button" 
              onClick={handleClear}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-xs rounded-lg bg-layer border border-layer-line text-red-500 shadow-sm hover:bg-layer-hover focus:outline-none"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvatarFileUpload;