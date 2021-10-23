import { catchError } from 'rxjs/operators';
import { AlertService } from './../../../_services/alert.service';
import { AdminService } from 'src/app/_services/admin/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bulk-qr-code-generator',
  templateUrl: './bulk-qr-code-generator.component.html',
  styleUrls: ['./bulk-qr-code-generator.component.scss']
})
export class BulkQrCodeGeneratorComponent implements OnInit {
  loading = false;

  constructor(private adminService: AdminService,
              private alertService: AlertService
    ) { }

  ngOnInit() {
  }

  bulkQrCodeSubmit() {
    this.loading = true;

    this.adminService.BulkQrCodeGenerate().subscribe((res: any) => {
      if (res.status === 200) {
        this.alertService.Success('Bulk QR Code Geneterated Successful.');
      }
    }
    , error => {
      this.loading = false;
      throw error;
    });
  }


}
