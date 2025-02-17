import Dexie, { type EntityTable } from 'dexie';


interface Clip {
  title: string;
  article_link: string;
  publication: string;
  publication_date: string;
  authors: string[]
}

interface ClipFolder {
  id: number
  title: string;
  date: Date;
  clips: Clip[]
}

const db = new Dexie('ClipFolders') as Dexie & {
  clipFolders: EntityTable<
    ClipFolder,
    'id' 
  >;
};

// Schema declaration:
db.version(1).stores({
  clipFolders: '++id, title, clips, date' 
});

export type { Clip, ClipFolder };
export { db };