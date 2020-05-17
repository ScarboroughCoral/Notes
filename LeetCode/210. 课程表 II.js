/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  const q = [];
  const result = [];
  let neighbors = new Map();
  for (let i = 0; i < numCourses; i++) neighbors.set(i, []);
  let indegree = Array(numCourses).fill(0);
  prerequisites.forEach(([x, pre], i) => {
    neighbors.get(pre).push(x);
    indegree[x]++;
  });
  indegree.forEach((x, i) => x === 0 && q.push(i));
  while (q.length) {
    let cur = q.shift();
    result.push(cur);
    indegree[cur]--;

    for (let neighbor of neighbors.get(cur)) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) q.push(neighbor);
    }
  }
  return result.length === numCourses ? result : [];
};
