class LoaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoaderScene' });
        this.plyerNumer = null;
        
    }


    init() {
        this.plyerNumer = datas.number

    }

    preload() {
        // Display a loading text
        let loadingText = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2,
            'Loading...',
            { font: '20px Arial', fill: '#ffffff' }
        );
        loadingText.setOrigin(0.5);

        //load assets in game
        this.load.image('background', 'assets/b2.png');

        //load assets button start game 
        this.load.image('btnStart', 'assets/btn/startbtn.svg');
        this.load.image('btnletf', 'assets/btn/left.png');
        this.load.image('btnright', 'assets/btn/right.png');


        //load assets players
        switch (this.plyerNumer) {
            case 1:
                this.load.image('playerA', 'assets/players/playerA.svg');
                break;
            case 2:
                this.load.image('playerB', 'assets/players/playerB.svg');
                break;
            case 3:
                this.load.image('playerC', 'assets/players/playerC.svg');
                break;
            case 4:
                this.load.image('playerD', 'assets/players/playerD.svg');
                break;
            case 5:
                this.load.image('playerE', 'assets/players/playerE.svg');
                break;
            case 6:
                this.load.image('playerF', 'assets/players/playerF.svg');
                break;
        }
        //load orange .png
        this.load.image('orangeA', 'assets/oranges/3.png');
        this.load.image('orangeB', 'assets/oranges/4.png');
        this.load.image('orangeC', 'assets/oranges/5.png');
        this.load.image('orangeD', 'assets/oranges/6.png');
        this.load.image('orangeE', 'assets/oranges/7.png');
        this.load.image('orangeF', 'assets/oranges/8.png');

    }

    create() {
        // Move to the next scene (GameScene) after loading
        this.scene.start('StartGameScene');
    }
}
