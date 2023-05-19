import { useContext, useRef, useState } from "react";

import styles from "./UploadForm.module.css";
import { ImagesContext } from "../../context/ImagesContext";

const fileTypes = [
  "image/gif",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg",
  "image/tiff",
  "image/webp",
];

const UploadForm = () => {
  const [selectedFiles, setSelectedFiles] = useState();
  const form = useRef(null);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const { getImages } = useContext(ImagesContext);

  function validFileType(file) {
    return fileTypes.includes(file.type);
  }
  function validFileSize(file) {
    return file.size <= 2000000;
  }
  const handleFiles = (e) => {
    setSelectedFiles(e.target.files);
  };

  function handleSubmit(event) {
    event.preventDefault();

    const url = form.current.action;
    const formData = new FormData(form.current);

    const fetchOptions = {
      method: form.current.method,
      body: formData,
    };
    setLoading(true);
    fetch(url, fetchOptions).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        setSubmit(true);
        getImages();

        setTimeout(() => {
          setSelectedFiles([]);
          setSubmit(false);
        }, 2000);
      }
    });
  }

  const files = selectedFiles ? [...selectedFiles] : [];

  return (
    <div className={styles.uploadform}>
      <form
        ref={form}
        action="/api/uploadimages"
        method="POST"
        encType="multipart/form-data"
      >
        <div>
          <label htmlFor="file">Choose images to upload</label>
          <input
            type="file"
            name="file"
            id="file"
            accept="images/*"
            multiple
            required
            onChange={handleFiles}
          />
        </div>
        <div className={styles.preview}>
          <ul>
            {files.length > 0 && loading && !submit && <span>Loading...</span>}
            {files.length > 0 && !loading && submit && (
              <span>Success uploading images</span>
            )}
            {files.length === 0 && submit && <span>No files selected</span>}
            {files.length > 0 && !files.some(validFileSize) && (
              <span>Files must be less than 2Mb</span>
            )}
            {files.length > 0 && !files.some(validFileType) && (
              <span>Choose valid images</span>
            )}
            {files.length > 3 && (
              <span>You can upload up to 3 images at the same time </span>
            )}
            {files.length < 4 &&
              !submit &&
              !loading &&
              files.every(validFileType) &&
              files.every(validFileSize) &&
              files.map((file, i) => <li key={i}>{file.name}</li>)}
          </ul>
        </div>
        <div className={styles.submit}>
          <button type="submit" onClick={handleSubmit}>
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
