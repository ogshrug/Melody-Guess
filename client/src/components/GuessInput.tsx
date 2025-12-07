import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Song {
  id: string;
  title: string;
  artist: string;
}

interface GuessInputProps {
  songs: Song[];
  onSubmit: (songId: string) => void;
  disabled?: boolean;
}

export default function GuessInput({ songs, onSubmit, disabled }: GuessInputProps) {
  const [query, setQuery] = useState("");
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSongs = query.length > 0
    ? songs.filter(song => 
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelect = (song: Song) => {
    setSelectedSong(song);
    setQuery(song.title);
    setShowSuggestions(false);
  };

  const handleSubmit = () => {
    if (selectedSong) {
      onSubmit(selectedSong.id);
      setQuery("");
      setSelectedSong(null);
    }
  };

  const handleClear = () => {
    setQuery("");
    setSelectedSong(null);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-3">
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Know it? Search for the title"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedSong(null);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            disabled={disabled}
            className="pl-12 pr-10 h-14 rounded-full bg-card border-card-border text-base"
            data-testid="input-song-search"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              data-testid="button-clear-search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {showSuggestions && filteredSongs.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-popover-border rounded-lg shadow-lg overflow-hidden z-10">
            {filteredSongs.slice(0, 5).map((song) => (
              <button
                key={song.id}
                onClick={() => handleSelect(song)}
                className="w-full px-4 py-3 text-left hover-elevate flex flex-col gap-0.5"
                data-testid={`suggestion-${song.id}`}
              >
                <span className="text-sm font-medium text-foreground">{song.title}</span>
                <span className="text-xs text-muted-foreground">{song.artist}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!selectedSong || disabled}
        className="rounded-full"
        data-testid="button-submit-guess"
      >
        SUBMIT
      </Button>
    </div>
  );
}
