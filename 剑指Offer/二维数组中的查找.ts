/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 
 * @param target int整型 
 * @param array int整型二维数组 
 * @return bool布尔型
 */
export function Find(target: number, array: number[][]): boolean {
    // write code here
    const h = array.length;
    const w = array?.[0].length || -1;
    let i = w-1;
    let j = 0;
    while (i >= 0 && j < h) {
        if (array[j][i] === target) {
            return true;
        }
        if (array[j][i] > target) {
            i--;
            continue;
        }
        j++;
    }
    return false;
}
