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
  onOpen?: () => void;
};

export function Combobox({
  value,
  onChange,
  options,
  loading = false,
  onSearch,
  onOpen,
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

  const handleOpen = () => {
    setOpen(true);

    if (query.trim().length === 0) onOpen?.();
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 ml-1">
        Desenvolvedora
      </label>

      <div className="flex items-center w-full bg-[#161827] border border-[#211f36] rounded-xl px-4 py-3 focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition-colors">
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleOpen}
          placeholder="Digite o nome da desenvolvedora..."
          className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
          autoComplete="off"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="mr-1 p-1 text-gray-500 hover:text-brand transition-colors outline-none"
            aria-label="Limpar campo"
          >
            <X size={16} />
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            if (open) {
              setOpen(false);
              return;
            }

            handleOpen();
          }}
          className="p-1 text-gray-500 hover:text-brand transition-colors outline-none"
          aria-label="Abrir opções"
        >
          <ChevronDown size={18} />
        </button>
      </div>

      {open && (
        <div className="absolute z-20 w-full mt-2 bg-[#161827] border border-[#211f36] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] max-h-48 overflow-auto custom-scrollbar">
          {loading ? (
            <p className="px-4 py-3 text-brand text-xs">Buscando...</p>
          ) : options.length === 0 ? (
            <p className="px-4 py-3 text-gray-400 text-xs">
              Nenhuma desenvolvedora encontrada
            </p>
          ) : (
            <ul className="w-full">
              {options.map((dev) => (
                <li
                  key={dev.id}
                  className="border-b border-[#211f36] last:border-0"
                >
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(dev);
                    }}
                    className="w-full text-left px-4 py-3 text-gray-300 hover:bg-[#211f36] hover:text-brand transition-colors focus:bg-[#211f36] focus:outline-none"
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
