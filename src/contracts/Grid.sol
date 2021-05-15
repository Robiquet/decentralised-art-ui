pragma solidity >=0.7.0 <0.9.0;

contract Grid {
    uint256 public rows;
    uint256 public cols;

    constructor(uint256 _rows, uint256 _cols) {
        rows = _rows;
        cols = _cols;
    }
}