import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerifyResult } from 'src/app/enums/VerifyResult';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-daily-confirm',
  templateUrl: './daily-confirm.component.html',
  styleUrls: ['./daily-confirm.component.scss']
})
export class DailyConfirmComponent implements OnInit {
  public ConfirmResult: VerifyResult;
  public VerifyResult = VerifyResult;
  constructor(private route: ActivatedRoute, private httpService: HttpService) { }

  ngOnInit(): void {
    const userId = +this.route.snapshot.params.userId;
    const code = this.route.snapshot.params.code;

    if (userId && code) {
      console.log(userId);
      console.log(code);
      this.httpService.VerifyCode(userId, code).subscribe(
        (result) => this.ConfirmResult = VerifyResult.OK,
        (error) =>  this.ConfirmResult = VerifyResult.Error);
    }
  }

}
