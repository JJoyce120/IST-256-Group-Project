document.addEventListener("DOMContentLoaded", function() {
   DisplayMembers();

});

document.getElementById("memberForm").addEventListener("submit",function(e) {
   e.preventDefault();


   const name = document.getElementById("name").value.trim();
   const email = document.getElementById("email").value.trim();
   const age = document.getElementById("age").value.trim();
   const affiliation = document.getElementById("affiliation").value.trim();
   const phone = document.getElementById("phone").value.trim();

   
   if (!name || !email || !age || !affiliation) {
	alert("Please fill out all required fields.");
	return;
   }

   const member = {
	id: Date.now(),
	name: name,
	email: email,
	age: age,
	affiliation: affiliation,
	phone: phone
   };
   

   let members = JSON.parse(localStorage.getItem("members")) || [];


   members.push(member);

   localStorage.setItem("members", JSON.stringify(members));

   document.getElementById("memberForm").reset();

   DisplayMembers();
});

function DisplayMembers() {
	const tableBody = document.getElementById("memberTableBody");
	tableBody.innerHTML = "";
	
	let members = JSON.parse(localStorage.getItem("members")) || [];
	
	members.forEach(member => {
	const row = document.createElement("tr");

	row.innerHTML = `
	<td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.age}</td>
            <td>${member.affiliation}</td>
            <td>${member.phone}</td>
            <td>
                <button onclick="editMember(${member.id})">Edit</button>
                <button onclick="deleteMember(${member.id})">Delete</button>
            </td>
        `;
	

	tableBody.appendChild(row);
	});
}

function deleteMember(id) {
	let members = JSON.parse(localStorage.getItem("members")) || [];

	members = members.filter(member => member.id !== id);

	localStorage.setItem("members",JSON.stringify(members));

	DisplayMembers();
}

function editMember(id) {
	let members = JSON.parse(localStorage.getItem("members")) || [];

	const member = members.find(m => m.id ===id);
	
	if(member) {
		document.getElementById("name").value = member.name;
		document.getElementById("email").value = member.email;
		document.getElementById("age").value = member.age;
		document.getElementById("affiliation").value = member.affiliation;
		document.getElementById("phone").value = member.phone;

		deleteMember(id);
	}
}