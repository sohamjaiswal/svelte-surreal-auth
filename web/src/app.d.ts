import User from '$lib/types/User.type'
import type { Surreal } from 'surrealdb.js';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
// declare namespace App {
	// interface Locals {
	// 	surreal: Surreal;
	// 	user: User | undefined;
	// }
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
// }

declare global {
	namespace App {
		interface Locals {
			user: User | undefined;
			db: Surreal;
		}
	}
}
