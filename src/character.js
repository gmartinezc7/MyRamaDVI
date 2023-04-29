export default class Character extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de del personaje principal
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 'character');
		this.speedy = 400; // Velocidad de movimiento hacia arriba del personaje
		this.speedx = 250;

		this.scene.add.existing(this); //Añadimos el personaje a la escena

		// Seteamos las teclas para mover al personaje
		this.wKey = this.scene.input.keyboard.addKey('W'); //arriba
		this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
		this.sKey = this.scene.input.keyboard.addKey('S'); //abajo
		this.dKey = this.scene.input.keyboard.addKey('D'); //derecha

		// Agregamos el personaje a las físicas para que Phaser lo tenga en cuenta
		scene.physics.add.existing(this);
	}

	/**
	 * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		super.preUpdate(t, dt);

		// Mientras pulsemos la tecla 'A' movemos el personaje en la X
		if(this.aKey.isDown){
			this.setFlip(true, false)
			this.body.setVelocityX(-this.speedx);
		}

		// Mientras pulsemos la tecla 'D' movemos el personaje en la X
		if(this.dKey.isDown){
			this.setFlip(false, false)
			this.body.setVelocityX(this.speedx);
		}
		
		// Si pulsado 'S' movemos el personaje en la Y
		if(this.sKey.isDown){
			this.body.setVelocityY(this.speedy);
		}

		// Si pulsamos 'W' movemos el personaje en la Y
		if(this.wKey.isDown){
			this.body.setVelocityY(-this.speedy);
		}
	}
}