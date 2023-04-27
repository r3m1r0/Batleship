import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Game } from "../typechain-types";
import { Boat, Direction, Kind, Name, NameIterator, State } from "./types";
import { inspect } from "util"

describe("Game", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployGame() {

        // Contracts are deployed using the first signer/account by default
        const [player1, player2] = await ethers.getSigners();

        const Game = await ethers.getContractFactory("Game");
        const game = await Game.deploy(player1.address, player2.address, player1.address);

        const boats = [
            {
                exist: true,
                direction: Direction.HORIZONTAL,
                topLeft: {
                    row: 0,
                    col: 0,
                },
                kind: Kind.BATTLESHIP
            },
            {
                exist: true,
                direction: Direction.HORIZONTAL,
                topLeft: {
                    row: 0,
                    col: 0,
                },
                kind: Kind.CARRIER
            },

            {
                exist: true,
                direction: Direction.HORIZONTAL,
                topLeft: {
                    row: 1,
                    col: 0,
                },
                kind: Kind.BATTLESHIP
            },
            {
                exist: true,
                direction: Direction.HORIZONTAL,
                topLeft: {
                    row: 2,
                    col: 0,
                },
                kind: Kind.CRUISER
            },
            {
                exist: true,
                direction: Direction.HORIZONTAL,
                topLeft: {
                    row: 3,
                    col: 0,
                },
                kind: Kind.CRUISER
            },
            {
                exist: true,
                direction: Direction.HORIZONTAL,
                topLeft: {
                    row: 4,
                    col: 0,
                },
                kind: Kind.DESTROYER
            }
        ]
        return { game, player1, player2, boats };
    }

    describe("Deployment", function () {
        it("Should deploy", async function () {
            const { game, player1 } = await loadFixture(deployGame);
            expect(await game.getCurrentPlayer()).to.equal(player1.address);
        });
    });

    describe("Execution", function () {
        describe("Boats positionning", function () {
            it("Should add a boat", async function () {
                const { game, player2 } = await loadFixture(deployGame);
                const battleship: Boat = {
                    exist: true,
                    direction: Direction.HORIZONTAL,
                    topLeft: {
                        row: 3,
                        col: 5,
                    },
                    kind: Kind.BATTLESHIP
                }
                const cruiser: Boat = {
                    exist: true,
                    direction: Direction.VERTICAL,
                    topLeft: {
                        row: 6,
                        col: 0,
                    },
                    kind: Kind.CRUISER
                }
                await game.placeBoat(Name.BATTLESHIP, battleship)
                await game.placeBoat(Name.CRUISER1, cruiser)
                const boats = await getBoats(game);
                expect(boats.length).to.eql(2)

                const cruiser2: Boat = {
                    exist: true,
                    direction: Direction.VERTICAL,
                    topLeft: {
                        col: 0,
                        row: 5
                    },
                    kind: Kind.CRUISER
                }
                const cruiser3: Boat = {
                    exist: true,
                    direction: Direction.HORIZONTAL,
                    topLeft: {
                        col: 5,
                        row: 1
                    },
                    kind: Kind.CRUISER
                }
                const gamePlayer2 = game.connect(player2)
                await gamePlayer2.placeBoat(Name.CRUISER1, cruiser2)
                await gamePlayer2.placeBoat(Name.CRUISER2, cruiser3)
                const boatsPlayer2 = await getBoats(gamePlayer2);
                expect(boatsPlayer2.length).to.eql(2)
            });
            it("Should not add overlapping boats", async function () {
                const { game } = await loadFixture(deployGame);
                const battleship: Boat = {
                    exist: true,
                    direction: Direction.HORIZONTAL,
                    topLeft: {
                        col: 5,
                        row: 3
                    },
                    kind: Kind.BATTLESHIP
                }
                const cruiser: Boat = {
                    exist: true,
                    direction: Direction.VERTICAL,
                    topLeft: {
                        col: 5,
                        row: 3
                    },
                    kind: Kind.CRUISER
                }
                await game.placeBoat(Name.BATTLESHIP, battleship)
                try {
                    await game.placeBoat(Name.CRUISER1, cruiser)
                    expect("no collision detected").to.equal("collision should have been detected")
                }
                catch (err: any) {
                    let reason = /.+\s'(?<reason>.+)'/.exec(err.message)?.groups?.reason
                    expect(reason).to.equal("boat collides with existing boat!")
                }
            });
            it("must hit", async () => {
                const { game, player1, player2, boats } = await loadFixture(deployGame);
                game.placeBoat(Name.CARRIER, boats[0])
                game.placeBoat(Name.BATTLESHIP, boats[1])
                game.placeBoat(Name.CRUISER1, boats[2])
                game.placeBoat(Name.CRUISER2, boats[3])
                game.placeBoat(Name.DESTROYER, boats[4])
                const game2 = game.connect(player2)
                game2.placeBoat(Name.CARRIER, boats[0])
                game2.placeBoat(Name.BATTLESHIP, boats[1])
                game2.placeBoat(Name.CRUISER1, boats[2])
                game2.placeBoat(Name.CRUISER2, boats[3])
                game2.placeBoat(Name.DESTROYER, boats[4])

                await game.hit({ row: 0, col: 0 })
                let id = await game.getCurrentHitId()

                expect(id).to.equal(1)

                await game2.completeHit(id, State.MISSED)
                id = await game.getCurrentHitId()
                expect(id).to.equal(2)

            })
        });

        describe("Events", function () {
            it("Should emit an event on withdrawals", async function () {
                const { game, player1 } = await loadFixture(deployGame);

                //TODO
            });
        });
    });
});
async function getBoats(game: Game) {
    const boats = [];
    for (const kind of NameIterator()) {
        const boat = await game.getBoat(kind);
        if (boat.exist) {
            boats.push(boat);
        }
    }
    return boats;
}

