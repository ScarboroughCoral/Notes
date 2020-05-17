impl Solution {
  pub fn find_order(num_courses: i32, prerequisites: Vec<Vec<i32>>) -> Vec<i32> {
      let size:usize=num_courses as usize;
      let mut indegree=vec![0;size];
      let mut neighbors=vec![vec![];size];
      for item in prerequisites.iter(){
          indegree[item[0] as usize]+=1;
          neighbors[item[1] as usize].push(item[0] as usize);
      }
      let mut q:Vec<usize> = (0..num_courses as usize).filter(|&i| indegree[i]==0).collect();
      let mut result=q.clone();
      while !q.is_empty(){
          let mut p=vec![];
          for &i in q.iter(){
              for &neighbor in neighbors[i].iter(){
                  indegree[neighbor]-=1;
                  if indegree[neighbor]==0{
                      p.push(neighbor);
                  }
              }
          }
          result.extend(p.iter());
          q=p;
      }
      match result.len()==size{
          true=>result.iter().map(|&x| x as i32).collect(),
          _=>vec![]
      }
  }
}