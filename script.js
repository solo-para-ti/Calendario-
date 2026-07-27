var canvas;
var stage;
var container;
var captureContainers;
var captureIndex;

function init() {
  canvas = document.getElementById("testCanvas");
  stage = new createjs.Stage(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var w = canvas.width;
  var h = canvas.height;

  container = new createjs.Container();
  stage.addChild(container);

  captureContainers = [];
  captureIndex = 0;

		for (var i = 0; i < 20; i++) {
			var heart = new createjs.Shape();
			heart.graphics.beginFill(createjs.Graphics.getHSL(Math.random() * 30 - 45, 100, 50 + Math.random() * 30));
			heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10).curveTo(16, 0, 0, 12);
			heart.graphics.curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20).curveTo(-1, -20, 0, -12);
			heart.y = -100;

			container.addChild(heart);
		}

  var palabras = ["Garo", "Gallian", "Aho", "Buen9", "Diermo", "Uju.", "Sorsa", "Ajajaja7", "Ais", "Salr", "Ujun", "<Y", "Ezr", "Mao", "Pintos", "Algov", "Polítici", "Esoi", "Ciegob", "Ujam", "JAJAJAJ@", "Qur", "AJJAJAJAJAJAJAJ@", "A burnop", "Ay ay", "Mal9", "Focking", "Nonino", "Ske", "Totuga", "Estudee", "Cocholate", "Burno", "Esi", "Pingües", "Suenas conmigo", "Ajan", "Sev", "Qur", "Lanta", "Mrico", "Cuent", "Pelosb", "Emp", "Burnop", "Vovler", "Uyyt", "Tal ces", "JAajajjaja", "Nanananananan", "Digitod", "Udlos", "Najajajajajaj", "Pode", "Norias", "Nosa", "Mil tenas", "A ti ta", "Gago", "Versad", "Oswa", "Que perez", "Eso sw", "Tubería", "Erabe", "Baso", "Tenga de", "Pues so", "Escla9", "Desactive", "Historiaz", "Qje", "Nonon9", "Lelgue", "Pues mo", "Usj", "Entem", "Esl", "Curio", "Espery", "Somo", "Paos", "Binito"];
  var palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)];

  var tamanoFuente = Math.max(16, Math.min(28, Math.round(w / 14)));
  var text = new createjs.Text("La nueva palabra del día es:\n" + palabraAleatoria, "bold " + tamanoFuente + "px Arial", "#fff");
  text.textAlign = "center";
  text.x = w / 2;
  text.y = h / 2 - text.getMeasuredLineHeight();
  text.lineWidth = w * 0.9;
  stage.addChild(text);

  for (i = 0; i < 40; i++) {
    var captureContainer = new createjs.Container();
    captureContainer.cache(0, 0, w, h);
    captureContainers.push(captureContainer);
  }

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.on("tick", tick);

  var audio = document.getElementById("miCancion");
  document.addEventListener("touchstart", function () {
    audio.play();
  }, { once: true });
  document.addEventListener("click", function () {
    audio.play();
  }, { once: true });
}

function tick(event) {
  var w = canvas.width;
  var h = canvas.height;
  var l = container.numChildren;

  captureIndex = (captureIndex + 1) % captureContainers.length;
  stage.removeChildAt(0);
  var captureContainer = captureContainers[captureIndex];
  stage.addChildAt(captureContainer, 0);
  captureContainer.addChild(container);

		for (var i = 0; i < l; i++) {
			var heart = container.getChildAt(i);
			if (heart.y < -50) {
				heart._x = Math.random() * w;
				heart.y = h * (1 + Math.random()) + 50;
				heart.perX = (1 + Math.random() * 2) * h;
				heart.offX = Math.random() * h;
				heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
				heart.velY = -Math.random() * 0.8 - 0.4;
				heart.scale = Math.random() * 2 + 1;
				heart._rotation = Math.random() * 40 - 20;
				heart.alpha = Math.random() * 0.75 + 0.05;
				heart.compositeOperation = Math.random() < 0.33 ? "lighter" : "source-over";
			}
			var int = (heart.offX + heart.y) / heart.perX * Math.PI * 2;
			heart.y += heart.velY * heart.scaleX / 2;
			heart.x = heart._x + Math.cos(int) * heart.ampX;
			heart.rotation = heart._rotation + Math.sin(int) * 30;
		}

  captureContainer.updateCache("source-over");

  stage.update(event);
}

init();
