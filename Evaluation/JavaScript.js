function removeComments(comments,spamWords){
    let res=[]
    for(let i=0;i<comments.length;i++){
        // console.log(comments[i])
        let arr = comments[i].split(" ")
        let a=[]
        for(let j=0;j<arr.length;j++){
            arr[j] = arr[j].toLowerCase()
            a.push(arr[j]) 
        }
        // console.log(a)
        let flag = true 
        for(let j=0;j<spamWords.length;j++){
            if(a.includes(spamWords[j])==true)
                flag=false
                // break
        }
        if(flag==true)
            res.push(comments[i])
        
    }
    console.log(res)
}
const comments = [
    "Buy now and get 50% OFF!",
    "This is a great product",
    "Limited-time OFFER, visit now!",
    "Nice blog post!",
    "Get cheap deals now!"
   ];
const spamWords = ["buy", "offer", "cheap"];
removeComments(comments,spamWords)
// ["This is a great product", "Nice blog post!"]