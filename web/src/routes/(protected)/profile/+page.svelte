<script lang="ts">
	import { page } from "$app/stores";
	import { Avatar } from "@skeletonlabs/skeleton";

  let fileInput: HTMLInputElement;

  let newImage = '';

  const onFileSelected =(e: any)=>{
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    
    reader.onload = (e: any) => {
      newImage = e.target.result;
    };
  }
</script>

<div class="flex justify-center">
  <div class="container">
    <div class="flex flex-col items-center h-full w-full gap-4">
      
      <form method="post" action="?/uploadAvatar" enctype="multipart/form-data" class="flex flex-col items-center gap-2">
        <label for="avatar">Change your profile picture</label>
        <div class="relative flex flex-col">
          <Avatar src={newImage == '' ? $page.data.user.avatar_url : newImage} width='w-28' />
          <div class="absolute bottom-8 -right-20">
            <button type="button" class="btn btn-icon variant-filled-surface rounded-full flex justify-center align-middle" on:click={()=>{fileInput.click();}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" class="bi bi-cloud-arrow-up-fill fill-token" viewBox="0 0 16 16">
                <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z"/>
              </svg>
            </button>
          </div>
        </div>
        <input type="file" id="avatar" name="avatar" accept='image/*' required on:change={(e)=>onFileSelected(e)} bind:this={fileInput} />
        <button type="submit">Submit</button>
      </form>
      
      <form method="POST" action="?/logout">
        <button type='submit' class="font:bold">Log out</button>
      </form>
    </div>
  </div>
</div>

<style lang="postcss">
  div {
    display: flex;
    position: relative;
    input {
      display: none;
    }
  }
</style>

