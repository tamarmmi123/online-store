import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateErrorDialogComponent } from './update-error-dialog.component';

describe('UpdateErrorDialogComponent', () => {
  let component: UpdateErrorDialogComponent;
  let fixture: ComponentFixture<UpdateErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateErrorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
