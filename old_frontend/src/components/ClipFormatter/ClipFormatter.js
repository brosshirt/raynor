import React, { useState } from 'react';
import { getClip } from '../../logic/clipFormatter';
import ClipSearchBar from '../ClipSearchBar/ClipSearchBar'
import Clip from '../Clip/Clip'
import './ClipFormatter.css'

const ClipFormatter = () => {
    const [link, setLink] = useState('');
    const [clip, setClip] = useState()

    const generateClip = async () => {
        const clip = await getClip(link)
        setClip(clip)
        setLink("")
    }


    const handleReportError = async (clip, error_type) => {
        console.log('clip', clip)
        
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/error`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                error_type: error_type,
                publication: clip.publication,
                article_link: clip.article_link,
                error_message: ''
            })
        })

        const data = await res.json()

        console.log('backendResponse', data)
    }



    return (
        <div className='clipFormatter'>
            <ClipSearchBar link={link} setLink={setLink} generateClip={generateClip}/>
            <Clip clip={clip} reportError={handleReportError}/>
        </div>
    );
};

export default ClipFormatter;
