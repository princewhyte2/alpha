import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

interface Props {
  setEditorContent: (content: any) => void
  setTextEditor: (editor: any) => void
  initContent: any
}

const TiptapEditor = ({ setEditorContent, setTextEditor, initContent }: Props) => {
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

          return "Share something with your network"
        },
      }),
    ],
    content: initContent,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getJSON())
    },
    onCreate: ({ editor }) => {
      setTextEditor(editor)
    },
  })

  return <EditorContent editor={editorTiptap} />
}

export default TiptapEditor
