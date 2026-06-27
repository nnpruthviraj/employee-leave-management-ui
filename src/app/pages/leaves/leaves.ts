import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaveRequestService } from '../../services/leave-request.service';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-leaves',
  imports: [CommonModule, FormsModule],
  templateUrl: './leaves.html',
  styleUrl: './leaves.css'
})
export class Leaves implements OnInit {

  leaves = signal<any[]>([]);
  employees = signal<any[]>([]);

  leaveRequest: any = {
    employeeId: '',
    fromDate: '',
    toDate: '',
    reason: ''
  };

  constructor(
    private leaveRequestService: LeaveRequestService,
    private employeeService: EmployeeService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadLeaves();
    this.loadEmployees();
  }

  loadLeaves(): void {
    this.leaveRequestService.getLeaves().subscribe({
      next: (response) => {
        this.leaves.set(response?.data ?? []);
      },
      error: (error) => {
        console.error('Error fetching leaves:', error);
      }
    });
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

  applyLeave(): void {
    this.leaveRequestService.applyLeave(this.leaveRequest)
      .subscribe({
        next: () => {
          alert('Leave Applied Successfully');

          this.loadLeaves();

          this.leaveRequest = {
            employeeId: '',
            fromDate: '',
            toDate: '',
            reason: ''
          };
        },
        error: (error) => {
          console.error(error);
          alert('Failed to apply leave');
        }
      });
  }

  approveLeave(id: number): void {
    this.leaveRequestService.approveLeave(id)
      .subscribe({
        next: () => {
          alert('Leave Approved Successfully');
          this.loadLeaves();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  rejectLeave(id: number): void {
    this.leaveRequestService.rejectLeave(id)
      .subscribe({
        next: () => {
          alert('Leave Rejected Successfully');
          this.loadLeaves();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
