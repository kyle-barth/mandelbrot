// so we can go zoomies
let zoom = 2.75;
let mandelResolution;

addEventListener('message', (e) => {
	let { imgData, mandelRes } = e.data;
	mandelResolution = mandelRes;

	// loop over imgData (pixels) to create mandelbrot
	for (let x = 0; x < imgData.width; x++) {
		for (let y = 0; y < imgData.height; y++) {
			let pxl = (x + y * imgData.width) * 4;

			const color = getPixelColor(x, y, imgData);
			imgData = setColor(imgData, pxl, color);
		}
	}

	// post result back to main thread
	postMessage(imgData);
});

function map(x, y, imgData) {
	// mandelbrot lives within the range of +-2 in x & y axis
	// calculate pixel equiv between 0-4
	let _x = (zoom / imgData.width) * x;
	let _y = (zoom / imgData.height) * y;

	// sub 2 so its in range +-2
	_x = _x - zoom / 2 - 3 / 4;
	_y = _y - zoom / 2;

	return [_x, _y];
}

// finds whether or not a given coord is in the set & how close it is
function getPixelColor(x, y, imgData) {
	let [_x, _y] = map(x, y, imgData);

	let i = 0;
	let cx = _x;
	let cy = _y;

	while (i < mandelResolution && _x + _y < 16) {
		let xx = _x * _x - _y * _y;
		let yy = 2 * _x * _y;
		_x = xx + cx;
		_y = yy + cy;

		i++;
	}

	if (i === mandelResolution) {
		i = 255;
	}

	return i;
}

function setColor(imgData, pxl, i) {
	imgData.data[pxl] = i;
	imgData.data[pxl + 1] = i;
	imgData.data[pxl + 2] = i;
	imgData.data[pxl + 3] = 255;

	return imgData;
}
