import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YucatanService {

  constructor(private firestore:AngularFirestore) { }

  //Obtener todos los reportes
  getReportes(): Observable <any>{
    return this.firestore.collection('reportes').snapshotChanges();
  }

  //Eliminar un reporte
  deleteReporte(id:string):Promise<any>{
    return this.firestore.collection('reportes').doc(id).delete();
  }

  //Agregar un reporte
  addReporte(group: any, noCasaMaps: string, calleMaps: string, localidadMaps: string,municipioMaps: string,estadoMaps: string,codigoPMaps: string,):Promise<any>{
    const params={
      'title': group.title,
      'nombre': group.nombre,
      'telefono': group.telefono,
      'email': group.email,
      'descripcion': group.descripcion,
      'fechaCreacion': group.fechaCreacion,
      'numeroC': noCasaMaps,
      'direccion': calleMaps,
      'localidad': localidadMaps,
      'municipio': municipioMaps,
      'estado': estadoMaps,
      'codigoP': codigoPMaps
    };
    return this.firestore.collection('reportes').add(params);
  }

}
