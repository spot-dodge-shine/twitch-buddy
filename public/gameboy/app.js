// localStorage.debug = '';

var gameboy = window.gameboy = new (window.Gameboy)();
var socket = io(window.location.origin)
var roomName = window.location.pathname

socket.on('connect', () => {
  socket.emit('join-room', roomName)
  socket.on('hello', () => {
    console.log('wow this is messy')
  })
  socket.on('test', () => {
    console.log('success!')
  })
})

// Render

var canvas = document.getElementById('frame');

var ctx = canvas.getContext('2d');
gameboy.gpu.on('frame', function (offcanvas) {
    ctx.drawImage(offcanvas, 0, 0);
});

// Buttons

function loadFile () {
    if (!this.files.length) return;

    var reader = new FileReader();
    reader.onloadend = function () {
        gameboy.loadCart(reader.result);
        gameboy.start();
    };
    reader.readAsArrayBuffer(this.files[0]);
}

function fullscreen () {
    (
        canvas.requestFullscreen ||
        canvas.mozRequestFullScreen ||
        canvas.webkitRequestFullscreen ||
        canvas.msRequestFullscreen
    )
    .call(canvas);
}

$('#input').change(loadFile);
$('#fullscreen').click(fullscreen);
$('#pause').click(function () { gameboy.pauseResume() });
$('#reset').click(function () { gameboy.reset() });
$('#rendering').click(function () { $('#frame').toggleClass('pixelated') });

// Joypad

$(document).keydown(function (e) { gameboy.joypad.keyDown(e.keyCode) });
$(document).keyup(function (e) { gameboy.joypad.keyUp(e.keyCode) });

