// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BatailleNaval {
    struct Ship {
        uint8 x;
        uint8 y;
        bool horizontal;
        uint8 size;
    }

    mapping(address => Ship[]) public playerShips;

    address public player1;
    address public player2;
    bool public gameStarted;
    address public currentPlayer;

    event GameStarted(address player1, address player2);
    event AttackResult(address attacker, uint8 x, uint8 y, bool isHit);
    event ShipPlaced(
        address player,
        uint8 x,
        uint8 y,
        bool horizontal,
        uint8 size
    );

    function joinGame() public {
        if (player1 == address(0)) {
            player1 = msg.sender;
        } else {
            player2 = msg.sender;
            currentPlayer = player1;
            emit GameStarted(player1, player2);
        }
    }

    function placeShip(
        uint8 _size,
        uint8 _x,
        uint8 _y,
        bool isHorizontal
    ) public {
        require(_y < 10, "Le bateau depasse les limites de jeux");
        require(_x < 10, "Le bateau depasse les limites de jeux");
        require(_size < 4, "Le bateau ne doit pas etre superieur a 3 case");
        require(_size > 0, "Le bateau ne doit pas etre inferieur a 0 case");

        Ship memory newShip = Ship(_x, _y, isHorizontal, _size);
        playerShips[msg.sender].push(newShip);

        emit ShipPlaced(msg.sender, _x, _y, isHorizontal, _size);
    }

    // function attack(uint x, uint y) public {
    //     bool isHit = false;
    //     for (uint i = 0; i < Ship.size; i++) {
    //         if (Ship.isPlaced && !Ship.isHit && Ship.x == x && Ship.y == y) {
    //             Ship.isHit = true;
    //             isHit = true;
    //             break;
    //         }
    //     }
    // }

    function getShips(address _player) public view returns (Ship[] memory) {
        return playerShips[_player];
    }
}
