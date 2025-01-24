export async function getClip(link) {
    console.log('getClip')

    console.log(process.env.REACT_APP_BACKEND_URL)

    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/clip-format`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({article_link: link})
        })

        const clip = await response.json()

        if (clip.error){
            throw new Error(clip.error)
        }
        return clip
    } catch(error){
        console.error('Error fetching clip:', error)
        return 'Error fetching clip: ' + error
    }
}


export function articleInfoToHTML(articleInfo){
    console.log('articleInfoToHtml', articleInfo)
    const title = articleInfo.title;
    const publication = articleInfo.publication;
    const publicationDate = articleInfo.publication_date;
    const authors = articleInfo.authors.join(", ");
    const articleLink = articleInfo.article_link || "#"; // Assuming article_link is part of the JSON

    const clip = `
        <b><a href="${articleLink}">${title}</a> - ${publication} - ${publicationDate}</b><br>
        <i>By ${authors}</i>
    `;
    return clip;
}