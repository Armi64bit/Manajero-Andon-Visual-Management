import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';
import { Dashboard, Station } from './dashboard.model';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService]
    });

    service = TestBed.inject(DashboardService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAllDashboards', () => {
    it('should return expected dashboards', () => {
      const expectedDashboards: Dashboard[] = [
        {
          id: '1',
          name: 'Dashboard 1',
          refreshRate: 5,
          alerts: [],
          notifications: [],
          stations: [],
          thresholds: []
        }
      ];

      service.getAllDashboards().subscribe(dashboards => {
        expect(dashboards).toEqual(expectedDashboards);
      });

      const req = httpTestingController.expectOne('http://localhost:8888/api/dashboards');
      expect(req.request.method).toEqual('GET');
      req.flush(expectedDashboards);
    });
  });

  describe('#getDashboardById', () => {
    it('should return expected dashboard by id', () => {
      const id = '1';
      const expectedDashboard: Dashboard = {
        id: '1',
        name: 'Dashboard 1',
        refreshRate: 5,
        alerts: [],
        notifications: [],
        stations: [],
        thresholds: []
      };

      service.getDashboardById(id).subscribe(dashboard => {
        expect(dashboard).toEqual(expectedDashboard);
      });

      const req = httpTestingController.expectOne(`http://localhost:8888/api/dashboards/${id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedDashboard);
    });
  });

  describe('#createDashboard', () => {
    it('should create and return the dashboard', () => {
      const newDashboard: Dashboard = {
        id: '2',
        name: 'Dashboard 2',
        refreshRate: 10,
        alerts: [],
        notifications: [],
        stations: [],
        thresholds: []
      };

      service.createDashboard(newDashboard).subscribe(dashboard => {
        expect(dashboard).toEqual(newDashboard);
      });

      const req = httpTestingController.expectOne('http://localhost:8888/api/dashboards');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newDashboard);
      req.flush(newDashboard);
    });
  });

  describe('#deleteDashboard', () => {
    it('should delete the dashboard and return void', () => {
      const id = '1';

      service.deleteDashboard(id).subscribe(response => {
        expect(response).toBeNull(); // Expect null since HttpClient.delete returns Observable<null>
      });

      const req = httpTestingController.expectOne(`http://localhost:8888/api/dashboards/${id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(null); // Simulate no content in the response
    });
  });

  
  describe('#updateDashboard', () => {
    it('should update and return the dashboard', () => {
      const id = '1';
      const updatedDashboard: Dashboard = {
        id: '1',
        name: 'Updated Dashboard',
        refreshRate: 10,
        alerts: [],
        notifications: [],
        stations: [],
        thresholds: []
      };

      service.updateDashboard(id, updatedDashboard).subscribe(dashboard => {
        expect(dashboard).toEqual(updatedDashboard);
      });

      const req = httpTestingController.expectOne(`http://localhost:8888/api/dashboards/${id}`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updatedDashboard);
      req.flush(updatedDashboard);
    });
  });
});
