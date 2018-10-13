import { Component, OnInit } from '@angular/core';
import { Transaction } from '../classes/transaction';
import { AppService } from '../services/app.service';
import { PaddingPipe } from '../pipes/padding.pipe';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-transaction-note',
  templateUrl: './transaction-note.component.html',
  styleUrls: ['./transaction-note.component.scss']
})
export class TransactionNoteComponent implements OnInit {

  constructor(
    private appService: AppService,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
    private paddingPipe: PaddingPipe
  ) { }

  ngOnInit() {
  }

  printNote(transaction: Transaction) {
    let str = [];
    
    let setting = this.appService.loadClientSettings();
    let width = parseInt(setting.printer_cpl);
    let topBlankLines = parseInt(setting.printer_top_blank_lines);
    if (topBlankLines && topBlankLines > 0) str.push("\n".repeat(topBlankLines));
    str.push(this.paddingPipe.transform('ArtMosphere', {width: width, align: 3}));

    let time = this.datePipe.transform(transaction.created_at, 'dd/MM/yyyy hh:mm:ss');
    let line = Array(width + 1).join('-');

    str.push(time);

    let col1 = 9;
    let col0 = width - col1;

    str.push(line);
    let headers = [
      this.paddingPipe.transform('Item'       , {width: col0, align: 2}),
      this.paddingPipe.transform('Nominal'      , {width: col1, align: 2}),
    ];
    str.push(headers.join(''));
    str.push(line);

    let total = 0;
    transaction.items.forEach(item => {
      if (!item.deleted) {
        total += item.nominal;
        let columns = [
          this.paddingPipe.transform(item.service.name     , {width: col0, align: 2}),
          this.paddingPipe.transform(this.decimalPipe.transform(item.nominal)    , {width: col1})
        ];
        str.push(columns.join(''));
      }
    });
    str.push(line);

    str.push(this.paddingPipe.transform(this.decimalPipe.transform(total)    , {width: width}));

    this.appService.sendToIpc('print-note', str.join("\n"));
  }

}
