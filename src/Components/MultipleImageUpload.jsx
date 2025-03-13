import { useState } from "react";
import axios from "axios";

const MultiImageUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [processedImages, setProcessedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages(files);
  };

  const uploadAndProcessImages = async () => {
    if (selectedImages.length === 0) return;
    setLoading(true);

    const formData = new FormData();
    selectedImages.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      const response = await axios.post("http://13.201.146.30:5000/upload/multiple", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProcessedImages(response.data.processedImageUrls);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Multiple Image Uploader</h2>
      <input type="file" accept="image/*" multiple onChange={handleFileChange} />
      <button onClick={uploadAndProcessImages} disabled={selectedImages.length === 0}>
        Upload & Process
      </button>
      {loading && <p>Processing...</p>}

      {processedImages.length > 0 && (
        <div>
          <h3>Processed Images:</h3>
          {processedImages.map((imageUrl, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <img src={imageUrl} alt={`Processed ${index}`} style={{ width: "300px" }} />
              <br />
              <a href={imageUrl} download={`processed-image-${index + 1}.jpg`}>
                <button>Download</button>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiImageUploader;
