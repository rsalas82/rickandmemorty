import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import type { State } from "~/routes";
import styles from './login.css?inline';

export default component$((props: { state: State }) =>{
  useStylesScoped$(styles);

  const username = useSignal('');

  return (
    <div class="login">
        <h2>What's your name, little creature?</h2>
        <input type="text" name="username" value={username.value} 
          onInput$={(ev) => (username.value = (ev.target as HTMLInputElement).value)}/>
        <button onClick$={() => {
          props.state.username = username.value;
          console.log(props.state.username)
        }}>Access</button>
    </div>
  )
})