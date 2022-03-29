use std::collections::VecDeque;
impl Solution {
    pub fn is_bipartite(graph: Vec<Vec<i32>>) -> bool {
        let mut ok = true;
        let n = graph.len();
        let mut visited = vec![false; n];
        let mut colors = vec![false; n];
        for i in 0..n {
            Solution::bfs(&graph, &mut ok, i, &mut visited, &mut colors);
        }
        return ok;
    }
    pub fn bfs(graph: &Vec<Vec<i32>>, ok: &mut bool, start: usize, mut visited: &mut Vec<bool>, mut colors: &mut Vec<bool>) {
        if !*ok {
            return;
        }
        let mut q = VecDeque::new();
        q.push_back(start);
        visited[start] = true;
        while q.len() != 0 {
            let cur = q.pop_front().unwrap();
            for &next in &graph[cur] {
                let next_idx = next as usize;
                if visited[next_idx] {
                    if colors[next_idx] == colors[cur] {
                        *ok = false;
                        return;
                    }
                } else {
                    colors[next_idx] = !colors[cur];
                    visited[next_idx] = true;
                    q.push_back(next_idx);
                }
            }
        }
    }
}
