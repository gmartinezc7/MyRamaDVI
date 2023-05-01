import Phaser from 'phaser'

export default class escenaFinal extends Phaser.Scene {
	
	constructor() {
		super({ key:'escenaFinal'});
		this.final = 0;
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        this.load.image('niveles', 'assets/fondoniveles.jpg');
		this.load.image('gameOver', 'assets/endgame.png');
		this.load.image('menu', 'assets/menu.jpg');
        //this.load.image('win', 'assets/you_win.png');
		this.load.image('victoria1', 'assets/Dialogo Victoria/Victoria1.png');
		this.load.image('victoria2', 'assets/Dialogo Victoria/Victoria2.png');
		this.load.image('victoria3', 'assets/Dialogo Victoria/Victoria3.png');
		//this.load.image('lose', 'assets/lose.jpg');
	}

	init(data){
		this.final = data.numero;
		this.totalEsferas = data.totalEsferas;
		this.totalRecogidas = data.totalRecogidas;
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
        this.inicio = this.add.image(360, 360, 'niveles')

		if(this.final == 0){
			this.texto = this.add.image(360, 360, 'gameOver')
		}else{
			if(this.totalRecogidas / this.totalEsferas >= 0.8){
				this.add.image(360,300, 'victoria3');
			}
			else if(this.totalRecogidas / this.totalEsferas >= 0.4){
				this.add.image(360,300, 'victoria2');
			}
			else{
				this.add.image(360,300, 'victoria1');

			}
		}

		//this.texto = this.add.image(360, 360, 'gameOver')

		this.buttonBack = this.add.image(550,660,'menu').setInteractive();
        this.buttonBack.on('pointerdown', pointer => {
            this.scene.start('menuniveles');
	    });

		// HACER UN IF Y DEPENDIENDO DEL SCORE QUE SE RECIBA SE MUESTRA IMAGEN CON
		// 1 ESTRELLA, 2 O 3
		

        //La escena se queda pausada ya que hemos perdido
		//this.scene.pause();
	}

	update(){

	}
}
