export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface ProductFormData {
  name: string;
  price: string;
  stock: string;
}

export interface PokemonAbility {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonAbility[];
}

export interface PokemonAbilityDetail {
  effect_entries: {
    effect: string;
    language: {
      name: string;
    };
  }[];
  name: string;
}
