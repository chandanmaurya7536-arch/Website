const plans = [
  {price:149,badge:"Popular",valid:"18 Days",data:"1.5GB/day • Unlimited Calls • 100 SMS/day"},
  {price:199,badge:"Best Value",valid:"28 Days",data:"1GB/day • Unlimited Calls • 100 SMS/day"},
  {price:249,badge:"True 5G",valid:"28 Days",data:"1.5GB/day • Unlimited Calls • 100 SMS/day"},
  {price:299,badge:"True 5G",valid:"28 Days",data:"2GB/day • Unlimited Calls • 100 SMS/day"},
  {price:349,badge:"Unlimited",valid:"28 Days",data:"2.5GB/day • Unlimited Calls • 100 SMS/day"},
  {price:399,badge:"Premium",valid:"28 Days",data:"3GB/day • Unlimited Calls • 100 SMS/day"},
  {price:599,badge:"Long Validity",valid:"72 Days",data:"2GB/day • Unlimited Calls • 100 SMS/day"}
];

const qrMap = {
 149:"qr/149.png",
 199:"qr/199.png",
 249:"qr/249.png",
 299:"qr/299.png",
 349:"qr/349.png",
 399:"qr/399.png",
 599:"qr/599.png"
};

let selected = 0;

function show(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function next1(){
  const n=document.getElementById("number").value.trim();

  if(!/^[6-9]\d{9}$/.test(n)){
    alert("Enter valid mobile number");
    return;
  }

  loadPlans();
  show("p2");
}

function loadPlans(){
  let html="";

  plans.forEach(p=>{
    html += `
    <div class="plan" onclick="choose(${p.price})">
      <div>
        <div class="badge">${p.badge}</div>
        <div class="price">₹${p.price}</div>
        <div class="small">${p.data}</div>
        <div class="small">Validity: ${p.valid}</div>
      </div>
      <div class="arrow">➜</div>
    </div>`;
  });

  document.getElementById("plans").innerHTML = html;
}

function choose(price){
  selected = price;

  document.getElementById("cnum").innerText = document.getElementById("number").value;
  document.getElementById("cop").innerText = document.getElementById("operator").value;
  document.getElementById("cplan").innerText = price;

  show("p3");
}

function proceedPayment(){
  document.getElementById("payAmount").innerText = selected;
  document.getElementById("qrImage").src = qrMap[selected];
  show("p4");
}
async function sendSupport(){

  const msg = document.getElementById("utrMsg");

  msg.style.color="#3ecbff";
  msg.innerHTML=`
  <div style="display:flex;align-items:center;justify-content:center;gap:10px;">
    <div style="width:20px;height:20px;border:3px solid #3ecbff;border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;"></div>
    <span>Searching...</span>
  </div>`;

  await new Promise(r=>setTimeout(r,4000));

  const res = await fetch("/api/support", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mobile: document.getElementById("number").value,
      operator: document.getElementById("operator").value,
      plan: selected,
      issue: "Recharge Inquiry"
    })
  });

  if(res.ok){
    msg.style.color="#3ecbff";
    msg.innerHTML="✅ Request submitted successfully.";
  }else{
    msg.style.color="#ff6b6b";
    msg.innerHTML="❌ Failed to send request.";
  }
}