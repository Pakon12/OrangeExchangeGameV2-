class StartGame extends Phaser.Scene {
    constructor() {
        super({ key: 'StartGameScene' });
    }
    init() {
    }

    create() {
        this.background(); // ฟังก์ชันสร้างแบ็คกราวด์
        this.createBtnStart(); // ฟังก์ชันสร้างส้ม
        this.createText(); // ฟังก์ชันสร้างข้อความคะแนน

    }
    background() {
        this.add
            .image(this.scale.width / 2, this.scale.height / 2, "background")
            .setOrigin(0.5, 0.5)
            .setDisplaySize(this.scale.width, this.scale.height)// สร้างแบ็คกราวด์
    }
    createText() {
        const xxx = 6
        const xx = 1
        this.NumbersText = this.add.text(
            this.scale.width / 10,
            this.scale.height / 10,
            `จำนวนผู้เล่น: ${lengthPlayers} `,
            {
                fontSize: '35px Arial ',
                fill: '#ffffff'
            }
        );
        this.numberText = this.add.text(
            this.scale.width / 10,
            this.scale.height / 7,
            `หมายเลข: ${this.number} `,
            {
                fontSize: '35px Arial ',
                fill: '#ffffff'
            }
        );
    }
    createBtnStart() {
        const btnStartSize = Math.min(this.scale.width, this.scale.height) * 0.15;
        this.btnStart = this.physics.add.sprite(
            this.scale.width / 2,
            this.scale.height / 2,
            'btnStart'
        );
        this.btnStart.setDisplaySize(btnStartSize, btnStartSize);

        // ตั้งค่าการคลิก
        this.btnStart.setInteractive();
        this.input.on('gameobjectup', this.action, this);

    }
    action(pointer, gameObject) {
        gameObject.setTint(0xff0000); // เปลี่ยนสีเมื่อคลิก
        this.scene.start('GameScene');

    }
    update() {
        // อัพเดตสถานะของเกมที่นี่
        this.newText()
    }

    newText(){
        this.NumbersText.setText(`จำนวนผู้เล่น: ${lengthPlayers} `);
        this.numberText.setText(`หมายเลข: ${datas.number} `);
    }
}

