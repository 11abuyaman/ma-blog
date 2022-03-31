import React, { useEffect, useRef, useState } from "react";
import { MetaTags } from "react-meta-tags";
import Editor from "../../components/TextEditor/TextEditor";
// import "./PostDetails.scss";

const PostEditor = ({ }) => {

    return (
        <>
            <MetaTags>
                <title>Da'Recipe </title>
                {/* <meta name="description" content={truncateString(postData.body, 160)} /> */}
            </MetaTags>
            <div className="sidebar-1">
                <div className="sidebar-1__inner">
                </div>
            </div>
            <div className="main">
                <Editor />
            </div>
        </>
    )
}

export default PostEditor;