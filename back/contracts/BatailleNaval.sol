// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BatailleNaval {
    address public player1;
    address public player2;

    constructor(address _player1, address _player2) payable {
        player1 = _player1;
        player2 = _player2;
    }

    // mapping(address => Boat[]) public playerBoats;

    // function placeBoat(Boat memory bateau) {
    //         for (uint8 x = 0; x < 9; x++) {
    //             for (uint8 y = 0; y < 9; y++) {

    //             }
    //     }

    // function addBoat(
    //     Name _name,
    //     Coord memory _coord,
    //     Direction _direction,
    //     Kind _kind
    // ) public {
    //     Boat memory newBoat = Boat(true, _name, _coord, _direction, _kind);
    //     playerBoats[msg.sender].push(newBoat);
    // }

    // function getCurrentPlayer() public view returns (address) {
    //     if (msg.sender == player1) {
    //         return player2;
    //     } else {
    //         return player1;
    //     }
    // }

    // function switchPlayer() private {
    //     if (currentPlayer == player1) {
    //         currentPlayer = player2;
    //     } else {
    //         currentPlayer = player1;
    //     }
    // }

    // function getBoatLength(Kind _kind) external view returns (uint8) {
    //     if (_kind == Kind.CARRIER) {
    //         return 5;
    //     } else if (_kind == Kind.BATTLESHIP) {
    //         return 4;
    //     } else if (_kind == Kind.CRUISER) {
    //         return 3;
    //     } else {
    //         return 2;
    //     }
    // }
}
