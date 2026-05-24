export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: NoteTag;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
