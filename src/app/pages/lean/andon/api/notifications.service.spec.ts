import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotificationService } from './notifications.service';
import { Notification } from './dashboard.model';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService]
    });

    service = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  // Verify that no unmatched requests are pending after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all notifications', () => {
    const mockNotifications: Notification[] = [
      { id: '1', station: 'Station 1', message: 'Test message 1', level: 'info', status: 'new', timestamp: new Date() },
      { id: '2', station: 'Station 2', message: 'Test message 2', level: 'warning', status: 'resolved', timestamp: new Date() }
    ];

    service.getAllNotifications().subscribe(notifications => {
      expect(notifications.length).toBe(2);
      expect(notifications).toEqual(mockNotifications);
    });

    const req = httpMock.expectOne('http://localhost:8888/api/notifications');
    expect(req.request.method).toBe('GET');
    req.flush(mockNotifications);
  });

  it('should fetch a notification by ID', () => {
    const mockNotification: Notification = { id: '1', station: 'Station 1', message: 'Test message 1', level: 'info', status: 'new', timestamp: new Date() };

    service.getNotificationById('1').subscribe(notification => {
      expect(notification).toEqual(mockNotification);
    });

    const req = httpMock.expectOne('http://localhost:8888/api/notifications/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockNotification);
  });

  it('should create a notification', () => {
    const newNotification: Notification = { station: 'Station 3', message: 'New message', level: 'critical', status: 'new', timestamp: new Date() };
    const createdNotification: Notification = { ...newNotification, id: '3' };

    service.createNotification(newNotification).subscribe(notification => {
      expect(notification).toEqual(createdNotification);
    });

    const req = httpMock.expectOne('http://localhost:8888/api/notifications');
    expect(req.request.method).toBe('POST');
    req.flush(createdNotification);
  });

  it('should update a notification', () => {
    const updatedNotification: Notification = { id: '1', station: 'Station 1', message: 'Updated message', level: 'info', status: 'in-progress', timestamp: new Date() };

    service.updateNotification('1', updatedNotification).subscribe(notification => {
      expect(notification).toEqual(updatedNotification);
    });

    const req = httpMock.expectOne('http://localhost:8888/api/notifications/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedNotification);
  });



});
