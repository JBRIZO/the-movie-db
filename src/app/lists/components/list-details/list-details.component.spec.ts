import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { IListDetails } from '../../interfaces/list-details-response.interface';
import * as Selectors from '../../store/lists.selector';
import { ListDetailsComponent } from './list-details.component';
import { MatIconModule } from '@angular/material/icon';

const mockMovieList: IListDetails = {
  created_by: 'test',
  description: 'test',
  favorite_count: 1,
  id: '123',
  items: [],
  item_count: 1,
  iso_639_1: 'test',
  name: 'test',
  poster_path: null,
  list_type: 'movie',
};

describe('ListDetailsComponent', () => {
  let component: ListDetailsComponent;
  let fixture: ComponentFixture<ListDetailsComponent>;
  let element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatIconModule],
      declarations: [ListDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { listId: mockMovieList.id } },
          },
        },
        provideMockStore({
          selectors: [
            {
              selector: Selectors.selectListItems,
              value: mockMovieList,
            },
          ],
        }),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ListDetailsComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load list details', async () => {
    const title = element.query(By.css('.list-name'));
    expect(title.nativeElement.textContent.trim()).toEqual(mockMovieList.name);
    const description = element.query(By.css('.list-description'));
    expect(description.nativeElement.textContent.trim()).toEqual(
      mockMovieList.description
    );
  });

  it('should retrieve a list which id matches the id in the query params', () => {
    component.movieListDetails$.subscribe(response => {
      expect(response.id).toEqual(mockMovieList.id);
    });
  });
});
