impl Solution {
    pub fn sort_array_by_parity_ii(a: Vec<i32>) -> Vec<i32> {
        let mut a = a.clone();
        let (mut even, mut odd) = (0, 1);
        while even < a.len() && odd < a.len() {
            while even < a.len() && a[even] % 2 == 0 {
                even += 2;
            }
            while odd < a.len() && a[odd] % 2 == 1 {
                odd += 2;
            }
            if odd >= a.len() || even >= a.len() {
                return a;
            }
            let tmp = a[even];
            a[even] = a[odd];
            a[odd] = tmp;
        }
        a
    }
}
