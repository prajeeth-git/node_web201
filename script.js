
        let registrationform = document.getElementById("r-form");
        const retrieveEntry = () =>{
            let entries = localStorage.getItem("user-entries");
            if (entries){
                entries = JSON.parse(entries);
            }else {
                entries = [];
            }
            return entries;

        }
        let userEntries = retrieveEntry();

        const displayData = () => {
            const entries = retrieveEntry();
            const tableData = entries.map((entry) =>{
                const entryName = `<td>${entry.name}</td>`;
                const entryEmail = `<td>${entry.email}</td>`;
                const entryPassword = `<td>${entry.password}</td>`;
                const entryDob = `<td>${entry.dob}</td>`;
                const entryacceptTC = `<td>${entry.acceptTC}</td>`;

                const rowEntry = `<tr>${entryName} ${entryEmail} ${entryPassword} ${entryDob} ${entryacceptTC}</tr>`;
                return rowEntry;
            }).join("\n");

            const table = `<table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Dob</th>
                    <th>Accepted terms?</th>
                </tr>${tableData}</table>`;
            let details =document.getElementById("user-entries");
            details.innerHTML = table;

            }
        const saveData = (event) => {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password= document.getElementById('password').value;
            let dob = document.getElementById('dob').value;
            const acceptTC = document.getElementById('acceptTerms').checked;
            
            const entry = {
                name,
                email,
                password,
                dob,
                acceptTC
            };

            userEntries.push(entry);
            localStorage.setItem("user-entries", JSON.stringify(userEntries));
            displayData();

        }
        registrationform.addEventListener('submit', saveData);
        displayData();

        function getAge(today, birthDate) {
            // var today = new Date();
            // var birthDate = new Date(DOB);
          
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }
            return age;
          }
          
          let dateELE = document.getElementById("dob");
          
          dateELE.addEventListener("change", () => {
            let [year, month, date] = document.getElementById("dob").value.split("-");
          
            let dob = new Date(year, month, date);
            let Today = new Date();
          
            age = getAge(Today, dob);
          
            dateELE.style.border = "2px solid rgba(0, 0, 0, 0.4)";
            if (age < 18 || age > 55) {
              dateELE.setCustomValidity("Your age doesn't lies between 18 and 55");
              dateELE.style.border = "2px solid red";
              return;
            } else {
              dateELE.setCustomValidity("");
            }
          });
          
          const email = document.getElementById("email");
          
          email.addEventListener("input", () => validate(email));
          
          function validate(ele) {
            if (ele.validity.typeMismatch) {
              ele.setCustomValidity("The Email is not in the right format!!!");
              ele.reportValidity();
            } else {
              ele.setCustomValidity("");
            }
          }
