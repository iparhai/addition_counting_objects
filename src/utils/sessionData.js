
import $ from "min-jquery";

let index = 0
let data = []
const setData = (problem, attemptedAnswer, corectAnswer) => {
    data.push({ index: index, problem: problem, attemptedAnswer: attemptedAnswer, corectAnswer: corectAnswer, timeTaken: null })
}
const setDataTime = (timeTaken) => {
    data[index].timeTaken = timeTaken
    sendData()
    index += 1
    //console.log(data)
}
const sendData = () => {
    console.log(data[index])
    const values = ""
    // let st= 0
    // if(data[index].attemptedAnswer == data[index].corectAnswer){
    //     st = 1
    // }
    // $.ajax({
    //     url: "https://nano-softs.com/adaptive/api.php?prb=" + data[index].problem + "&aa="+data[index].attemptedAnswer+"&ca="+data[index].corectAnswer+"&tt="+data[index].timeTaken+"&st="+st,
    //     type: "post",
    //     data: values,
    //     success: function (data) {
    //         console.log(data)
    //         alert("hit")
    //     },
    //     error: function(data) {
    //         //alert(data);
    //     }
    // });
}
export default {
    setData,
    setDataTime,
    sendData
}


