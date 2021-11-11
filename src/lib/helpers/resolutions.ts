// the resolution of the canvas
export type Resolution = { name: string; w: number; h: number };
export const resolutions: Resolution[] = [
	{ name: '480p', w: 852, h: 480 },
	{ name: '720p', w: 1280, h: 720 },
	{ name: '1080p', w: 1920, h: 1080 },
	{ name: '1440p', w: 2560, h: 1440 },
	{ name: '4K', w: 3840, h: 2160 },
	{ name: '8K', w: 7680, h: 4320 },
	{ name: '16K', w: 15360, h: 8640 }
];
