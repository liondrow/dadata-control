import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DadataTypes} from "../../interfaces/DadataTypes";
import {Observable, Subject} from 'rxjs';
import {DadataService} from "../../services/dadata.service";
import {map, switchMap} from 'rxjs/operators';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {DadataConfig, DadataConfigDefault} from './dadata-config';
import {DadataSuggestion} from '../../interfaces/DadataSuggestion';

@Component({
  selector: 'app-dadata',
  templateUrl: './dadata.component.html',
  styleUrls: ['./dadata.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DadataComponent),
      multi: true
    }
  ]
})
export class DadataComponent implements OnInit, ControlValueAccessor {



  private v: any = '';

  inputString$ = new Subject<string>();

  @Input() config: DadataConfig = DadataConfigDefault;
  @Input() type: DadataTypes = DadataConfigDefault.type;
  @Input() limit = DadataConfigDefault.limit;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';

  @Output() selected: EventEmitter<DadataSuggestion> = new EventEmitter<DadataSuggestion>();

  @ViewChild('inputValue', { static: true }) inputValue: ElementRef;

  onTouched = () => {};
  propagateChange = (_: any) => { };

  constructor(
    private dadataService: DadataService
  ) { }

  suggestionData$: Observable<DadataSuggestion[]>;

  ngOnInit(): void {
    this.suggestionData$ = this.inputString$
      .pipe(
        switchMap(x =>  this.dadataService.getSuggestion(x, this.config)),
        map(y => y.suggestions)
      );
  }

  getData(value: string) {
    this.inputString$.next(value);
  }

  onChange(e) {
    this.selected.emit(e);
    this.inputValue.nativeElement.value = e.value
    this.propagateChange(e.value);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.v = obj;
    } else {
      this.v = '';
    }
  }

}
