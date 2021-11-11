import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const mandelRes: Writable<number> = writable(0);
