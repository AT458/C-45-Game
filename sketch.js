var container, containerImg;
var score = 0;
var appleImg, appleX, appleGroup;
var orangeImg, orangeX, orangeGroup;
var bombImg, bombX, bombGroup;
var gameState = 0;
var backgroundImg;
var explosionSound;
var gameOver, gameOverImg;
var restart, restartImg;
var bananaImg, bananaX, bananaGroup;
var melonImg, melonX, melonGroup;

function preload() {
	containerImg = loadImage("Images/Container.png");
	appleImg = loadImage("Images/Apple.png");
	orangeImg = loadImage("Images/Orange.png");
	bombImg = loadImage("Images/Bomb.png");
	backgroundImg = loadImage("Images/Background.jpg");
	gameOverImg = loadImage("Images/Game Over.png");
	restartImg = loadImage("Images/Reset Button.png");
	bananaImg = loadImage("Images/Banana.png");
	melonImg = loadImage("Images/Melon.png");

	explosionSound = loadSound("Sounds/Explosion.mp3");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	container = createSprite(windowWidth/2, windowHeight/2 + 320, 20, 20);
	container.addImage("container", containerImg);
	container.scale = 0.25;

	gameOver = createSprite(windowWidth/2, windowHeight/2, 20, 20);
	gameOver.addImage("gameOver", gameOverImg);

	restart = createSprite(windowWidth/2, windowHeight/2 - 200, 20, 20);
	restart.addImage("restart", restartImg);

	appleGroup = new Group();
	orangeGroup = new Group();
	bombGroup = new Group();
	bananaGroup = new Group();
	melonGroup = new Group();
}

function draw() {
	background(backgroundImg);

	if (keyDown("left")) {
		container.x = container.x - 5;
	}
	if (keyDown("right")) {
		container.x = container.x + 5;
	}

	fill(220);
	textSize(30);
	text("Score: " + score, windowWidth/2 + 700, windowHeight/2 - 350);

	if (gameState === 0) {
		gameOver.visible = false;
		restart.visible = false;

		spawnApples();
		appleX = Math.round(random(30, 1500));
		if (appleGroup.isTouching(container)) {
			score = score + 1;
			appleGroup.destroyEach();
			spawnQuickApples();
		}

		spawnOranges();
		orangeX = Math.round(random(30, 1500));
		if (orangeGroup.isTouching(container)) {
			score = score + 3;
			orangeGroup.destroyEach();
			spawnQuickOranges();
		}

		spawnBombs();
		bombX = Math.round(random(30, 1500));
		if (bombGroup.isTouching(container)) {
			gameState = 1;
			explosionSound.play();
		}

		spawnBananas();
		bananaX = Math.round(random(30, 1500));
		if (bananaGroup.isTouching(container)) {
			score = score + 2;
			bananaGroup.destroyEach();
			spawnQuickBananas();
		}

		spawnMelons();
		melonX = Math.round(random(30, 1500));
		if (melonGroup.isTouching(container)) {
			score = score + 4;
			melonGroup.destroyEach();
			spawnQuickMelons();
		}

		container.visible = true;
	}

	if (gameState === 1) {
		container.visible = false;
		gameOver.visible = true;
		restart.visible = true;

		if (mousePressedOver(restart) && mouseDown("left")) {
			gameState = 0;
			container.x = windowWidth/2;
			score = 0;
		}

		appleGroup.destroyEach();
		orangeGroup.destroyEach();
		bombGroup.destroyEach();
		bananaGroup.destroyEach();
		melonGroup.destroyEach();
	}

	drawSprites();
}

function spawnApples() {
	if (frameCount % 60 === 0) {
		var apple = createSprite(appleX, 30, 20, 20);
		apple.addImage("apple", appleImg);
		apple.scale = 0.025;
		apple.velocityY = 3;
		apple.lifetime = 230;
		appleGroup.add(apple);
	}
}

function spawnQuickApples() {
	var apple = createSprite(appleX, 30, 20, 20);
	apple.addImage("apple", appleImg);
	apple.scale = 0.025;
	apple.velocityY = 3;
	apple.lifetime = 230;
	appleGroup.add(apple);	
}

function spawnOranges() {
	if (frameCount % 80 === 0) {
		var orange = createSprite(orangeX, 30, 20, 20);
		orange.addImage("orange", orangeImg);
		orange.scale = 0.05;
		orange.velocityY = 3;
		orange.lifetime = 230;
		orangeGroup.add(orange);
	}
}

function spawnQuickOranges() {
	var orange = createSprite(orangeX, 30, 20, 20);
	orange.addImage("orange", orangeImg);
	orange.scale = 0.05;
	orange.velocityY = 3;
	orange.lifetime = 230;
	orangeGroup.add(orange);	
}

function spawnBombs() {
	if (frameCount % 70 === 0) {
		var bomb = createSprite(bombX, 30, 20, 20);
		bomb.addImage("bomb", bombImg);
		bomb.scale = 0.05;
		bomb.velocityY = +(3 + 2 * score / 100);
		bomb.lifetime = 230;
		bombGroup.add(bomb);
	}
}

function spawnBananas() {
	if (frameCount % 75 === 0) {
		var banana = createSprite(bananaX, 30, 20, 20);
		banana.addImage("banana", bananaImg);
		banana.scale = 0.05;
		banana.velocityY = 3;
		banana.lifetime = 230;
		bananaGroup.add(banana);
	}
}

function spawnQuickBananas() {
	var banana = createSprite(bananaX, 30, 20, 20);
	banana.addImage("banana", bananaImg);
	banana.scale = 0.05;
	banana.velocityY = 3;
	banana.lifetime = 230;
	bananaGroup.add(banana);	
}

function spawnMelons() {
	if (frameCount % 100 === 0) {
		var melon = createSprite(melonX, 30, 20, 20);
		melon.addImage("melon", melonImg);
		melon.scale = 0.05;
		melon.velocityY = 3;
		melon.lifetime = 230;
		melonGroup.add(melon);
	}
}

function spawnQuickMelons() {
	var melon = createSprite(melonX, 30, 20, 20);
	melon.addImage("melon", melonImg);
	melon.scale = 0.05;
	melon.velocityY = 3;
	melon.lifetime = 230;
	melonGroup.add(melon);	
}