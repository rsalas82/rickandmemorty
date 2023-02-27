import { component$, useStore } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Login from '~/components/login/login';
import Tictactoe from '~/components/tictactoe/tictactoe';

export interface State {
  username: string;
}

export default component$(() => {
  const store = useStore<State>({
    username: '',
  });


  return (
    <div>
      <h1>
        Welcome to TicTacToe Cathedral Software <span class="lightning">👻</span>
      </h1>
      <>
        {!store.username ? 
            (<Tictactoe state={store} />) : 
            (<Login state={store} />)}
      </>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to TicTacToe',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
