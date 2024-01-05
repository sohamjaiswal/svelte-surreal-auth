<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { schema } from './schema';
  export let data: PageData;

  const { form, enhance, errors, message } = superForm(data.form, {
    validators: schema,
    taintedMessage: false
  });
</script>
<div class="flex justify-center items-center h-full">
  <div class="container h-full">
    <form class="flex flex-col gap-4 h-full items-center justify-center" method="post" use:enhance action="?/register">
      {#if $message}
        <p>{$message}</p>
      {/if}
      <div>
        <label for="username">Username</label>
        <input
          class:border-red-500={$errors.username}
          id="username"
          type="text"
          name="username"
          bind:value={$form.username}
          autocomplete="username"
          width={30}
          class="input"
        />
        {#if $errors.username}<span class="text-error-500">{$errors.username}</span>{/if}
      </div>
      <div>
        <label for="new-password">Password</label>
        <input
          class:border-red-500={$errors['new-password']}
          id="new-password"
          type="password"
          name="new-password"
          bind:value={$form['new-password']}
          autocomplete="new-password"
          class="input"
        />
        {#if $errors['new-password']}<span class="text-error-500">{$errors['new-password']}</span>{/if}
      </div>
      <button class="btn variant-filled-primary" type="submit">
        Login
      </button>
    </form>
  </div>
</div>