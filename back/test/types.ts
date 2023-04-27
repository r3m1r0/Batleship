enum Direction {
    HORIZONTAL,
    VERTICAL
}
enum Name {
    CARRIER,
    BATTLESHIP,
    CRUISER1,
    CRUISER2,
    DESTROYER
}
enum Kind {
    CARRIER,
    BATTLESHIP,
    CRUISER,
    DESTROYER
}
function* NameIterator() {
    yield Name.CARRIER
    yield Name.BATTLESHIP
    yield Name.CRUISER1
    yield Name.CRUISER2
    yield Name.DESTROYER
}
interface Coord {
    row: number;
    col: number;
}
interface Boat {
    exist: boolean,
    topLeft: Coord;
    direction: Direction;
    kind: Kind;
}
enum State {
    UNKNOWN,
    MISSED,
    HIT,
    SUNK
}
interface Try {
    id: number;
    coord: Coord;
    tryTime: number;
    state: State;
    answerTime: number;
}
export { Direction, Kind, Coord, Boat, State, Try,Name, NameIterator }