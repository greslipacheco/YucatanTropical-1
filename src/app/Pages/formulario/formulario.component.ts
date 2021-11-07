import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { YucatanService } from 'src/app/Services/yucatan.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @ViewChild("placesRef")
  placesRef!: GooglePlaceDirective;

  public options = {
    types: [],
    componentRestrictions: { country: 'MX' }
  } as any;

  public title_add: any;
  public latitude: any;
  public longitude: any;
  public zoom: any;

  public calleMaps: any;
  public noCasaMaps: any;
  public localidadMaps: any;
  public municipioMaps: any;
  public estadoMaps: any;
  public codigoPMaps: any;

  public myarray = [] as any;

  createReporte: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private yucatanTropical: YucatanService, private router: Router) {
    this.createReporte = this.fb.group({
      //Estos son los nombres pero del formulario
      titulo: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      correo: ['', Validators.required],
      texto: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.setCurrentLocation();
  }

  addReporte(): void {
    this.submitted = true;
    if (this.createReporte.invalid) {
      console.table(this.createReporte);
      return;
    }
    const group: any = {
      //Los primeros nombres son de firebase
      title: this.createReporte.value.titulo,
      nombre: this.createReporte.value.name,
      telefono: this.createReporte.value.phone,
      email: this.createReporte.value.correo,
      descripcion: this.createReporte.value.texto,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.yucatanTropical.addReporte(group, this.noCasaMaps,this.calleMaps,this.localidadMaps,this.municipioMaps,this.estadoMaps,this.codigoPMaps).then(() => {
      console.log('Reporte Creada con Éxito');      
      this.router.navigate(['/home']);
      window.alert('Reporte Creado con Éxito')
    }).catch(error => {
      window.alert(error);
    })
    console.table(this.createReporte);
  }

  public handleAddressChange(address: Address) {
    this.myarray = address.address_components;

    if (this.myarray.length >= 7) {
      this.noCasaMaps = address.address_components[0].long_name,
      this.calleMaps = address.address_components[1].long_name,
      this.localidadMaps = address.address_components[2].long_name,
      this.municipioMaps = address.address_components[3].long_name,
      this.estadoMaps = address.address_components[4].long_name,
      this.codigoPMaps = address.address_components[6].long_name

      

    }else {
      this.noCasaMaps = 'Sin Número';
      this.calleMaps = address.address_components[0].long_name,
      this.localidadMaps = address.address_components[1].long_name,
      this.municipioMaps = address.address_components[2].long_name,
      this.estadoMaps = address.address_components[3].long_name,
      this.codigoPMaps = address.address_components[5].long_name
    }



    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
  }

  public setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      })
    }
  }

}
