import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import "./App.module.css";
import { useDebouncedCallback } from "use-debounce";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 500);
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент пошуку */}
        {/* Компонент пагінації */}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {/* Список нотаток */}
      {<NoteList notes={notes} /> }

      {/* Модальне вікно */}
      {{isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm />
        </Modal>
      )} */}
    </div>
  );
}

export default App;
