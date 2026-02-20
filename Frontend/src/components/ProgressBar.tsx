const ProgressBar = ({ title = "Progression", value = 50 }) => {
  return (
    <div className="w-full">
      {/* Header : Titre et Pourcentage */}
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <span className="text-sm text-foreground">{value}%</span>
      </div>

      {/* Conteneur de la barre */}
      <div 
        className="flex w-full h-2 bg-gray-100 rounded-full overflow-hidden" 
        role="progressbar" 
        aria-valuenow={value} 
        aria-valuemin="0" 
        aria-valuemax="100"
      >
        {/* Remplissage de la barre */}
        <div 
          className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-500 text-xs text-gray-500 text-center whitespace-nowrap transition-all duration-500" 
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;