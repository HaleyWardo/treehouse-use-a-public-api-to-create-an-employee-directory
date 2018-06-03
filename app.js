class EmployeeHandler {
  constructor(employees = null) {
    this._employees = employees;
  }

  set employees(employees) {
    this._employees = employees;
  }

  get employees() {
    return this._employees;
  }

  handleFetch() {
    fetch('https://randomuser.me/api/?inc=name,location,email,dob,cell,id,picture&format=json&results=12&nat=US')
      .then(response => response.json())
      .then(data => {
        this.employees = data.results;
        this.displayEmployeeDirectory(this.employees);
      });
  }

  displayEmployeeDirectory() {
    this.employees.forEach(employee => {
      let employeeHTML = `
        <div class="employee">
          <img src=${employee.picture.medium} alt="image of ${employee.name.first}" />

          <div class="flex">
            <p>${employee.name.first} ${employee.name.last}</p>
            <p>${employee.email}</p>
            <p>${employee.location.city}</p>
          </div>
        </div>`

      document.querySelector('.employee-container').innerHTML += employeeHTML;
    });
  }

  displayModal(employee) {
    console.log(employee);
  }
}

const employeeHandler = new EmployeeHandler();
employeeHandler.handleFetch();


const employees = document.getElementsByClassName('employee');

employees.forEach(employee => {
  employee.addEventListener('click', (e) => {
    // employeeHandler.displayModal(e.target);
    console.log(e.target);
  });
});

