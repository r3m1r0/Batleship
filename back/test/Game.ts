import { expect } from "chai";
import { ethers } from "hardhat";

describe("BatailleNavale", function () {

    let batailleNavale: any;
    let player1: any;
    let player2: any;

    beforeEach(async function () {
        const BatailleNavale = await ethers.getContractFactory("BatailleNaval");
        batailleNavale = await BatailleNavale.deploy();
        await batailleNavale.deployed();

        [player1, player2] = await ethers.getSigners();
    });

    it("doit être déployé", async function () {
        expect(await batailleNavale.deployed()).to.equal(batailleNavale);
    });

    it("doit permettre à 2 joueur de se connecter", async function () {
        await batailleNavale.joinGame();
        await batailleNavale.connect(player2).joinGame();

        const Player1 = await batailleNavale.player1();
        const Player2 = await batailleNavale.player2();

        expect(Player1).to.equal(player1.address);
        expect(Player2).to.equal(player2.address);
    });

    it("doit permettre d'ajouter un bateau", async function () {
        await batailleNavale.joinGame();
        await batailleNavale.connect(player2).joinGame();

        await batailleNavale.placeShip(1, 4, 4, true);
        await batailleNavale.connect(player2).placeShip(3, 6, 3, false);

        const Bateau1 = await batailleNavale.getShips(player1.address);
        const Bateau2 = await batailleNavale.getShips(player2.address);

        expect(Bateau1[0].x).to.equal(4);
        expect(Bateau1[0].y).to.equal(4);
        expect(Bateau1[0].size).to.equal(1);
        expect(Bateau1[0].horizontal).to.equal(true);

        expect(Bateau2[0].x).to.equal(6);
        expect(Bateau2[0].y).to.equal(3);
        expect(Bateau2[0].size).to.equal(3);
        expect(Bateau2[0].horizontal).to.equal(false);

    });
});


