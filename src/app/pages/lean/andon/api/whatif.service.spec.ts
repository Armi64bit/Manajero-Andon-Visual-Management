import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WhatifService, Whatif } from './whatif.service';

describe('WhatifService', () => {
  let service: WhatifService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8888/api/whatif';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WhatifService]
    });

    service = TestBed.inject(WhatifService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all "Whatif" items', () => {
    const mockWhatifs: Whatif[] = [
      { id: '1', title: 'Title 1', subpoint1: 'Subpoint 1', content1: 'Content 1', image1: 'image1.jpg' },
      { id: '2', title: 'Title 2', subpoint1: 'Subpoint 1', content1: 'Content 1', image2: 'image2.jpg' }
    ];

    service.getAllWhatifs().subscribe(whatifs => {
      expect(whatifs).toEqual(mockWhatifs);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockWhatifs);
  });

  it('should fetch a "Whatif" item by ID', () => {
    const mockWhatif: Whatif = { id: '1', title: 'Title 1', subpoint1: 'Subpoint 1', content1: 'Content 1', image1: 'image1.jpg' };

    service.getWhatifById('1').subscribe(whatif => {
      expect(whatif).toEqual(mockWhatif);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockWhatif);
  });

  it('should create a new "Whatif" item', () => {
    const newWhatif: Whatif = { title: 'Title 3', subpoint1: 'Subpoint 1', content1: 'Content 1', image1: 'image3.jpg' };

    service.createWhatif(newWhatif).subscribe(whatif => {
      expect(whatif).toEqual({ id: '3', ...newWhatif });
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newWhatif);
    req.flush({ id: '3', ...newWhatif });
  });

  it('should update an existing "Whatif" item', () => {
    const updatedWhatif: Whatif = { id: '1', title: 'Updated Title', subpoint1: 'Updated Subpoint 1', content1: 'Updated Content 1', image1: 'updated_image1.jpg' };

    service.updateWhatif('1', updatedWhatif).subscribe(whatif => {
      expect(whatif).toEqual(updatedWhatif);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedWhatif);
    req.flush(updatedWhatif);
  });

 
});
