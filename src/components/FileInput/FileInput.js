import React, { useEffect, useRef, useState } from "react";
import { truncateString } from "../../commons/functions/commons";
import "./FileInput.scss";

const FileInput = ({ accept, multiple, onChange }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const inputRef = useRef(null);

    const handleChange = (e) => {
        if (e.target.files) {
            console.log(Array.from(e.target.files));
            setSelectedFiles(Array.from(e.target.files));
        }
        else {
            setSelectedFiles([]);
        }
        onChange(e);
    }

    return (
        <div className="file-input" {...{ [!!selectedFiles ? "data-file-selected" : ""]: "" }}>
            <label className="file-input__label">
                <i className="las la-cloud-upload-alt file-input__icon"></i>
                Select file!
                <input
                    multiple={multiple}
                    className="file-input__input"
                    accept={accept ? accept.join() : ""}
                    type="file"
                    id="file"
                    ref={inputRef}
                    onChange={handleChange}
                />
            </label>
            {
                selectedFiles.length > 0 &&
                selectedFiles.map((file, index) => (
                    <div key={index.toString()} className="file-input__file">
                        <i class="las la-file-image file-input__file__icon"></i>
                        <span className="file-input__file__name">{truncateString(file.name, 22)}</span>
                        <i class="las la-times"></i>
                    </div>
                ))
            }
        </div>
    )
}

export default FileInput;