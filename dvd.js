window.onload = function () {
logo = document.getElementById('logo');
dvdlogo = document.getElementById('dvdlogo');

let x, y;
let speed = 5;
let xspeed = speed;
let yspeed = speed;
let ifHitBorder = false;

x = randomNumber(1, (window.innerWidth-logo.offsetWidth));
y = randomNumber(1, (window.innerHeight-logo.offsetHeight));

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function randomColor(min, max) {
	let red = randomNumber(min, max);
	let green = randomNumber(min, max);
	let blue = randomNumber(min, max);
	return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function putLogo() {
	logo.style.position='absolute';
	logo.style.left = x+'px';
	logo.style.top = y+'px';
}

function moveX(val) {
	x += val;
	logo.style.left = x+'px';
}

function moveY(val) {
	y += val;
	logo.style.top = y+'px';
}

function setX(val) {
	x = val;
	logo.style.left = x+'px';
}

function setY(val) {
	y = val;
	logo.style.top = y+'px';
}

function animateLogo() {
	moveX(xspeed);
	moveY(yspeed);	
	if (x+logo.offsetWidth >= window.innerWidth)
	{
		setX(window.innerWidth - logo.offsetWidth);
		xspeed *= -1;
		ifHitBorder = true;
	}
	if (x <= 0)
	{
		setX(0);
		xspeed *= -1;
		ifHitBorder = true;
	}
	if (y+logo.offsetHeight >= window.innerHeight)
	{
		setY(window.innerHeight - logo.offsetHeight);
		yspeed *= -1;
		ifHitBorder = true;
	}
	if (y <= 0)
	{
		setY(0);
		yspeed *= -1;
		ifHitBorder = true;
	}
	if (document.getElementById('randomcolor').checked && ifHitBorder)
	{
		dvdlogo.style.fill = randomColor(0x20, 0xFF);
		ifHitBorder = false;
	}
	/*
	if (x+logo.offsetWidth >= window.innerWidth || x <= 0)
	{
		xspeed *= -1;
	}
	if (y+logo.offsetHeight >= window.innerHeight || y <= 0)
	{
		logo.style.top = window.innerHeight - logo.innerHeight;
		yspeed *= -1;
	}
	*/
}


putLogo();
dvdlogo.style.fill = randomColor(0x20,0xFF);
intervalVar = setInterval(animateLogo, 10);

document.getElementById('logoSize').addEventListener("change", function() {
	var val = document.getElementById('logoSize').value+'px';
	dvdlogo.setAttribute("width", val); 
});

document.getElementById("logocolor").addEventListener("change", function() {
	dvdlogo.style.fill = this.value;
	document.getElementById('randomcolor').checked = false;
});

document.getElementById("bgcolor").addEventListener("change", function() {
	document.body.style.background  = this.value;
});

document.getElementById('pausebutton').onclick = function() {
	clearInterval(intervalVar);
	document.getElementById('pausebutton').style.display = 'none';
	document.getElementById('startbutton').style.display = 'inline';
};

document.getElementById('startbutton').onclick = function() {
	intervalVar = setInterval(animateLogo, 10);
	document.getElementById('startbutton').style.display = 'none';
	document.getElementById('pausebutton').style.display = 'inline';
};

document.getElementById("speed").addEventListener("change", function() {
	speed = Number(this.value);
	if (xspeed<0){
		xspeed = -speed
	}
	else {
		xspeed = speed
	}
	if (yspeed<0) {
		yspeed = -speed
	}
	else {
		yspeed = speed
	}
});

};