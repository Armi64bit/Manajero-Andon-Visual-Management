import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WhyService, Why } from './why.service';

describe('WhyService', () => {
  let service: WhyService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8888/api/why';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WhyService]
    });

    service = TestBed.inject(WhyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all Whys', () => {
    const mockWhys: Why[] = [
      {
        id: '1',
        title: 'Title 1',
        subpoint1: 'Subpoint 1',
        content1: 'Content 1',
        image1: 'image1.jpg',
        subpoint2: 'Subpoint 2',
        content2: 'Content 2',
        subpoint3: 'Subpoint 3',
        content3: 'Content 3',
        subpoint4: 'Subpoint 4',
        content4: 'Content 4'
      },
      {
        id: '2',
        title: 'Title 2',
        subpoint1: 'Subpoint 1',
        content1: 'Content 1',
        image1: 'image2.jpg',
        subpoint2: 'Subpoint 2',
        content2: 'Content 2',
        subpoint3: 'Subpoint 3',
        content3: 'Content 3',
        subpoint4: 'Subpoint 4',
        content4: 'Content 4'
      }
    ];

    service.getAllWhys().subscribe(whys => {
      expect(whys).toEqual(mockWhys);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockWhys);
  });

  it('should fetch a Why by ID', () => {
    const mockWhy: Why = {
      id: '1',
      title: 'Title 1',
      subpoint1: 'Subpoint 1',
      content1: 'Content 1',
      image1: 'image1.jpg',
      subpoint2: 'Subpoint 2',
      content2: 'Content 2',
      subpoint3: 'Subpoint 3',
      content3: 'Content 3',
      subpoint4: 'Subpoint 4',
      content4: 'Content 4'
    };

    service.getWhyById('1').subscribe(why => {
      expect(why).toEqual(mockWhy);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockWhy);
  });

  it('should create a new Why', () => {
    const newWhy: Why = {
      title: 'Title 3',
      subpoint1: 'Subpoint 1',
      content1: 'Content 1',
      image1: 'image3.jpg',
      subpoint2: 'Subpoint 2',
      content2: 'Content 2',
      subpoint3: 'Subpoint 3',
      content3: 'Content 3',
      subpoint4: 'Subpoint 4',
      content4: 'Content 4'
    };

    service.createWhy(newWhy).subscribe(why => {
      expect(why).toEqual({ id: '3', ...newWhy });
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newWhy);
    req.flush({ id: '3', ...newWhy });
  });

  it('should update an existing Why', () => {
    const updatedWhy: Why = {
      id: '1',
      title: 'Updated Title',
      subpoint1: 'Updated Subpoint 1',
      content1: 'Updated Content 1',
      image1: 'updated_image1.jpg',
      subpoint2: 'Updated Subpoint 2',
      content2: 'Updated Content 2',
      subpoint3: 'Updated Subpoint 3',
      content3: 'Updated Content 3',
      subpoint4: 'Updated Subpoint 4',
      content4: 'Updated Content 4'
    };

    service.updateWhy('1', updatedWhy).subscribe(why => {
      expect(why).toEqual(updatedWhy);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedWhy);
    req.flush(updatedWhy);
  });

  
});
