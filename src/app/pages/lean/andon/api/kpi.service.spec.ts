import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { KpiService } from './kpi.service';

describe('KpiService', () => {
  let service: KpiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KpiService]
    });

    service = TestBed.inject(KpiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch KPIs for all dashboards', () => {
    const mockResponse = { /* mock data here */ };

    service.getKpisForAllDashboards().subscribe(kpis => {
      expect(kpis).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8888/api/kpis/all-dashboards');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch KPIs for a specific dashboard', () => {
    const dashboardId = '123';
    const mockResponse = { /* mock data here */ };

    service.getKpisForDashboard(dashboardId).subscribe(kpis => {
      expect(kpis).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:8888/api/kpis/dashboard/${dashboardId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });


});
