import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StationService } from './station.service';
import { Station } from './dashboard.model';

describe('StationService', () => {
  let service: StationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StationService]
    });

    service = TestBed.inject(StationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  // Verify that no unmatched requests are pending after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all stations', () => {
    const mockStations: Station[] = [
      { id: '1', name: 'Station 1', metric_name: 'Metric 1', target_value: '10', icon: 'icon1', status: 'active' },
      { id: '2', name: 'Station 2', metric_name: 'Metric 2', target_value: '20', icon: 'icon2', status: 'inactive' }
    ];

    service.getAllStations().subscribe(stations => {
      expect(stations.length).toBe(2);
      expect(stations).toEqual(mockStations);
    });

    const req = httpMock.expectOne('http://localhost:8888/api/stations');
    expect(req.request.method).toBe('GET');
    req.flush(mockStations);
  });

  it('should fetch a station by ID', () => {
    const mockStation: Station = { id: '1', name: 'Station 1', metric_name: 'Metric 1', target_value: '10', icon: 'icon1', status: 'active' };

    service.getStationById('1').subscribe(station => {
      expect(station).toEqual(mockStation);
    });

    const req = httpMock.expectOne('http://localhost:8888/api/stations/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockStation);
  });

  it('should create a new station', () => {
    const newStation: Station = { id: '3', name: 'Station 3', metric_name: 'Metric 3', target_value: '30', icon: 'icon3', status: 'active' };

    service.createStation(newStation).subscribe(station => {
      expect(station).toEqual(newStation);
    });

    const req = httpMock.expectOne('http://localhost:8888/api/stations');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newStation);
    req.flush(newStation);
  });

  it('should update an existing station', () => {
    const updatedStation: Station = { id: '1', name: 'Updated Station', metric_name: 'Updated Metric', target_value: '15', icon: 'updatedIcon', status: 'inactive' };

    service.updateStation('1', updatedStation).subscribe(station => {
      expect(station).toEqual(updatedStation);
    });

    const req = httpMock.expectOne('http://localhost:8888/api/stations/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedStation);
    req.flush(updatedStation);
  });

 
});
