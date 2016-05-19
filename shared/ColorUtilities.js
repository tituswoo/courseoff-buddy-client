export function RGBtoRGBA(rgb, opacity) {
	rgb = String(rgb)
	rgb = rgb.replace('rgb', 'rgba')
	let rgba = rgb.substr(0, rgb.indexOf(')')) + ',' + opacity + ')'
	return rgba
}
