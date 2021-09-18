import { pipe } from "fp-ts/lib/pipeable";
import { identity } from "fp-ts/lib/function";
import { data } from "../data/pokemons";
import { toConnection } from "../functions";
import { Connection } from "../types";

interface Pokemon {
  id: string;
  name: string;
  classification: string;
  types: string[];
}

export function query(args: {
  type: string;
}): Connection<Pokemon> {
  const { type } = args;

  const filterByType: (as: Pokemon[]) => Pokemon[] =
    type === undefined
      ? identity
      : as =>
        pipe(
          as.filter(a => a.types.includes(type))
        );

  const results: Pokemon[] = pipe(
    data,
    filterByType
  );
  return toConnection(results, Infinity);
}
