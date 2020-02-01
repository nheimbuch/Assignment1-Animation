var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   0, 0, 640, 640);
};

Background.prototype.update = function () {
};

function HeroSwing(game, spritesheet) {
    this.standSwingAnimation = new Animation(spritesheet, 160, 112, 6, 0.10, 6, true, 1);
    this.x = 0;
    this.y = 208;
    this.speed = 0;
    this.game = game;
    this.game = game;
    this.ctx = game.ctx;
}

HeroSwing.prototype.draw = function () {
    this.standSwingAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

HeroSwing.prototype.update = function () {
    
}

function HeroCrouchSwing(game, spritesheet) {
    this.crouchSwingAnimation = new Animation(spritesheet, 41 * 4, 24 * 4, 6, 0.10, 6, true, 1);
    this.x = 384;
    this.y = 296;
    this.speed = 0;
    this.game = game;
    this.game = game;
    this.ctx = game.ctx;
}

HeroCrouchSwing.prototype.draw = function () {
    this.crouchSwingAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

HeroCrouchSwing.prototype.update = function () {
    
}

function HeroJump(game, spritesheet) {
    this.jumpAnimation = new Animation(spritesheet, 22 * 4, 37 * 4, 8, 0.10, 8, true, 1);
    this.x = 256;
    this.y = 244;
    this.speed = 0;
    this.game = game;
    this.game = game;
    this.ctx = game.ctx;
}

HeroJump.prototype.draw = function () {
    this.jumpAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

HeroJump.prototype.update = function () {
    
}

AM.queueDownload("./img/Crouch Swing-Sheet.png");
AM.queueDownload("./img/Jump-Sheet.png");
AM.queueDownload("./img/Stand Swing-Sheet.png");
AM.queueDownload("./img/TitleScreen.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/TitleScreen.png")));
    gameEngine.addEntity(new HeroSwing(gameEngine, AM.getAsset("./img/Stand Swing-Sheet.png")));
    gameEngine.addEntity(new HeroJump(gameEngine, AM.getAsset("./img/Jump-Sheet.png")));
    gameEngine.addEntity(new HeroCrouchSwing(gameEngine, AM.getAsset("./img/Crouch Swing-Sheet.png")));

    console.log("All Done!");
});