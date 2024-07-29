import { X } from "lucide-react"
import { TransfersSchema } from "./new-transfer"
import { Button } from "./ui/button"
import { TableCell, TableRow } from "./ui/table"
import { useEffect, useState } from "react"

interface TransferTableSuccessRowProps {
  transfer: TransfersSchema
  onRemoveTransfer: (id: number) => void
}

export function TransferTableSuccessRow({ transfer, onRemoveTransfer  }: TransferTableSuccessRowProps) {
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
    <TableRow>
      <TableCell className="font-mono text-xs font-medium">{transfer.productName}</TableCell>
      <TableCell className="font-mono text-xs font-medium">{transfer.ean}</TableCell>
      <TableCell className="font-mono text-xs font-medium">{transfer.quantity}</TableCell>
      <TableCell className="text-muted-foreground">{transfer.lote || "sem lote"}</TableCell>
      <TableCell className="text-muted-foreground">{transfer.validate || "sem validade"}</TableCell>
      <TableCell className="text-muted-foreground">{timeElapsed}</TableCell>
      <TableCell className="font-medium">{transfer.destiny}</TableCell>
      <TableCell>
        <Button variant="ghost" onClick={() => onRemoveTransfer(transfer.id)}>
          <X className="mr-2 h-3 w-3" />
          Apagar
        </Button>
      </TableCell>
    </TableRow>
  )
}