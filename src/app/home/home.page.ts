import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraPluginPermissions, ImageOptions, CameraSource, CameraPermissionType } from '@capacitor/camera';
import { PopoverController } from '@ionic/angular';
import { SelectDobPage } from '../select-dob/select-dob.page';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Route } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  stateList: string[] = ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Orissa', 'Pondicherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Tripura', 'Uttaranchal', 'Uttar Pradesh', 'West Bengal'];
  empId='1245';
  selectedImage: any='assets/imgs/man-placeholder.png';
  stepperIndex = 1;
  resCommAddrresSame = false;
  personalDetailForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    fatherName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    motherName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    gender: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required, Validators.min(1000000000), Validators.maxLength(9999999999)]),
    email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.email]),
  });
  resdentialDetailForm = new FormGroup({
    doorNo: new FormControl('', [Validators.required]),
    village: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    country: new FormControl('India', [Validators.required]),
    resCommAddrresSame: new FormControl(false, [Validators.required]),
  });
  communicationDetailForm = new FormGroup({
    doorNo: new FormControl('', [Validators.required]),
    village: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    country: new FormControl('India', [Validators.required]),
  });
  professionalDetailForm = new FormGroup({
    department: new FormControl('', [Validators.required]),
    doj: new FormControl('', [Validators.required]),
    doc: new FormControl('', [Validators.required]),
    emptype: new FormControl('', [Validators.required]),
    prevEmployer: new FormControl('', [Validators.required]),
    totalExp: new FormControl('', [Validators.required]),
  });

  deptList = [
    { deptId: 'DEPT001', deptName: 'StarMPay' },
    { deptId: 'DEPT002', deptName: 'StarIFPS' },
    { deptId: 'DEPT003', deptName: 'StarRecon' },
    { deptId: 'DEPT004', deptName: 'R&D' },
    { deptId: 'DEPT005', deptName: 'StarCardman' },
    { deptId: 'DEPT006', deptName: 'EZSwitch' },
    { deptId: 'DEPT007', deptName: 'StarCAS' },
    { deptId: 'DEPT008', deptName: 'Marketing' },
    { deptId: 'DEPT009', deptName: 'Finance' },
    { deptId: 'DEPT010', deptName: 'Software Support' },
    { deptId: 'DEPT011', deptName: 'HR' },
    { deptId: 'DEPT012', deptName: 'Admin' },
    { deptId: 'DEPT013', deptName: 'Management' },
  ];
  constructor(
    private modalCtrl: PopoverController,
    private activatedRoute: ActivatedRoute,
  ) { 

  }
  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const id = params['token'];
      console.log(id); // Use the id parameter as needed
    });
  }
  openCamera(source:number) {
    try {
      Camera.checkPermissions().then((res) => {
        console.log('Permission is given: ' + JSON.stringify(res));
        // {"camera":"granted","photos":"granted"}
        if(source===0) {
          if(res.photos === 'granted') {
            this.capturePhoto(source);
          } else {
            this.requestPermission();
          }
        } else {
          if(res.camera === 'granted') {
            this.capturePhoto(source);
          } else {
            this.requestPermission();
          }
        }
      }).catch((er: any) => {
        console.error('Permission is not given: ' + er)
      });
    } catch (er) {
      console.log('Error occured and carched: ' + er);
    }
  }
  async requestPermission() {
    console.log('Permission is required');
    const option: CameraPluginPermissions={
      permissions: ["camera"]
    };
    Camera.requestPermissions(option).then(res=> {
      console.log('Permission is given: ' +JSON.stringify(res));
    }).catch(err => {
      console.log('Error while asking permission: '+JSON.stringify(err));
    });
  }
  async capturePhoto(source:number) {
    let options: ImageOptions = {
      resultType: CameraResultType.DataUrl,
      correctOrientation: true,
      source: (source===0?CameraSource.Photos:CameraSource.Camera),
      height: 512,
      width: 512
    }
    Camera.getPhoto(options).then(res => {
      console.log('Picture captured: ' + JSON.stringify(res));
      if (res?.dataUrl) {
        const img = res.dataUrl;
        this.selectedImage = img;
      }
    }).catch((err: Error) => {
      console.log('Error in camera: ' + err);
    });
  }
  ionViewDidLeave() {
    console.log('closed');
  }
  changeStepperIndex(ev: any) {
    console.log('Stepper clicked: ' + ev);
    if(this.stepperIndex<5){
      this.stepperIndex = ev;
    }
  }
  back() {
    if (this.stepperIndex > 1) {
      this.stepperIndex -= 1;
    }
  }
  next() {
    this.stepperIndex += 1;
    if (this.stepperIndex) {
      if (!this.personalDetailForm.valid) {

      }
    }
    if(this.stepperIndex===5) {
    }
    // this.stepperIndex+=1;
  }
  async openDob(type: string = 'dob') {
    const modal = await this.modalCtrl.create({
      component: SelectDobPage,
      cssClass: 'custom-popover'
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      console.log('Selected DOB: ' + JSON.stringify(data));
      let datePipe = new DatePipe('en-US');
      const newDate = datePipe.transform(data, 'dd-MM-yyyy');
      console.log('New date: ' + newDate);
      if (type === 'dob') {
        this.personalDetailForm.controls.dob.setValue(newDate);
      } else if (type === 'doj') {
        this.professionalDetailForm.controls.doj.setValue(newDate);
      } else if (type === 'doc') {
        this.professionalDetailForm.controls.doc.setValue(newDate);
      }
    }
  }
  checkResCommAddrresSame(ev: any) {
    console.log('checkResCommAddrresSame: ' + ev);
    if (ev) {

    } else {

    }
  }
  openPlayStore() {
    const url='https://play.google.com/store/apps/details?id=com.cashlink.starmpay.demo&hl=en&gl=US';
    window.open(url, '_blank');
  }
}
