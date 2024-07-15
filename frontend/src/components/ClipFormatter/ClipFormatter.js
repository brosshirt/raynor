import React, { useState } from 'react';
import { linkToClipHTML } from '../../logic/clipFormatter';

const ClipFormatter = () => {
    const [link, setLink] = useState('');
    const [formattedClipHTML, setFormattedClipHTML] = useState('');

    const handleGenerateClip = async () => {
        const clipHTML = await linkToClipHTML(link);
        setLink("")
        setFormattedClipHTML(clip);
    };

    const handleCopy = () => {
        const clipboardItem = new ClipboardItem({ 
            'text/html': new Blob([formattedClip], { type: 'text/html' }),
            'text/plain': new Blob([formattedClip], { type: 'text/plain' })
        });
          
        navigator.clipboard.write([clipboardItem])
    };

    return (
        <div className="ui">
            <div className="linkDisplay">
                <input 
                    type="text" 
                    placeholder="Link goes here"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <button id="clipButton" onClick={handleGenerateClip}>Generate Clip</button>
            </div>
            <br />
            <br />
            <div className="clipDisplay">
                <span id="textToCopy" dangerouslySetInnerHTML={{ __html: formattedClipHTML }}></span>
                <button id="copyButton" onClick={handleCopy}>Copy</button>
            </div>
        </div>
    );
};

export default ClipFormatter;
