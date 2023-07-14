import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-select-dob',
  templateUrl: './select-dob.page.html',
  styleUrls: ['./select-dob.page.scss'],
})
export class SelectDobPage implements OnInit {
  selectedDate:any;
  constructor(
    private modalCtrl: PopoverController

  ) { }

  ngOnInit() {
  }
  close(datetime: any) {
    console.log('datetime: ' + datetime);
    this.modalCtrl.dismiss(datetime);
  }
  test(btn:any) {
    console.log(btn)
  }
}
