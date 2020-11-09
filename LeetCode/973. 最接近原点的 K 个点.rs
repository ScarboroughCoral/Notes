use std::collections::BinaryHeap;
impl Solution {
    pub fn k_closest(points: Vec<Vec<i32>>, k: i32) -> Vec<Vec<i32>> {
        let mut heap = BinaryHeap::new();
        for v in points {
            let distance = v[0].pow(2) + v[1].pow(2);
            if heap.len() < k as usize {
                heap.push((distance,v));
            } else if heap.peek().unwrap().0 > distance {
                heap.pop();
                heap.push((distance,v));
            }
        }
        heap.into_vec().into_iter().map(|kv| kv.1).collect()
    }
}
