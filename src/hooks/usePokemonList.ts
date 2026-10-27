import { useCallback, useEffect, useRef, useState } from 'react';
import { PAGE_SIZE } from '../config/api';
import { fetchPokemonPage } from '../services/pokeApi';
import { Pokemon } from '../types/pokemon';

export function usePokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const offsetRef = useRef(0);
  const isFetchingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) {
      return;
    }

    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const page = await fetchPokemonPage(offsetRef.current);
      setPokemons((current) => [...current, ...page.pokemons]);
      offsetRef.current += PAGE_SIZE;
      setHasMore(page.hasMore);
    } catch {
      setError('Não foi possível carregar os Pokémon.');
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  }, [hasMore]);

  useEffect(() => {
    loadMore();
  }, []);

  return { pokemons, loading, error, hasMore, loadMore };
}