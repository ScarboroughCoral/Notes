function isBipartite(graph: number[][]): boolean {
    let valid=true;
    let n = graph.length;
    let colors=Array(n).fill(0);
    function dfs(i:number,color:number){
        colors[i]=color;
        let nextColor=-color;
        for(let neighbor of graph[i]){
            if(colors[neighbor]===0){
                dfs(neighbor,nextColor);
            }else if(colors[neighbor]!==nextColor){
                valid=false;
                return;
            }
        }
    }
    for(let i=0;i<n&&valid;i++){
        if(colors[i]===0){
            dfs(i,-1);
        }
    }
    return valid;
};
