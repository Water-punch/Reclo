import React, { useState } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
//imageResize 추가할 것

const ContentWriteForm = () => {

  const [content, setContent] = useState('')

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
    // ImageResize: { modules: ['Resize'] },
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return (
    <ReactQuill
      theme='snow'
      modules={modules}
      formats={formats}
      onChange={setContent}
      style={{width: '100%'}}
    />
  )
}

export default ContentWriteForm