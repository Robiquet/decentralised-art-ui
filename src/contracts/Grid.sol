pragma solidity >=0.7.0 <0.9.0;

contract Grid {
    string[] public colours = [''];
    uint256 public rows;
    uint256 public cols;

    constructor(uint256 _rows, uint256 _cols) {
        rows = _rows;
        cols = _cols;
        for (uint i = 1; i < _rows * _cols; i++) {
            colours.push('');
        }
        
    }
    
    function getColour(uint index) public view returns (string memory) {
        return colours[index];
    }
    
    function setColour(uint index, string memory colour) public {
        colours[index] = colour;
    }
    
    function getColours() public view returns (string[] memory) {
        return colours;
    }
}