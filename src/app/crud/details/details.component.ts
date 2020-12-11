import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/app/notifications.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  formUser: FormGroup;
  idUser;
  file:any;
  selectedFile: FileList = null;
  vistaPrevia=true;
  cargoImagen=false;
  constructor(
    private formbuilder: FormBuilder,
    private api: ServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notification: NotificationsService,
  ) { }

  ngOnInit(): void {
    this.idUser = this.activatedRoute.snapshot.paramMap.get("id")
    this.formUser = this.formbuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      lastName_1: ['', Validators.required],
      lastName_2: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmedPassword: ['', Validators.required],
      telephone: ['', Validators.required],
      imageProfile: ['./assets/img/faces/marc.jpg', Validators.required],
    });
    if(this.router.url== '/users/create-edit'){
      
    }else{
      this.api.getUser(this.idUser).subscribe(response => {
        console.log(response);
        response.imageProfile.replace('../../../', './')
        this.formUser = this.formbuilder.group({
          name: [response.name, Validators.required],
          username: [response.username, Validators.required],
          lastName_1: [response.lastName_1, Validators.required],
          lastName_2: [response.lastName_2, Validators.required],
          email: [response.email, Validators.compose([Validators.required, Validators.email])],
          telephone: [response.telephone, Validators.required],
          imageProfile: [response.imageProfile, Validators.required],
        });
      }, error => {
        console.log(error);
      })
    }
    this.formUser.controls.confirmedPassword.valueChanges.subscribe(value => {
      if(value != this.f.password.value){
        this.formUser.controls.confirmedPassword.setErrors({
          mismatch: true
        })
      }
      if(this.f.confirmedPassword.value === ''){
        this.formUser.controls.confirmedPassword.setErrors({
          required: true
        })
      }
      if(value == this.f.password.value){
        this.formUser.controls.confirmedPassword.setErrors(null)
      }
    })
    this.formUser.controls.password.valueChanges.subscribe(value => {
      if(this.formUser.controls.confirmedPassword.value !== ''){
        if(value != this.f.confirmedPassword.value){
          this.formUser.controls.confirmedPassword.setErrors({
            mismatch: true
          })
        } else {
          this.formUser.controls.confirmedPassword.setErrors(null)
        }
      }
    })
  }
  selectFile(event) {
    this.selectedFile = event.target.files;
    this.file= this.selectedFile.item(0).name;
    this.upload()
  }
  upload() {
    const file = this.selectedFile.item(0);
    const fileReader  = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      this.formUser.get('imageProfile').setValue(fileReader.result);
    };
    this.vistaPrevia=true;
    this.cargoImagen=true;
  }
  get f(){
    return this.formUser.controls;
  }

  saveUser(){   
    this.api.registry(this.formUser.value).subscribe(response =>{
      console.log(response);
      this.notification.showNotification('top', 'left', 'success', 'Usuario creado correctamente');
      this.router.navigateByUrl('crud-list');
    },error =>{
      console.log(error);   
      this.notification.showNotification('top', 'left', 'warning', error.error.msg);
    });    
  }
  editUser(){
    console.log(this.formUser.value);
    this.api.updateUser(this.formUser.value, this.idUser).subscribe(response =>{
      console.log(response);
      this.notification.showNotification('top', 'left', 'success', 'Usuario actualizado correctamente');
      this.router.navigateByUrl('crud-list');
    },error =>{
      console.log(error);   
      this.notification.showNotification('top', 'left', 'warning', error.error.msg);
    });
  }

}
