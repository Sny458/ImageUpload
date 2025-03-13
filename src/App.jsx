import { useState } from 'react'
import './App.css'
import ImageUploader from './Components/ImageUpload'
import VideoUploader from './Components/VideoUpload'
import MultiImageUploader from './Components/MultipleImageUpload';

function App() {
  const [uploadType, setUploadType] = useState(null);

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Choose Upload Type</h2>
        {!uploadType && (
          <div>
            <button onClick={() => setUploadType("image")}>Upload Single Image</button>
            <button onClick={() => setUploadType("video")}>Upload Video</button>
            <button onClick={() => setUploadType("multipleImage")}>Upload Multiple Images</button>
          </div>
        )}
        {uploadType === "image" && (
          <div>
            <button onClick={() => setUploadType(null)}>Back</button>
            <ImageUploader />
          </div>
        )}
        {uploadType === "video" && (
          <div>
            <button onClick={() => setUploadType(null)}>Back</button>
            <VideoUploader />
          </div>
        )}
        {uploadType === "multipleImage" && (
          <div>
            <button onClick={() => setUploadType(null)}>Back</button>
            <MultiImageUploader/>
          </div>
        )}
      </div>
    </>
  )
}

export default App
