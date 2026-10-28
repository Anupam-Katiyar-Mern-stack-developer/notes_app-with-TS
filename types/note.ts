export interface Note {
  id: number;
  title: string;
  content: string;
}

export interface NoteResponse {
  success: boolean;
  notes: Note[];
  message?: string;
}

export interface CreateNoteResponse {
  success:boolean;
  message:string;
  note?:Note;
}