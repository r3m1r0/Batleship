pragma solidity ^0.8.0;

contract BattleShip {
    struct Ship {
        uint x;
        uint y;
        bool isPlaced;
        bool isHit;
    }

    //mapping(uint8 => mapping(uint8 => Ship)) public grille;

    mapping(address => Ship[3]) public playerShips;
    address public player1;
    address public player2;
    bool public gameStarted;

    event GameStarted(address indexed player1, address indexed player2);
    event ShipPlaced(address indexed player, uint shipIndex, uint x, uint y);
    event AttackResult(
        address indexed attacker,
        address indexed defender,
        uint x,
        uint y,
        bool isHit
    );

    function joinGame() public {
        if (player1 == address(0)) {
            player1 = msg.sender;
        } else {
            player2 = msg.sender;
            emit GameStarted(player1, player2);
        }
    }

    function placeShip(uint shipIndex, uint x, uint y) public {
        Ship storage ship = playerShips[msg.sender][shipIndex];
        ship.x = x;
        ship.y = y;
        ship.isPlaced = true;
        emit ShipPlaced(msg.sender, shipIndex, x, y);
    }

    function attack(uint x, uint y) public {
        bool isHit = false;
        for (uint i = 0; i < Ship.length; i++) {
            if (Ship.isPlaced && !Ship.isHit && Ship.x == x && Ship.y == y) {
                Ship.isHit = true;
                isHit = true;
                break;
            }
        }
    }
}
