class Solution {
public:
    int subarraysDivByK(vector<int>& A, int K) {
        unordered_map<int,int> m;
        int ans=0,pre=0;
        m[0]=1;
        for(auto x:A){
            pre=(pre+x)%K;
            if(pre<0) pre+=K;
            if(m.count(pre)) ans+=m[pre],m[pre]++;
            else m[pre]=1;
        }
        return ans;
    }
};