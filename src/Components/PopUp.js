import React from 'react';
import { Button } from 'antd';
// import jsPDF from 'jspdf';
import 'jspdf-autotable';

 export  function Popup ({ onOption1, onOption2 }) {
  return (
    <div>
      <Button onClick={onOption1}>Current View</Button>
      <Button onClick={onOption2} style={{ marginLeft: '10px' }}>
        Selected Records
      </Button>
    </div>
  );
};
export  function Popup1 ({ onOption3, onOption4 }) {
  return (
    <div>
      <Button onClick={onOption3}>Current View</Button>
      <Button onClick={onOption4} style={{ marginLeft: '10px' }}>
        Selected Records
      </Button>
    </div>
  );
};
export  function Popup2 ({ onOption5, onOption6 }) {
  return (
    <div>
      <Button onClick={onOption5}>Current View</Button>
      <Button onClick={onOption6} style={{ marginLeft: '10px' }}>
        Selected Records
      </Button>
    </div>
  );
};


