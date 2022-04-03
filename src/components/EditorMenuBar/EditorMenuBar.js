import react from 'react';
import "./EditorMenuBar.scss";

const MenuBarButton = ({ onClick, label, icon, isActive }) => {
    return (
        <button
            onClick={onClick}
            title={label}
            className={`menu-bar__btn ${isActive ? 'active' : ''}`}
        >
            {icon}
        </button>
    )
};

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null
    }

    const menuButtons = [
        {
            label: 'Bold',
            isActive: editor.isActive('bold'),
            onClick: () => editor.chain().focus().toggleBold().run(),
            icon: <i class="las la-bold"></i>
        },
        {
            label: 'Italic',
            isActive: editor.isActive('italic'),
            onClick: () => editor.chain().focus().toggleItalic().run(),
            icon: <i class="las la-italic"></i>
        },
        {
            label: 'Strikethrough',
            isActive: editor.isActive('strike'),
            onClick: () => editor.chain().focus().toggleStrike().run(),
            icon: <i class="las la-strikethrough"></i>
        },
        {
            label: 'Code',
            isActive: editor.isActive('codeBlock'),
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
            icon: <i class="las la-code"></i>
        },
        {
            label: 'Blockquote',
            isActive: editor.isActive('blockquote'),
            onClick: () => editor.chain().focus().toggleBlockquote().run(),
            icon: <i class="las la-quote-left"></i>
        },
        {
            label: 'Bulleted List',
            isActive: editor.isActive('bulleted-list'),
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            icon: <i class="las la-list-ul"></i>
        },
        {
            label: 'Numbered List',
            isActive: editor.isActive('numbered-list'),
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            icon: <i class="las la-list-ol"></i>
        },

        {
            label: 'Horizontal Rule',
            isActive: editor.isActive('horizontal-rule'),
            onClick:() =>  editor.chain().focus().setHorizontalRule().run(),
            icon: <i class="las la-minus"></i>
        },
        {
            label: 'Clear Formatting',
            onClick:() =>  editor.chain().focus().unsetAllMarks().run(),
            icon: <i class="las la-eraser"></i>
        },
        {
            label: 'Undo',
            isActive: editor.isActive('undo'),
            onClick: () => editor.chain().focus().undo().run(),
            icon: <i class="las la-undo"></i>
        },
        {
            label: 'Redo',
            isActive: editor.isActive('redo'),
            onClick:() =>  editor.chain().focus().redo().run(),
            icon: <i class="las la-redo"></i>
        }
    ];

    return (
        <div className='menu-bar'>
            {
                menuButtons.map((btn, index) =>
                    <MenuBarButton
                        key={index.toString()}
                        {...btn}
                    />
                )
            }

        </div>
    )
}

export default MenuBar;