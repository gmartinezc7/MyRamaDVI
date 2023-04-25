import Maingame from './escenas/maingame.js';
/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 * Doc: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
 */
let config = {
    type: Phaser.AUTO,
    parent: 'juego',
    // type: Phaser.CANVAS,
    // canvas: document.getElementById("juego"),
    width:  160,
    height: 800,
    pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		// Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
		// con un mínimo y un máximo de tamaño
		mode: Phaser.Scale.FIT,
		min: {
            width: 188,
            height: 328
        },
		max: {
            width: 752,
            height: 1312
        },
		zoom: 1
    },
    scene: [Maingame],
    physics: { 
        default: 'arcade', 
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },
    title: "Prueba Tilemap",
    version: "1.0.0"
};

new Phaser.Game(config);