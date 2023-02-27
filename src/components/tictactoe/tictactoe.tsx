import { $, component$,  useSignal, useStore, useStylesScoped$, useTask$ } from "@builder.io/qwik";
import type { State } from "~/routes";
import Winner, { getCharacter } from "../winner/winner";
import styles from './tictactoe.css?inline';

export const shuffleBoard = (board: number[]) => {
  for (let i = board.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = board[i];
    board[i] = board[j];
    board[j] = temp;
  }
  return board
}

export default component$((props: { state: State }) =>{
  useStylesScoped$(styles)

  const board = useSignal(shuffleBoard([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 9, 9]))
  const resolvedBoard = useSignal(['','','','','','','','','','','','','','','',''])
  const store = useStore({
    pair: []
  })

  const resetGame = $(() => {
    board.value = shuffleBoard(board.value)
    resolvedBoard.value = ['','','','','','','','','','','','','','','','']
    store.pair = []
  })

  const onCellClick = $((index: number) => {
      const controller = new AbortController();
      getCharacter(board.value[index], controller).then(res => {
        const tmpBoard = [...resolvedBoard.value]
        tmpBoard[index] = res.image
        resolvedBoard.value = [...tmpBoard]
        store.pair = [...store.pair, {'index': index, 'image': res.image}]
      })
  })

  useTask$(({track}) => {
    const pair = track(() => store.pair);
    
    if (pair.length === 2) {
      if (pair[0].image === pair[1].image) {
        store.pair = []
      }else{
        const tmpBoard = [...resolvedBoard.value]
        store.pair.forEach(p => tmpBoard[p.index] = '')
        resolvedBoard.value = [...tmpBoard]
        store.pair = []
      }
    } 
  })

  return (
    <div class="tictactoe">
        <h2>Are you ready {props.state.username}? Tic Tac Toe</h2>
          <div class="board">
          {resolvedBoard.value.every(cell => cell !== '') ? 
          <Winner winner="Rafa" /> : 
          (
            resolvedBoard.value.map((_, index) => 
            <div class="cell" onClick$={() => !resolvedBoard.value[index] ? onCellClick(index) : null}>
              {resolvedBoard.value[index] !== '' ? 
              (<img src={resolvedBoard.value[index]} />) :
              ('X')}
            </div>
          )
          )}
        </div>
        <button onClick$={resetGame}>
          Reset game
        </button>
    </div>
  )
})