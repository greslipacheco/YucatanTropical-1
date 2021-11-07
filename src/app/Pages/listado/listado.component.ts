import { Component, OnInit } from '@angular/core';
import { YucatanService } from 'src/app/Services/yucatan.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  reportes: any[]=[];
  public noReporte = true;


  constructor(private yucatanService: YucatanService) { }

  ngOnInit(): void {
    this.getReportes();
  }

  getReportes(): void {
    this.yucatanService.getReportes().subscribe(
      data=>{
        this.reportes=[];
        data.forEach((element:any)=>{
          this.reportes.push(
            {
              id:element.payload.doc.id,
              ...element.payload.doc.data()
            }
          )
        });
        if(this.reportes.length>0){
          this.noReporte=false;
        }
        console.table(this.reportes);
      }
    )
  }

  removeMovie(id:string):void{
    this.yucatanService.deleteReporte(id).then(()=>{
      window.alert('Se ha eliminado con Éxito');
    }).catch(error=>{
      window.alert(error);
    });
  }



}
