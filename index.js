//点击开始，进入游戏
//生成蛇和果子,蛇运动
//按下键盘，改变蛇方向
//蛇吃到果子，长度加1。得分加1
//判断是否撞墙，判断是否撞到自身
var snakeMove, str;
var speed = 200;
var stopBool = true;
var main = document.getElementById('main');
var scoreP = document.getElementById('scored');
var startBtn = document.getElementById('startBtn');
var startDiv = document.getElementById('start');
var restart = document.getElementsByClassName('restart')[0];
var restartDiv = document.getElementsByClassName('restartDiv')[0];
var restartBtn = document.getElementsByClassName('restartBtn')[0];
var lastScore = document.getElementsByClassName('lastScore')[0];
var scoreDiv = document.getElementsByClassName('score')[0];
var setDiv = document.getElementsByClassName('set')[0];
var stopBtn =  document.getElementById('stopBtn');
var bgm = document.getElementById('bgm');
var eat = document.getElementById('eat');
var lose = document.getElementById('lose');
// 初始化
function init(){
	//地图
	this.mapW = parseInt(getComputedStyle(main).width);
	this.mapH = parseInt(getComputedStyle(main).height);
	this.mapDiv = main;
	//食物
	this.foodW = 38;
	this.foodH = 38;
	this.foodX = 0;
	this.foodY = 0  
	//蛇
	this.snakeW = 38;
	this.snakeH = 38;
	this.snakeBody = [[3,1,'head'], [2,1,'body'], [1,1,'body']];
	//游戏属性
	this.direction = 'right';
	// this.speed = 100;
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;
	this.score = 0;
	bgm.volume=0.1;
}
// 开始游戏
function startGame(){
 	startDiv.style.display = 'none';
	setDiv.style.display = 'block';
	scoreDiv.style.display = 'block';
	bgm.play();
	food();
	snake();
	snakeMove = setInterval(function(){
		addspeed(this.score);
		move();
	}, speed);
}
// 生成食物
function food(){
	var foods = document.createElement('div');
	foods.style.width = this.foodW + 'px';
	foods.style.height = this.foodH + 'px';
	foods.style.position = 'absolute';
	this.foodX = Math.floor(Math.random() * Math.floor(this.mapW / 38));
	this.foodY = Math.floor(Math.random() * Math.floor(this.mapH / 38));
	for(var key in this.snakeBody){
		if (key[0] == this.foodX && key[1] == this.foodY) {
			food();
		}
	}
	foods.style.left = this.foodX * 38 + 'px';
	foods.style.top = this.foodY* 38 + 'px';
	this.mapDiv.appendChild(foods).setAttribute('class', 'food');
}
// 生成蛇
function snake(){
	for (var i = 0; i < this.snakeBody.length; i++) {
		var snake = document.createElement('div');
		snake.style.width = this.snakeW + 'px';
		snake.style.height = this.snakeH + 'px';
		snake.style.position = 'absolute';
		snake.style.left = this.snakeBody[i][0] * 38 + 'px';
		snake.style.top = this.snakeBody[i][1] * 38 + 'px';
		snake.classList.add(this.snakeBody[i][2]);
		this.mapDiv.appendChild(snake).classList.add('snake');
		// 判断运动方向并改变蛇图片方向
		switch(this.direction){
			case'right':
			break;

			case'left':
				snake.style.transform = 'rotate(180deg)';
			break;
			case'up':
				snake.style.transform = 'rotate(270deg)';
			break;
			case'down':
				snake.style.transform = 'rotate(90deg)';
			break;
		}
	}
} 
// 蛇运动
function move(){
	for (var i = this.snakeBody.length-1; i > 0; i--){
		this.snakeBody[i][0] = this.snakeBody[i-1][0];
		this.snakeBody[i][1] = this.snakeBody[i-1][1];
	};
	// 改变运动方向
	switch(this.direction){
		case'right':
			this.snakeBody[0][0] += 1;
		break;
		case'left':
			this.snakeBody[0][0] -= 1;
		break;
		case'up':
			this.snakeBody[0][1] -= 1;
		break;
		case'down':
			this.snakeBody[0][1] += 1;
		break;
	};
	removeClass('snake');
	if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
		var newBodyX = this.snakeBody[this.snakeBody.length-1][0];
		var newBodyY = this.snakeBody[this.snakeBody.length-1][1];
		eat.play();
		removeClass('food');
		this.score += 1;
		scoreP.innerHTML = this.score;
		food();
		switch(this.direction){
			case'right':
				this.snakeBody.push([[newBodyX],[newBodyY],'body'])
			break;

			case'left':
				this.snakeBody.push([[newBodyX],[newBodyY],'body'])
			break;
			case'up':
				this.snakeBody.push([[newBodyX],[newBodyY],'body'])
			break;
			case'down':
				this.snakeBody.push([[newBodyX],[newBodyY],'body'])
			break;
		}
	};
	snake();
	if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= parseInt(this.mapW/38)) {
		gameOver();
	}
	if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= parseInt(this.mapH/38)) {
		gameOver();
	}
	var snakeHX = this.snakeBody[0][0];
	var snakeHY = this.snakeBody[0][1];
	for (var i = 1; i < this.snakeBody.length; i++) {
		if (this.snakeBody[i][0] == snakeHX && this.snakeBody[i][1] == snakeHY) {
			gameOver();
		}
	}
}
// 按蛇尾巴清除
function removeClass(className){
	var ele = document.getElementsByClassName(className);
	while (ele.length > 0) {
		ele[0].parentNode.removeChild(ele[0]);

	}
}
// 键盘解锁
function keyUnlock(code){
	switch(code){
		case 37:
		if (this.left) {
			this.direction = 'left';
			this.left = false;
			this.right = false;
			this.up = true;
			this.down = true;
		}
		break;

		case 38:
			if (this.up) {
				this.direction = 'up';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
		break;

		case 39:
			if (this.right) {
				this.direction = 'right';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = true;
			}
		break;

		case 40:
			if (this.down) {
				this.direction = 'down';
				this.left = true;
				this.right = true;
				this.up = false;
				this.down = false;
			}
		break;
		default:
		break; 

	}
}
// 键盘上锁
function setDirection(code){
	switch(code){
		case 37:
		if (this.left) {
			this.direction = 'left';
			this.left = true;
			this.right = false;
			this.up = false;
			this.down = false;
		}
		break;

		case 38:
			if (this.up) {
				this.direction = 'up';
				this.left = false;
				this.right = false;
				this.up = true;
				this.down = false;
			}
		break;

		case 39:
			if (this.right) {
				this.direction = 'right';
				this.left = false;
				this.right = true;
				this.up = false;
				this.down = false;
			}
		break;

		case 40:
			if (this.down) {
				this.direction = 'down';
				this.left = false;
				this.right = false;
				this.up = false;
				this.down = true;
			}
		break;

		default:
		break; 

	}
}
// 绑定事件
function bindEvent(){
	//按下键盘
	document.onkeydown = function(e){
		var code = e.keyCode;
		setDirection(code);
	}
	//抬起键盘
	document.onkeyup = function(e){
			var code = e.keyCode;
			keyUnlock(code);
	}
	// 游戏开始
	startBtn.onclick = function(){
		startGame();
	};
	//暂停按钮
	stopBtn.onclick = function(){
		if (stopBool) {
			clearInterval(snakeMove);
			stopBool = false;
			stopBtn.setAttribute('src', 'img/play.png');
		}
		else{
			snakeMove = setInterval(function(){
				addspeed(this.score);
				move();
			}, speed);
			stopBtn.setAttribute('src', 'img/stop.png');
			stopBool = true;
		}
	};
	// 重新开始按钮
	restartBtn.onclick = function(){
		restartDiv.style.display = 'none';
		setDiv.style.display = 'block';
		scoreDiv.style.display = 'block';
		lastScore.innerHTML = '';
		scoreP.innerHTML = 0;
		init();
		startGame();
	}
};
// 加速判断
function addspeed(num){
	if (num == 20){
		clearInterval(snakeMove);
		speed = 40;
		snakeMove = setInterval(function(){
			addspeed(this.score);
			move();
		}, speed);
	}else if(num == 15){
		clearInterval(snakeMove);
		speed = 80;
		snakeMove = setInterval(function(){
			addspeed(this.score);
			move();
		}, speed);
	}else if(num == 10){
		clearInterval(snakeMove);
		speed = 120;
		snakeMove = setInterval(function(){
			addspeed(this.score);
			move();
		}, speed);
	}else if(num == 5){
		clearInterval(snakeMove);
		speed = 160;
		snakeMove = setInterval(function(){
			addspeed(this.score);
			move();
		}, speed);
	}else{
		speed = 200;
	}
};
// 游戏结束
function gameOver(){
	bgm.load();
	lose.play();
	clearInterval(snakeMove);
	removeClass('snake');
	removeClass('food');
	str = '共计得分:' + this.score;
	this.score = 0;
	restartFunc(str);
};
// 结束页面
function restartFunc(){
	restartDiv.style.display = 'block';
	setDiv.style.display = 'none';
	scoreDiv.style.display = 'none';
	var restartW = parseInt(window.getComputedStyle(restart).width);
	var restartH = parseInt(window.getComputedStyle(restart).height);
	restart.style.marginLeft =  -restartW / 2 + 'px';
	restart.style.marginTop =  -restartH /2  + 'px';
	lastScore.innerHTML = str;
};
init();
bindEvent();