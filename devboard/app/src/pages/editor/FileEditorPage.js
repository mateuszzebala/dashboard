import React from 'react'
import { TextEditor } from './editors/TextEditor'
import { ImageEditor } from './editors/ImageEditor'
import { VideoEditor } from './editors/VideoEditor'
import { useParams } from 'react-router'

export const FileEditorPage = () => {
    const { type } = useParams()

    return (
        <>
            {type.toLowerCase() === 'text' && <TextEditor />}
            {type.toLowerCase() === 'image' && <ImageEditor />}
            {type.toLowerCase() === 'video' && <VideoEditor />}
        </>
    )
}
