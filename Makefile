
all:
	ljc -a -m minecraft -e main,render,getPixelsLength,getWidth,getHeight render.ljs > render.js
	perl -pi -e 's/\+3.14159265359/3.14159265359/g' render.js
	cp render.js render-noasm.js
	perl -pi -e 's/"use asm";//g' render-noasm.js
