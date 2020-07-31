import {Component} from '@angular/core';
import {DadataConfig} from './components/dadata/dadata-config';
import {DadataTypes} from './interfaces/DadataTypes';
import {DadataSuggestion} from './interfaces/DadataSuggestion';
import {DadataLocation} from './interfaces/DadataLocation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dadata-control';

  locations:DadataLocation[] = [];

  cfg: DadataConfig = {
    type: DadataTypes.address,
    bounds: {
      fromBound: {
        value: 'city'
      },
      toBound: {
        value: 'city'
      }
    },
    constraint: 'city',
    class: 'test',
    label: 'Город'
  }

  cityCfg: DadataConfig = {
    type: DadataTypes.address,
    bounds: {
      fromBound: {
        value: 'street'
      },
      toBound: {
        value: 'street'
      }
    },
    constraint: 'street',
    class: 'test2',
    label: 'Улица',
    locations: this.locations,
  }

  addConstraint(constraint:string, event: DadataSuggestion){
    if(constraint == 'region'){
      this.clearLocations();
    }
    let constraintValue = event.data[constraint]
    this.locations.push({[constraint]: constraintValue})
  }

  clearLocations() {
    this.locations = [];
  }

}
