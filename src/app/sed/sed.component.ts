
import { Component, OnInit, Input, Injectable } from '@angular/core';
import { SedService } from '../svrs/sed.service';
import { LinksService } from '../svrs/links.service';



@Component({
  selector: 'app-sed',
  templateUrl: './sed.component.html',
  styleUrls: ['./sed.component.css']
})

export class SedComponent {

  /**
   * CSS седмицы 
   */
  sedStyle = {
    "color": "#e3423477",
    "font-weight": "bold",
    "font-size": "1.5em"
  };

  constructor(public _sedService: SedService, public _linksServise: LinksService) {
                //----------
  }

}

