'use strict';

const fs = require('fs');
const io = require('socket.io')(3000);
const Gameboy = require('../../');

const gameboy = new Gameboy();
gameboy.loadCart(fs.readFileSync('./roms/zelda.gb'));
gameboy.start();

io.on('connection', function (socket) {
    socket.on('keydown', (keyCode) => gameboy.joypad.keyDown(keyCode));
    socket.on('keyup', (keyCode) => gameboy.joypad.keyUp(keyCode));
});

let i = 0;
gameboy.gpu.on('frame', (canvas) => {
    if (++i % 2) return;
    io.emit('frame', canvas.toDataURL());
    i = 0;
});
