/** SHA-256 hash for the flag */
export const FLAG_DIGEST = 'b854005d1b367e8a7f7812be38e87ea713ef27f7c5b03e0b1a2469bff6e952e3';

/** Write one channel's bit plane as opaque black and white pixels. */
export function bitPlane(source: Uint8ClampedArray, channel: number, bit: number) {
	const output = new Uint8ClampedArray(source.length);
	for (let i = 0; i < source.length; i += 4) {
		const value = ((source[i + channel] >> bit) & 1) * 255;
		output[i] = output[i + 1] = output[i + 2] = value;
		output[i + 3] = 255;
	}
	return output;
}

export async function checkFlag(value: string) {
	const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value.trim()));
	return (
		Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('') ===
		FLAG_DIGEST
	);
}
