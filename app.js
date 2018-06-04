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

  /**
   * Handles fetch to randomusers API
   */
  handleFetch() {
    fetch('https://randomuser.me/api/?inc=name,location,email,dob,cell,id,picture&format=json&results=12&nat=US')
      .then(response => response.json())
      .then(data => {
        this.employees = data.results;
        this.displayEmployeeDirectory(this.employees);
      });
  }

  /**
   * Takes fetch response and displays employee directory with information provided
   * from API
   */
  displayEmployeeDirectory() {
    let key = 0;

    this.employees.forEach(employee => {
      const employeeFullName = `${this.formatName(employee.name.first)} ${this.formatName(employee.name.last)}`;
      const employeeCity = `${this.formatName(employee.location.city)}`;

      let employeeHTML = `
        <div class="employee" data-index=${key}>
          <img src=${employee.picture.medium} alt="image of ${employee.name.first}" />

          <div class="flex">
            <p>${employeeFullName}</p>
            <p>${employee.email}</p>
            <p>${employeeCity}</p>
          </div>
        </div>`

      document.querySelector('.employee-container').innerHTML += employeeHTML;
      key += 1;
    });
    this.handleEmployeeClick();
  }

  /**
   * Handles eventlistener when employee clicks on employee card
   */
  handleEmployeeClick() {
    let employeeContainers = document.getElementsByClassName('employee');

    /* Foreach would not work here - need to come back and figure why
     error was stating forEach was not a valid method */
    for (let i = 0; i < employeeContainers.length; i++) {
      employeeContainers[i].addEventListener('click', (e) => {
        this.displayModal(e.currentTarget);
      });
    }
  }

  /**
   *
   * @param {Object} employee Displays modal with employee information that
   * the user clicked on
   */
  displayModal(employee) {
    // Current employee who user clicked on
    let currentIndex = employee.getAttribute('data-index');
    let currentEmployee = this.employees[currentIndex];

    const employeeFullName = `${this.formatName(currentEmployee.name.first)} ${this.formatName(currentEmployee.name.last)}`;
    const employeeAddress = `${this.formatName(currentEmployee.location.street)} ${this.formatName(currentEmployee.location.city)}, ${this.formatName(currentEmployee.location.state)} ${currentEmployee.location.postcode}`;
    const employeeCity = `${this.formatName(currentEmployee.location.city)}`;

    document.querySelector('.employee-modal').style.display = "inline";

    let modalHTML = `
      <div class="modal-content">
        <div class="modal-list">
          <span class="modal-close">&times;</span>
          <img src=${currentEmployee.picture.large} src="img of ${employeeFullName}" />
          <p>${employeeFullName}</p>
          <p>${currentEmployee.email}</p>
          <p>${employeeCity}</p>
        </div>

        <div class="modal-list2">
          <p>${currentEmployee.cell}</p>
          <p>${employeeAddress}</p>
          <p>Birthday: ${new Date(currentEmployee.dob).toLocaleDateString('en-US')}</p>
        </div>
      </div>
    `;

    document.querySelector('.employee-modal').innerHTML = modalHTML;

    this.handleModalClose();
  }

  /**
   *
   * @param {String} string Takes the first letter of the string and
   * capatalizes it
   */
  formatName(string) {
    const splitName = string.split(' ');
    let result = [];

    splitName.forEach(letter => {
      result.push(letter[0].toUpperCase() + letter.slice(1));
    });
    return result.join(' ');
  }

  /**
   * Closes modal when modal-close is clicked
   */
  handleModalClose() {
    const closeModal = document.querySelector('.modal-close');

    closeModal.addEventListener('click', () => {
      document.querySelector('.modal-content').remove();
      document.querySelector('.employee-modal').style.display = "none";
    });
  }
}

const employeeHandler = new EmployeeHandler();
employeeHandler.handleFetch();
