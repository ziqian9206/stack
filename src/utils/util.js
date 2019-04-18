export function toDecimal(x) { 
    var f = parseFloat(x); 
    if (isNaN(f)) { 
     return 0; 
    } 
    f = Math.round(x*100)/100; 
    return f; 
   } 