import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

interface Props {
  setEditorContent?: (content: any) => void
  setTextEditor: (editor: any) => void
  initContent: any
  placeholder?: string
}

const TiptapEditor = ({
  setEditorContent,
  setTextEditor,
  initContent,
  placeholder = "Share something with your network",
}: Props) => {
  const editorTiptap = useEditor({
    editorProps: {
      attributes: {
        class: "editor",
      },
    },
    extensions: [
      StarterKit,
      Link.configure({
        protocols: ["ftp"],
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?"
          }

          return placeholder
        },
      }),
    ],
    content: initContent,
    onUpdate: ({ editor }) => {
      setEditorContent ? setEditorContent(editor.getJSON()) : null
    },
    onCreate: ({ editor }) => {
      setTextEditor(editor)
    },
  })

  return <EditorContent editor={editorTiptap} />
}

export default TiptapEditor
