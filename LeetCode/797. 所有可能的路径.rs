impl Solution {
    pub fn all_paths_source_target(graph: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let mut result = vec![];
        fn traverse(graph: &Vec<Vec<i32>>, start: i32, mut path: &mut Vec<i32>, mut result: &mut Vec<Vec<i32>>) {
            path.push(start);
            let n = graph.len() as i32;
            if start == n - 1 {
                result.push(path.clone());
                path.pop();
                return;
            }
            for &x in &graph[start as usize] {
                traverse(&graph, x, &mut path, &mut result);
            }
            path.pop();
        }
        traverse(&graph, 0, &mut Vec::new(), &mut result);
        return result;
    }
}
