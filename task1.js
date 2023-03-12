const add = (n) => {
    const addNext = (x) => {
      return add(n + x);
    };
  
    addNext.valueOf = () => {
      return n;
    };
  
    return addNext;
  }

console.log(add(1)(2)(3) == 6)