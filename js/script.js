
	'use strict'

	var h, w, lastX, currX, lastY, currY, draw, download;
	var color=0, stroke, mirror, rubber, rainbow, style;
	var canvas = document.querySelector('#canvas');
	var ctx = canvas.getContext('2d');


	var recordPointerCursor = (e) =>{
		lastX = currX;
		lastY = currY;
		currX = e.clientX - canvas.offsetLeft;
		currY = e.clientY - canvas.offsetTop;
	}
	var handlePointerMove = (e) =>{
		if(draw){
			recordPointerCursor(e);
			drawLine();
			setStroke();
			setColor();
		}
	}
	var handlePointerDown = (e) =>{
		recordPointerCursor(e);
		draw = true;
	}

	var stopDrawing = () =>{
		draw = false;
	}

	var setColor = () =>{
		let color = document.querySelector('#color').value;
		let hex = document.querySelector('#hex');
		ctx.strokeStyle = color;
		hex.innerText = color;
	}
	var setStroke = () =>{
		stroke = document.querySelector('#b-size').value;
		ctx.lineWidth = stroke;
		document.querySelector('#size').innerText=stroke +' px';
	}

	var setStyle = (event) =>{
		style = event.target.value;
		ctx.lineJoin = style;
		ctx.lineCap = style;
		console.log(style);
	}

	var drawLine = () =>{

		var a = lastX, a_mirror = w - a,
			b = lastY,
			c = currX, c_mirror = w - c, 
			d = currY;
		ctx.beginPath();
		let mirror = document.querySelector("#mirror");
		let rubber = document.querySelector("#rubber");
		let rainbow = document.querySelector("#rainbow");
		if(mirror.checked == true){
			ctx.moveTo(a_mirror,b);
			ctx.lineTo(c_mirror,d);
		}
		if(rubber.checked == true){
			ctx.strokeStyle = 'white';
		}
		if(rainbow.checked == true){
			color ++;
			ctx.strokeStyle = `hsl(${color}, 100%, 50%)`;
		}
		ctx.moveTo(a,b);
		ctx.lineTo(c,d);
		ctx.stroke();
		ctx.closePath();
	}
	/*var drawRectangle = () =>{
		var size = document.querySelector('#size').value;
		ctx.beginPath();
		ctx.rect(lastX-size/2, lastY-size/2, size, size);
		if(strokeShape.checked == true){
			ctx.stroke();
		}
		if(fillShape.checked == true){
			let color = document.querySelector('#color').value;
			ctx.fillStyle = color;
			ctx.fill();
		}
	}
	var drawCircle = () =>{
		var size = document.querySelector('#size').value;
		ctx.beginPath();
		ctx.arc(lastX, lastY, size/2, 0, Math.PI*2);
		if(strokeShape.checked == true){
			ctx.stroke();
		}
		if(fillShape.checked == true){
			let color = document.querySelector('#color').value;
			ctx.fillStyle = color;
			ctx.fill();
		}
	}*/

	/* UPLOAD IMAGES */
	var drawIMG = (e) =>{
		var url = URL.createObjectURL(e.target.files[0]);
		var img = new Image();

		img.onload = () =>{
			var img_h = 0;
			var img_w = 0;
			var max_h = canvas.height;
			var max_w = canvas.width;

			if(img.height > img.width){
				img_h = max_h;
				img_w = Math.floor(img.width * (img_h / img.height))
			}else if(img.width > img.height){
				img_w = max_w;
				img_h = Math.floor(img.height * (img_w / img.width))
			}else{
				//The image is square
				img_h = max_h;
				img_w = max_h;
			}
			ctx.drawImage(img,0,0, img.width, img.height,0,0,img_w,img_h);
		}
		img.src = url;
	}

	var canvasSize= ()=>{
		ctx.scale(1,1);
	}


	var clearCanvas = () =>{
		ctx.clearRect(0,0,w,h);
		ctx.fillStyle = '#FFF';
		ctx.fillRect(0,0,w,h);
	}


	var downloadCanvas = () =>{
		let link = document.createElement('a');
		link.setAttribute('href', canvas.toDataURL());
		link.setAttribute('download', 'canvas.jpg');
		document.body.appendChild(link);
		link.click();
		link.remove();
		download = false;
	}

	var init = function(){
		canvas = document.querySelector('#canvas');

		if (canvas) {
			ctx = canvas.getContext('2d');
			w = canvas.width;
			h = canvas.height;
			clearCanvas();
			canvas.onpointermove = handlePointerMove;
			canvas.onpointerdown = handlePointerDown;
			canvas.onpointerup = stopDrawing;
			canvas.onpointerout = stopDrawing;
		}
	}

document.addEventListener('DOMCotentLoaded', init());