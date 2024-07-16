




export async function linkToClipHTML(link) {
    try {
        const response = await fetch('/clip-format', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ article_link: link }),
        });
        
        const articleInfo = await response.json();

        if (articleInfo.error){
            console.error("Backend error: " + articleInfo.error)
            return "Backend error"
        }
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