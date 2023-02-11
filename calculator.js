let flag1=0;
let flag2=0;
let dot=0;

let isOperator1=(num)=>{
    if(num==='*'||num==='/'||num==='!'||num==='%'||num==='^'){return true;}
}

let isdot=(num)=>{
    if(num==='.'){return true;}
}

let isOperator2=(num)=>{
    if(num==='+'||num==='-'){return true;}
}

function insert(num) {
    console.log(flag1,flag2,dot);

    if(isdot(num))
        dot++;
    else{
        if(isOperator1(num)){
            flag1++;dot=0;}
        else{
            if(isOperator2(num)){
                flag2++;dot=0;
                if(flag1>0){
                    flag2++;}
            }
            else{
                flag1=0;
                flag2=0;
            }  
            dot=(dot>1)?1:dot;  
        }
    }
    
    
   
    // document.form1.textview.value += num;
    if(flag1<=1 && flag2<=2 && dot<=1){
        document.getElementById('input').value+=num;}
}

let clearAll=()=>{
    document.getElementById('input').value='';
    dot=0;
}

let reset=()=>{
    document.getElementById('input').value='';
    document.getElementById('result').value='';
    flag1=0;flag2=0; dot=0;

}

let del=()=>{
    let s=document.getElementById('input');
    let val=s.value;
    if(isOperator1(val[val.length-1])){flag1--;}
    if(isOperator2(val[val.length-1])){flag2--;}
    if(isdot(val[val.length-1])){dot--;}
    document.getElementById('input').value=s.value.slice(0,-1);
}

let clearHistory=()=>{
    document.getElementById('result').value='';
}

function calculate(input) {

    let f = {
      add: '+',
      sub: '-',
      div: '/',
      mlt: '*',
      mod: '%',
      exp: '^',
      factorial:'!'
    };
  
    // Create array for Order of Operation and precedence
    f.ooo = [
      [
        [f.factorial]
      ],
      [
        [f.exp],
        [f.mod]
      ],
      [
        [f.div],
        [f.mlt] 
      ],
      [
        [f.add],
        [f.sub]
      ]
    ];

    if(input[0]==='-'){

        input='0'+input;
        console.log(input);
    }
    
    input = input.replace(/[^0-9%^!*\/()\-+.]/g, '');

  
    let output;
    for (var i = 0, n = f.ooo.length; i < n; i++) {
  
      // Regular Expression to look for operators between floating numbers or integers
      let re = new RegExp('(\\d+\\.?\\d*)([\\' + f.ooo[i].join('\\') + '])([-+]?\\d+\\.?\\d*)?');
      re.lastIndex = 0; // take precautions and reset re starting pos
        console.log(re);
        
        // if(input[input.length-1]==='!'){
        //     input+='0';
        // }
        
      // Loop while there is still calculation for level of precedence
      while (re.test(input)) {
        
        // output = _calculate(RegExp.$1, RegExp.$2);
        console.log(RegExp.$1,RegExp.$2,RegExp.$3);
        output = _calculate(RegExp.$1, RegExp.$2, RegExp.$3);
        if (isNaN(output) || !isFinite(output)) 
          return output; // exit early if not a number
        console.log(output);
        if(output==='undefined')
            output='Error!';
        input = input.replace(re, output);
      }
    }

    if(output===undefined)
            output='Error!';
    return output;
  
    function _calculate(a, op, b="1") {
      a = a * 1;
      b = b * 1;
      switch (op) {
        case f.add:
          return a + b;
          break;
        case f.sub:
          return a - b;
          break;
        case f.div:
          return a / b;
          break;
        case f.mlt:
          return a * b;
          break;
        case f.mod:
          return a % b;
          break;
        case f.exp:
          return Math.pow(a, b);
          break;
        case f.factorial:
        {    a=a*1;
            let fact=1;
            if(op===f.factorial){
                while(a>0){
                fact*=a;
                a--; 
                }
            }
            console.log(fact);
            return fact;
            break;}
        default:
          null;
      }
    }
  }


  // The current position of mouse
let x = 0;
let y = 0;

// Query the element
const ele = document.getElementById('dragMe');

// Handle the mousedown event
// that's triggered when user drags the element
const mouseDownHandler = function (e) {
    // Get the current mouse position
    x = e.clientX;
    y = e.clientY;

    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - x;
    const dy = e.clientY - y;

    // Set the position of element
    ele.style.top = `${ele.offsetTop + dy}px`;
    ele.style.left = `${ele.offsetLeft + dx}px`;

    // Reassign the position of mouse
    x = e.clientX;
    y = e.clientY;
};

const mouseUpHandler = function () {
    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

ele.addEventListener('mousedown', mouseDownHandler);