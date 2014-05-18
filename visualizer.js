function draw(data, canvas) {
	var scale = findScale(data.Track.Segments, 800, 500);
	var processingInstance = new Processing(
			canvas,
			function(processing) {
				processing.setup = function() {
					processing.size(800, 500, processing.P3D);
					processing.background(255);
					processing.stroke(0, 0, 0);
					processing.fill(255, 0, 0);
					for (var index = 0; index < data.Track.Segments.length; index++) {
						renderWall(processing, data.Track.Segments[index], 50,
								scale);
					}
					for (var index = 0; index < data.Track.Checkpoints.length; index++) {
						renderCheckpoint(processing, index+1,
								data.Track.Checkpoints[index], scale);
					}
					processing.stroke(0, 0, 0);
					processing.fill(0, 255, 0);
					renderGoal(processing, data.Track.Goal, scale);
				}
			});
}

function renderWall(processing, segment, h, scale) {
	// processing.pushMatrix();
	// var width = segment.Point2[0] - segment.Point1[0];
	// var height = segment.Point2[1] - segment.Point1[1];
	// processing.translate(segment.Point1[0] + (width / 2), segment.Point1[1] +
	// (height / 2));
	// processing.box(width, height, h);
	// processing.popMatrix();
	processing.line(segment.Point1[0] / scale, segment.Point1[1] / scale,
			segment.Point2[0] / scale, segment.Point2[1] / scale)
}

function renderGoal(processing, segment, scale) {
	patternLine(processing, segment.Point1[0] / scale, segment.Point1[1]
			/ scale, segment.Point2[0] / scale, segment.Point2[1] / scale, 10,
			true);
	var f = processing.createFont("Arial", 32, true);
	var x = segment.Point1[0] + ((segment.Point2[0] - segment.Point1[0]) / 2);
	var y = segment.Point1[1] + ((segment.Point2[1] - segment.Point1[1]) / 2);
	var f = processing.createFont("Arial", 32, true);
	processing.textFont(f, 32);
	processing.text("Start  Finish", x/scale-75, y/scale);
}

function renderCheckpoint(processing, num, segment, scale) {
	patternLine(processing, segment.Point1[0] / scale, segment.Point1[1]
			/ scale, segment.Point2[0] / scale, segment.Point2[1] / scale, 6,
			false);
	var x = segment.Point1[0] + ((segment.Point2[0] - segment.Point1[0]) / 2);
	var y = segment.Point1[1] + ((segment.Point2[1] - segment.Point1[1]) / 2);
	var f = processing.createFont("Arial", 32, true);
	processing.textFont(f, 32);
	processing.text(num, x/scale, y/scale);
}

function patternLine(processing, x1, y1, x2, y2, len, drawLines) {
	for (var i = 1; i <= len - 1; i++) {
		var x = processing.lerp(x1, x2, i / len);
		var y = processing.lerp(y1, y2, i / len);
		processing.line(x - len / 2, y - len / 2, x + len / 2, y + len / 2);
	}
	if (x1 == x2 && drawLines) {
		processing.line(x1 + len / 2, y1, x2 + len / 2, y2);
		processing.line(x1 - len / 2, y1, x2 - len / 2, y2);
	} else if (drawLines) {
		processing.line(x1, y1 + len / 2, x2, y2 + len / 2);
		processing.line(x1, y1 - len / 2, x2, y2 - len / 2);
	}
}

function findScale(segments, width, height) {
	var x = 0;
	for (var index = 0; index < segments.length; index++) {
		x = Math.max(x, segments[index].Point1[0]);
		x = Math.max(x, segments[index].Point1[1]);
		x = Math.max(x, segments[index].Point2[0]);
		x = Math.max(x, segments[index].Point2[1]);
	}
	return (x / Math.min(width, height)) / 1.5;
}
