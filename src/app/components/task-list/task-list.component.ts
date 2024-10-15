import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from 'src/app/services/task.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';




@Component({
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0 }))
      ])
    ])
  ],
  
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent,NgxPaginationModule,],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  isLoading: boolean = true;
  currentPage: number = 1;  // Current page of pagination
  itemsPerPage: number = 5; // Number of products to show per page


  constructor(private taskService: TaskService,) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getTasks().subscribe(
      (response) => {
        this.tasks = response.slice(0, 50); // نأخذ أول 50 مهام فقط
        this.isLoading = false;
        console.log(response);
        
      },
      (error) => {
        console.error('Error fetching tasks', error);
        this.isLoading = false;
      }
    );
  }

  onTaskComplete(task: any) {
    task.completed = !task.completed;

  }
}
