import { ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type DevOption = {
  id: string;
  nome: string;
};

type Props = {
  value: DevOption | null;
  onChange: (dev: DevOption | null) => void;
  options: DevOption[];
  loading?: boolean;
  onSearch: (term: string) => void;
};

export function DevCombobox({
  value,
  onChange,
  options,
  loading = false,
  onSearch,
}: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setQuery(value?.nome ?? "");
  }, [value]);

  useEffect(() => {
    const onOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setOpen(true);
    onSearch(value);
    onChange(null);
  };

  const handleSelect = (dev: DevOption) => {
    setQuery(dev.nome);
    onChange(dev);
    setOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    onChange(null);
    setOpen(false);
    onSearch("");
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="mb-2 block text-sm font-medium text-white">
        Desenvolvedora
      </label>

      <div className="flex h-11 items-center rounded-md border border-zinc-400 bg-white px-3 focus-within:border-blue-500">
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Digite o nome da desenvolvedora"
          className="flex-1 bg-transparent text-sm text-black outline-none"
          autoComplete="off"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="mr-1 p-1 text-zinc-500 hover:text-zinc-800"
            aria-label="Limpar campo"
          >
            <X size={16} />
          </button>
        )}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="p-1 text-zinc-600 hover:text-zinc-900"
          aria-label="Abrir opções"
        >
          <ChevronDown size={18} />
        </button>
      </div>

      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-md border border-zinc-300 bg-white shadow-lg">
          {loading ? (
            <p className="px-3 py-2 text-sm text-zinc-500">Buscando...</p>
          ) : options.length === 0 ? (
            <p className="px-3 py-2 text-sm text-zinc-500">
              Nenhuma desenvolvedora encontrada
            </p>
          ) : (
            <ul className="max-h-60 overflow-y-auto py-1">
              {options.map((dev) => (
                <li key={dev.id}>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(dev);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-zinc-800 hover:bg-zinc-100"
                  >
                    {dev.nome}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
