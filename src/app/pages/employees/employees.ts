import { FormsModule } from '@angular/forms';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-employees',
  templateUrl: './employees.html',
  styleUrl: './employees.css'
  
})
export class Employees implements OnInit {

  employees = signal<any[]>([]);
  editingEmployeeId: number | null = null;
  employee: any = {
    employeeCode: '',
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    dateOfJoining: '',
    isActive: true
  };

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();

  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response) => {
        this.employees.set(response?.data ?? []);
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      }
    });
  }

  createEmployee(): void {
    console.log('Add employee clicked', this.employee);
    this.employeeService.createEmployee(this.employee)
      .subscribe({

        next: () => {

          alert('Employee Added Successfully');

          this.loadEmployees();

          this.employee = {
            employeeCode: '',
            firstName: '',
            lastName: '',
            email: '',
            department: '',
            dateOfJoining: '',
            isActive: true
          };

        },

        error: (error) => {
          console.error(error);
        }

      });

  }
  editEmployee(id: number): void {

    this.employeeService.getEmployeeById(id)
      .subscribe({
        next: (response) => {

          const emp = response.data;

          this.editingEmployeeId = emp.id;

          const nameParts = emp.fullName.split(' ');

          this.employee = {
            employeeCode: emp.employeeCode,
            firstName: nameParts[0],
            lastName: nameParts.slice(1).join(' '),
            email: emp.email,
            department: emp.department,
            dateOfJoining: emp.dateOfJoining ?? '',
            isActive: emp.isActive ?? true
          };
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
  updateEmployee(): void {

    if (this.editingEmployeeId === null) {
      return;
    }

    this.employeeService.updateEmployee(this.editingEmployeeId, this.employee)
      .subscribe({
        next: () => {
          alert('Employee Updated Successfully');

          this.loadEmployees();

          this.editingEmployeeId = null;

          this.employee = {
            employeeCode: '',
            firstName: '',
            lastName: '',
            email: '',
            department: '',
            dateOfJoining: '',
            isActive: true
          };
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
  deleteEmployee(id: number): void {

    const confirmDelete = confirm('Are you sure you want to delete this employee?');

    if (!confirmDelete) {
      return;
    }

    this.employeeService.deleteEmployee(id)
      .subscribe({
        next: () => {
          alert('Employee Deleted Successfully');
          this.loadEmployees();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
