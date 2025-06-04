import { Component, ViewChild, OnInit } from '@angular/core';
import { MatCellDef, MatHeaderCellDef, MatHeaderRowDef, MatRowDef, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Category } from '../../classes/category';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryService } from '../../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';



@Component({
  selector: 'app-categories',
  imports: [MatHeaderCellDef, MatCellDef, MatIcon, MatPaginator, MatRowDef, MatHeaderRowDef, MatTableModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Category>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private router: Router, private categoryService: CategoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (!this.userService.isManager()) {
      this.router.navigate(['/not-found']);
      return;
    }

    this.categoryService.getAllCategories().subscribe(categories => {
      this.dataSource.data = categories;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.categoryService.categoryAdded$.subscribe(added => {
      this.dataSource.data = [...this.dataSource.data, added];
    });
  }

  editCategory(category: Category): void {
    console.log("reached edit category");

    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '400px',
      data: category
    });

    dialogRef.afterClosed().subscribe((result: Category | undefined) => {
      console.log("result", result);

      if (result) {
        this.categoryService.update(result).subscribe(updated => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/categories']);
          });
        });
      }
    });
  }
}