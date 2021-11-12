import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  template: `

  <div class="p-d-flex-columns p-m-5">
    <h1 class="p-mb-5">
      Offertolino
    </h1>
    <p>
      content....
    </p>
  </div>
  `,
  styles: [
  ]
})
export class InfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
