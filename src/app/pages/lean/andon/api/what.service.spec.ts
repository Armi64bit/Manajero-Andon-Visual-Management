import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WhatService, What } from './what.service';

describe('WhatService', () => {
  let service: WhatService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8888/api/what';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WhatService]
    });

    service = TestBed.inject(WhatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all "What" items', () => {
    const mockWhats: What[] = [
      { id: '1', title: 'Title 1', subpoint1: 'Subpoint 1', content1: 'Content 1', subpoint2: 'Subpoint 2', content2: 'Content 2', subpoint3: 'Subpoint 3', content3: 'Content 3', subpoint4: 'Subpoint 4', content4: 'Content 4' },
      { id: '2', title: 'Title 2', subpoint1: 'Subpoint 1', content1: 'Content 1', subpoint2: 'Subpoint 2', content2: 'Content 2', subpoint3: 'Subpoint 3', content3: 'Content 3', subpoint4: 'Subpoint 4', content4: 'Content 4' }
    ];

    service.getAllWhats().subscribe(whats => {
      expect(whats).toEqual(mockWhats);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockWhats);
  });

  it('should fetch a "What" item by ID', () => {
    const mockWhat: What = { id: '1', title: 'Title 1', subpoint1: 'Subpoint 1', content1: 'Content 1', subpoint2: 'Subpoint 2', content2: 'Content 2', subpoint3: 'Subpoint 3', content3: 'Content 3', subpoint4: 'Subpoint 4', content4: 'Content 4' };

    service.getWhatById('1').subscribe(what => {
      expect(what).toEqual(mockWhat);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockWhat);
  });

  it('should create a new "What" item', () => {
    const newWhat: What = { title: 'Title 3', subpoint1: 'Subpoint 1', content1: 'Content 1', subpoint2: 'Subpoint 2', content2: 'Content 2', subpoint3: 'Subpoint 3', content3: 'Content 3', subpoint4: 'Subpoint 4', content4: 'Content 4' };

    service.createWhat(newWhat).subscribe(what => {
      expect(what).toEqual({ id: '3', ...newWhat });
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newWhat);
    req.flush({ id: '3', ...newWhat });
  });

  it('should update an existing "What" item', () => {
    const updatedWhat: What = { id: '1', title: 'Updated Title', subpoint1: 'Updated Subpoint 1', content1: 'Updated Content 1', subpoint2: 'Updated Subpoint 2', content2: 'Updated Content 2', subpoint3: 'Updated Subpoint 3', content3: 'Updated Content 3', subpoint4: 'Updated Subpoint 4', content4: 'Updated Content 4' };

    service.updateWhat('1', updatedWhat).subscribe(what => {
      expect(what).toEqual(updatedWhat);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedWhat);
    req.flush(updatedWhat);
  });

  
});
