import { PAGE_SIZE, POKEAPI_BASE_URL } from '../config/api';
import {
  Pokemon,
  PokemonDetailResponse,
  PokemonListResponse,
} from '../types/pokemon';

export type PokemonPage = {
  pokemons: Pokemon[];
  hasMore: boolean;
};

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}: ${url}`);
  }

  return (await response.json()) as T;
}

function toPokemon(detail: PokemonDetailResponse): Pokemon {
  return {
    id: detail.id,
    name: detail.name,
    imageUrl:
      detail.sprites.other?.['official-artwork']?.front_default ??
      detail.sprites.front_default,
    types: [...detail.types]
      .sort((a, b) => a.slot - b.slot)
      .map((entry) => entry.type.name),
    cryUrl: detail.cries.latest ?? detail.cries.legacy,
  };
}

export async function fetchPokemonPage(offset: number): Promise<PokemonPage> {
  const list = await getJson<PokemonListResponse>(
    `${POKEAPI_BASE_URL}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
  );

  const details = await Promise.all(
    list.results.map((item) => getJson<PokemonDetailResponse>(item.url))
  );

  return {
    pokemons: details.map(toPokemon),
    hasMore: list.next !== null,
  };
}