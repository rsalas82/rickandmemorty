import { component$, Resource, useResource$ } from "@builder.io/qwik";

export interface Character {
  image: string;
}


export default component$((props: { winner: string }) => {
  const reposResource = useResource$<any>(({ track, cleanup }) => {
    track(() => props.winner);
    const controller = new AbortController();
    cleanup(() => controller.abort());
    return getCharacter(Math.floor(Math.random() * 826), controller);
  });


  return (
    <div>
      <h2>The winner is HaHaHaHa</h2>
      <Resource
          value={reposResource}
          onPending={() => <>Loading...</>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={(character: Character) => {
            console.log(character)
            return <img src={character.image} />
          }
          }
        />
    </div>
  )
})

export async function getCharacter(
  character:number,
  controller?: AbortController
): Promise<Character> {
  const resp = await fetch(`https://rickandmortyapi.com/api/character/${character}`, {
    signal: controller?.signal,
  });
  console.log('FETCH resolved');
  const json = await resp.json();
  return json;
}