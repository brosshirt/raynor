import { ArticleInfo } from "./types"

export async function getClip(link: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clip-format`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({article_link: link})
  })

  const clip = await response.json()

  if (clip.error){
    console.log('error response from backend on /clip-format', clip.error)
    throw new Error(clip.error)
  }

  return clip
}




export function articleInfoToHtml(articleInfo: ArticleInfo): { __html: string; }{
  
  
  console.log('articleInfoToHtml', articleInfo)
  const title = articleInfo.title;
  const publication = articleInfo.publication;
  const publicationDate = articleInfo.publication_date;
  const authors = articleInfo.authors.join(", ");
  const articleLink = articleInfo.article_link || "#"; // Assuming article_link is part of the JSON

  const clip = `
      <b><a style="color:blue; text-decoration: underline" href="${articleLink}">${title}</a> - ${publication} - ${publicationDate}</b><br>
      <i>By ${authors}</i>
  `;
  return {__html: clip};
}