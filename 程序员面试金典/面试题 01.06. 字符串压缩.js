
/**===========================================正则解法
 * @param {string} S
 * @return {string}
 */
var compressString = function(S) {
  let encoded=(S.match(/([a-zA-Z])\1*/g)||[]).map(x=>`${x[0]}${x.length}`).join('');
  return S.length>encoded.length?encoded:S;
};


/**==========================================双指针解法
 * @param {string} S
 * @return {string}
 */
var compressString = function(S) {
  let result=[];
  let i=0,j=0;
  while(j<S.length){
      if(S[j]===S[i]) j++;
      else {
          result.push(S[i],j-i);
          i=j;
          j++;
      }
  }
  result.push(S[i],j-i);
  let encoded=result.join('');
  return encoded.length>=S.length?S:encoded
};