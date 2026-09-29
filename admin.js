const SUPABASE_URL = "https://pnwefzdvhfzdtfntcqla.supabase.co";
const SUPABASE_KEY = "sb_publishable_J5eQnu5RU8IxyZfdP5oU8w_Wjn9AEFz";

async function loadOrders(){

const res = await fetch(
`${SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc`,
{
headers:{
apikey:SUPABASE_KEY,
Authorization:"Bearer "+SUPABASE_KEY
}
}
);

const orders = await res.json();

document.getElementById("total").innerText = orders.length;
document.getElementById("pending").innerText =
orders.filter(o=>o.status==="Pending").length;
document.getElementById("approved").innerText =
orders.filter(o=>o.status==="Approved").length;
document.getElementById("rejected").innerText =
orders.filter(o=>o.status==="Rejected").length;

let html="";

orders.forEach(o=>{
html += `
<div class="order">
<b>${o.mobile}</b><br>
${o.operator} • ₹${o.plan}<br>
UTR: ${o.utr || "-"}<br>
Status: <b>${o.status}</b>
</div>`;
});

document.getElementById("orders").innerHTML = html;

}

loadOrders();
setInterval(loadOrders,5000);