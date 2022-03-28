impl Solution {
    pub fn is_bipartite(graph: Vec<Vec<i32>>) -> bool {
        let mut ok = true;
        let n = graph.len();
        let mut visited = vec![false; n];
        let mut colors = vec![false; n];
        fn traverse(graph: &Vec<Vec<i32>>, mut visited: &mut Vec<bool>, mut ok: &mut bool, mut colors: &mut Vec<bool>, start: i32) {
            if !*ok {
                return;
            }
            let idx = start as usize;
            for &neighbor in &graph[idx] {
                let neighbor_idx = neighbor as usize;
                if !visited[neighbor_idx] {
                    visited[neighbor_idx] = true;
                    colors[neighbor_idx] = !colors[idx];
                    traverse(&graph, &mut visited, &mut ok, &mut colors, neighbor);
                } else {
                    if colors[neighbor_idx] == colors[idx] {
                        *ok = false;
                    }
                }
            }
        }
        for i in 0..n {
            traverse(&graph, &mut visited, &mut ok, &mut colors, i as i32);
        }
        return ok;
    }
}
