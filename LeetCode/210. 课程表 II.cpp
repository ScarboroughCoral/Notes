class Solution {
private:
    vector<int> indegree;
    vector<int> result;
    vector<vector<int>> m;
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        indegree.resize(numCourses);
        m.resize(numCourses);
        for(auto& sub:prerequisites){
            indegree[sub[0]]++;
            m[sub[1]].push_back(sub[0]);
        }
        queue<int> q;
        for(int i=0;i<indegree.size();i++){
            if(indegree[i]==0) q.push(i);
        }
        while(!q.empty()){
            int cur=q.front();
            result.push_back(cur);
            q.pop();
            for(int neighbor:m[cur]){
                indegree[neighbor]--;
                if(indegree[neighbor]==0){
                    q.push(neighbor);
                }
            }
        }
        if(result.size()!=numCourses) return {};
        return result;
    }
};