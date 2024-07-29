import { useEffect, useState } from "react";
import { NewTransfer, TransfersSchema } from "./new-transfer";
import { TransferTableRow } from "./transfer-table-row";
import { Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table";
import { TransferTableSuccessRow } from "./transfer-table-success-row";

export function Transfers() {
  const [transfers, setTransfers] = useState<TransfersSchema[]>([])
  const [approvedTransfers, setApprovedTransfers] = useState<TransfersSchema[]>([])

  useEffect(() => {
    const storedTransfers = localStorage.getItem('transfers')
    const storedApprovedTransfers = localStorage.getItem('approvedTransfers')

    if (storedTransfers) {
      setTransfers(JSON.parse(storedTransfers))
    }

    if (storedApprovedTransfers) {
      setApprovedTransfers(JSON.parse(storedApprovedTransfers))
    }
  }, [])

  function handleAddTransfer(newTransfer: TransfersSchema) {
    const updatedTransfers = [...transfers, newTransfer]
    setTransfers(updatedTransfers)
    localStorage.setItem('transfers', JSON.stringify(updatedTransfers))
  }

  function transferSuccess(id: number) {
    const updatedTransfers = transfers.filter(transfer => transfer.id !== id)
    const approvedTransfer = transfers.find(transfer => transfer.id === id)

    if (approvedTransfer) {
      const updatedApproveTransfers = [
        ...approvedTransfers, {
          ...approvedTransfer,
          approved: true
        }
      ]

      setTransfers(updatedTransfers)
      setApprovedTransfers(updatedApproveTransfers)

      localStorage.setItem('transfers', JSON.stringify(updatedTransfers))
      localStorage.setItem('approvedTransfers', JSON.stringify(updatedApproveTransfers))
    }
  }

  function removeTransfer(id: number) {
    const updateTransfers = transfers.filter(transfer => transfer.id !== id)
    const updateApprovedTransfers = approvedTransfers.filter(transfer => transfer.id !== id)

    setTransfers(updateTransfers)
    setApprovedTransfers(updateApprovedTransfers)

    localStorage.setItem('transfers', JSON.stringify(updateTransfers))
    localStorage.setItem('approvedTransfers', JSON.stringify(updateApprovedTransfers))
  }

  return (
    <>
      <NewTransfer onAddTransfer={handleAddTransfer} />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pendentes</h1>

        <div className="space-y-2.5">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[500px]">Produto</TableHead>
                  <TableHead className="w-[150px]">Código de barra</TableHead>
                  <TableHead className="w-[70px]">Quantidade</TableHead>
                  <TableHead className="w-[70px]">Lote</TableHead>
                  <TableHead className="w-[70px]">Validade</TableHead>
                  <TableHead className="w-[100px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Destino</TableHead>
                  <TableHead className="w-[132px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.filter(transfer => !transfer.approved).map((transfer) => ( 
                  <TransferTableRow 
                    key={transfer.id} 
                    transfer={transfer}
                    onTransferSuccess={transferSuccess}
                    onRemoveTransfer={removeTransfer}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Transferidadas</h1>

        <div className="space-y-2.5">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[500px]">Produto</TableHead>
                  <TableHead className="w-[150px]">Código de barra</TableHead>
                  <TableHead className="w-[70px]">Quantidade</TableHead>
                  <TableHead className="w-[70px]">Lote</TableHead>
                  <TableHead className="w-[70px]">Validade</TableHead>
                  <TableHead className="w-[100px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Destino</TableHead>
                  <TableHead className="w-[132px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedTransfers.map((transfer) => (
                  <TransferTableSuccessRow
                    key={transfer.id} 
                    transfer={transfer}
                    onRemoveTransfer={removeTransfer}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}