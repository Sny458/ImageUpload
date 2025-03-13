import { useState } from "react";
import axios from "axios";

const VideoUploader = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [processedVideo, setProcessedVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedVideo(event.target.files[0]);
    }
  };

  const uploadAndProcessVideo = async () => {
    if (!selectedVideo) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("video", selectedVideo);

    try {
      const response = await axios.post("http://13.201.146.30:5000/upload/video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProcessedVideo(response.data.processedVideoUrl);
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Video Uploader</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={uploadAndProcessVideo} disabled={!selectedVideo}>
        Upload & Process
      </button>
      {loading && <p>Processing...</p>}
      {processedVideo && (
        <div>
          <h3>Processed Video:</h3>
          <video width="300" controls>
            <source src={processedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <br />
          <a href={processedVideo} download="processed-video.mp4">
            <button>Download</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
