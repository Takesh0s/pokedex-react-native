export type NamedApiResource = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResource[];
};

export type PokemonDetailResponse = {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
    };
  };
  types: {
    slot: number;
    type: NamedApiResource;
  }[];
  cries: {
    latest: string | null;
    legacy: string | null;
  };
};

export type Pokemon = {
  id: number;
  name: string;
  imageUrl: string | null;
  types: string[];
  cryUrl: string | null;
};