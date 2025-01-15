import React, { useState } from 'react';
import { getClip } from '../../logic/clipFormatter';
import ClipSearchBar from '../ClipSearchBar/ClipSearchBar'
import Clip from '../Clip/Clip'
import './ClipFormatter.css'

const ClipFormatter = () => {
    const [link, setLink] = useState('');
    const [clip, setClip] = useState()

    // const handleGenerateClip = async () => {
    //     const clipHTML = await linkToClipHTML(link);
    //     setLink("")
    //     setFormattedClipHTML(clipHTML);
    // };

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
        
        // <div className="ui">
            
        //     <div className="linkDisplay">
        //         <input 
        //             type="text" 
        //             placeholder="Link goes here"
        //             value={link}
        //             onChange={(e) => setLink(e.target.value)}
        //         />
        //         <button id="clipButton" onClick={handleGenerateClip}>Generate Clip</button>
        //         <button id="reportError" onClick={handleReportError}>Report Error</button>
        //     </div>
        //     <br />
        //     <br />
        //     <div className="clipDisplay">
        //         <span id="textToCopy" dangerouslySetInnerHTML={{ __html: formattedClipHTML }}></span>
        //         <button id="copyButton" onClick={handleCopy}>Copy</button>
        //     </div>
        // </div>
    );
};

export default ClipFormatter;
