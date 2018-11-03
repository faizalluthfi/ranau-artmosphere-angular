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
    str.push(this.paddingPipe.transform('Jl. D Ranau Raya G7B/4 (712920)', {width: width, align: 3}));
    str.push('');

    let line = Array(width + 1).join('-');

    let time = this.datePipe.transform(transaction.created_at, 'dd/MM/yyyy hh:mm:ss');
    let user_col_width = width - time.length - 1;
    str.push(time + ' ' + this.paddingPipe.transform(transaction.user.name, {width: user_col_width}));

    const col1 = 8;
    const col2 = 7;
    const col3 = 9;
    let col0 = width - col1 - col2 - col3;

    str.push(line);
    let headers = [
      this.paddingPipe.transform('Item'       , {width: col0, align: 2}),
      this.paddingPipe.transform('Harga'      , {width: col1, align: 2}),
      this.paddingPipe.transform('Qty'        , {width: col2, align: 2}),
      this.paddingPipe.transform('Jml'        , {width: col3, align: 2})
    ];
    str.push(headers.join(''));
    str.push(line);

    let total = 0;
    transaction.items.forEach(item => {
      if (!item.deleted) {
        const subtotal = item.nominal * item.amount;
        total += subtotal;
        let columns = [
          this.paddingPipe.transform(item.service.name     , {width: col0, align: 2}),
          this.paddingPipe.transform(this.decimalPipe.transform(item.nominal)    , {width: col1}),
          this.paddingPipe.transform(this.decimalPipe.transform(item.amount)    , {width: col2}),
          this.paddingPipe.transform(this.decimalPipe.transform(subtotal)    , {width: col3})
        ];
        str.push(columns.join(''));
      }
    });
    str.push(line);

    let label = 'Total';
    str.push(label + this.paddingPipe.transform(this.decimalPipe.transform(total)    , {width: width - label.length}));
    
    const grandTotal = total - (transaction.discount || 0);
    if (transaction.discount) {
      label = 'Diskon';
      str.push(label + this.paddingPipe.transform(this.decimalPipe.transform(transaction.discount)    , {width: width - label.length}));
      label = 'Grand Total';
      str.push(label + this.paddingPipe.transform(this.decimalPipe.transform(grandTotal)    , {width: width - label.length}));
    }
    
    label = 'Nominal Uang';
    str.push(label + this.paddingPipe.transform(this.decimalPipe.transform(transaction.money_nominal)    , {width: width - label.length}));

    const moneyChange = (transaction.money_nominal || 0) - grandTotal;
    if (moneyChange > 0) {
      label = 'Kembalian';
      str.push(label + this.paddingPipe.transform(this.decimalPipe.transform(moneyChange)    , {width: width - label.length}));
    }
    str.push('');
    str.push(this.paddingPipe.transform('Terima Kasih', {width: width, align: 3}));

    let bottomBlankLines = parseInt(setting.printer_bottom_blank_lines);
    if (bottomBlankLines && bottomBlankLines > 0) str.push("\n".repeat(bottomBlankLines));

    this.appService.sendToIpc('print-note', str.join("\n"));
  }

}
