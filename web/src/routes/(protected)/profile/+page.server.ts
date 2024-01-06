import { getPutAvatarUrl } from "$lib/minio";
import { error, fail } from "@sveltejs/kit";
import path from "path";

export const actions = {
  uploadAvatar: async({locals, request}) => {
    // get user
    const user = locals.user
    if (!user) {
      throw error(401, 'Unauthorized')
    }
    // get file
    const form = await request.formData()
    const avatar = form.get('avatar') as File
    if (
      !(avatar).name ||
      (avatar).name === 'undefined'
    ) {
      return fail(400, {
        error: true,
        message: 'You must provide a file to upload'
      });
    }
    if (!avatar.type.startsWith('image/')) {
      console.log('File must be an image');
      return fail(400, { message: 'File must be an image' });
    }
    // // save file
    const url = await getPutAvatarUrl(user.id+path.extname(avatar.name))
    const res = await fetch(url, {
      method: 'PUT',
      body: avatar,
      headers: {
        'Content-Type': avatar.type,
        'Content-Length': `${avatar.size}`,
      },
    })
    console.log(res)
    // if (!res.ok) {
    //   throw error(500, 'Error uploading avatar')
    // }
    // // return success
    console.log('uploaded to', url)
    return {success: true}
  }
}