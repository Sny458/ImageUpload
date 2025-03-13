import { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const uploadAndProcessImage = async () => {
    if (!selectedImage) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post("http://13.201.146.30:5000/upload/single", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProcessedImage(response.data.processedImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Image Uploader</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={uploadAndProcessImage} disabled={!selectedImage}>
        Upload & Process
      </button>
      {loading && <p>Processing...</p>}
      {processedImage && (
        <div>
          <h3>Processed Image:</h3>
          <img src={processedImage} alt="Processed" style={{ width: "300px", marginTop: "10px" }} />
          <br />
          <a href={processedImage} download="processed-image.jpg">
            <button>Download</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
