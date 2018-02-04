//Variables globales
var tabla=[];
var tablaPC=[];
var canvas;
var ctx;
var pistas=0;
//Funcion main
function init(){
//Funcion que inicializara las variables globales
for (var j=0;j<10;j++){
var aux=[];
var aux2=[];
for (var i=0;i<10;i++){
  aux.push(0);
  aux2.push(0);
}
tabla.push(aux);
tablaPC.push(aux2);
}
canvas=document.getElementById("Canvas1");
ctx=canvas.getContext("2d");

canvas2=document.getElementById("Canvas2");
ctx2=canvas2.getContext("2d");

canvas3=document.getElementById("Canvas3");
ctx3=canvas3.getContext("2d");
}
//End funcion main

//Funcion dibujar lineas
function dibujarLineas(canv){
canv.strokeStyle='rgb(0,0,0)';
canv.fillStyle='rgb(0,0,255)';

//Version bulce
for (var x=0;x<10;x++){
    for (var i=0; i<10;i++){
        canv.fillRect(x*30,i*30,30,30);
        canv.strokeRect(x*30,i*30,30,30);
    }
}
}
//Funcion pintarTablero
function pintarTablero(){
ctx3.fillStyle='rgb(255,255,255)';
ctx3.fillRect(0, 0, canvas3.width, canvas3.height);
dibujarLineas(ctx);
dibujarLineas(ctx2);
}
//Crea los botones
function botones(){
// document.write("<br>");
document.write("<div id='botones'>")
for (var i=0;i<10;i++){
    for (var j=0;j<10;j++){
        document.write("<button class='boton' onclick='if (ganar(tabla)!=0){if(ganar(tablaPC)!=0){tirar("+i+","+j+")}}'></button>");
    }
    document.write("<br>");
}
document.write("</div></div>")
}
function tirar(j,i){
iniX=30*i;
iniY=30*j;
ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
ctx3.fillStyle='rgb(255,255,255)';
ctx3.fillRect(0, 0, canvas3.width, canvas3.height);
if (tablaPC[i][j]==0){
    ctx.strokeStyle='rgb(128,128,128)';
    var img=document.getElementById("agua");
    ctx.drawImage(img,iniX,iniY,30,30);
    ctx.strokeRect(iniX,iniY,30,30);
    ctx.beginPath();
    escribir("Jugador: Agua",10,30); 
    tablaPC[i][j]=100;
    tiradaPC();
} else if (tablaPC[i][j]<90) {
    ctx.fillStyle='rgb(255,164,032)';
    ctx.strokeStyle='rgb(128,128,128)';
    ctx.fillRect(iniX,iniY,30,30);
    ctx.strokeRect(iniX,iniY,30,30);
    var img=document.getElementById("barco");
    ctx.drawImage(img,iniX,iniY,30,30);
    escribir("Jugador: Tocado",10,30);
    var res=tablaPC[i][j];
    tablaPC[i][j]=res+100;
    comprobar(res,tablaPC,ctx);
    ganar(tablaPC);
    tiradaPC();
} else {
    escribir("Jugador: Volver a tirar",10,30);
}
}
function ganar(tabla){
var y=0;
for (var x=0;x<10;x++){
    for (var i=0; i<10;i++){
        if (tabla[x][i]>0 && tabla[x][i]<90){
            y++;
        }
    }
}
if (y==0){
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    ctx3.fillStyle='rgb(255,255,255)';
    ctx3.fillRect(0, 0, canvas3.width, canvas3.height);
    if (tabla==tablaPC){
        escribir("Jugador: Has ganado!",10,30);
        console.log(y);
    } else {
        escribir("GAME OVER",10,30);
        console.log(y);
    }
}
return y;
}
function comprobar(res,tabla,ctx) {
y=0;
for (var x=0;x<10;x++){
    for (var i=0; i<10;i++){
        if (tabla[x][i]==res){
            y++;
        }
    }
}
if (y==0) {
    if (tabla==tablaPC){
        escribir("Jugador: Tocado y hundido",10,30);
    } else {
        escribir("PC: Tocado y hundido",330,30);
    }
    for (var x=0;x<10;x++){
        for (var i=0; i<10;i++){
            if (tabla[x][i]==res+100){
                var iniX=x*30;
                var iniY=i*30;
                ctx.fillStyle='rgb(255,0,0)';
                ctx.fillRect(iniX,iniY,30,30);
                var img=document.getElementById("barco");
                ctx.drawImage(img,iniX,iniY,30,30);
            }
        }
    }
}
}
function escribir(texto,x,y){
ctx3.fillStyle='rgb(255,255,255)';
// ctx3.fillRect(0, 0, canvas3.width, canvas3.height);
ctx3.fillStyle='rgb(0,0,0)';
ctx3.font = "20px Arial";
ctx3.fillText(texto,x,y);
}
function escribirPC(texto,x,y){
ctx3.font = "20px Arial";
ctx3.fillText(texto,x,y);
}

function tiradaPC(){

i=Math.floor(Math.random()*10);
j=Math.floor(Math.random()*10);
ok=true;
while (ok){
    if (tabla[i][j]>90) {
        i=Math.floor(Math.random()*10);
        j=Math.floor(Math.random()*10);
    } else {
        ok=false;
    }
}
iniX=30*i;
iniY=30*j;
if (tabla[i][j]==0){
    ctx2.strokeStyle='rgb(128,128,128)';
    var img=document.getElementById("agua")
    ctx2.drawImage(img,iniX,iniY,30,30);
    ctx2.strokeRect(iniX,iniY,30,30);
    escribirPC("PC: Agua",330,30);
    tabla[i][j]=100;
} else if (tabla[i][j]<90){
    ctx2.fillStyle='rgb(255,164,032)';
    ctx2.strokeStyle='rgb(128,128,128)';
    ctx2.fillRect(iniX,iniY,30,30);
    ctx2.strokeRect(iniX,iniY,30,30);
    var img=document.getElementById("barco");
    ctx2.drawImage(img,iniX,iniY,30,30);
    escribirPC("PC: Tocado",330,30);
    var res=tabla[i][j];
    tabla[i][j]=res+100;
    comprobar(res,tabla,ctx2);
    ganar(tabla);
}
}
function resetear7(t){
for (var x=0;x<10;x++){
    for (var i=0; i<10;i++){
        if (t[x][i]==7){
            t[x][i]=0;
        }
    }
}
}
function colocarBarco(tabla,tam,asig){
correcto=false;
while (correcto==false){
    orientacion=Math.floor(Math.random()*2);
    if (orientacion==0){
        x=Math.floor(Math.random()*(10-tam));
        y=Math.floor(Math.random()*10);
    }
    if (orientacion==1){
        x=Math.floor(Math.random()*10);
        y=Math.floor(Math.random()*(10-tam));
    }
    
    // console.log(x);
    // console.log(y);
    // console.log(orientacion);
    //Horizontal
    if (orientacion==0){
        ok=true
        for (var i=0;i<tam;i++){
            if (tabla[x+i][y]!=0){
                ok=false;
            }
        }
        if (ok){
            for (var i=0;i<tam;i++){
                tabla[x+i][y]=asig;
                tabla[x+i][y+1]=7;
                tabla[x+i][y-1]=7;
                if (i==0){
                    if (x>0){
                        tabla[(x+i)-1][y+1]=7;
                        tabla[(x+i)-1][y-1]=7;
                        tabla[(x+i)-1][y]=7;
                    }
                }
                if (i==tam-1){
                    if (x+i<9){
                        tabla[(x+i)+1][y+1]=7;
                        tabla[(x+i)+1][y-1]=7;
                        tabla[(x+i)+1][y]=7;
                    }
                }
            }
            correcto=true;
        }
    }
    //Vertical
    else if (orientacion==1) {
        ok=true
        for (var i=0;i<tam;i++){
            if (tabla[x][y+i]!=0){
                ok=false;
            }
        }
        if (ok){
            for (var i=0;i<tam;i++){
                if (x>0 && x<9){
                    tabla[x][y+i]=asig;
                    tabla[x+1][y+i]=7;
                    tabla[x-1][y+i]=7;
                    tabla[x][y-1]=7;
                    tabla[x+1][y-1]=7;
                    tabla[x-1][y-1]=7;
                    tabla[x][y+tam]=7;
                    tabla[x+1][y+tam]=7;
                    tabla[x-1][y+tam]=7;
                }
                if (x==0){
                    tabla[x][y+i]=asig;
                    tabla[x+1][y+i]=7;
                    tabla[x][y-1]=7;
                    tabla[x+1][y-1]=7;
                    tabla[x][y+tam]=7;
                    tabla[x+1][y+tam]=7;
                }
                if (x==9){
                    tabla[x][y+i]=asig;
                    tabla[x-1][y+i]=7;
                    tabla[x][y-1]=7;
                    tabla[x-1][y-1]=7;
                    tabla[x][y+tam]=7;
                    tabla[x-1][y+tam]=7;
                }
            }
            correcto=true;
        }
    }
}
}
function colocarJugador() {
colocarBarco(tabla,4,40);
colocarBarco(tabla,3,30);
colocarBarco(tabla,3,31);
colocarBarco(tabla,2,20);
colocarBarco(tabla,2,21);
colocarBarco(tabla,2,22);
colocarBarco(tabla,1,10);
colocarBarco(tabla,1,11);
colocarBarco(tabla,1,12);
colocarBarco(tabla,1,13);
dibujarBarco(ctx2,tabla,40);
dibujarBarco(ctx2,tabla,30);
dibujarBarco(ctx2,tabla,31);
dibujarBarco(ctx2,tabla,20);
dibujarBarco(ctx2,tabla,21);
dibujarBarco(ctx2,tabla,22);
dibujarBarco(ctx2,tabla,10);
dibujarBarco(ctx2,tabla,11);
dibujarBarco(ctx2,tabla,12);
dibujarBarco(ctx2,tabla,13);
resetear7(tabla);
}
function colocarPC(){
colocarBarco(tablaPC,4,40);
colocarBarco(tablaPC,3,30);
colocarBarco(tablaPC,3,31);
colocarBarco(tablaPC,2,20);
colocarBarco(tablaPC,2,21);
colocarBarco(tablaPC,2,22);
colocarBarco(tablaPC,1,10);
colocarBarco(tablaPC,1,11);
colocarBarco(tablaPC,1,12);
colocarBarco(tablaPC,1,13);
resetear7(tablaPC);
}
function dibujarBarco(ctx,tabla,asig){
for (var j=0;j<10;j++){
    for (var i=0; i<10;i++){
        if (tabla[i][j]==asig){
            ctx.fillStyle='rgb(0,255,0)';
            ctx.strokeStyle='rgb(255,255,255)';
            ctx.fillRect(i*30,j*30,30,30);
            ctx.strokeRect(i*30,j*30,30,30);
        }
    }
}
}

function pista(){
ok=true;
if (ganar(tabla)!=0 && ganar(tablaPC)!=0){
    if (pistas<3){
        while(ok){
            i=Math.floor(Math.random()*10);
            j=Math.floor(Math.random()*10);
            if (tablaPC[j][i]>0 && tablaPC[j][i]<90){
                pistas++;
                tirar(i,j);
                ok=false;
            }
        }
    } else {
        alert("Has gastado todas las pistas!");
    }
}
}