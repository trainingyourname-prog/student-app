/* =====================================================
   PROFESSIONAL INTRO V2.0
   SCRIPT.JS
===================================================== */

/* ==========================
   ELEMENTS
========================== */

const welcome =
document.getElementById("welcome");

const title =
document.getElementById("title");

const subtitle =
document.getElementById("subtitle");

const logo =
document.getElementById("logo");

const loadingBox =
document.getElementById("loadingBox");

const progressBar =
document.getElementById("progressBar");

const loadingPercent =
document.getElementById("loadingPercent");

const introSound =
document.getElementById("introSound");

/* ==========================
   INTRO START
========================== */

window.onload=function(){

startIntro();

};

/* ==========================
   STEP 1
========================== */

function startIntro(){

setTimeout(function(){

welcome.classList.add("fade");

},300);

/* Step 2 */

setTimeout(function(){

title.classList.add("fade");

},1200);

/* Step 3 */

setTimeout(function(){

subtitle.classList.add("fade");

},2200);

/* Step 4 */

setTimeout(function(){

showLogo();

},3400);

}

/* ==========================
   SHOW LOGO
========================== */

function showLogo(){

logo.classList.add("logoShow");

/* Play Sound */

playIntroSound();

/* Mobile Vibrate */

if(navigator.vibrate){

navigator.vibrate(120);

}

/* Show Loading */

setTimeout(function(){

loadingBox.style.display="block";

startLoading();

},1200);

}

/* ==========================
   INTRO MUSIC
========================== */

function playIntroSound(){

if(introSound){

introSound.volume=.35;

introSound.play().catch(function(){});

}

}

/* ==========================
   LOADING BAR
========================== */

function startLoading(){

let value=0;

const timer=

setInterval(function(){

value++;

progressBar.style.width=

value+"%";

loadingPercent.innerHTML=

value+"%";

if(value>=100){

clearInterval(timer);

openLogin();

}

},35);

}

/* ==========================
   OPEN LOGIN
========================== */

function openLogin(){

document.body.style.transition=

"opacity .8s ease";

document.body.style.opacity="0";

setTimeout(function(){

window.location.href=

"../Login Home Page.html";

},800);

}


/* =====================================================
   PART 5 : PREMIUM EFFECTS
===================================================== */

/* ==========================
   SHOOTING STARS
========================== */

const shootingContainer =
document.getElementById("shootingStars");

function createShootingStar(){

const star =
document.createElement("div");

star.style.position="absolute";

star.style.top=
Math.random()*60+"%";

star.style.left="-120px";

star.style.width="140px";

star.style.height="2px";

star.style.background=

"linear-gradient(90deg,#ffffff,#00E5FF,transparent)";

star.style.transform="rotate(-25deg)";

star.style.opacity=".9";

shootingContainer.appendChild(star);

star.animate([

{

transform:
"translateX(0) rotate(-25deg)",

opacity:1

},

{

transform:
"translateX(140vw) translateY(180px) rotate(-25deg)",

opacity:0

}

],{

duration:1800,

easing:"linear"

});

setTimeout(function(){

star.remove();

},1800);

}

setInterval(createShootingStar,2500);

/* ==========================
   SPARKLES
========================== */

const sparkleContainer =
document.getElementById("sparkles");

function createSparkle(){

const sparkle =
document.createElement("div");

sparkle.innerHTML="✨";

sparkle.style.position="absolute";

sparkle.style.left=
Math.random()*100+"%";

sparkle.style.top=
Math.random()*100+"%";

sparkle.style.fontSize=
(12+Math.random()*18)+"px";

sparkle.style.opacity=".9";

sparkle.style.pointerEvents="none";

sparkleContainer.appendChild(sparkle);

sparkle.animate([

{

transform:"scale(.3)",

opacity:1

},

{

transform:"translateY(-70px) scale(1.8)",

opacity:0

}

],{

duration:1700

});

setTimeout(function(){

sparkle.remove();

},1700);

}

setInterval(createSparkle,700);

/* ==========================
   FIREWORKS
========================== */

const fireworks =
document.getElementById("fireworks");

function createFirework(){

const dot =
document.createElement("div");

dot.style.position="absolute";

dot.style.left=
Math.random()*100+"%";

dot.style.top=
Math.random()*80+"%";

dot.style.width="10px";

dot.style.height="10px";

dot.style.borderRadius="50%";

dot.style.background=

"hsl("+

Math.random()*360+

",100%,60%)";

dot.style.boxShadow=

"0 0 25px white";

fireworks.appendChild(dot);

dot.animate([

{

transform:"scale(.2)",

opacity:1

},

{

transform:"scale(4)",

opacity:0

}

],{

duration:900

});

setTimeout(function(){

dot.remove();

},900);

}

setInterval(createFirework,1200);

/* ==========================
   LIVE CLOCK
========================== */

const clock =
document.createElement("div");

clock.style.position="fixed";

clock.style.top="18px";

clock.style.right="18px";

clock.style.color="#ffffff";

clock.style.fontWeight="700";

clock.style.fontSize="14px";

clock.style.zIndex="999";

document.body.appendChild(clock);

setInterval(function(){

const now=new Date();

clock.innerHTML=

now.toLocaleTimeString();

},1000);

/* ==========================
   BATTERY
========================== */

if(navigator.getBattery){

navigator.getBattery().then(function(battery){

const batteryBox=
document.createElement("div");

batteryBox.style.position="fixed";

batteryBox.style.bottom="18px";

batteryBox.style.right="18px";

batteryBox.style.color="#00FF99";

batteryBox.style.fontWeight="700";

batteryBox.style.fontSize="14px";

batteryBox.style.zIndex="999";

document.body.appendChild(batteryBox);

function updateBattery(){

batteryBox.innerHTML=

"🔋 "+

Math.round(

battery.level*100

)+"%";

}

updateBattery();

battery.addEventListener(

"levelchange",

updateBattery

);

});

}

/* ==========================
   DISABLE DOUBLE CLICK
========================== */

document.addEventListener(

"dblclick",

function(e){

e.preventDefault();

});

/* ==========================
   DISABLE TEXT SELECT
========================== */

document.addEventListener(

"selectstart",

function(e){

e.preventDefault();

});

/* ==========================
   CONSOLE
========================== */

console.log(

"Professional Effects Loaded"

);


/* =====================================================
   PART 6 : FINAL PROFESSIONAL VERSION
===================================================== */

/* ==========================
   LOGO 3D ROTATION
========================== */

setInterval(function(){

logo.animate([

{
transform:"rotateY(0deg)"
},

{
transform:"rotateY(180deg)"
},

{
transform:"rotateY(360deg)"
}

],{

duration:4500,

easing:"ease-in-out"

});

},5000);

/* ==========================
   WEB AUDIO STARTUP
========================== */

function startupMelody(){

if(

typeof AudioContext==="undefined" &&
typeof webkitAudioContext==="undefined"

){

return;

}

const AudioCtx=

window.AudioContext||
window.webkitAudioContext;

const ctx=new AudioCtx();

const notes=[523,659,784,1046];

notes.forEach(function(freq,index){

setTimeout(function(){

const osc=

ctx.createOscillator();

const gain=

ctx.createGain();

osc.type="triangle";

osc.frequency.value=freq;

gain.gain.value=.04;

osc.connect(gain);

gain.connect(ctx.destination);

osc.start();

setTimeout(function(){

osc.stop();

},180);

},index*220);

});

}

setTimeout(startupMelody,1200);

/* ==========================
   AUTO DARK / LIGHT
========================== */

if(

window.matchMedia &&
window.matchMedia("(prefers-color-scheme: light)").matches

){

document.body.style.filter="brightness(.96)";

}

/* ==========================
   PAGE VISIBILITY
========================== */

document.addEventListener(

"visibilitychange",

function(){

if(document.hidden){

introSound.pause();

}else{

introSound.play().catch(()=>{});

}

});

/* ==========================
   LOGO CLICK EFFECT
========================== */

logo.addEventListener(

"click",

function(){

logo.animate([

{

transform:"scale(1)"

},

{

transform:"scale(1.18)"

},

{

transform:"scale(1)"

}

],{

duration:600

});

if(navigator.vibrate){

navigator.vibrate(80);

}

});

/* ==========================
   SMOOTH PAGE OPEN
========================== */

function smoothRedirect(){

document.body.animate([

{

opacity:1,

transform:"scale(1)"

},

{

opacity:0,

transform:"scale(1.05)"

}

],{

duration:700,

fill:"forwards"

});

setTimeout(function(){

window.location.href="../Login Home Page.html";

},700);

}

/* Replace Redirect */

openLogin=smoothRedirect;

/* ==========================
   FPS COUNTER (Hidden)
========================== */

let last=performance.now();

let frames=0;

function fpsCounter(now){

frames++;

if(now-last>=1000){

frames=0;

last=now;

}

requestAnimationFrame(fpsCounter);

}

requestAnimationFrame(fpsCounter);

/* ==========================
   PREVENT RIGHT CLICK
========================== */

document.addEventListener(

"contextmenu",

function(e){

e.preventDefault();

});

/* ==========================
   PRELOAD LOGIN PAGE
========================== */

const preload=

document.createElement("link");

preload.rel="prefetch";

preload.href="../Login Home Page.html";

document.head.appendChild(preload);

/* ==========================
   WELCOME TYPEWRITER
========================== */

const originalText=

subtitle.innerHTML;

subtitle.innerHTML="";

let i=0;

function typeWriter(){

if(i<originalText.length){

subtitle.innerHTML+=

originalText.charAt(i);

i++;

setTimeout(typeWriter,40);

}

}

setTimeout(typeWriter,2200);

/* ==========================
   FINAL CONSOLE
========================== */

console.log(

"%c Professional Intro Version 2.0 Loaded",

"color:#00E5FF;font-size:18px;font-weight:bold;"

);