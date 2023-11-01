import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { UtilityService } from 'src/app/core/utility.service';
import { AutoFocDirective } from '../custom-directives/directives/autofoc.directive';
import { FormsModule, NgForm } from '@angular/forms';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
  score:number
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  standalone:true,
  selector: 'app-edit-eable-mat-table',
  templateUrl: './edit-eable-mat-table.component.html',
  styleUrls: ['./edit-eable-mat-table.component.scss'],
  imports:[CommonModule,MaterialModule,FormsModule,CurrencyMaskModule,AutoFocDirective]
})
export class EditEableMatTableComponent{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['Actions','title', 'description', 'totalValue'];
  matTableList:any[] = [];
  dataSource!: MatTableDataSource<any>;
  utilityService = inject(UtilityService);
  isEditMode = false;
  showTable = true;
  isSubmit = false;
  columnsSchema = [
    {
      key: 'Actions',
      type: 'icons',
      label: 'Actions',
    },
    {
      key: 'title',
      type: 'alphaNumeric',
      label: 'CLIN #',
      required:true,
    },
    {
      key: 'description',
      type: 'text',
      label: 'Description',
      required:false,
    },
    {
      key: 'totalValue',
      type: 'number',
      label: 'Total Dollar Amount',
      required:true,
    },
  ]

  numberOfRow = '';
  constructor() {
    setTimeout(() => {
      this.matTableList = [];
      this.updateTable();
    },1000)
  }

  

  updateTable() {
      this.dataSource = new MatTableDataSource(this.matTableList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  toggleMode() {
    this.isEditMode=!this.isEditMode;
    if(!this.isEditMode) {
      this.displayedColumns = this.displayedColumns.filter(col=> col !=='Actions');
    }else {
      const cols = [...new Set(['Actions',...this.displayedColumns])];
      this.displayedColumns = cols;
    }
  }

  addRow(numberOfAllocations:string) {
    const numberOfRow = +numberOfAllocations;
    if (numberOfRow <= 0) {
      return;
    }
    
    this.showTable = false;
    for (let j = 1; j <= numberOfRow; j++) {
      const record: any = this.getEmptyRecord();
      this.matTableList = [record,...this.matTableList];
    }

    this.updateTable();
    setTimeout(() => {
      this.showTable = true;
      this.paginator.firstPage();
    }, 500);
  }

  showTableData() {
    console.log(this.dataSource.data);
    console.log(this.matTableList);
  }

  getEmptyRecord(obj?:any) {
    return {
      ID: -1,
      title: '',
      description: '',
      totalValue: '',
    }
  }

  hasDuplicateTitles() {
    const titleSet = new Set();
    let isDuplicate = false;
    for (const item of this.matTableList) {
      const title = item.title.trim().toLowerCase();
      if (titleSet.has(title)) {
        item.hasError = true;
        isDuplicate = true;
      }
      titleSet.add(title);
    }
    return isDuplicate;
  }

  onSubmit(form:NgForm) {
    this.isSubmit = true;

    if(form.invalid) {
      alert("Please enter all required and valid values")
      return;
    }
    if(this.hasDuplicateTitles()) {
      alert("Duplicate Clin Id is not allowed");
      return;
    }
    console.log(this.matTableList);
  }

  deleteRow(index: number) {
    this.matTableList = this.matTableList.filter((ind,_) => ind !== index);
    this.updateTable();
  }

  showError(input:any,message:string) {
    if(input?.errors?.pattern) {
      alert(message)
    }
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}

