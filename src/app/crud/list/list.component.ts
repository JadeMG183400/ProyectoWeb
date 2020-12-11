import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/notifications.service';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users:any = [];
  user_id = '';
  constructor(
    private api: ServiceService,
    private router: Router,
    private notifications: NotificationsService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  filter(event){
    var input, filter, table, tr, td;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (var i = 0; i < tr.length; i++) {
      var tds = tr[i].getElementsByTagName("td");
      var flag = false;
      for(var j = 0; j < tds.length; j++){
        var td = tds[j];
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          flag = true;
        } 
      }
      if(flag){
          tr[i].style.display = "";
      }
      else {
          tr[i].style.display = "none";
      }
    }

  }

  newUser(){
    this.router.navigateByUrl('crud-new')
  }
  editUser(id){
    this.router.navigateByUrl('crud-detail/'+id);
  }
  getUsers(){
    this.api.getUsers().subscribe(response =>{
      console.log(response);
      this.users = response;
    },error=>{
      console.log(Response)
    })
  }
  removeUser(id){
    this.deleteUser(id);
  }

  deleteUser(idUser) {
    this.api.deleteUser(idUser).subscribe(
      response => {
        this.notifications.showNotification('top','right','success', 'Usuario eliminado correctamente');
        this.getUsers();
      },
      error => {
        this.notifications.showNotification('top','right','warning', 'ha ocurrido un error intentelo nuevamente');
      }
    );
  }

}
