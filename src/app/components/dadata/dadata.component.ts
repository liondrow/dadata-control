import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DadataTypes} from "../../interfaces/DadataTypes";
import {Subject, timer} from "rxjs";
import {DadataService} from "../../services/dadata.service";
import {debounce} from "rxjs/operators";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {DadataConfig, DadataConfigDefault} from './dadata-config';
import {DadataSuggestion} from '../../interfaces/DadataSuggestion';
import {DadataResponse} from '../../interfaces/DadataResponse';
import {DadataLocation} from '../../interfaces/DadataLocation';

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

  suggestionData: DadataSuggestion[] = [];
  selectedDadata: any;

  private v: any = '';

  private inputString$ = new Subject<string>();

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

  get value(): any {
    return this.v;
  }

  set value(v: any) {
    if (v !== this.v) {
      this.v = v;
      this.propagateChange(v);
    }
  }

  ngOnInit(): void {
    this.inputString$.pipe(
      debounce(() => timer(this.config.delay ? this.config.delay : 500)),
    ).subscribe(x => {
      this.dadataService.getSuggestion(x, this.config)
        .subscribe((y: DadataResponse) => {
          this.suggestionData = y.suggestions;
        })
    })
  }

  getData(value: string) {
    this.inputString$.next(value);
  }

  onChange(e) {
    this.selected.emit(this.selectedDadata);
    this.inputValue.nativeElement.value = this.selectedDadata.value
    this.propagateChange(e.target.value);
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
