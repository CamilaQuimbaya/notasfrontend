import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule]
})
export class HomeComponent implements OnInit {

  data: any[] = [];
  editing = false;
  currentNota: any = {id: "", titulo: "", nota: "", fecha : "",};

  constructor(private apiService : ApiService) {}

  ngOnInit(): void {
    this.getAllnotas();
  }

  getAllnotas(){
    this.apiService.getNotas().subscribe((res:any) => {
        this.data = res;
        console.log(this.data);
    })
  }

  onSubmit(): void {
    if(this.editing){
      if(!this.currentNota.id){
        console.log("No hay id de la nota");
        return;
      }
      this.apiService.updateNota(this.currentNota.id, this.currentNota).subscribe({
        next : (res) => {
          console.log("Nota actualizada", res);
          this.getAllnotas();
          this.resetForm();
        }
      })
    }else{
      this.apiService.crearNota(this.currentNota).subscribe({
        next: (res) => {
          this.getAllnotas();
          this.resetForm();
        }, error: (err) => {
          console.log("Error al crear la nota", err);
        }
      })
    }
  }


  editNota(nota: any){
    this.currentNota = {id: nota._id, titulo: nota.titulo, nota: nota.nota, fecha: nota.fecha};
    this.editing = true;
  }


  deleteNota(id: string){
    console.log("Eliminando nota con id: ", id);
    if(confirm("¿Estás seguro de querer eliminar esta nota?")){
      this.apiService.deleteNota(id).subscribe({
        next: (res) => {
          console.log("Nota eliminada", res);
          this.getAllnotas();
        }, error: (err) => {
          console.log("Error al eliminar la nota", err);
        }
      })
    }
  }

  resetForm(): void{
    this.currentNota = {id: "", titulo: "", fecha : ""};
    this.editing = false;
  }


  

}
