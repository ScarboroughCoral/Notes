var minWindow = function(s: string, t: string): string {
  let tFreq=new Map();
  for(let c of t){
      tFreq.set(c,tFreq.has(c)?tFreq.get(c)+1:1);
  }
  let begin=0,minLen=s.length+1;
  let l=0,r=0;
  let d=t.length;
  while(r<s.length){
      let rc=s[r];
      if(!tFreq.has(rc)){
          r++;
          continue;
      }
      if(tFreq.get(rc)>0){
          d--;
      }
      tFreq.set(rc,tFreq.get(rc)-1);
      r++;
      while(d===0){
          let lc=s[l];
          if(!tFreq.has(lc)){
              l++;
              continue;
          }
          if(r-l<minLen){
              minLen=r-l;
              begin=l;
          }
          if(tFreq.get(lc)===0){
              d++;
          }
          tFreq.set(lc,tFreq.get(lc)+1);
          l++;
      }
  }
  return (minLen===s.length+1)?"":s.substr(begin,minLen);
};