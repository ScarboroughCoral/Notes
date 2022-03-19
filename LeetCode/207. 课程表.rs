impl Solution {
    pub fn can_finish(num_courses: i32, prerequisites: Vec<Vec<i32>>) -> bool {
        let num_courses = num_courses as usize;
        let mut has_circle = Box::new(false);
        let mut visited = vec![false; num_courses];
        let mut on_path = vec![false; num_courses];
        let mut graph = vec![Vec::new(); num_courses];
        for pair in &prerequisites[..] {
            if let &[cur, pre] = &pair[..] {
                graph[pre as usize].push(cur);
            }
        }
        fn traverse(mut visited: &mut Vec<bool>, mut on_path: &mut Vec<bool>, graph: &Vec<Vec<i32>>, mut has_circle: &mut Box<bool>, start:i32) {
            let idx = start as usize;
            if on_path[idx] {
                **has_circle = true;
            }
            if **has_circle || visited[idx] {
                return;
            }
            on_path[idx] = true;
            visited[idx] = true;
            for &x in &graph[idx] {
                traverse(&mut visited, &mut on_path, &graph, &mut has_circle, x);
            }
            on_path[idx] = false;
        }
        for x in 0..num_courses {
            traverse(&mut visited, &mut on_path, &graph, &mut has_circle, x as i32);
        }
        return !*has_circle;
    }
}
