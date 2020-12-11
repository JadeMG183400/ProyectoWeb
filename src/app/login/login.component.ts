import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { NotificationsService } from '../notifications.service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin:FormGroup;
  constructor(
    private api: ServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: SocialAuthService,
    private notifications: NotificationsService
  ) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ["", Validators.required],
      password: ['', Validators.required],
    })
    this.authService.authState.subscribe((user) => {//aqui te suscribes al evento del auth de google
      console.log(user)//aqui es la impresion de la respuesta del auth de gmail
    });
  }

  login(){
    this.api.login(this.formLogin.value).subscribe(response=>{ //Aqui te suscribes al metodo del api te va a retornar un observable
      console.log(response);//esta es la impresion de la respuesta del api
      localStorage.setItem('token', response.user.token);
      localStorage.setItem('user_id', response.dataUser.id);
      this.router.navigateByUrl('/')
    }, error =>{
      console.log(error);
      this.notifications.showNotification("top", "right", "warning", 'Mensaje de error');
    })
  }
  goto(path){
    this.router.navigateByUrl(path);
  }
  gmail(): void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
