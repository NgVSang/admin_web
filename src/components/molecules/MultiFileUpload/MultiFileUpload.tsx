import React, {FC, useState} from 'react'
import {MultiFileUpload} from './MultiFileUpload.types'

const MultiFileUpload: FC<MultiFileUpload> = ({
    onFilesAdded
}) => {
    const [highlight, setHighlight] = useState(false);
    const [preview, setPreview] = useState<string>("");

    const handleFilesAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
        const array: File[] = [];
        for (let i = 0; i < files.length; i++) {
            array.push(files[i]);
            // Xem trước ảnh
            // const reader = new FileReader();
            // reader.onload = () => {
            // const result = reader.result as string;
            //   setPreview(result);
            // };
            // reader.readAsDataURL(files[i]);
        }
        onFilesAdded(array);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setHighlight(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setHighlight(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setHighlight(false);
        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
        const array: File[] = [];
        for (let i = 0; i < files.length; i++) {
            array.push(files[i]);
            // Xem trước ảnh
            const reader = new FileReader();
            reader.onload = () => {
            const result = reader.result as string;
            setPreview(result);
            };
            reader.readAsDataURL(files[i]);
        }
        onFilesAdded(array);
        }
    };
    
    return (
      <div
        className={`file-input ${highlight ? "highlight" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          className="file-input__input"
          type="file"
          multiple
          onChange={handleFilesAdded}
        />
        {/* {preview && <img src={preview} alt="Preview" />} */}
        {/* <span className="file-input__text">Drag and drop files here</span> */}
      </div>
    );
}

export default MultiFileUpload