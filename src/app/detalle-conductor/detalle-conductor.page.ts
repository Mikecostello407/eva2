import { Component, OnInit } from '@angular/core';
import { ConductorService } from '../services/conductor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-conductor',
  templateUrl: './detalle-conductor.page.html',
  styleUrls: ['./detalle-conductor.page.scss'],
})
export class DetalleConductorPage implements OnInit {

  detalleConductor: any;

  constructor(
    private conductorService: ConductorService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const conductorId = this.route.snapshot.paramMap.get('id');
    if (conductorId) {
      this.conductorService.getConductor(conductorId).subscribe(data => {
        this.detalleConductor = data;
        console.log(this.detalleConductor)
      })
    }
  }

  showloginalert() {
    alert('Viaje iniciado');
  }
}
