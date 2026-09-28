async function saveData(){

const number=document.getElementById("number").value;
const operator=document.getElementById("operator").value;
const plan=document.getElementById("plan").value;

if(!/^[6-9]\d{9}$/.test(number)){
alert("Valid number daalo");
return;
}

await fetch("/save",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
number,
operator,
plan,
payment:"Pending"
})
});

alert("Data save ho gaya.");

}