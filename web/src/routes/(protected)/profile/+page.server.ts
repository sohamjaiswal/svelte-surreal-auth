import { getPutAvatarUrl } from "$lib/minio";
import { error, fail, redirect } from "@sveltejs/kit";
import path from "path";
import { db } from '$lib/surreal';
import {PUBLIC_MEDIA_HOST_URL} from '$env/static/public'
import { User } from "$lib/types/User.type.js";
export const actions = {
  uploadAvatar: async({locals, request}) => {
    // get user
    const thisUser = locals.user
    if (!thisUser) {
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
    const url = await getPutAvatarUrl(thisUser.id+`_`+Date.now()+path.extname(avatar.name).toLowerCase())
    console.log(url)
    const res = await fetch(url, {
      method: 'PUT',
      body: avatar,
      headers: {
        'Content-Type': avatar.type,
        'Content-Length': `${avatar.size}`,
      },
    })
    if (!res.ok) {
      console.log('Error uploading file');
      return fail(400, { message: 'Error uploading file' });
    }
    // update user
    const extUrl = new URL(url)
    const replacementUrl = new URL(PUBLIC_MEDIA_HOST_URL)
    extUrl.protocol = replacementUrl.protocol
    extUrl.host = replacementUrl.host
    extUrl.port = replacementUrl.port
    extUrl.search = ''
    console.log(extUrl.toString())
    // set db record
    console.log(locals.user)
    // const result = await locals.db.merge<User, Pick<User, 'avatar_url'>>(thisUser.id, {avatar_url: extUrl.toString()}).catch((e) => console.log(e))
    const result = await locals.db.query<User[]>(`UPDATE $auth SET avatar_url = $url`, {url: extUrl.toString()}).catch((e) => console.log(e))
    console.log(result)
    return {success: true}
  },
	logout: async (event) => {
		event.locals.user = undefined;
		event.cookies.set('token', '', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: -1
		});

		await db.invalidate();
		throw redirect(303, '/');
	}
}