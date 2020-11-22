// warning hardcoded coordinates ahead
// want new jars? ez
// want to see more jars? so would I

var canvas = undefined;
var ctx = undefined;
var jarsrc = undefined;
var jar = undefined;
var jarctx = undefined;
var jarTop = 29;
var jarBase = 112;
var jarSelect = 0;
var selected = 0;
var selectedName = "";
var debug = false;
var jarColor = "#fff";// this pains me as a brit, but it stops me making typos elsewhere

var jars = {
	"Transformation": 0,
	"Vore": 0,
	"Inflation": 0,
	"Paw": 0,
	"Hyper": 0,
	"Muscle": 0,
	"Breeding": 0,
	"Macro/Micro": 0,
	"Pregnancy": 0,
	"Hypnosis": 0,
	"Cumplay": 0,
	"Bimboification": 0,
	"Musk": 0,
	"Sensory\nDeprivation": 0,
	"Teeth /\nMawplay": 0,
	"Drone": 0,
	"Maid": 0,
	"Oviposition": 0,
	"Plush /\nPooltoy": 0,
	"Latex": 0,
	"Petplay": 0,
	"Monsters": 0,
	"Stuffing": 0,
	"Denial /\nChastity": 0,
	"Growth": 0,
	"Weight Gain": 0,
	"Tentacles": 0,
	"Breathplay": 0,
	"Watersports": 0,
	"Bondage": 0,
	"Body Mods /\nPiecings": 0,
	"Magic": 0,
	"Milking": 0,
	"Torture": 0,
	"(Free Space)": 0
}

function drawJar(name, value, x, y, sel) {
	//ctx.fillStyle = "#ff0";//debug
	//ctx.fillRect(x+10, y+10, 100, 120);
	
	ctx.fillStyle = "#ccc";
	
	// fill
	if (value == 0) {
	} else if (value >= 1) {
		ctx.drawImage(jar, 200, 0, 100, 120, x+10, y+10, 100, 120);
	} else {
		ctx.drawImage(jar, 100, 0, 100, 120, x+10, y+10, 100, 120);
		ctx.fillRect(x+10, y+jarTop+10, 100, (1-value) * (jarBase-jarTop));
	}
	
	// outer
	ctx.drawImage(jar, 0, 0, 100, 120, x+10, y+10, 100, 120);
	
	if (sel)
		ctx.fillStyle = "#1a1afa";
	else
		ctx.fillStyle = "#1a1a1a";
	
	ctx.textAlign = "center";
	ctx.font = "16px Roboto";
	lines = name.split("\n");
	for (var l = 0; l < lines.length; l++) {
		ctx.fillText(lines[l], x+60, y+150+(20*l));
	}
	if (debug) {
		ctx.fillStyle = "#cccccc";
		ctx.fillRect(x+40, y+65, 40, 20)
		ctx.fillStyle = "#1a1a1a";
		ctx.fillText(value.toFixed(2), x+60, y+80);	
		ctx.strokeStyle = "#070";
		ctx.rect(x+10, y+10, 100, 120);
		ctx.stroke();
	}
}

function drawEverything() {
	
	ctx.fillStyle = "#cccccc";
	ctx.fillRect(0, 0, 900, 900);
	
	ctx.fillStyle = "#1a1a1a";
	ctx.font = "48px Roboto";
	ctx.textAlign = "start";
	ctx.fillText("Jar of Kinks", 20, 55);
	ctx.textAlign = "end";
	ctx.font = "18px Roboto";
	ctx.fillText("Create your own at codedcells.github.io/kinkjars", 880, 45);
	
	i = 0;
	for (var n in jars) {
		x = i % 7;
		y = Math.floor(i / 7);
		drawJar(n, jars[n], (x*120)+30, (y*160)+70, i == selected);
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

function init() {
	canvas = document.getElementById("jardisplay");
	ctx = canvas.getContext("2d");
	
	jarsrc = document.getElementById("jar-generic");
	jar = document.getElementById("jarmixer");
	jarctx = jar.getContext("2d");
	
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
		jars[n] = Math.random() * 1.2;
	}
	drawEverything();
}

function save(btn) {
	var tsel = selected;
	selected = -1
	drawEverything()
	btn.href = canvas.toDataURL('image/png');
    btn.download = "jars.png";
	selected = tsel;
	drawEverything()
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

function clickcanvas(e) {
	mouse = getMousePos(canvas, e);
	//console.log(mouse);
	
	//40, 100, 140, 220
	//160...
	//40, 300...
	
	jarx = Math.floor((mouse.x - 30) / 120);
	jarxf = (mouse.x - 30) % 160;
	
	jary = Math.floor((mouse.y - 60) / 150);
	jaryf = (mouse.y - 60) % 160
	
	if (jarx < 0 || jary < 0 || jarx > 7 || jary > 4) {
		selected = -1;
		drawEverything();
		selectedName = "joe";
		return;
		}
	
	selected = jarx + (jary * 7);
	i = 0;
	for (var n in jars) {
		if (selected == i) {
			selectedName = n;
			break;
		}
		i++
	}
	
	if (debug) console.log(selected, selectedName);
	
	//console.log("jar", jarx, jary)
	//console.log("sub", jarxf, jaryf);
	
	if (jaryf > 20 && jaryf < 140) {
		jars[selectedName] = (100 - (jaryf - 20)) / 80;
	}
	
	drawEverything();
}