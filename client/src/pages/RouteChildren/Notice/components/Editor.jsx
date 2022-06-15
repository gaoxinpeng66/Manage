import React, {useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
const Editors = (props) => {
    const [editorState, setEditorState] = useState("")
    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={(editorState) => setEditorState(editorState)}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            editorStyle={{
                border:'1px solid black',
                paddingLeft:'10px',
                lineHeight:'10px',
                height:'260px',
                overflow:'auto'
            }}
            onBlur={()=>{
                
                props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
            }}
        />

    )
}

export default Editors