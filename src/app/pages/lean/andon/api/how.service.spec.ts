import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HowService } from './how.service';
import { How } from './how.service';  // Ensure this is the correct path to your How interface

describe('HowService', () => {
  let service: HowService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'http://localhost:8888/api/how'; // This should match the base URL in your service

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HowService]
    });

    service = TestBed.inject(HowService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAll', () => {
    it('should return expected How[]', () => {
      const expectedHow: How[] = [
        {
          id: '1',
          step1: 'Step 1',
          step1img: 'step1img.png',
          step2: 'Step 2',
          step2L: 'Step 2 L',
          step2B: 'Step 2 B',
          step3: 'Step 3',
          step3S: 'Step 3 S',
          step3img1: 'step3img1.png',
          step3L: 'Step 3 L',
          step3img2: 'step3img2.png',
          step3ID: 'Step 3 ID',
          step3img3: 'step3img3.png',
          step4: 'Step 4',
          step4M: 'Step 4 M',
          step4img1: 'step4img1.png',
          step4A: 'Step 4 A',
          step4img2: 'step4img2.png',
          step5: 'Step 5',
          step5L: 'Step 5 L',
          step5img1: 'step5img1.png',
          step5B: 'Step 5 B',
          step5img2: 'step5img2.png',
          step6: 'Step 6',
          step6O: 'Step 6 O',
          step6img1: 'step6img1.png',
          step6R: 'Step 6 R',
          step6img2: 'step6img2.png',
          step7: 'Step 7',
          step7E: 'Step 7 E',
          step7R: 'Step 7 R',
          step7img1: 'step7img1.png',
          step7img2: 'step7img2.png',
          step8: 'Step 8',
          step8F: 'Step 8 F',
          step8M: 'Step 8 M',
          step8S: 'Step 8 S',
          step8T: 'Step 8 T',
          step8img1: 'step8img1.png',
          step8img2: 'step8img2.png',
          step8img3: 'step8img3.png',
          step9: 'Step 9',
          step9A: 'Step 9 A',
          step9T: 'Step 9 T',
          step9P: 'Step 9 P',
          step9C: 'Step 9 C',
          step9img1: 'step9img1.png',
          step9img2: 'step9img2.png',
          step9img3: 'step9img3.png',
          step9img4: 'step9img4.png',
          step10: 'Step 10',
          step10R: 'Step 10 R',
          step10K: 'Step 10 K',
          step10B: 'Step 10 B',
          step10D: 'Step 10 D',
          step10img1: 'step10img1.png',
          step10img2: 'step10img2.png',
          step10img3: 'step10img3.png',
          step10img4: 'step10img4.png'
        }
      ];

      service.getAll().subscribe(how => {
        expect(how).toEqual(expectedHow);
      });

      const req = httpTestingController.expectOne(baseUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedHow);
    });
  });

  describe('#getById', () => {
    it('should return expected How by id', () => {
      const id = '1';
      const expectedHow: How = {
        id: '1',
        step1: 'Step 1',
        step1img: 'step1img.png',
        step2: 'Step 2',
        step2L: 'Step 2 L',
        step2B: 'Step 2 B',
        step3: 'Step 3',
        step3S: 'Step 3 S',
        step3img1: 'step3img1.png',
        step3L: 'Step 3 L',
        step3img2: 'step3img2.png',
        step3ID: 'Step 3 ID',
        step3img3: 'step3img3.png',
        step4: 'Step 4',
        step4M: 'Step 4 M',
        step4img1: 'step4img1.png',
        step4A: 'Step 4 A',
        step4img2: 'step4img2.png',
        step5: 'Step 5',
        step5L: 'Step 5 L',
        step5img1: 'step5img1.png',
        step5B: 'Step 5 B',
        step5img2: 'step5img2.png',
        step6: 'Step 6',
        step6O: 'Step 6 O',
        step6img1: 'step6img1.png',
        step6R: 'Step 6 R',
        step6img2: 'step6img2.png',
        step7: 'Step 7',
        step7E: 'Step 7 E',
        step7R: 'Step 7 R',
        step7img1: 'step7img1.png',
        step7img2: 'step7img2.png',
        step8: 'Step 8',
        step8F: 'Step 8 F',
        step8M: 'Step 8 M',
        step8S: 'Step 8 S',
        step8T: 'Step 8 T',
        step8img1: 'step8img1.png',
        step8img2: 'step8img2.png',
        step8img3: 'step8img3.png',
        step9: 'Step 9',
        step9A: 'Step 9 A',
        step9T: 'Step 9 T',
        step9P: 'Step 9 P',
        step9C: 'Step 9 C',
        step9img1: 'step9img1.png',
        step9img2: 'step9img2.png',
        step9img3: 'step9img3.png',
        step9img4: 'step9img4.png',
        step10: 'Step 10',
        step10R: 'Step 10 R',
        step10K: 'Step 10 K',
        step10B: 'Step 10 B',
        step10D: 'Step 10 D',
        step10img1: 'step10img1.png',
        step10img2: 'step10img2.png',
        step10img3: 'step10img3.png',
        step10img4: 'step10img4.png'
      };

      service.getById(id).subscribe(how => {
        expect(how).toEqual(expectedHow);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/${id}`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedHow);
    });
  });

  describe('#create', () => {
    it('should create and return the How', () => {
      const newHow: How = {
        id: '2',
        step1: 'Step 1',
        step1img: 'step1img.png',
        step2: 'Step 2',
        step2L: 'Step 2 L',
        step2B: 'Step 2 B',
        step3: 'Step 3',
        step3S: 'Step 3 S',
        step3img1: 'step3img1.png',
        step3L: 'Step 3 L',
        step3img2: 'step3img2.png',
        step3ID: 'Step 3 ID',
        step3img3: 'step3img3.png',
        step4: 'Step 4',
        step4M: 'Step 4 M',
        step4img1: 'step4img1.png',
        step4A: 'Step 4 A',
        step4img2: 'step4img2.png',
        step5: 'Step 5',
        step5L: 'Step 5 L',
        step5img1: 'step5img1.png',
        step5B: 'Step 5 B',
        step5img2: 'step5img2.png',
        step6: 'Step 6',
        step6O: 'Step 6 O',
        step6img1: 'step6img1.png',
        step6R: 'Step 6 R',
        step6img2: 'step6img2.png',
        step7: 'Step 7',
        step7E: 'Step 7 E',
        step7R: 'Step 7 R',
        step7img1: 'step7img1.png',
        step7img2: 'step7img2.png',
        step8: 'Step 8',
        step8F: 'Step 8 F',
        step8M: 'Step 8 M',
        step8S: 'Step 8 S',
        step8T: 'Step 8 T',
        step8img1: 'step8img1.png',
        step8img2: 'step8img2.png',
        step8img3: 'step8img3.png',
        step9: 'Step 9',
        step9A: 'Step 9 A',
        step9T: 'Step 9 T',
        step9P: 'Step 9 P',
        step9C: 'Step 9 C',
        step9img1: 'step9img1.png',
        step9img2: 'step9img2.png',
        step9img3: 'step9img3.png',
        step9img4: 'step9img4.png',
        step10: 'Step 10',
        step10R: 'Step 10 R',
        step10K: 'Step 10 K',
        step10B: 'Step 10 B',
        step10D: 'Step 10 D',
        step10img1: 'step10img1.png',
        step10img2: 'step10img2.png',
        step10img3: 'step10img3.png',
        step10img4: 'step10img4.png'
      };

      service.create(newHow).subscribe(how => {
        expect(how).toEqual(newHow);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newHow);
      req.flush(newHow);
    });
  });

  describe('#update', () => {
    it('should update and return the How', () => {
      const id = '1';
      const updatedHow: How = {
        id: '1',
        step1: 'Updated Step 1',
        step1img: 'updatedstep1img.png',
        step2: 'Updated Step 2',
        step2L: 'Updated Step 2 L',
        step2B: 'Updated Step 2 B',
        step3: 'Updated Step 3',
        step3S: 'Updated Step 3 S',
        step3img1: 'updatedstep3img1.png',
        step3L: 'Updated Step 3 L',
        step3img2: 'updatedstep3img2.png',
        step3ID: 'Updated Step 3 ID',
        step3img3: 'updatedstep3img3.png',
        step4: 'Updated Step 4',
        step4M: 'Updated Step 4 M',
        step4img1: 'updatedstep4img1.png',
        step4A: 'Updated Step 4 A',
        step4img2: 'updatedstep4img2.png',
        step5: 'Updated Step 5',
        step5L: 'Updated Step 5 L',
        step5img1: 'updatedstep5img1.png',
        step5B: 'Updated Step 5 B',
        step5img2: 'updatedstep5img2.png',
        step6: 'Updated Step 6',
        step6O: 'Updated Step 6 O',
        step6img1: 'updatedstep6img1.png',
        step6R: 'Updated Step 6 R',
        step6img2: 'updatedstep6img2.png',
        step7: 'Updated Step 7',
        step7E: 'Updated Step 7 E',
        step7R: 'Updated Step 7 R',
        step7img1: 'updatedstep7img1.png',
        step7img2: 'updatedstep7img2.png',
        step8: 'Updated Step 8',
        step8F: 'Updated Step 8 F',
        step8M: 'Updated Step 8 M',
        step8S: 'Updated Step 8 S',
        step8T: 'Updated Step 8 T',
        step8img1: 'updatedstep8img1.png',
        step8img2: 'updatedstep8img2.png',
        step8img3: 'updatedstep8img3.png',
        step9: 'Updated Step 9',
        step9A: 'Updated Step 9 A',
        step9T: 'Updated Step 9 T',
        step9P: 'Updated Step 9 P',
        step9C: 'Updated Step 9 C',
        step9img1: 'updatedstep9img1.png',
        step9img2: 'updatedstep9img2.png',
        step9img3: 'updatedstep9img3.png',
        step9img4: 'updatedstep9img4.png',
        step10: 'Updated Step 10',
        step10R: 'Updated Step 10 R',
        step10K: 'Updated Step 10 K',
        step10B: 'Updated Step 10 B',
        step10D: 'Updated Step 10 D',
        step10img1: 'updatedstep10img1.png',
        step10img2: 'updatedstep10img2.png',
        step10img3: 'updatedstep10img3.png',
        step10img4: 'updatedstep10img4.png'
      };

      service.update(id, updatedHow).subscribe(how => {
        expect(how).toEqual(updatedHow);
      });

      const req = httpTestingController.expectOne(`${baseUrl}/${id}`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updatedHow);
      req.flush(updatedHow);
    });
  });

  describe('#delete', () => {
    it('should delete the How and return success message', () => {
      const id = '1';

      service.delete(id).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpTestingController.expectOne(`${baseUrl}/${id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush({});
    });
  });
});
