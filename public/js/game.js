class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.orangeP1 = null;
        this.orangeP2 = null;
        this.select = {};
        this.dataOrange = null;
    }
    preload() {
        switch (datas.number) {
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
    }
    init() {
        // console.log(datas)
        this.dataOrange = {
            orangeP1: datas.orangeP1,
            orangeP2: datas.orangeP2,
            position: datas.position
        }
    }

    create() {
        // Add a background
        this.createBackground()
        this.createText()
        this.createImgPlayer()
        this.createOranges()
        this.crateBtns()

        // Add click events
        this.input.on('gameobjectup', this.action, this);
    }
    createBackground() {
        this.imgbg = this.add
            .image(this.scale.width / 2, this.scale.height / 2, "background")
            .setOrigin(0.5, 0.5)
            .setDisplaySize(this.scale.width, this.scale.height)
            .setInteractive()
    }
    createText() {
        this.textNumber = this.add.text(
            this.scale.width / 10,
            this.scale.height / 10,
            `หมายเลข: ${datas.number} `,
            { font: '30px Arial', fill: '#ffffff' }
        );
    }
    createImgPlayer() {
        const imgPlayerSize = Math.min(this.scale.width, this.scale.height) * 0.2;
        const imageplayers = ['A', 'B', 'C', 'D', 'E', 'F'];
        this.add.image(
            this.scale.width / 2,
            this.scale.height / 4,
            `player${imageplayers[datas.number - 1]}`)
            .setDisplaySize(imgPlayerSize, imgPlayerSize);

    }
    createOranges() {
        if (datas.showOrange === 2 || datas.position === 0) {
            this.createOrangeP1(); // สร้างส้ม P1
            this.createOrangeP2(); // สร้างส้ม P2
        }
        else if (datas.showOrange === 1 && datas.position === 'P1') {
            this.createOrangeP1(); // สร้างส้ม P1
        }
        else if (datas.showOrange === 1 && datas.position === 'P2') {
            this.createOrangeP2(); // สร้างส้ม P2
        }

    }
    createOrangeP1() {
        // ขนาดของส้ม
        const orangeSize = Math.min(this.scale.width, this.scale.height) * 0.2;

        // สร้าง Sprite ของส้ม P1
        this.orangeP1 = this.physics.add.sprite(
            this.scale.width / 1.5,
            this.scale.height / 2,
            `${this.dataOrange.orangeP1}`
        );

        // ทำให้ Sprite P1 สามารถโต้ตอบได้
        this.orangeP1.setInteractive()
            .setDisplaySize(orangeSize, orangeSize);
    }
    createOrangeP2() {
        // ขนาดของส้ม
        const orangeSize = Math.min(this.scale.width, this.scale.height) * 0.2;

        // สร้าง Sprite ของส้ม P2
        this.orangeP2 = this.physics.add.sprite(
            this.scale.width / 3,
            this.scale.height / 2,
            `${this.dataOrange.orangeP2}`
        );

        // ทำให้ Sprite P2 สามารถโต้ตอบได้
        this.orangeP2.setInteractive()
            .setDisplaySize(orangeSize, orangeSize);
    }
    crateBtns() {
        const btnSize = Math.min(this.scale.width * 0.2, this.scale.height * 0.2);
        this.createBtnRight(btnSize)
        this.createBtnLeft(btnSize)
    }
    createBtnRight(btnSize) {
        this.btnRight = this.add.image(
            this.scale.width / 1.2,
            this.scale.height / 1.2,
            'btnright'
        ).setDisplaySize(btnSize, btnSize)
            .setInteractive()

    }
    createBtnLeft(btnSize) {
        this.btnLeft = this.add.image(
            this.scale.width / 6,
            this.scale.height / 1.2,
            'btnletf'
        ).setDisplaySize(btnSize, btnSize)
            .setInteractive()
    }
    buttonEffect(gameObject) {
        const btnSizeNew = Math.min(this.scale.width * 0.25, this.scale.height * 0.25);
        const btnSizeOld = Math.min(this.scale.width * 0.2, this.scale.height * 0.2);
        gameObject.setDisplaySize(btnSizeNew, btnSizeNew)
        this.time.delayedCall(100, () => {
            gameObject.setDisplaySize(btnSizeOld, btnSizeOld)
        }, [], this)
    }
    expand(gameObject) {
        const expandSize = Math.min(this.scale.width * 0.4, this.scale.width * 0.4);
        gameObject.setDisplaySize(expandSize, expandSize)
    }
    narrow(gameObject) {
        const narrowSize = Math.min(this.scale.width, this.scale.width) * 0.2;
        if (gameObject === this.orangeP1) {
            if (this.orangeP2) this.orangeP2.setDisplaySize(narrowSize, narrowSize)
        }
        else if (gameObject === this.orangeP2) {
            if (this.orangeP1) this.orangeP1.setDisplaySize(narrowSize, narrowSize)
        } else if (gameObject === this.imgbg) {
            if (this.orangeP1) this.orangeP1.setDisplaySize(narrowSize, narrowSize)
            if (this.orangeP2) this.orangeP2.setDisplaySize(narrowSize, narrowSize)
        } else {
            return
        }
    }
    selectObject(gameObject) {
        if (Object.keys(this.select).length > 0) {
            this.select = {}
        }
        this.select = { gameObject }
    }
    newOrange() {

        if (this.orangeP1 || this.orangeP2) {
            if (!this.orangeP1) {
                this.dataOrange.orangeP1 = objects.textureKey
                this.createOrangeP1()
            } else if (!this.orangeP2) {
                this.dataOrange.orangeP2 = objects.textureKey
                this.createOrangeP2()
            } else {
                console.log('orangeP1 and orangeP2 stay')
                emitReceiveOrange()
            }
        }

    }
    emitWin() {
        emitWin()
    }
    action(pointer, gameObject) {
        if (gameObject === this.orangeP1) {
            console.log('click orangeP1');
            this.expand(gameObject)
            this.narrow(gameObject)
            this.select = { gameObject }
            this.selectObject(gameObject)
        } else if (gameObject === this.orangeP2) {
            console.log('click orangeP2');
            this.expand(gameObject)
            this.narrow(gameObject)
            this.selectObject(gameObject)
        } else if (gameObject === this.btnLeft) {
            console.log('clicked btnleft')
            this.buttonEffect(gameObject)
            if (this.orangeP1 && this.orangeP2) {
                if (this.select.gameObject) {
                    console.log(this.select.gameObject);
                    emitData(this.select.gameObject, 'left')
                    if (this.select.gameObject === this.orangeP1) {
                        this.orangeP1.destroy()
                        this.orangeP1 = null
                    }
                    else if (this.select.gameObject === this.orangeP2) {
                        this.orangeP2.destroy()
                        this.orangeP2 = null
                    }
                }
            }

        } else if (gameObject === this.btnRight) {
            console.log('clicked btnRight')
            this.buttonEffect(gameObject)
            if (this.orangeP1 && this.orangeP2) {
                if (this.select.gameObject) {
                    emitData(this.select.gameObject, 'right')
                    if (this.select.gameObject === this.orangeP1) {
                        this.orangeP1.destroy()
                        this.orangeP1 = null
                    }
                    else if (this.select.gameObject === this.orangeP2) {
                        this.orangeP2.destroy()
                        this.orangeP2 = null
                    }
                }
            }
        } if (gameObject === this.imgbg) {
            console.log('click bg')
            this.narrow(gameObject)
        }

    }

    update() {
        // You can handle game state updates here
        this.textNumber.setText(`หมายเลข: ${datas.number} `);
        if (objects.textureKey) {
            this.newOrange()
            objects = {}
        }
        if (objected.textureKey) {
            console.log('objected', objected)
            if (objected.x === this.orangeP1.x) {
                this.dataOrange.orangeP1 = objected.textureKey
                this.createOrangeP1()
            } else if (objected.x === this.orangeP2.x) {
                this.dataOrange.orangeP2 = objected.textureKey
                this.createOrangeP2()
            }
            objected = {}
        }

        if ((!isWIN && this.orangeP1 && this.orangeP1.texture.key === orangesId[datas.number - 1]) ||
            (!isWIN && this.orangeP2 && this.orangeP2.texture.key === orangesId[datas.number - 1])) {
            this.emitWin()
        }
        

    }
}

