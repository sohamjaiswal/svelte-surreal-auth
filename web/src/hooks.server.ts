import { logout } from "$lib/logout";
import { db } from "$lib/surreal";
import type { User } from "$lib/types/User.type";
import { error } from "@sveltejs/kit";

export const handle = async ({ event, resolve }) => {
  const {cookies} = event;

  const token = cookies.get('token'); // Get token from cookie.

  if (token) {
    const authenticated = await db.authenticate(token).catch(async (err: Error) => {
			console.log(`Error: ${err.message}. Session invalidation.`);
			// If something wrong with token - invalidate session client side, server side and in SurrealDB.
			await logout(event);
		});
		if (authenticated) {
			// Get authenticated user info and add it to request
			if (!event.locals.user) {
				const user = (await db.info().catch((err: Error) => {
					console.log(`error: ${err.message}`);
					throw error(500, 'Something wrong with database connection.');
				})) as User;
				event.locals.user = user;
			}
		} else {
			// If not authenticated - invalidate session client side, server side and in SurrealDB.
			await logout(event);
		}
  }

  return resolve(event);
}