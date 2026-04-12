let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

// LOAD SESSIONS INTO CHECKBOXES
function loadSessions() {
    let container = document.getElementById("sessionList");

    sessions.forEach(s => {
        container.innerHTML += `
        <div>
            <input type="checkbox" value="${s.title}">
            ${s.title}
        </div>`;
    });
}

loadSessions();


// FORM SUBMIT
document.getElementById("finalForm").addEventListener("submit", function(e){
    e.preventDefault();

    let name = $("#name").val().trim();
    let email = $("#email").val().trim();
    let participation = $("#participation").val();
    let notes = $("#notes").val();

    if(!name || !email || !participation){
        alert("Please fill all required fields!");
        return;
    }

    let selectedSessions = [];

    $("#sessionList input:checked").each(function(){
        selectedSessions.push($(this).val());
    });

    let data = {
        name,
        email,
        participation,
        sessions: selectedSessions,
        notes
    };

    // SHOW JSON
    $("#jsonOutput").text(JSON.stringify(data, null, 2));

    sendToAPI(data);
});


// AJAX (REQUIRED)
function sendToAPI(data){
    $.ajax({
        url: "http://localhost:3000/submissions",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(){
            alert("Registration saved!");
        },
        error: function(){
            alert("Error connecting to server");
        }
    });
}
