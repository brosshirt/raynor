


export async function linkToClipHTML(link) {
    try {
        const response = await fetch('http://127.0.0.1:5000/clip-format', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ article_link: link }),
        });
        
        const articleInfo = await response.json();
        return articleInfoToHTML(articleInfo);
    } catch (error) {
        console.error('Error fetching clip:', error);
        return 'Error fetching clip';
    }
}

function articleInfoToHTML(articleInfo){
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