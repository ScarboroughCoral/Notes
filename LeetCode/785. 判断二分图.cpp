class Solution {
private:
    bool valid;
    vector<int> colors;
public:
    bool isBipartite(vector<vector<int>>& graph) {
        valid=true;
        int n=graph.size();
        colors.assign(n,0);
        for(int i=0;i<n&&valid;i++){
            if(colors[i]==0){
                dfs(i,-1,graph);
            }
        }
        return valid;
    }
    void dfs(int index,int color,vector<vector<int>>&graph){
        colors[index]=color;
        int nextColor=-color;
        for(int neighbor:graph[index]){
            if(colors[neighbor]==0){
                dfs(neighbor,nextColor,graph);
            }else if(colors[neighbor]!=nextColor){
                valid=false;
                return;
            }
        }
    }
};
