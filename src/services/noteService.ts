import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note } from "../types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  perPage: number,
  search?: string,
): Promise<FetchNotesResponse> {
  const response: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: { page, perPage, search },
  });
  return response.data;
}

export async function createNote(note: Omit<Note, "id">): Promise<Note> {
  const response: AxiosResponse<Note> = await api.post("/notes", note);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
}
