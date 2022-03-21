impl Solution {
    pub fn find_order(num_courses: i32, prerequisites: Vec<Vec<i32>>) -> Vec<i32> {
        let mut result = vec![];
        let mut graph = vec![Vec::new(); num_courses as usize];
        let mut on_path = vec![false; num_courses as usize];
        let mut visited = vec![false; num_courses as usize];
        let mut has_circle = false;
        for pair in &prerequisites[..] {
            if let &[cur, pre] = &pair[..] {
                graph[pre as usize].push(cur);
            }
        }
        fn traverse(graph: &Vec<Vec<i32>>, mut on_path: &mut Vec<bool>, mut visited: &mut Vec<bool>, mut has_circle: &mut bool, mut result: &mut Vec<i32>, start: i32) {
            let idx = start as usize;
            if on_path[idx] {
                *has_circle = true;
            }
            if *has_circle || visited[idx] {
                return;
            }
            on_path[idx] = true;
            visited[idx] = true;
            for &x in &graph[idx] {
                traverse(&graph, &mut on_path, &mut visited, &mut has_circle, &mut result, x);
            }
            result.push(start);
            on_path[idx] = false;
        }
        for x in 0..num_courses {
            traverse(&graph, &mut on_path, &mut visited, &mut has_circle, &mut result, x);
        }
        if has_circle {
            return vec![];
        }
        return result.into_iter().rev().collect();
    }
}
