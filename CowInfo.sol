pragma solidity ^0.4.18;

contract Owned {
    address owner;
    
    function Owned() public {
        owner = msg.sender;
    }
    
   modifier onlyOwner {
       require(msg.sender == owner);
       _;
   }
}

contract CowInfo is Owned {
    
    struct Instructor { 
       
        string cowID;
        string data;
       
    }
    
    mapping (uint => Instructor) instructors;
    uint[]  instructorAccts;
    uint256 Count = 0;
    
    event instructorInfo(
       string data,
       string cowID
    );
    
    function setInstructor(address _address, string _cowID, string _data) onlyOwner public {
        var instructor = instructors[Count];
        
        instructor.cowID = _cowID;
        instructor.data = _data;
       
        instructorAccts.push(Count) -1;
        instructorInfo( _data, _cowID);
        Count++;
    }
    
  
   
     function getInfoAt(uint ID) public view returns (string,string) {
       
      return(instructors[ID].cowID, instructors[ID].data);
     
   }
   
    
     function getCowInfoById(string Id) public view returns (string) { //get last
       uint CowInfoIndex = 0;
       for (uint ci = 0; ci <= Count; ci++) {
           if (stringsEqual(instructors[ci].cowID,Id))
           {
               CowInfoIndex = ci;
              
           }
       }
      return(instructors[CowInfoIndex].data);
     
   }
     function findID(string Id) public view returns(uint[]) {
        uint counter = 0;
        for (uint i = 0; i < Count; i++) {
            if (stringsEqual(instructors[i].cowID,Id))
            
           {
              counter++;
              
           }
        }
        uint[] memory v = new uint[](counter);
         uint counter1 = 0;
        for ( i = 0;i < Count; i++) {
           if (stringsEqual(instructors[i].cowID,Id))
           {
                v[counter1] = i;
                counter1++;
            }
        }

        return v;

    }

    function countInstructors() view public returns (uint) {
        return instructorAccts.length;
    }
    
    function stringsEqual(string storage _a, string memory _b) internal view returns (bool) {
       bytes storage a = bytes(_a);
       bytes memory b = bytes(_b);
       if (a.length != b.length)
           return false;
       // @todo unroll this loop
       for (uint i = 0; i < a.length; i ++)
           if (a[i] != b[i])
               return false;
       return true;
   }
    
}
