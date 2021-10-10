/**
 * The knows API is defined in the parent class Relation.
 * isBadVersion(version: number): boolean {
 *     ...
 * };
 */

var solution = function(isBadVersion: any) {

    return function(n: number): number {
        let l = 1, r = n;
        while (l <= r) {
            let mid = l + Math.floor((r - l) / 2);
            const midVal = isBadVersion(mid);
            if (mid === 1 && midVal === true) return mid;
            const midLastVal = isBadVersion(mid - 1);
            if (midVal === true && midLastVal === false) return mid;
            if (midVal === true) r = mid;
            else l = mid + 1;
        }
        return -1;
    };
};
