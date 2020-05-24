use std::cmp::*;
impl Solution {
    pub fn find_median_sorted_arrays(nums1: Vec<i32>, nums2: Vec<i32>) -> f64 {
        if nums1.len()>nums2.len(){
            return Solution::find_median_sorted_arrays(nums2,nums1);
        }
        let m=nums1.len();
        let n=nums2.len();
        let (mut l,mut r)=(0,m);
        let left_count=(m+n+1)/2;
        while l<r{
            let i=(l+r)/2;
            let j=left_count-i;
            if nums2[j-1]>nums1[i]{
                l=i+1;
            }else{
                r=i;
            }
        }
        let i=l;
        let j=left_count-i;
        let left_max_1=if i==0{i32::min_value()}else{nums1[i-1]};
        let left_max_2=if j==0{i32::min_value()}else{nums2[j-1]};
        let right_min_1=if i==m{i32::max_value()}else{nums1[i]};
        let right_min_2=if j==n{i32::max_value()}else{nums2[j]};
        match (m+n)%2==0{
            true=>f64::from(max(left_max_1,left_max_2)+min(right_min_1,right_min_2))/2.0,
            _=>f64::from(max(left_max_2,left_max_1))
        }
    }
}