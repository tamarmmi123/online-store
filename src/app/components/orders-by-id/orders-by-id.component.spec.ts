import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersByIdComponent } from './orders-by-id.component';

describe('OrdersByIdComponent', () => {
  let component: OrdersByIdComponent;
  let fixture: ComponentFixture<OrdersByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
