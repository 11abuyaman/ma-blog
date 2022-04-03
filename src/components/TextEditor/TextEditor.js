import React from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import './TextEditor.scss'


const TextEditor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: `<h1>hi</h1>`,
    })

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}

export default TextEditor;