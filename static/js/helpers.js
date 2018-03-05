/**	
 * Checa alinhamento das boxes
 *
 * @return {bool}  resultado da checagem
 */
function AABBIntersect(ax, ay, aw, ah, bx, by, bw, bh) {
	return ax < bx+bw && bx < ax+aw && ay < by+bh && by < ay+ah;
};


/**
 * informações relevantes da Bullet class 
 * 
 * @param {number} x     inicia a posicao x
 * @param {number} y     inicia a posicao y
 * @param {number} vely  velocidade em direcao y
 * @param {number} w     largura em pixels do tiro
 * @param {number} h     altura em pixels do tiro
 * @param {string} color hex-color do tiro
 */
function Bullet(x, y, vely, w, h, color) {
	this.x = x;
	this.y = y;
	this.vely = vely;
	this.width = w;
	this.height = h;
	this.color = color;
};

/**
 * Atualiza a posição do tiro (refresh)
 */
Bullet.prototype.update = function() {
	this.y += this.vely;
};


/**
 * Classe abstrata de Canvas
 * 
 * @param {number} width  largura do Canvas em pixels
 * @param {number} height altura do Canvas em pixels
 */
function Screen(width, height) {
	// criacao do canvas e contexto 2D
	this.canvas = document.createElement("canvas");
	this.canvas.width = this.width = width;
	this.canvas.height = this.height = height;
	this.ctx = this.canvas.getContext("2d");
	// append do canvas no documento
	document.body.appendChild(this.canvas);
};

/**
 * Clear
 */
Screen.prototype.clear = function() {
	this.ctx.clearRect(0, 0, this.width, this.height);
};

/**
 * Faz o draw de um sprite
 * 
 * @param  {Sprite} sp define que sprite faz draw
 * @param  {number} x  coordenada x para draw de sprite
 * @param  {number} y  coordenada y para draw de sprite
 */
Screen.prototype.drawSprite = function(sp, x, y) {
	// Faz draw do spritesheet para o canvas
	this.ctx.drawImage(sp.img, sp.x, sp.y, sp.w, sp.h, x, y, sp.w, sp.h);
};

/**
 * Instancia de tiro para o Canvas
 * @param  {Bullet} bullet draw do tiro
 */
Screen.prototype.drawBullet = function(bullet) {
	// Define fillstyle e faz draw do bullet
	this.ctx.fillStyle = bullet.color;
	this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
};


/**
 * Objeto de sprite
 * 
 * @param {Image}  img imagem base
 * @param {number} x   comeca o x na imagem
 * @param {number} y   comeca o y na imagem
 * @param {number} w   largura do conteudo
 * @param {number} h   altura do conteudo
 */
function Sprite(img, x, y, w, h) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
};


/**
 * Realizacao de inputs
 */
function InputHandeler() {
	this.down = {};
	this.pressed = {};
	// captura inputs do teclado
	var _this = this;
	document.addEventListener("keydown", function(evt) {
		_this.down[evt.keyCode] = true;
	});
	document.addEventListener("keyup", function(evt) {
		delete _this.down[evt.keyCode];
		delete _this.pressed[evt.keyCode];
	});
};

/**
 * Retorna se a tecla esta sendo pressionada
 * @param  {number}  code checagem de keycode
 * @return {bool}         resultado da checagem
 */
InputHandeler.prototype.isDown = function(code) {
	return this.down[code];
};

/**
 * Retorna se uma tecla foi pressionada
 * @param  {number}  code checagem de keycode
 * @return {bool}         resultado da checagem
 */
InputHandeler.prototype.isPressed = function(code) {
	// if tecla e registrada como pressionada return false else if
	// tecla apertada pela primeira vez return true else return false
	if (this.pressed[code]) {
		return false;
	} else if (this.down[code]) {
		return this.pressed[code] = true;
	}
	return false;
};
