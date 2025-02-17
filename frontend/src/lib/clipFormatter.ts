import { ArticleInfo } from "./types"
import {db, Clip} from '@/db'

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




export function articleInfoToHtml(clip: Clip): { __html: string; }{
  
  
  const title = clip.title;
  const publication = clip.publication;
  const publicationDate = clip.publication_date;
  const authors = clip.authors.join(", ");
  const articleLink = clip.article_link || "#"; 

  const clipHtml = `
      <b><a style="color:blue; text-decoration: underline" href="${articleLink}">${title}</a> - ${publication} - ${publicationDate}</b><br>
      <i>By ${authors}</i>
  `;
  return {__html: clipHtml};
}