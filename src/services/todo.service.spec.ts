import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ToDoService } from './todo.service';

describe('ToDoService', () => {
  let service: ToDoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideHttpClientTesting(),
        ToDoService
      ]
    });

    service = TestBed.inject(ToDoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch todos', () => {
    const mockTodos = [
      { id: 1, todo: 'Todo 1', completed: false },
      { id: 2, todo: 'Todo 2', completed: true },
    ];

    service.featchTodo().subscribe(todos => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpTestingController.expectOne('https://dummyjson.com/todos');
    expect(req.request.method).toEqual('GET');
    req.flush(mockTodos); 
  });
});
