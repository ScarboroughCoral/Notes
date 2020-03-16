// ======================方法1，contains的效率是否有问题？
function commonParentNode(oNode1, oNode2) {
  for(;oNode1;oNode1=oNode1.parentNode){
      if(oNode1.contains(oNode2)){
          return oNode1;
      }
  }
}

// ======================================方法2，使用set
function commonParentNode(oNode1, oNode2) {
  if(oNode1===oNode2) return oNode1;
  let s=new Set();
  while(!s.has(oNode1)&&!s.has(oNode2)){
       s.add(oNode1);
       s.add(oNode2);
       if(oNode1.parentNode) oNode1=oNode1.parentNode;
       if(oNode2.parentNode) oNode2=oNode2.parentNode;
  }
  return s.has(oNode1)?oNode1:oNode2;
}