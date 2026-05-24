import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";
import Modal from "../Modal/Modal";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";

const App = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // debounce для пошуку
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1); // при новому пошуку повертаємось на першу сторінку
  }, 500);

  // запит нотаток
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, 12, search),
    placeholderData: (prev) => prev, // keepPreviousData у v5
  });

  return (
    <div className={css.app}>
      <header className={css.header}>
        <h1>NoteHub</h1>
        <button className={css.addButton} onClick={() => setIsModalOpen(true)}>
          + Add Note
        </button>
      </header>

      {/* ✅ Використовуємо SearchBox з пропом onSearch */}
      <SearchBox onSearch={debouncedSearch} />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes.</p>}
      {data && <NoteList notes={data.notes} />}

      {/* ✅ Пагінація тільки якщо сторінок більше ніж одна */}
      {data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages} // правильна назва пропа
          currentPage={page}
          onPageChange={(newPage: number) => setPage(newPage)}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {/* ✅ Використовуємо onClose замість onCancel */}
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;
