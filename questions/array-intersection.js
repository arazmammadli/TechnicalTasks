function arrayIntersection(nums1,nums2) {
    const result = [];

    for(let num1 of nums1) {
        if(nums2.includes(num1) && !result.includes(num1)) {
            result.push(num1);
        }
    }

    return result;
};
const a = arrayIntersection([4, 9, 5],[9, 4, 9, 8, 4]);
console.log(a);