import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SCService } from '../../sc.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActionEnum } from 'src/app/core/models/utility.model';

@Component({
  selector: 'app-agency-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.scss']
})
export class AgencyListComponent  implements OnInit{
  router = inject(Router);
  scService = inject(SCService);
  destroyRef = inject(DestroyRef);

  categories:any = [];
  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.scService.getCategories()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(res => {
      console.log(res);
      this.categories = res;
    })
  }
    

  addCategory() {
    this.router.navigate(['./crud/categories/create'],{state:{
      mode:ActionEnum.Create
    }})
  }

  onView(id:any) {
    this.router.navigate(['./crud/categories/view'],{state:{
      mode:ActionEnum.View,
      categoryId:id
    }})
  }

  onEdit(id:any) {
    this.router.navigate(['./crud/categories/edit'],{state:{
      mode:ActionEnum.Edit,
      categoryId:id
    }})
  }

  onDelete(id:any) {
    if(!confirm('Are you sure, You want to delete')) {
      return;
    }

    this.scService.deleteCategory(id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((res)=> {
      this.fetchCategories();
    })
  }
}
