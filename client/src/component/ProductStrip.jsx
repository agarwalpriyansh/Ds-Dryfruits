function ProductStrip() {
  const features = [
    {
      id: 1,
      name: "Healthy Heart",
      imageUrl: "https://res.cloudinary.com/dsbu2gzgi/image/upload/v1765126581/healthy-heart_u7k85w.png",
      isHighlighted: false
    },
    {
      id: 2,
      name: "High Nutrition",
      imageUrl: "https://res.cloudinary.com/dsbu2gzgi/image/upload/v1765126582/high-protein_ybqnmw.png",
      isHighlighted: false
    },
    {
      id: 3,
      name: "Gluten Free",
      imageUrl: "https://res.cloudinary.com/dsbu2gzgi/image/upload/v1765126581/gulten-free_z4ibmf.png",
      isHighlighted: false
    },
    {
      id: 4,
      name: "Cholesterol Free",
      imageUrl: "https://res.cloudinary.com/dsbu2gzgi/image/upload/v1765126582/calestrol-free_xikn8p.png",
      isHighlighted: false
    }
  ];

  return (
    <div className="w-full mt-4 sm:mt-6">
      <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-6">
        <div className="flex flex-wrap justify-between items-center gap-4 sm:gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`flex flex-col items-center justify-center flex-1 min-w-[100px] ${
                feature.isHighlighted
                  ? "bg-blue-600 rounded-lg p-3 sm:p-4"
                  : ""
              }`}
            >
              {/* Icon Container */}
              <div className="mb-2 sm:mb-3 flex items-center justify-center">
                <img
                  src={feature.imageUrl}
                  alt={feature.name}
                  className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain ${
                    feature.isHighlighted ? "brightness-0 invert" : ""
                  }`}
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%23e5e7eb'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              {/* Text */}
              <span
                className={`text-xs sm:text-sm font-medium text-center leading-tight ${
                  feature.isHighlighted
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                {feature.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductStrip;
