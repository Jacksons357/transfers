import { ArrowRight, X } from "lucide-react";
import { Button } from "./ui/button";
import { TableRow, TableCell } from "./ui/table";
import { TransfersSchema } from "./new-transfer";
import { useEffect, useState } from "react";

interface TransferTableRowProps {
  transfer: TransfersSchema
  onTransferSuccess: (id: number) => void
  onRemoveTransfer: (id: number) => void
}

export function TransferTableRow({ 
  transfer, 
  onRemoveTransfer, 
  onTransferSuccess 
} : TransferTableRowProps){
  const [timeElapsed, setTimeElapsed] = useState('')

  useEffect(() => {
    const transferDate = new Date(transfer.date);
    const now = new Date();
    const differenceInMilliseconds = now.getTime() - transferDate.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    if (isFinite(differenceInDays)) {
      const rtf = new Intl.RelativeTimeFormat('pt', { numeric: 'auto' });
      setTimeElapsed(rtf.format(-differenceInDays, 'day'));
    } else {
      setTimeElapsed('Data inválida');
    }
  }, [transfer.date]);

  return (
    <>
      <TableRow>
        <TableCell className="font-mono text-xs font-medium">
          {transfer.productName}
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {transfer.ean}
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {transfer.quantity}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {transfer.lote || 'sem lote'}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {transfer.validate || 'sem validade'}
        </TableCell>
        <TableCell className="text-muted-foreground">
          {timeElapsed}
        </TableCell>
        <TableCell className="font-medium">
          {transfer.destiny}
        </TableCell>
        <TableCell>
          <Button variant="outline" onClick={() => onTransferSuccess(transfer.id)}>
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="ghost" onClick={() => onRemoveTransfer(transfer.id)}>
            <X className="mr-2 h-3 w-3" />
            Apagar
          </Button>
        </TableCell>
      </TableRow>
    </>
  )
}