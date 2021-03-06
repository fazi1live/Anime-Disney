import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/SharedPortal/Services/main.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  MyForm: any = FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private toastr: ToastrService
  ) {
    this.MyFormModel();
  }

  MyFormModel() {
    this.MyForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      star: ['', [Validators.required]],
      zodiac: ['', [Validators.required]],
      planet: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  getAge(dob: any) {
    var today = new Date();
    var birthDate = new Date(dob.value);
    console.log(birthDate.getFullYear());
    var age = today.getFullYear() - birthDate.getFullYear();
    let month = birthDate.getMonth() + 1;
    let day = birthDate.getUTCDate();
    console.log('month is ' + month);
    console.log('day is ' + day);
    console.log('age is ' + age);
    this.MyForm.get('age').setValue(age);
    this.zodiac_sign(day, month);
    return month + ' ' + day + ' ' + age;
  }

  zodiac_sign(day: any, month: any) {
    let astro_sign = '';
    let planet = '';
    // checks month and date within the
    // valid range of a specified zodiac
    if (month == 12) {
      if (day < 22) astro_sign = 'Sagittarius';
      else astro_sign = 'capricorn';
      planet = 'Saturn';
    } else if (month == 1) {
      if (day < 20) astro_sign = 'Capricorn';
      else astro_sign = 'aquarius';
      planet = 'Uranus';
    } else if (month == 2) {
      if (day < 19) astro_sign = 'Aquarius';
      else astro_sign = 'pisces';
      planet = 'Neptune';
    } else if (month == 3) {
      if (day < 21) astro_sign = 'Pisces';
      else astro_sign = 'aries';
      planet = 'Mars';
    } else if (month == 4) {
      if (day < 20) astro_sign = 'Aries';
      else astro_sign = 'taurus';
      planet = 'Venus';
    } else if (month == 5) {
      if (day < 21) astro_sign = 'Taurus';
      else astro_sign = 'gemini';
      planet = 'Mercury';
    } else if (month == 6) {
      if (day < 21) astro_sign = 'Gemini';
      else astro_sign = 'cancer';
      planet = 'Moon';
    } else if (month == 7) {
      if (day < 23) astro_sign = 'Cancer';
      else astro_sign = 'leo';
      planet = 'Sun';
    } else if (month == 8) {
      if (day < 23) astro_sign = 'Leo';
      else astro_sign = 'virgo';
      planet = 'Mercury';
    } else if (month == 9) {
      if (day < 23) astro_sign = 'Virgo';
      else astro_sign = 'libra';
      planet = 'Venus';
    } else if (month == 10) {
      if (day < 23) astro_sign = 'Libra';
      else astro_sign = 'scorpio';
      planet = 'Pluto';
    } else if (month == 11) {
      if (day < 22) astro_sign = 'scorpio';
      else astro_sign = 'sagittarius';
      planet = 'Jupiter';
    }
    this.MyForm.get('zodiac').setValue(astro_sign);
    this.MyForm.get('planet').setValue(planet);
  }

  ngOnInit(): void {}
  sendData() {
    this.mainService.registerUser(this.MyForm.value).subscribe((res: any) => {
      if(res.status === true){
        this.toastr.success(res.Message)
      }else if(res.status === false){
        this.toastr.error(res.Message)
      }
    });
  }
}
