import React, { useEffect, useRef, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from "../../components/EditorMenuBar/EditorMenuBar";
import Button from "../../components/Button/Button";
import axios from "axios";
import { API_BASE_URL } from "../../commons/functions/commons";
import Document from '@tiptap/extension-document';
import Placeholder from '@tiptap/extension-placeholder';
import "./PostEditor.scss";
import CodeBlock from "@tiptap/extension-code-block";

const CustomDocument = Document.extend({
    content: 'heading block*',
});

const PostEditor = () => {
    const editor = useEditor({
        editorProps: {
            attributes: {
                class: 'editor'
            }
        },
        extensions: [
            CustomDocument,
            StarterKit.configure({
                document: false,
            }),
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'heading') {
                        return 'What’s the title?'
                    }
                    return 'Can you add some further context?'
                },
            }),
            CodeBlock.configure({
                HTMLAttributes: {
                    class: "editor-code-block",
                },
                languageClassPrefix: 'language-',
            })
        ],
    });

    const createPost = async () => {
        const jsonOutput = editor.getJSON();
        const htmlOutput = editor.getHTML();
        console.log(jsonOutput);
        editor.commands.setContent(jsonOutput);

        try {
            let formdata = new FormData();
            formdata.append("title", "test");
            formdata.append("body", htmlOutput);
            formdata.append("category", "624556696a76fb8e47ae7d27");

            let result = await axios({
                method: "post",
                url: `${API_BASE_URL}/posts/new/`,
                data: formdata,
                headers: { "Content-Type": "multipart/form-data" },
            });
            // console.log(await result.statusText());
        } catch (error) {
            console.error(`**ERR:createPost ${error}`);
        }
    }



    return (
        <>
            <MetaTags>
                <title>Da'Recipe | Add new post</title>
                {/* <meta name="description" content={truncateString(postData.body, 160)} /> */}
            </MetaTags>
            <div className="sidebar-1">
                <div className="sidebar-1__inner">
                    <section>
                        <Button label={"Create"} onClick={createPost} />
                    </section>
                </div>
            </div>
            <div className="main post-editor">
                <div className="text-editor">
                    <MenuBar editor={editor} />
                    <EditorContent editor={editor} />
                </div>
            </div>
        </>
    )
}

export default PostEditor;