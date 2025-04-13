
import {Clip} from '@/db'

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

export function clipListToHtml(clips: Clip[]): {__html: string}{
  let html = ''

  for (const clip of clips){
    html += articleInfoToHtml(clip).__html
    html += '<br/> <br/>'
  }

  return {__html: html}
}



export function articleInfoToHtml(clip: Clip): { __html: string; }{
  const parser = new DOMParser()
  const dom = parser.parseFromString(clip.notesHtml, 'text/html')

  const title = clip.title;
  const publication = clip.publication;
  const publicationDate = clip.publication_date;
  const authors = clip.authors.join(", ");
  const articleLink = clip.article_link || "#"; 
  const notesHtml = dom.body.textContent?.trim() && dom.body.textContent !== 'undefined' ? clip.notesHtml : ''


  const clipHtml = `
  <b><a style="" target="_blank" href="${articleLink}">${title}</a> - ${publication} - ${publicationDate}</b><br>
  <i>By ${authors}</i>
  ${notesHtml}
  ${notesHtml && `<span style="width: 100%; display: grid; place-items:center;">***</span>`}
`;
  return {__html: clipHtml};
}