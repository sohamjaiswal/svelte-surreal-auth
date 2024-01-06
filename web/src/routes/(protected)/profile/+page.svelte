<script lang="ts">
</script>

<form method="post" action="?/uploadAvatar" enctype="multipart/form-data">
  <div class="group">
    <label for="avatar">Upload your profile picture</label>
    <input type="file" id="avatar" name="avatar" accept='image/*' required />
  </div>

  <button type="submit">Submit</button>
</form>