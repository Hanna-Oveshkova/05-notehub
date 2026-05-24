import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";
import Modal from "../Modal/Modal";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";

const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, 12, search),
    placeholderData: (prev) => prev,
  });

  return (
    <div className={css.app}>
      <header className={css.header}>
        <h1>NoteHub</h1>
        <button className={css.addButton} onClick={() => setIsModalOpen(true)}>
          + Add Note
        </button>
      </header>

      <input
        type="text"
        placeholder="Search notes..."
        className={css.search}
        onChange={(e) => debouncedSearch(e.target.value)}
      />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes.</p>}
      {data && <NoteList notes={data.notes} />}
      {data && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;
