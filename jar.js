// warning hardcoded coordinates ahead
// want new jars? ez
// want to see more jars? so would I

canvas = document.getElementById("jardisplay");
	canvas.addEventListener( 'mousemove', function( event ) {
  if( event.offsetX ){
    mouseX = event.offsetX;
    mouseY = event.offsetY;
  } else {
    mouseX = event.pageX - event.target.offsetLeft;
    mouseY = event.pageY - event.target.offsetTop;
  }
  // call the draw function
  mouseMove();
}, false );

var ctx = undefined;
var jarsrc = undefined;
var jar = undefined;
var jarctx = undefined;
var jarTop = 20;
var jarBase = 112;
var selected = -1;
var debug = false;
var jarColor = "#fff";// this pains me as a brit, but it stops me making typos elsewhere
var mouseX = 0;
var mouseY = 0;
var hoverlast = -1;

var jars = [
	["Transformation", 0], 
	["Vore", 0], 
	["Inflation", 0], 
	["Paw", 0], 
	["Hyper", 0], 
	["Muscle", 0], 
	["Breeding", 0], 
	["Macro/Micro", 0], 
	["Pregnancy", 0], 
	["Hypnosis", 0], 
	["Cumplay", 0], 
	["Bimboification", 0], 
	["Musk", 0], 
	["Sensory\nDeprivation", 0], 
	["Teeth /\nMawplay", 0], 
	["Drone", 0], 
	["Maid", 0], 
	["Oviposition", 0], 
	["Plush /\nPooltoy", 0], 
	["Latex", 0], 
	["Petplay", 0], 
	["Monsters", 0], 
	["Stuffing", 0], 
	["Denial /\nChastity", 0], 
	["Growth", 0], 
	["Weight Gain", 0], 
	["Tentacles", 0], 
	["Breathplay", 0], 
	["Watersports", 0], 
	["Bondage", 0], 
	["Body Mods /\nPiecings", 0], 
	["Magic", 0], 
	["Milking", 0], 
	["Torture", 0], 
	["(Free Space)", 0]
];

function drawJar(name, value, gridI, sel) {
	
	posX = (gridI % 7) * 120 + 30
	posY = Math.floor(gridI / 7) * 160 + 70
	
	//ctx.fillStyle = "#cccccc";
	//ctx.fillRect(posX+10, posY, 105, 130);
	
	//ctx.fillStyle = "#ff0";//debug
	//ctx.fillRect(posX + 10, posY + 10, 100, 120);
	
	ctx.fillStyle = "#cccccc";
	
	// fill
	if (value == 0) {
	} else if (value >= 1) {
		ctx.drawImage(jar, 200, 0, 100, 120, posX + 10, posY + 10, 100, 120);
	} else {
		ctx.drawImage(jar, 100, 0, 100, 120, posX + 10, posY + 10, 100, 120);
		// borked pls fix
		height = (1 - value) * (jarBase - jarTop) + jarTop;
		height = Math.min(height, 120) - jarTop;
		ctx.fillRect(posX + 10, posY + jarTop + 10, 100, height);
	}
	
	// outer
	ctx.drawImage(jar, 0, 0, 100, 120, posX + 10, posY + 10, 100, 120);
	
	if (sel)
		ctx.fillStyle = "#1a1afa";
	else
		ctx.fillStyle = "#1a1a1a";
	
	ctx.textAlign = "center";
	ctx.font = "16px Roboto";
	lines = name.split("\n");
	for (var l = 0; l < lines.length; l++) {
		ctx.fillText(lines[l], posX + 60, posY + 150 + (20 * l));
	}
	
	if (debug) {
		ctx.beginPath();
		ctx.fillStyle = "#cccccc";
		ctx.fillRect(posX + 40, posY + 65, 40, 20)
		ctx.fillStyle = "#1a1a1a";
		ctx.fillText(value.toFixed(2), posX + 60, posY + 80);	
		ctx.strokeStyle = "#070";
		ctx.rect(posX + 10, posY + 10, 100, 120);
		ctx.stroke();
	}
	
	if (sel) {
		ctx.strokeStyle = "#f00";
		ctx.beginPath();
		ctx.moveTo(posX + 102, posY + 12);
		ctx.lineTo(posX + 108, posY + 18);
		
		ctx.moveTo(posX + 108, posY + 12);
		ctx.lineTo(posX + 102, posY + 18);
		ctx.stroke();
	}
}

function drawEverything() {
	
	ctx.fillStyle = "#cccccc";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	ctx.fillStyle = "#1a1a1a";
	ctx.font = "48px Roboto";
	ctx.textAlign = "start";
	ctx.fillText("Jar of Kinks", 20, 55);
	ctx.textAlign = "end";
	ctx.font = "18px Roboto";
	ctx.fillText("Create your own at codedcells.github.io/kinkjars", 880, 45);
	
	i = 0;
	for (var n in jars) {
		drawJar(jars[i][0], jars[i][1], i, i == selected);
		i++;
	}
}

function setJarFill(color) {
	// some ppl think i'm bonkers
	// but i just think i'm free
	// ...
	// free of having to do this again
	jarctx.globalCompositeOperation = "source-over";
	jarctx.clearRect(0, 0, 300, 120);
	
	ctx.clearRect(0, 0, 100, 120);
	ctx.fillStyle = color;
	ctx.fillRect(100, 0, 200, 120)
	
	ctx.globalCompositeOperation = "multiply";
	ctx.drawImage(jarsrc, 0, 0);
	
	jarctx.fillStyle = "#fff";
	jarctx.fillRect(100, 0, 200, 120);
	jarctx.globalCompositeOperation = "difference";
	jarctx.drawImage(jarsrc, 0, 0);
	
	jarctx.fillStyle = "#cccccc";
	jarctx.globalCompositeOperation = "multiply";
	jarctx.drawImage(jar, 0, 0);
	//jarctx.drawImage(jar, 0, 0);
	//jarctx.drawImage(jar, 0, 0);
	//jarctx.drawImage(jar, 0, 0);
	jarctx.fillRect(100, 0, 200, 120);
	
	jarctx.globalCompositeOperation = "screen";
	jarctx.drawImage(canvas, 0, 0);
	ctx.globalCompositeOperation = "source-over";
	jarctx.globalCompositeOperation = "source-over";
}

function magicFill(a) {
	setJarFill(a.value);
	drawEverything();
}

function magicJar(a) {
	jarsrc = document.getElementById(a.value);
	jar = document.getElementById("jarmixer");
	jarctx = jar.getContext("2d");
	
	setJarFill(jarColor);
	drawEverything();
}

function mouseMove() {
	[selected, jarxf, jaryf] = whichJar(mouseX, mouseY);
	if (selected < 0 || selected >= jars.length) {return;}
	
	if (hoverlast != selected && hoverlast > -1) {
		if (hoverlast >= jars.length) hoverlast = selected;
		drawJar("", jars[hoverlast][1], hoverlast, selected==hoverlast);
	}
	
	fill = fillLevel(jaryf);
	if (fill[0] && jarxf > 10 && jarxf < 110) drawJar("", fill[1], selected, true);
	
	if (debug) {
		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, 50, 50);
		ctx.fillStyle = "#333";
		ctx.fillText(jarxf, 25, 20);
		ctx.fillText(jaryf, 25, 40);
	}
	hoverlast = selected;
}

function init() {
	
	ctx = canvas.getContext("2d");
	
	jarsrc = document.getElementById("jar-generic");
	jar = document.getElementById("jarmixer");
	jarctx = jar.getContext("2d");
	
	randomfill()
	
	setJarFill(jarColor);
	drawEverything();
}

function HSLToHex(h,s,l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

function randomcolor() {
	jarColor = "#fff";
	h = Math.random() * 360;
	s = Math.random() * 100;
	l = Math.round(Math.random() * 3) * 33.3;
	l = Math.max(15, l);
	hsl = "hsl(" + h + ", " + s + "%, " + l + "%)";
	jarColor = HSLToHex(h, s, l);
	setJarFill(jarColor);
	
	document.getElementById("jarcolor").value = jarColor;
	drawEverything();
}

function randomfill() {
	for (var n in jars) {
		jars[n][1] = Math.random() * 1.2;
	}
	drawEverything();
}

function  getMousePos(canvas, evt) {
	// copied from https://stackoverflow.com/questions/17130395
	// get the accurate* position of the cursor on a scaled canvas
	// had to add 45 to both x and y for some reason
	var rect = canvas.getBoundingClientRect(), // abs. size of element
		scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
		scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
	
	return {
		x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
		y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
	}
}

function whichJar(x, y) {
	
	jarx = Math.floor((x - 30) / 120);
	jarxf = (x - 30) % 120;
	
	jary = Math.floor((y - 60) / 160);
	jaryf = (y - 60) % 160
	
	if (x < 30 || x > 870) {return [-1, jarxf, jaryf]}
	
	return [jarx + (jary * 7), jarxf, jaryf];
}

function fillLevel(jaryf) {
	return [jaryf > 20 && jaryf < 140, (100 - (jaryf - 20)) / 80];
}

function clickcanvas(e) {
	mouse = getMousePos(canvas, e);
	[selected, jarxf, jaryf] = whichJar(mouse.x, mouse.y);
	
	if (debug) console.log("clicked", selected);
	if (selected < 0 || selected >= jars.length) {
		selected = -1;
		return;
	}
	
	console.log(jarxf, jaryf);
	
	if (20 < jaryf && jaryf < 30) {
		if (100 < jarxf && jarxf < 110) {
			// remove the jar
			jars.splice(selected, 1);
			selected = -1;
			
			newheight = Math.ceil(jars.length / 7) * 160 + 100;
			canvas.height = newheight;
		}
	} else {
		fill = fillLevel(jaryf);
		if (fill[0] && jarxf > 10 && jarxf < 110) {
			jars[selected][1] = fill[1];
		}
	}
	
	drawEverything();
	mouseMove();
}

function addPrompt() {
	jarname = prompt("Name the jar:");
	if (jarname != undefined && jarname != "") {
		jars.push([jarname, 0]);
		
		newheight = Math.ceil(jars.length / 7) * 160 + 100;
		canvas.height = newheight;
		drawEverything();
	}
}